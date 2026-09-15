import localFont from "next/font/local";

/** Vazirmatn (SIL OFL) — English UI. Import only from the EN locale layout. */
export const vazirmatn = localFont({
  src: "../app/fonts/Vazirmatn-Variable.woff2",
  display: "swap",
  variable: "--font-ui",
  weight: "100 900",
  preload: false,
  adjustFontFallback: "Arial",
});
