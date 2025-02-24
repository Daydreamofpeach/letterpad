// const withTM = require("next-transpile-modules")(["ui"]);
const basePath = "/";
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  productionBrowserSourceMaps: false,
  env: {
    ROOT: __dirname,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_BASE_PATH: process.env.BASE_PATH,
    NEXT_PUBLIC_ROOT_URL: process.env.ROOT_URL,
    NEXT_PUBLIC_LETTERPAD_PLATFORM: process.env.LETTERPAD_PLATFORM == "true",
  },
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    serverActions: true,
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: "graphql-let/loader" }],
    });

    config.module.rules.push({
      test: /\.graphqls$/,
      exclude: /node_modules/,
      use: ["graphql-let/schema/loader"],
    });

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: "json",
      use: "yaml-loader",
    });

    config.module.rules.push({
      test: /\.graphqls$/,
      exclude: /node_modules/,
      use: ["webpack-graphql-loader"],
    });

    return config;
  },
};

module.exports = nextConfig;
