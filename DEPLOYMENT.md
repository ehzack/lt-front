# Deployment Guide

This document outlines the different deployment options for the LT Frontend application.

## 🚀 Standalone Executable (Recommended)

The easiest way to deploy and run the application is using the standalone Windows executable that includes both the React frontend and Go web server.

### Download and Run

1. Go to the [Releases](../../releases) page
2. Download the latest `lt-frontend-{version}-windows.exe` file
3. Double-click or run from command line:
   ```cmd
   lt-frontend-1.0.0-windows.exe
   ```
4. Open your browser to `http://localhost:8080`

### Configuration

The server can be configured using environment variables:

```cmd
# Set custom port
set PORT=3000
lt-frontend-1.0.0-windows.exe

# Set app version
set APP_VERSION=1.0.0
lt-frontend-1.0.0-windows.exe
```

### Features

- ✅ **Zero Dependencies**: No Node.js, npm, or web server installation required
- ✅ **Single File**: Everything embedded in one executable (~24MB)
- ✅ **SPA Support**: Handles client-side routing automatically
- ✅ **Security Headers**: Production-ready security configuration
- ✅ **Health Check**: Built-in monitoring at `/health`
- ✅ **Portable**: Copy and run on any Windows machine

## 🌐 Traditional Web Server Deployment

For production environments with existing web infrastructure.

### Static Files

1. Download `react-app-production-{version}.tar.gz` or `.zip`
2. Extract to your web server directory
3. Configure your web server for SPA routing:

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/extracted/build;
    index index.html;

    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Apache Configuration

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /path/to/extracted/build
    
    # Handle SPA routing
    <Directory "/path/to/extracted/build">
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

## ☁️ Cloud Deployment

### AWS S3 + CloudFront

Automated deployment is available via GitHub Actions:

1. Set the following repository variables:
   - `DEPLOY_TO_S3=true`
   - `S3_BUCKET_NAME=your-bucket-name`
   - `AWS_REGION=us-east-1`
   - `CLOUDFRONT_DISTRIBUTION_ID=your-distribution-id`

2. Set the following repository secrets:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`

3. The build will automatically deploy to S3 on production releases

### Other Cloud Providers

The static build files can be deployed to any static hosting service:

- **Vercel**: Connect GitHub repository for automatic deployments
- **Netlify**: Drag and drop the build folder or connect repository
- **Azure Static Web Apps**: Use GitHub Actions integration
- **Google Cloud Storage**: Upload static files with CDN

## 🔧 Development Deployment

For development and testing environments:

### Local Development

```bash
# Start React development server
yarn start

# Or start with custom port
PORT=3001 yarn start
```

### Build and Test Locally

```bash
# Build React app
yarn build

# Build and run Go server locally
yarn build:go
./lt-frontend

# Build Windows executable (from Linux/Mac)
yarn build:windows
```

### Docker (Optional)

```dockerfile
# Dockerfile
FROM nginx:alpine
COPY build/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🎯 Deployment Comparison

| Method | Setup Effort | Dependencies | Performance | Scalability | Cost |
|--------|--------------|--------------|-------------|-------------|------|
| **Standalone .exe** | ⭐⭐⭐⭐⭐ | None | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Static Files** | ⭐⭐⭐ | Web Server | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Cloud (S3+CDN)** | ⭐⭐⭐⭐ | AWS Account | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## 🔍 Monitoring and Health Checks

All deployment methods support health monitoring:

### Health Check Endpoint

```bash
# For standalone executable
curl http://localhost:8080/health

# Response
{
  "status": "healthy",
  "timestamp": "2024-10-29T22:00:00Z",
  "version": "1.0.0"
}
```

### Application Monitoring

- **Logs**: Server logs are written to stdout/stderr
- **Metrics**: Use health endpoint for uptime monitoring
- **Performance**: Monitor response times and resource usage

## 🆘 Troubleshooting

### Common Issues

**Standalone Executable**
- **Port in use**: Change port with `set PORT=8081`
- **Firewall**: Ensure port 8080 is allowed
- **Performance**: Increase system resources if needed

**Static Deployment**
- **Routing issues**: Ensure SPA fallback is configured
- **CORS errors**: Check API endpoint configuration
- **Cache issues**: Clear browser cache and CDN cache

**Cloud Deployment**
- **Build failures**: Check GitHub Actions logs
- **Permission errors**: Verify AWS credentials and permissions
- **CDN issues**: Invalidate CloudFront cache

### Getting Help

1. Check the [Issues](../../issues) page for known problems
2. Review GitHub Actions logs for build failures
3. Test locally first before deploying to production