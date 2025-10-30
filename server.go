package main

import (
	"embed"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

//go:embed build
var buildFS embed.FS

func main() {
	// Get port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "80"
	}

	// Create a sub-filesystem for the build directory
	buildSubFS, err := fs.Sub(buildFS, "build")
	if err != nil {
		log.Fatal("Failed to create build sub-filesystem:", err)
	}

	// Create file server with SPA fallback
	fileServer := http.FileServer(http.FS(buildSubFS))
	
	// Setup routes
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Add security headers
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("X-Frame-Options", "DENY")
		w.Header().Set("X-XSS-Protection", "1; mode=block")
		
		// Handle static assets
		path := strings.TrimPrefix(r.URL.Path, "/")
		if path == "" {
			path = "index.html"
		}

		// Check if file exists
		if _, err := fs.Stat(buildSubFS, path); err == nil {
			// File exists, serve it
			fileServer.ServeHTTP(w, r)
			return
		}

		// Check if it's an API route or file with extension
		if strings.HasPrefix(path, "api/") || strings.Contains(path, ".") {
			// Return 404 for API routes and files that don't exist
			http.NotFound(w, r)
			return
		}

		// SPA fallback - serve index.html for all other routes
		r.URL.Path = "/"
		fileServer.ServeHTTP(w, r)
	})

	// Health check endpoint
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, `{"status":"healthy","timestamp":"%s","version":"%s"}`, 
			time.Now().UTC().Format(time.RFC3339), 
			getVersion())
	})

	// Start server
	addr := ":" + port
	log.Printf("🚀 LT Frontend Server starting on http://localhost%s", addr)
	log.Printf("📱 React App: Lumières et Technologie - Industrial Control System")
	log.Printf("🔧 Version: %s", getVersion())
	log.Printf("⚡ Health Check: http://localhost%s/health", addr)
	
	if err := http.ListenAndServe(addr, nil); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}

func getVersion() string {
	version := os.Getenv("APP_VERSION")
	if version == "" {
		version = "1.0.0"
	}
	return version
}