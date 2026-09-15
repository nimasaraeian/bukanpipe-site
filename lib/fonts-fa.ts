import localFont from "next/font/local";

/** Estedad (SIL OFL) — Persian UI. Import only from the FA locale layout. */
export const estedad = localFont({
  src: "../app/fonts/Estedad-Variable.woff2",
  display: "swap",
  variable: "--font-ui",
  weight: "100 900",
  // Shared [locale] layout traces both font modules; automatic preload is not locale-safe.
  preload: false,
  adjustFontFallback: "Arial",
});
