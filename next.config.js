const withOffline = require('next-offline');
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig = {
  poweredByHeader: false,
  webpack: (config, { defaultLoaders, isServer }) => {
    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser';
      config.node = {
        fs: 'empty',
      };
    }
    return config;
  },
};

module.exports = withPlugins([[withImages], [withBundleAnalyzer], [withOffline]], nextConfig);
