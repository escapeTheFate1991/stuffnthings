#!/bin/bash

# Post-build script to restructure Next.js 15 static export for hosting
# Moves HTML files from out/server/app/ to proper hosting structure

set -e

echo "🔧 Restructuring static export for hosting..."

OUT_DIR="/home/eddy/Development/stuffnthings/out"
APP_DIR="$OUT_DIR/server/app"

# Check if the export was successful
if [ ! -d "$APP_DIR" ]; then
    echo "❌ Error: Static export not found at $APP_DIR"
    exit 1
fi

# Create hosting directory structure
mkdir -p "$OUT_DIR/hosting"

# Copy static assets
if [ -d "$OUT_DIR/static" ]; then
    mkdir -p "$OUT_DIR/hosting/_next"
    cp -r "$OUT_DIR/static" "$OUT_DIR/hosting/_next/static"
fi

# Copy HTML files and create proper routing structure
cd "$APP_DIR"

# Copy index.html to root
if [ -f "index.html" ]; then
    cp "index.html" "$OUT_DIR/hosting/"
    echo "✅ Root index.html copied"
fi

# Copy all other HTML files maintaining structure
find . -name "*.html" -not -name "index.html" | while read -r file; do
    # Remove leading ./
    file=${file#./}
    
    # Create directory structure
    dir=$(dirname "$file")
    if [ "$dir" != "." ]; then
        mkdir -p "$OUT_DIR/hosting/$dir"
    fi
    
    # Copy the HTML file
    cp "$file" "$OUT_DIR/hosting/$file"
    echo "📄 Copied: $file"
done

# Copy public assets
if [ -d "/home/eddy/Development/stuffnthings/public" ]; then
    cp -r /home/eddy/Development/stuffnthings/public/* "$OUT_DIR/hosting/" 2>/dev/null || true
    echo "✅ Public assets copied"
fi

# Copy sitemap and robots
if [ -f "$OUT_DIR/sitemap.xml" ]; then
    cp "$OUT_DIR/sitemap.xml" "$OUT_DIR/hosting/"
fi

# Ensure .nojekyll exists for GitHub Pages
touch "$OUT_DIR/hosting/.nojekyll"

echo "🎉 Static hosting structure created at $OUT_DIR/hosting"

# Show summary
echo ""
echo "📊 Hosting Structure:"
cd "$OUT_DIR/hosting"
find . -name "*.html" | wc -l | xargs echo "   HTML files:"
find . -name "*.js" | wc -l | xargs echo "   JS files:"
find . -name "*.css" | wc -l | xargs echo "   CSS files:"
du -sh . | cut -f1 | xargs echo "   Total size:"

echo ""
echo "✅ Ready for deployment to static hosting!"