import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
    ],
    // Optimize image formats
    formats: ['image/webp', 'image/avif'],
  },
  // Enable React strict mode for better development practices
  reactStrictMode: true,
  // Optimize static files compression  
  compress: true,
  // Enable SWC minifier for faster builds
  swcMinify: true,
  // Experimental optimizations
  experimental: {
    // Enable optimizeCss for production
    optimizeCss: true,
    // Improve client-side cache
    optimisticClientCache: true,
  },
};

export default nextConfig;
