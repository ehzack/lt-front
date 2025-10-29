# Conventional Commits Guide

This project uses [Conventional Commits](https://www.conventionalcommits.org/) with [semantic-release](https://github.com/semantic-release/semantic-release) for automated versioning and releases.

## 📋 Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```
## 🎯 Types and Version Impact



### **PATCH** Release (Bug fixes - `1.0.0` → `1.0.1`)
- `fix:` - Bug fixes
- `perf:` - Performance improvements
- `revert:` - Reverting previous changes

### **MINOR** Release (New features - `1.0.0` → `1.1.0`)
- `feat:` - New features
- `refactor:` - Code refactoring
- `style:` - Code style changes
- `docs:` - Documentation updates
- `test:` - Test additions/updates
- `build:` - Build system changes
- `ci:` - CI/CD changes
- `chore:` - Maintenance tasks

### **MAJOR** Release (Breaking changes - `1.0.0` → `2.0.0`)
- Any commit with `BREAKING CHANGE:` in footer
- Any commit with `!` after type (e.g., `feat!:`, `fix!:`)

## ✅ Examples

### Patch Release Examples
```bash
# Bug fix
git commit -m "fix: resolve authentication token expiration issue"

# Performance improvement
git commit -m "perf: optimize React component rendering performance"

# Revert change
git commit -m "revert: remove experimental feature causing crashes"
```

### Minor Release Examples
```bash
# New feature
git commit -m "feat: add email notification system for alarms"

# Refactoring
git commit -m "refactor: restructure Redux store for better performance"

# Documentation
git commit -m "docs: add component documentation with examples"

# Tests
git commit -m "test: add unit tests for authentication components"
```

### Major Release Examples
```bash
# Breaking change with !
git commit -m "feat!: change API response format for all endpoints"

# Breaking change with footer
git commit -m "feat: add new authentication system

BREAKING CHANGE: old authentication tokens are no longer supported"
```

## 🎨 Scopes (Optional)

You can add scopes to provide more context:

```bash
feat(auth): add JWT refresh token functionality
fix(ui): resolve Material-UI theme inconsistencies
docs(api): update endpoint documentation
test(components): add integration tests for dashboard
```

Common scopes in this project:
- `auth` - Authentication related
- `ui` - User interface components
- `api` - API integration
- `websocket` - Real-time features
- `alarm` - Alarm system
- `dashboard` - Dashboard features
- `routing` - Navigation and routing
- `state` - Redux state management
- `components` - React components
- `utils` - Utility functions

## 🚀 Release Process

### Staging Releases
1. Push commits to `staging` branch
2. Semantic-release analyzes commits
3. Creates prerelease version (e.g., `1.2.0-staging.1`)
4. Builds React application
5. Creates GitHub release with build artifacts

### Production Releases
1. Push commits to `master` branch
2. Semantic-release analyzes commits
3. Creates stable version (e.g., `1.2.0`)
4. Builds optimized React application
5. Creates GitHub release with build artifacts
6. Updates CHANGELOG.md

## 🔍 Testing Your Commits

Before pushing, you can test what version would be generated:

```bash
# Dry run to see what version would be created
yarn semantic-release:dry
```

## 🎯 Best Practices

1. **Use descriptive commit messages**: Explain what was changed and why
2. **Keep commits atomic**: One logical change per commit
3. **Use imperative mood**: "add feature" not "added feature"
4. **Reference issues**: Include issue numbers when applicable
5. **Follow the format**: Consistent formatting helps automation

## 📚 Examples by Feature

### Frontend Components
```bash
feat(components): implement new alarm dashboard widget
fix(components): resolve Material-UI DatePicker timezone issue
refactor(components): convert class components to hooks
```

### State Management
```bash
feat(state): add Redux middleware for WebSocket integration
fix(state): resolve race condition in alarm reducer
perf(state): optimize Redux selectors with memoization
```

### User Interface
```bash
feat(ui): add dark mode theme support
fix(ui): resolve responsive layout issues on mobile
style(ui): update color scheme to match brand guidelines
```

### API Integration
```bash
feat(api): add real-time equipment status updates
fix(api): handle network timeouts gracefully
refactor(api): simplify Axios interceptor logic
```

### Breaking Changes
```bash
feat(auth)!: change authentication flow to use OAuth2

BREAKING CHANGE: The authentication system now requires OAuth2. 
Update login components to use the new authentication flow.
```

## 🔄 Workflow Summary

1. **Write code** following React best practices
2. **Commit changes** using conventional commit format
3. **Push to staging** for testing and prerelease
4. **Push to master** for production release
5. **Semantic-release automatically**:
   - Analyzes commits
   - Determines version bump
   - Generates changelog
   - Creates GitHub release
   - Builds and packages React application

This automated approach ensures consistent versioning and reduces manual release management overhead.