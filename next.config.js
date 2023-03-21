const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  images: {
    deviceSizes: [360],
    domains: [
      "dev-dosuri-image.dosuri.site",
      "dev-dosuri-image-resized.dosuri.site",
      "dosuri-image-resized.dosuri.site",
      "dosuri-image.dosuri.site",
      "dosuri-image.s3.amazonaws.com",
      "dosuri-images.s3.ap-northeast-2.amazonaws.com",
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

const sentryWebpackPluginOptions = {};

let config = {};

// process.env.NODE_ENV === "production"
//   ? (config = withSentryConfig(nextConfig, sentryWebpackPluginOptions))
//   : (config = nextConfig);
config = nextConfig;
module.exports = config;
