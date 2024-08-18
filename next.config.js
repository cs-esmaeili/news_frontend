/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'back.thewiscosintimes.com',
      },
      {
        protocol: 'http',
        hostname: 'back.thewiscosintimes.com',
      },
      {
        protocol: 'https',
        hostname: 'www.back.thewiscosintimes.com',
      },
      {
        protocol: 'http',
        hostname: 'www.back.thewiscosintimes.com',
      }
    ],
  },
};

module.exports = nextConfig;
