/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/photo-**',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/url**',
      },
      {
        protocol: 'https',
        hostname: 'www.walmart.com',
        pathname: '/ip/**',
      },
      {
        protocol: 'https',
        hostname: 'i5.walmartimages.com',
        pathname: '/**',
      }
    ],
    domains: [
      'www.google.com',
      'www.walmart.com',
      'i5.walmartimages.com',
      'images.unsplash.com'
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: process.env.NODE_ENV === 'development'
  },
  experimental: {
    optimizeCss: true,
  }
};

module.exports = nextConfig;
