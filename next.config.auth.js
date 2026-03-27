/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server-side mode for Clerk authentication
  // Use this config when authentication is needed
  trailingSlash: true,
  
  // Image optimization 
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts'
  },
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Environment variables for Clerk
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
}

module.exports = nextConfig