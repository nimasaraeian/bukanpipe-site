import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "@/lib/i18n/config";
import { localeForUnprefixedPath } from "@/lib/i18n/apex-locale";
import { goneResponseInit } from "@/lib/migration/gone";
import { resolveLegacyRequest } from "@/lib/migration/legacy-resolver";

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
function permanentRedirect(
  request: NextRequest,
  pathname: string,
  { preserveQuery = true }: { preserveQuery?: boolean } = {},
): NextResponse {
  const search = preserveQuery ? request.nextUrl.search : "";
  const redirectUrl = new URL(`${pathname}${search}`, request.url);
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
 * WordPress-era prefixes that were never content. They are not in the redirect
 * map and must not be absorbed by the locale hop: prefixing `/wp-admin` with a
 * locale spends a 308 to reach the same 404, and briefly makes a fake
 * `/fa/wp-admin` URL look real to a crawler.
 */
const PASSTHROUGH_PREFIXES = ["/wp-admin", "/wp-includes", "/wp-content", "/wp-json"];

/**
 * A path that addresses a file is answered by the static layer or 404s there.
 * Either way it keeps its own status instead of being redirected.
 */
function isPassthroughPath(pathname: string): boolean {
  if (PASSTHROUGH_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return true;
  }
  const lastSegment = pathname.split("/").pop() ?? "";
  return /\.[a-z0-9]+$/i.test(lastSegment);
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
  // Resolved before the canonical-host hop so a spam or deleted URL is
  // answered where it arrives, instead of being rewritten into a real one on
  // its way to a 410.
  const earlyOutcome = resolveLegacyRequest(
    request.nextUrl.pathname,
    request.nextUrl.searchParams,
  );
  if (earlyOutcome?.kind === "gone") {
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

  // The map is consulted before locale routing, because many historical URLs
  // are themselves locale-prefixed (`/fa/qc/tech/...`, `/en/contact-us`,
  // `/ar/news`). Deferring to the locale branch would hand those straight to a
  // 404 that looks like a live page.
  const legacyOutcome = resolveLegacyRequest(
    normalizedPathname,
    request.nextUrl.searchParams,
  );
  if (legacyOutcome?.kind === "gone") {
    return goneResponse();
  }
  if (legacyOutcome?.kind === "redirect") {
    return permanentRedirect(request, legacyOutcome.destination, {
      preserveQuery: legacyOutcome.preserveQuery,
    });
  }

  const firstSegment = normalizedPathname.split("/").filter(Boolean)[0];
  if (firstSegment && isLocale(firstSegment)) {
    if (normalizedPathname === pathname) {
      return NextResponse.next();
    }
    return permanentRedirect(request, normalizedPathname);
  }

  // After the map, because plenty of mapped rows address a file
  // (`/about.htm`, `/index.php`, `/sitemap.html`). Before the locale hop, so
  // everything left keeps its own status instead of spending a 308 to reach
  // the same 404.
  if (isPassthroughPath(normalizedPathname)) {
    return NextResponse.next();
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
