#!/bin/bash

# Complete static build verification script
# Tests the entire build pipeline for GitHub Pages deployment

set -e

echo "🔍 Verifying static export configuration..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[✓]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[⚠]${NC} $1"; }
print_error() { echo -e "${RED}[✗]${NC} $1"; }

# Verification steps
print_status "Running complete build pipeline verification..."

# 1. Clean build
print_status "Step 1: Cleaning previous build..."
if [ -d "out" ]; then rm -rf out; fi
if [ -d ".next" ]; then rm -rf .next; fi
print_success "Build directories cleaned"

# 2. Static build
print_status "Step 2: Running static build..."
if npm run build:static > /dev/null 2>&1; then
    print_success "Static build completed"
else
    print_error "Static build failed"
    exit 1
fi

# 3. Post-build processing
print_status "Step 3: Processing build for hosting..."
if ./scripts/post-build-static.sh > /dev/null 2>&1; then
    print_success "Post-build processing completed"
else
    print_error "Post-build processing failed"
    exit 1
fi

# 4. File verification
print_status "Step 4: Verifying generated files..."

# Check core files
files_to_check=(
    "out/hosting/index.html"
    "out/hosting/.nojekyll"
    "out/hosting/sitemap.xml"
    "out/hosting/robots.txt"
    "out/hosting/courses.html"
    "out/hosting/courses/ai-automation-fundamentals.html"
    "out/hosting/courses/openclaw-framework.html"
    "out/hosting/learn/ai-automation-fundamentals/introduction/what-is-ai-automation.html"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        print_success "$file exists"
    else
        print_error "$file missing"
        exit 1
    fi
done

# 5. Content verification
print_status "Step 5: Verifying content..."

# Check index.html has required content
if grep -q "stuffnthings" "out/hosting/index.html"; then
    print_success "Index.html contains brand name"
else
    print_error "Index.html missing brand content"
    exit 1
fi

# Check for Next.js assets
if [ -d "out/hosting/_next" ]; then
    print_success "Next.js assets directory exists"
else
    print_error "Next.js assets missing"
    exit 1
fi

# 6. GitHub Pages optimization
print_status "Step 6: Verifying GitHub Pages optimization..."

# Check .nojekyll exists
if [ -f "out/hosting/.nojekyll" ]; then
    print_success ".nojekyll file present"
else
    print_warning ".nojekyll file missing"
fi

# 7. Build statistics
print_status "Step 7: Build statistics..."
if command -v du >/dev/null 2>&1; then
    size=$(du -sh out/hosting | cut -f1)
    print_success "Total build size: $size"
fi

file_count=$(find out/hosting -type f | wc -l)
print_success "Total files: $file_count"

html_count=$(find out/hosting -name "*.html" | wc -l)
print_success "HTML pages: $html_count"

js_count=$(find out/hosting -name "*.js" | wc -l)
print_success "JavaScript files: $js_count"

css_count=$(find out/hosting -name "*.css" | wc -l)
print_success "CSS files: $css_count"

echo ""
echo "🎉 Static export verification completed successfully!"
echo ""
echo "📋 Summary:"
echo "   ✅ Static build pipeline working"
echo "   ✅ All required files generated"
echo "   ✅ GitHub Pages optimized"
echo "   ✅ Next.js assets properly structured"
echo "   ✅ LMS routes accessible"
echo ""
echo "🚀 Ready for GitHub Pages deployment!"
echo "   Deploy with: git push origin main"
echo "   Or run the GitHub Actions workflow manually"

exit 0