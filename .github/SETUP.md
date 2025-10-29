# GitHub Actions Setup Guide

This document outlines the setup required for the GitHub Actions workflows created for your React frontend project.

## Overview

The following workflows have been created:

1. **production-versioning.yml** - Quality gates and semantic versioning for main/master branch
2. **production-release.yml** - Production build and release triggered by version tags
3. **staging-versioning.yml** - Quality gates and staging tag creation for staging branch
4. **staging-release.yml** - Staging build and deployment triggered by staging workflow completion

## Required Repository Secrets

### Basic Secrets (Required)
```
GITHUB_TOKEN - Automatically provided by GitHub Actions
```

### Optional Secrets (for advanced features)

#### For npm package publishing (if needed):
```
NPM_TOKEN - Your npm authentication token
```

#### For AWS S3 deployment (production):
```
AWS_ACCESS_KEY_ID - AWS access key for production deployments
AWS_SECRET_ACCESS_KEY - AWS secret key for production deployments
```

#### For AWS S3 deployment (staging):
```
STAGING_AWS_ACCESS_KEY_ID - AWS access key for staging deployments
STAGING_AWS_SECRET_ACCESS_KEY - AWS secret key for staging deployments
```

## Required Repository Variables

### Optional Variables (configure as needed)

#### Deployment Control:
```
DEPLOY_TO_S3=true - Enable production S3 deployment
DEPLOY_TO_STAGING=true - Enable staging environment deployment
RUN_E2E_TESTS=true - Enable end-to-end tests in staging
```

#### AWS Configuration:
```
AWS_REGION=us-east-1 - AWS region for production (default: us-east-1)
S3_BUCKET_NAME=your-production-bucket - Production S3 bucket name
CLOUDFRONT_DISTRIBUTION_ID=E1234567890 - Production CloudFront distribution ID
```

#### Staging Configuration:
```
STAGING_AWS_REGION=us-east-1 - AWS region for staging
STAGING_S3_BUCKET=your-staging-bucket - Staging S3 bucket name
STAGING_CLOUDFRONT_DISTRIBUTION_ID=E0987654321 - Staging CloudFront distribution ID
STAGING_URL=https://staging.yourapp.com - Staging environment URL
```

## Branch Structure

The workflows expect the following branch structure:

- **main/master** - Production branch
- **staging** - Staging branch

## Workflow Triggers

### Production Versioning (`production-versioning.yml`)
- Triggers on: Push to main/master, PR to main/master
- Creates semantic releases with tags like `v1.0.0`, `v1.1.0`, etc.

### Production Release (`production-release.yml`)
- Triggers on: Push of version tags (`v*`)
- Creates production builds and GitHub releases

### Staging Versioning (`staging-versioning.yml`)
- Triggers on: Push to staging, PR to staging
- Creates staging tags like `v1.0.0-staging.20231029123456.abc1234`

### Staging Release (`staging-release.yml`)
- Triggers on: Completion of staging versioning workflow
- Creates staging builds and pre-releases

## Build Artifacts

### Production Builds
- Compressed archives (tar.gz and zip)
- Build metadata (build-info.json)
- Attached to GitHub releases
- Retained for 90 days

### Staging Builds
- Compressed archives (tar.gz and zip)
- Staging build metadata
- Attached to pre-releases
- Retained for 30 days

## Getting Started

1. **Set up branch protection rules** (recommended):
   ```
   - Require PR reviews for main/master
   - Require status checks to pass
   - Require branches to be up to date
   ```

2. **Configure secrets and variables** as needed for your deployment strategy

3. **Create staging branch** if it doesn't exist:
   ```bash
   git checkout -b staging
   git push origin staging
   ```

4. **Test the workflows**:
   - Create a PR to staging to test staging workflows
   - Create a PR to main to test production workflows

## Customization

### Adding Linting
If you add ESLint to your project, create a `lint` script in package.json:
```json
{
  "scripts": {
    "lint": "eslint src --ext .js,.jsx,.ts,.tsx"
  }
}
```

### Environment Variables in Build
The workflows set these environment variables during build:
- `REACT_APP_VERSION` - The version being built
- `REACT_APP_ENVIRONMENT` - Either "production" or "staging"

You can access these in your React app:
```javascript
console.log('App version:', process.env.REACT_APP_VERSION);
console.log('Environment:', process.env.REACT_APP_ENVIRONMENT);
```

### Custom Deployment
To add custom deployment steps, modify the optional deployment jobs in:
- `production-release.yml` (deploy-to-s3 job)
- `staging-release.yml` (deploy-to-staging job)

## Troubleshooting

### Common Issues

1. **Workflow not triggering**: Check branch names and permissions
2. **Build failures**: Ensure all dependencies are in package.json
3. **Test failures**: The workflows run tests with `--passWithNoTests` to handle projects without tests
4. **Permission errors**: Ensure the repository has the required permissions set

### Debugging

- Check the Actions tab in your GitHub repository
- Review workflow logs for detailed error messages
- Ensure all required secrets and variables are configured
- Verify branch protection rules aren't blocking automated commits

## Support

For issues with the workflows, check:
1. GitHub Actions logs
2. This setup documentation
3. GitHub Actions documentation: https://docs.github.com/en/actions