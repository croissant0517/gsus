/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
});

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['source.unsplash.com', 'images.pexels.com'],
  },
});

module.exports = nextConfig;
