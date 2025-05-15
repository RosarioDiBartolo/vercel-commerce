  

/** @type {import('next').NextConfig} */
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'medusa-public-images.s3.eu-west-1.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "link-hover-lndev.vercel.app",
                pathname: '/**',

      },
      {
        protocol: 'https',
        hostname: 'medusa-server-testing.s3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: process.env.NEXT_BACKEND_PROTOCOL || 'http',
        hostname:  'localhost',
        pathname: '/**',
      },
    ],
  },
};