import { Vazirmatn } from "next/font/google";

/**
 * Vazirmatn (SIL OFL) is loaded through next/font and self-hosted at build.
 * No font binaries are committed. Licensed brand files still replace this
 * via next/font/local when approved (ADR-013 / ADR-026).
 */
export const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-vazirmatn",
});

export const systemFontStack =
  'Tahoma, "Segoe UI", "Segoe UI Historic", "Noto Naskh Arabic", "Noto Sans Arabic", Arial, sans-serif';
