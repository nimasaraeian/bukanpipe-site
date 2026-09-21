import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "@/lib/i18n/config";
import { localeForUnprefixedPath } from "@/lib/i18n/apex-locale";
import { resolveLegacyRedirect } from "@/lib/migration/redirects";
import { goneResponseInit, hasSpamQueryParam } from "@/lib/migration/gone";

const LOCALE_COOKIE = "NEXT_LOCALE";
const CANONICAL_HOST = "bukanpipe.com";

/**
 * Every redirect this file issues is permanent. `NextResponse.redirect()`
 * defaults to 307, which does not consolidate ranking signals onto the
 * destination, so the status is always passed explicitly.
 */
const PERMANENT = 308;

const STATIC_SEO_ASSETS = new Set([
  "/icon.svg",
  "/icon.png",
  "/favicon.ico",
  "/favicon.svg",
  "/apple-touch-icon.png",
  "/apple-touch-icon-precomposed.png",
  "/bukan-pipe-icon-gray.png",
  "/bukan-pipe-icon.png",
  "/icon-48.png",
  "/icon-96.png",
  "/icon-192.png",
  "/icon-512.png",
  "/robots.txt",
  "/sitemap.xml",
]);

/**
 * Built from `request.url` rather than `nextUrl.clone()` on purpose: a cloned
 * `NextURL` re-applies the trailing slash of the incoming request when it is
 * serialized, which would send `/contact-us/` to `/fa/contact/` and loop.
 */
function permanentRedirect(request: NextRequest, pathname: string): NextResponse {
  const redirectUrl = new URL(`${pathname}${request.nextUrl.search}`, request.url);
  return NextResponse.redirect(redirectUrl, PERMANENT);
}

function goneResponse(): NextResponse {
  const { status, headers, body } = goneResponseInit();
  return new NextResponse(body, { status, headers });
}

function resolveCanonicalHostRedirect(request: NextRequest): NextResponse | null {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (host !== `www.${CANONICAL_HOST}`) {
    return null;
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.protocol = "https:";
  redirectUrl.hostname = CANONICAL_HOST;
  return NextResponse.redirect(redirectUrl, PERMANENT);
}

/**
 * `trailingSlash: false` is enforced here rather than by Next, because
 * `skipTrailingSlashRedirect` is set in next.config.ts. See the comment there.
 */
function stripTrailingSlash(pathname: string): string {
  const stripped = pathname.replace(/\/+$/, "");
  return stripped === "" ? "/" : stripped;
}

export function middleware(request: NextRequest) {
  // Checked before every redirect, including the canonical-host hop: a spam
  // URL must not be rewritten into a real one on its way to being answered.
  if (hasSpamQueryParam(request.nextUrl.searchParams)) {
    return goneResponse();
  }

  const canonicalHostRedirect = resolveCanonicalHostRedirect(request);
  if (canonicalHostRedirect) {
    return canonicalHostRedirect;
  }

  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    STATIC_SEO_ASSETS.has(pathname) ||
    pathname.startsWith("/media/")
  ) {
    return NextResponse.next();
  }

  // The WordPress permalinks were all trailing-slash, and Next's own slash
  // normalization runs before middleware: `/contact-us/` used to spend one hop
  // reaching `/contact-us` and a second reaching `/fa/contact`. With that
  // normalization disabled, the slash is folded into the hop this function was
  // already issuing, so the legacy URL resolves in a single 308.
  const normalizedPathname = stripTrailingSlash(pathname);

  const firstSegment = normalizedPathname.split("/").filter(Boolean)[0];
  if (firstSegment && isLocale(firstSegment)) {
    if (normalizedPathname === pathname) {
      return NextResponse.next();
    }
    return permanentRedirect(request, normalizedPathname);
  }

  const legacyDestination = resolveLegacyRedirect(normalizedPathname);
  if (legacyDestination) {
    return permanentRedirect(request, legacyDestination);
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = localeForUnprefixedPath(normalizedPathname, cookieLocale);
  const destination =
    normalizedPathname === "/" ? `/${locale}` : `/${locale}${normalizedPathname}`;

  const response = permanentRedirect(request, destination);
  // This is the one hop whose target depends on NEXT_LOCALE. Crawlers still see
  // 308 (cookie-less, so always the x-default locale), but browsers must not
  // replay a cached copy after the visitor switches language.
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = {
  matcher: [
    "/((?!_next|api|icon\\.svg|icon\\.png|favicon\\.ico|favicon\\.svg|apple-touch-icon\\.png|apple-touch-icon-precomposed\\.png|bukan-pipe-icon-gray\\.png|bukan-pipe-icon\\.png|icon-48\\.png|icon-96\\.png|icon-192\\.png|icon-512\\.png|robots\\.txt|sitemap\\.xml|media).*)",
  ],
};
