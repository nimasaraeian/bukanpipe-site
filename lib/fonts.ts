import type { Locale } from "@/lib/i18n/config";

export const systemFontStack =
  'Tahoma, "Segoe UI", "Segoe UI Historic", "Noto Naskh Arabic", "Noto Sans Arabic", Arial, sans-serif';

export async function loadUiFont(locale: Locale) {
  if (locale === "fa") {
    return (await import("@/lib/fonts-fa")).estedad;
  }
  return (await import("@/lib/fonts-en")).vazirmatn;
}
