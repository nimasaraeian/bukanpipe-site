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

export function getStubPermanentRedirects(): {
  source: string;
  destination: string;
  permanent: true;
}[] {
  return STUB_REDIRECTS.flatMap(({ from, to }) =>
    locales.map((locale) => ({
      source: `/${locale}${from}`,
      destination: `/${locale}${to}`,
      permanent: true as const,
    })),
  );
}
