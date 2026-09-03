import path from "node:path";
import type { NextConfig } from "next";
import { getNextLegacyRedirects } from "./lib/migration/redirects";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: {
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
  redirects: async () => getNextLegacyRedirects(),
};

export default nextConfig;

