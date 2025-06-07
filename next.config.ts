import type { NextConfig } from "next";
import withPWA from 'next-pwa';

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
  },
};

const withPWAConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: !isProduction,
  // Optional: Add this if you have a custom service worker source
  // swSrc: 'path/to/your/custom/service-worker.js',
})(nextConfig);

export default withPWAConfig;
