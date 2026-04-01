/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages deployment
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  
  // GitHub Pages optimization (only when static export is enabled)
  // assetPrefix: process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES ? '/stuffnthings' : '',
  // basePath: process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES ? '/stuffnthings' : '',
  
  // Image optimization - keep unoptimized for compatibility
  images: {
    unoptimized: true,
  },
  
  // Performance optimizations
  experimental: {
    optimizeCss: false,
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig