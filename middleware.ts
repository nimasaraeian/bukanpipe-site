import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { resolveLegacyRedirect } from "@/lib/migration/redirects";

const LOCALE_COOKIE = "NEXT_LOCALE";
const CANONICAL_HOST = "bukanpipe.com";

function resolveCanonicalHostRedirect(request: NextRequest): NextResponse | null {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (host !== `www.${CANONICAL_HOST}`) {
    return null;
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.protocol = "https:";
  redirectUrl.hostname = CANONICAL_HOST;
  return NextResponse.redirect(redirectUrl, 308);
}

export function middleware(request: NextRequest) {
  const canonicalHostRedirect = resolveCanonicalHostRedirect(request);
  if (canonicalHostRedirect) {
    return canonicalHostRedirect;
  }

  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/icon.svg" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/media/")
  ) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split("/").filter(Boolean)[0];
  if (firstSegment && isLocale(firstSegment)) {
    return NextResponse.next();
  }

  const legacyDestination = resolveLegacyRedirect(pathname);
  if (legacyDestination) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = legacyDestination;
    return NextResponse.redirect(redirectUrl, 308);
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = cookieLocale && isLocale(cookieLocale) ? cookieLocale : defaultLocale;
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!_next|api|icon\\.svg|robots\\.txt|sitemap\\.xml|media).*)"],
};
