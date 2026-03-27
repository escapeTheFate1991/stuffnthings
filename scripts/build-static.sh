#!/bin/bash

# Build Static Export Script for GitHub Pages
# Optimized for production deployment

set -e  # Exit on error

echo "🚀 Starting static export build..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "next.config.js" ]; then
    print_error "next.config.js not found. Please run this script from the project root."
    exit 1
fi

# Clean previous build
print_status "Cleaning previous build artifacts..."
if [ -d "out" ]; then
    rm -rf out
    print_success "Cleaned out directory"
fi

if [ -d ".next" ]; then
    rm -rf .next
    print_success "Cleaned .next directory"
fi

# Install dependencies if node_modules is missing
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
    print_success "Dependencies installed"
fi

# Run type checking
print_status "Running type check..."
if npm run lint > /dev/null 2>&1; then
    print_success "Type check passed"
else
    print_warning "Type check failed, continuing with build..."
fi

# Build for production
print_status "Building for production..."
export NODE_ENV=production

# For GitHub Pages, set the GitHub Pages flag
if [ "$1" = "github" ]; then
    print_status "Building for GitHub Pages deployment..."
    export GITHUB_PAGES=true
    npm run build:github
else
    npm run build:static
fi

# Verify build output
if [ ! -d "out" ]; then
    print_error "Build failed - no output directory generated"
    exit 1
fi

if [ ! -f "out/index.html" ]; then
    print_error "Build failed - no index.html generated"
    exit 1
fi

# Check for required files
print_status "Verifying build output..."

# Check sitemap
if [ -f "out/sitemap.xml" ]; then
    print_success "Sitemap generated"
else
    print_warning "Sitemap not found"
fi

# Check robots.txt
if [ -f "out/robots.txt" ]; then
    print_success "Robots.txt found"
else
    print_warning "Robots.txt not found"
fi

# Check for .nojekyll (GitHub Pages optimization)
if [ -f "out/.nojekyll" ]; then
    print_success "GitHub Pages optimization (.nojekyll) found"
else
    print_warning ".nojekyll file not found"
fi

# Count generated files
file_count=$(find out -type f | wc -l)
dir_count=$(find out -type d | wc -l)

print_success "Build completed successfully!"
echo ""
echo "📊 Build Statistics:"
echo "   Files generated: $file_count"
echo "   Directories: $dir_count"
echo "   Output location: $(pwd)/out"

# Calculate build size
if command -v du >/dev/null 2>&1; then
    build_size=$(du -sh out | cut -f1)
    echo "   Total size: $build_size"
fi

echo ""
echo "✅ Static export ready for deployment!"

# Optional: Start local server for testing
if [ "$2" = "serve" ]; then
    print_status "Starting local server for testing..."
    echo "   Server will be available at http://localhost:3000"
    echo "   Press Ctrl+C to stop"
    npm run serve:static
fi

exit 0