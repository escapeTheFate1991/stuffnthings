# Static Export Configuration

This document describes the static export configuration for GitHub Pages deployment.

## Overview

The project is configured for static export using Next.js static generation, optimized for deployment to GitHub Pages and other static hosting platforms.

## Build Commands

### Development
```bash
npm run dev          # Development server with hot reload
```

### Production Builds
```bash
npm run build        # Standard Next.js build
npm run build:static # Static export build (optimized)
npm run build:github # GitHub Pages specific build
```

### Verification
```bash
npm run verify:static  # Complete build verification
npm run verify:quick   # Quick verification
npm run serve:static   # Test locally on localhost:3000
```

## Static Export Features

### ✅ Configuration
- **next.config.js**: Optimized for static export with GitHub Pages support
- **TypeScript**: Configured with Next.js 15 async params
- **Image Optimization**: Custom loader for static hosting compatibility
- **Build Optimization**: Production-ready with compiler optimizations

### ✅ GitHub Pages Optimization
- **.nojekyll**: Prevents Jekyll processing
- **Asset Paths**: Configured for subdirectory deployment
- **Routing**: Client-side routing for SPA behavior
- **SEO**: Sitemap and robots.txt generation

### ✅ LMS Components
- **Static Routes**: All course and lesson pages pre-generated
- **Dynamic Content**: Client-side rendering for user interactions
- **Authentication**: Clerk.js configured for static hosting
- **Database**: Supabase connections work in static mode

## File Structure

```
out/hosting/                    # Final static build output
├── index.html                  # Home page
├── .nojekyll                   # GitHub Pages optimization
├── sitemap.xml                 # SEO sitemap
├── robots.txt                  # Search engine directives
├── courses/                    # Course listing pages
│   ├── ai-automation-fundamentals.html
│   └── openclaw-framework.html
├── learn/                      # Learning interface pages
│   ├── ai-automation-fundamentals/
│   └── openclaw-framework/
└── _next/                      # Next.js assets
    └── static/
```

## Scripts

### Build Scripts
- **build-static.sh**: Main static build automation
- **post-build-static.sh**: Restructures Next.js output for hosting
- **verify-static-build.sh**: Complete build verification

### GitHub Actions
- **deploy-github-pages.yml**: Automated deployment workflow

## Static Compatibility

### ✅ Compatible Features
- Static page generation (SSG)
- Client-side routing
- API routes (when pre-built or client-side)
- Authentication (Clerk.js)
- Database connections (Supabase)
- Image optimization (custom loader)

### ⚠️ Limitations
- No server-side rendering (SSR)
- No API routes at runtime
- No dynamic imports requiring server
- Headers configuration disabled (Next.js limitation)

## Deployment

### GitHub Pages
1. Push to main branch
2. GitHub Actions automatically builds and deploys
3. Available at: `https://username.github.io/stuffnthings`

### Manual Deployment
```bash
npm run build:static
./scripts/post-build-static.sh
# Upload contents of out/hosting/ to your static host
```

### Local Testing
```bash
npm run serve:static
# Visit http://localhost:3000
```

## Performance Optimizations

- **Bundle Size**: Optimized with Next.js compiler
- **Asset Optimization**: Static assets with proper caching headers
- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Custom loader for static hosting
- **CSS Optimization**: Minified and optimized

## Verification Checklist

Before deployment, verify:

```bash
npm run verify:static
```

This checks:
- ✅ Build completes without errors
- ✅ All HTML pages generated
- ✅ Static assets properly linked
- ✅ GitHub Pages optimizations applied
- ✅ Core routes accessible
- ✅ LMS components functional

## Troubleshooting

### Build Failures
1. Check TypeScript errors: async params must be awaited
2. Verify all imports are static-compatible
3. Check for server-side only code in client components

### Missing Routes
1. Ensure generateStaticParams is implemented
2. Check dynamic route structures match file paths
3. Verify course data is available at build time

### Asset Loading Issues
1. Check image loader configuration
2. Verify static asset paths
3. Ensure .nojekyll file is present for GitHub Pages

## Next.js 15 Compatibility

This setup is fully compatible with Next.js 15's new features:
- Async params and searchParams
- App router with static export
- TypeScript 5+ support
- React 18+ features in static mode