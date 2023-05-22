/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');
// import { i18n } from './next-i18next.config';

const nextConfig = {
  reactStrictMode: false,
  i18n,
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
