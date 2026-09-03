import localFont from "next/font/local";
import { Vazirmatn } from "next/font/google";

/**
 * Estedad (SIL OFL) — self-hosted variable font for Persian (fa).
 * Source: https://github.com/google/fonts/tree/main/ofl/estedad
 */
export const estedad = localFont({
  src: "../app/fonts/Estedad-Variable.ttf",
  display: "swap",
  variable: "--font-ui",
  weight: "100 900",
});

/** English UI face until licensed brand files arrive. */
export const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
  adjustFontFallback: true,
  variable: "--font-ui",
});

export const uiFontByLocale = {
  fa: estedad,
  en: vazirmatn,
} as const;

export const systemFontStack =
  'Tahoma, "Segoe UI", "Segoe UI Historic", "Noto Naskh Arabic", "Noto Sans Arabic", Arial, sans-serif';
