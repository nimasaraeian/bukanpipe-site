/**
 * Catalog slug routes are fully enumerated via generateStaticParams.
 * Unknown slugs must return a real HTTP 404 (not a soft 404 UI with 200).
 */
export const catalogDynamicParams = false;
