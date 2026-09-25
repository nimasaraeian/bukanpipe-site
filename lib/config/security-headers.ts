import type { NextConfig } from "next";

/** Conservative production security headers — no CSP until asset origins are fully enumerated. */
export function securityHeaders(): NextConfig["headers"] {
  return async () => [
    {
      /* The font filenames carry a hash of their contents, so a given URL can
         never change and the browser need never revalidate it. */
      source: "/fonts/:file*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/(.*)",
      headers: [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=(), payment=()",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
      ],
    },
  ];
}
