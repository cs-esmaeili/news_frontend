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
        hostname: 'thewiscosintimes.com',
      },
      {
        protocol: 'http',
        hostname: 'thewiscosintimes.com',
      }
    ],
  },
};

module.exports = nextConfig;
