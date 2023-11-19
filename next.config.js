/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.resolve(__dirname);

    return config;
  },
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;