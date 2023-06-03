/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['source.unsplash.com', 'images.pexels.com'],
  },
};

module.exports =
  process.env.NODE_ENV === 'development' ? nextConfig : withPWA(nextConfig);
