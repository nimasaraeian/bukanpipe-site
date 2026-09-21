import {
  EXACT_GONE,
  EXACT_REDIRECTS,
  PATTERN_RULES,
  QUERY_FALLBACKS,
  QUERY_RULES,
} from "../../data/migration/redirect-map";
import { normalizeLegacyPath } from "./normalize";
import { hasSpamQueryParam } from "./gone";

/**
 * One decision for one incoming request.
 *
 * `null` means "not in the map" — the caller carries on, which is what keeps
 * unmapped paths (static files, /wp-admin, typos) on their normal 404 instead
 * of being absorbed here.
 */
export type LegacyOutcome =
  | {
      kind: "redirect";
      destination: string;
      /**
       * False when the row was matched *by* its query string. The legacy
       * parameter means nothing on the new page, and carrying it across would
       * mint an indexable duplicate (`/fa/laboratory/services?irantech_cms=…`)
       * of the very page the redirect is meant to consolidate onto.
       */
      preserveQuery: boolean;
    }
  | { kind: "gone" }
  | null;

const exactRedirects = new Map(EXACT_REDIRECTS.map((r) => [r.source, r.destination]));
const exactGone = new Set(EXACT_GONE);
const queryFallbackPaths = new Map(QUERY_FALLBACKS.map((f) => [f.path, f.destination]));
const patterns = PATTERN_RULES.map((rule) => ({
  destination: rule.destination,
  regex: new RegExp(rule.regex),
}));

function outcomeFor(destination: string | null, preserveQuery: boolean): LegacyOutcome {
  return destination === null
    ? { kind: "gone" }
    : { kind: "redirect", destination, preserveQuery };
}

function matchQuery(pathname: string, searchParams: URLSearchParams): LegacyOutcome {
  for (const rule of QUERY_RULES) {
    if (rule.path !== pathname) continue;
    const actual = searchParams.get(rule.param);
    if (actual === null) continue;
    if (rule.value !== null && actual !== rule.value) continue;
    return outcomeFor(rule.destination, false);
  }

  // The old CMS front controllers served arbitrary content off one path. Once
  // the ids above miss, the rest is unknown and answers 410 rather than
  // guessing a destination.
  if (queryFallbackPaths.has(pathname)) {
    return outcomeFor(queryFallbackPaths.get(pathname) ?? null, false);
  }

  return null;
}

function matchPattern(pathname: string): LegacyOutcome {
  // PATTERN_RULES is generated longest-source-first, so the most specific
  // wildcard wins without re-sorting here.
  for (const rule of patterns) {
    if (rule.regex.test(pathname)) return outcomeFor(rule.destination, true);
  }
  return null;
}

/**
 * Resolve a full incoming request — path and query together.
 *
 * Order matters: spam is answered before anything can redirect it, exact rows
 * beat wildcards so a child page keeps its own successor, and the query rows
 * sit between the two because they address one path by parameter.
 */
export function resolveLegacyRequest(
  pathname: string,
  searchParams: URLSearchParams = new URLSearchParams(),
): LegacyOutcome {
  if (hasSpamQueryParam(searchParams)) {
    return { kind: "gone" };
  }

  const normalized = normalizeLegacyPath(pathname);

  if (exactGone.has(normalized)) {
    return { kind: "gone" };
  }

  const exact = exactRedirects.get(normalized);
  if (exact !== undefined) {
    return { kind: "redirect", destination: exact, preserveQuery: true };
  }

  return matchQuery(normalized, searchParams) ?? matchPattern(normalized);
}
