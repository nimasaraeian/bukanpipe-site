export const locales = ["en", "fa"] as const;

export type Locale = (typeof locales)[number];

export type Direction = "ltr" | "rtl";

export const defaultLocale: Locale = "en";

export const localeDirection: Record<Locale, Direction> = {
  en: "ltr",
  fa: "rtl",
};

export const localeLabel: Record<Locale, string> = {
  en: "EN",
  fa: "FA",
};

export const openGraphLocale: Record<Locale, string> = {
  en: "en_US",
  fa: "fa_IR",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDirection(locale: Locale): Direction {
  return localeDirection[locale];
}
