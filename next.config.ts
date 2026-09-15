import path from "node:path";
import type { NextConfig } from "next";
import { getNextLegacyRedirects } from "./lib/migration/redirects";
import { getStubPermanentRedirects } from "./lib/seo/stub-redirects";
import { securityHeaders } from "./lib/config/security-headers";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  productionBrowserSourceMaps: false,
  headers: securityHeaders(),
  images: {
    formats: ["image/webp"],
    qualities: [75, 82],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [256, 384, 512, 640],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bukanpipe.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "bukanpipe.ir",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  agentRules: false,
  // Legacy path redirects stay empty unless ENABLE_LEGACY_REDIRECTS=true.
  // Host/www/HTTP policy is not implemented here. Do not enable yet.
  redirects: async () => [...getStubPermanentRedirects(), ...getNextLegacyRedirects()],
};

export default nextConfig;

