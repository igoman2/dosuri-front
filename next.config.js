const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: ["dosuri-images.s3.ap-northeast-2.amazonaws.com"],
  },

  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://server.dosuri.site/:path*" + "/",
      },
    ];
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

process.env.NODE_ENV === "production"
  ? (config = withSentryConfig(nextConfig, sentryWebpackPluginOptions))
  : (config = nextConfig);
module.exports = config;
