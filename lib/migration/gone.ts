/**
 * 410 Gone policy.
 *
 * Two kinds of legacy URL must never resolve and never be redirected:
 * pages that were deleted with no successor, and URLs that only ever existed
 * because a spam campaign sprayed them across the site. Both are answered
 * 410 so crawlers drop them, instead of 308-ing into the locale tree where
 * they would land on a real page and keep the URL alive.
 */

/**
 * Query parameters that only appear on injected spam URLs. They are matched
 * on any path, because the campaign appended them to arbitrary paths rather
 * than to one legacy route.
 *
 * Matched with the exact casing observed in the logs: widening this to a
 * case-insensitive match would also catch an ordinary `male` form field.
 */
export const SPAM_QUERY_PARAMS = ["LOSS", "Male"] as const;

export const GONE_STATUS = 410;

/** Minimal body — a 410 should give a crawler nothing to index. */
export const GONE_BODY = "410 Gone";

export const GONE_HEADERS: Readonly<Record<string, string>> = {
  "X-Robots-Tag": "noindex",
  "Content-Type": "text/plain; charset=utf-8",
};

/**
 * True when a request carries a spam parameter, whatever path it arrived on.
 * A parameter present with an empty value still counts — `?LOSS` and
 * `?LOSS=` are both the spam shape.
 */
export function hasSpamQueryParam(searchParams: URLSearchParams): boolean {
  return SPAM_QUERY_PARAMS.some((name) => searchParams.has(name));
}

/**
 * The 410 response contract, kept free of `next/server` so it can be asserted
 * directly. `middleware.ts` is the only place that turns it into a response.
 */
export function goneResponseInit(): {
  status: number;
  headers: Record<string, string>;
  body: string;
} {
  return {
    status: GONE_STATUS,
    headers: { ...GONE_HEADERS },
    body: GONE_BODY,
  };
}
