# LT Frontend Build Configuration
APP_NAME=lt-frontend
VERSION?=1.0.0
BUILD_DIR=build
GO_CMD=go
GO_BUILD=$(GO_CMD) build
GO_CLEAN=$(GO_CMD) clean

# Build targets
.PHONY: all clean build-react build-go build-windows dev help

# Default target
all: build-windows

# Help target
help:
	@echo "Available targets:"
	@echo "  all           - Build everything (default)"
	@echo "  build-react   - Build React application"
	@echo "  build-go      - Build Go server (requires React build)"
	@echo "  build-windows - Build Windows executable"
	@echo "  dev           - Start development server"
	@echo "  clean         - Clean build artifacts"

# Build React application
build-react:
	@echo "🏗️  Building React application..."
	yarn build
	@echo "✅ React build completed"

# Build Go server (local platform)
build-go: build-react
	@echo "🔨 Building Go server..."
	APP_VERSION=$(VERSION) $(GO_BUILD) -o $(APP_NAME) server.go
	@echo "✅ Go server build completed: $(APP_NAME)"

# Build Windows executable
build-windows: build-react
	@echo "🪟 Building Windows executable..."
	GOOS=windows GOARCH=amd64 APP_VERSION=$(VERSION) $(GO_BUILD) \
		-ldflags="-s -w -X main.version=$(VERSION)" \
		-o $(APP_NAME)-windows.exe server.go
	@echo "✅ Windows executable completed: $(APP_NAME)-windows.exe"

# Development server
dev:
	@echo "🚀 Starting development server..."
	yarn start

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	$(GO_CLEAN)
	rm -rf $(BUILD_DIR)
	rm -f $(APP_NAME) $(APP_NAME)-*.exe
	@echo "✅ Clean completed"

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	yarn install
	@echo "✅ Dependencies installed"