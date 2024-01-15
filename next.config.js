/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');

const appEnv = process.env.APP_ENV || 'dev';
const version = process.env.VERSION || '0.1.0';

const API_MAIN_GW = {
  dev: 'https://asl.softek.com.vn',
  staging: 'https://asl.softek.com.vn',
  production: 'https://asl.softek.com.vn',
};

const WSS_URL_CHECK_USER = {
  dev: 'wss://asl.softek.com.vn/check-user-real-time',
  staging: 'wss://asl.softek.com.vn/check-user-real-time',
  production: 'wss://asl.softek.com.vn/check-user-real-time',
};

const WSS_URL_NOTIFICATION = {
  dev: 'wss://asl.softek.com.vn/check-notifcation',
  staging: 'wss://asl.softek.com.vn/check-notifcation',
  production: 'wss://asl.softek.com.vn/check-notifcation',
};

const env = {
  VERSION: version,
  APP_ENV: appEnv,
  API_MAIN_GW: API_MAIN_GW[appEnv],
  WSS_URL_CHECK_USER: WSS_URL_CHECK_USER[appEnv],
  WSS_URL_NOTIFICATION: WSS_URL_NOTIFICATION[appEnv],
};

const nextConfig = {
  reactStrictMode: false,
  i18n,
  env,
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [{ name: 'removeViewBox', active: false }],
            },
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
