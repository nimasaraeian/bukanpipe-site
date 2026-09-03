import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

export function stripLocale(pathname: string): { locale: Locale; pathname: string } {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && segments[0] && isLocale(segments[0])) {
    const locale = segments[0];
    const rest = segments.slice(1);
    return {
      locale,
      pathname: rest.length ? `/${rest.join("/")}` : "/",
    };
  }

  return { locale: defaultLocale, pathname: pathname || "/" };
}

export function withLocale(path: string, locale: Locale): string {
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

export function switchLocalePath(currentPath: string, targetLocale: Locale): string {
  const { pathname: barePath } = stripLocale(currentPath);
  return withLocale(barePath, targetLocale);
}
