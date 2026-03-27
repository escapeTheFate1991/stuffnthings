/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dynamic app mode for Stripe/Clerk integration - no static export
  // output: 'export', // DISABLED for server-side features
  trailingSlash: true,
  // distDir: 'out', // DISABLED - use default .next for dynamic apps
  
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