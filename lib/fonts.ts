import localFont from "next/font/local";

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

/**
 * Vazirmatn (SIL OFL) — self-hosted variable font for English UI until brand files arrive.
 * Source: https://github.com/google/fonts/tree/main/ofl/vazirmatn
 */
export const vazirmatn = localFont({
  src: "../app/fonts/Vazirmatn-Variable.ttf",
  display: "swap",
  variable: "--font-ui",
  weight: "100 900",
});

export const uiFontByLocale = {
  fa: estedad,
  en: vazirmatn,
} as const;

export const systemFontStack =
  'Tahoma, "Segoe UI", "Segoe UI Historic", "Noto Naskh Arabic", "Noto Sans Arabic", Arial, sans-serif';
