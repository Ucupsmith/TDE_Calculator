import type { NextConfig } from "next";

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

export default nextConfig;
