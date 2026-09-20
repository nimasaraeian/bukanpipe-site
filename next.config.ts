import path from "node:path";
import type { NextConfig } from "next";
import { getNextLegacyRedirects } from "./lib/migration/redirects";
import { getStubPermanentRedirects } from "./lib/seo/stub-redirects";
import { securityHeaders } from "./lib/config/security-headers";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  // Next's own trailing-slash redirect runs before middleware, so every
  // WordPress-era `/path/` URL cost two hops: 308 to `/path`, then 308 to the
  // locale/legacy destination. Middleware strips the slash as part of the hop
  // it was already issuing (see middleware.ts), so those URLs now resolve in
  // one permanent redirect.
  skipTrailingSlashRedirect: true,
  productionBrowserSourceMaps: false,
  headers: securityHeaders(),
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 82, 90],
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
  // Every entry here is `permanent: true` (308) by construction — both helpers
  // return that in their types. Legacy path redirects stay empty unless
  // ENABLE_LEGACY_REDIRECTS=true; they run in middleware instead, because this
  // layer never sees a bare legacy path once locale routing has happened.
  // www/HTTP host policy lives in vercel.json, which runs ahead of this.
  redirects: async () => [...getStubPermanentRedirects(), ...getNextLegacyRedirects()],
};

export default nextConfig;

