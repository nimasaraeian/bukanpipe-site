import type { Locale } from "@/lib/i18n/config";

/*
 * The UI fonts are served from /public rather than through next/font.
 *
 * next/font can preload, but only for every font module the route can reach —
 * and one [locale] layout serves both languages, so turning preload on sent
 * every reader both fonts, a quarter of a megabyte to use half of. Left off,
 * the font was discovered late and swapped in after first paint, which moved
 * every line of text on the page.
 *
 * Serving them ourselves means each page can preload exactly the one font it
 * uses, named in the document head, fetched alongside the stylesheet, and in
 * place before the first paint. The filenames carry a hash of their contents,
 * so they are cached immutably (see security-headers).
 */
export type UiFont = {
  /** The @font-face family declared in globals.css. */
  family: string;
  /** Hashed path under /public/fonts. */
  href: string;
};

const UI_FONTS: Record<Locale, UiFont> = {
  fa: { family: "Estedad", href: "/fonts/estedad-variable.eb38f569.woff2" },
  en: { family: "Vazirmatn", href: "/fonts/vazirmatn-variable.8addd9db.woff2" },
};

export const systemFontStack =
  'Tahoma, "Segoe UI", "Segoe UI Historic", "Noto Naskh Arabic", "Noto Sans Arabic", Arial, sans-serif';

export function uiFont(locale: Locale): UiFont {
  return UI_FONTS[locale];
}
