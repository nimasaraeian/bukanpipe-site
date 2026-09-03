import type { Locale } from "@/lib/i18n/config";

export const LOCALE_COOKIE = "NEXT_LOCALE";

export function setLocaleCookie(locale: Locale) {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}
