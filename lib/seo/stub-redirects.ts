import { locales } from "../i18n/config";

/**
 * Confirmed indexable stub routes. Destinations are the live canonical hubs
 * already used by the stub pages — do not add uncertain legacy WP paths here.
 */
export const STUB_REDIRECTS = [
  { from: "/engineering", to: "/technical-center" },
  { from: "/knowledge", to: "/technical-center" },
  { from: "/tools", to: "/calculator" },
  { from: "/standards", to: "/downloads" },
] as const;

/**
 * Both slash forms are emitted for every stub. `next.config` redirects are
 * matched before middleware, and middleware is what normalizes trailing
 * slashes now (`skipTrailingSlashRedirect`), so without the `/` variant a
 * request for `/fa/engineering/` would spend one hop losing the slash before
 * it could reach the rule below.
 */
export function getStubPermanentRedirects(): {
  source: string;
  destination: string;
  permanent: true;
}[] {
  return STUB_REDIRECTS.flatMap(({ from, to }) =>
    locales.flatMap((locale) =>
      [`/${locale}${from}`, `/${locale}${from}/`].map((source) => ({
        source,
        destination: `/${locale}${to}`,
        permanent: true as const,
      })),
    ),
  );
}
