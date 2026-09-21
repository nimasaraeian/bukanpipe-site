import { legacyUrls } from "../../data/migration/legacy-urls";
import { normalizeLegacyPath } from "./normalize";
import {
  buildLegacyRedirectRules,
  isLegacyRedirectsEnabled,
  toCanonicalLegacyDestination,
} from "./redirects";
import { hasSpamQueryParam } from "./gone";
import type { LegacyUrlRecord } from "./types";

/**
 * One decision for one incoming request.
 *
 * `null` means "not a legacy URL" — the caller carries on with locale routing,
 * which is what keeps unmapped paths (static files, /wp-admin) on their normal
 * 404 instead of being absorbed into this table.
 */
export type LegacyOutcome =
  | { kind: "redirect"; destination: string }
  | { kind: "gone" }
  | null;

/**
 * Prefix patterns from the historical map. A WordPress section that is gone
 * collapses onto one successor, so every child resolves in the same single hop
 * as the section root rather than 404-ing.
 *
 * Ordered longest-prefix-first at match time, so `/about_us/bukan-pipe-company`
 * keeps its own exact row instead of being swallowed by `/about_us/*`.
 */
export const LEGACY_PATH_PATTERNS: readonly { prefix: string; destination: string }[] = [
  { prefix: "/pipeline_design", destination: "/calculator/pipeline-design" },
  { prefix: "/engineering", destination: "/technical-center" },
  { prefix: "/knowledge", destination: "/technical-center" },
  { prefix: "/category/blog", destination: "/technical-center" },
  { prefix: "/category", destination: "/technical-center" },
  { prefix: "/articles", destination: "/technical-center" },
  { prefix: "/about_us", destination: "/about" },
];

/**
 * WordPress' permalink-independent entry points. `?p=` addresses a post and
 * `?page_id=` a page; both survived in old links and feeds regardless of the
 * pretty permalink. The ids are the real `wordpressId` values already recorded
 * in the inventory, so these rows are the same map keyed a second way.
 */
export const WORDPRESS_QUERY_KEYS = ["p", "page_id"] as const;

/** Paths that must answer 410 rather than redirect anywhere. */
function isGoneRecord(record: LegacyUrlRecord): boolean {
  if (record.action !== "IGNORE_NONINDEXABLE" || record.proposedNewPath !== null) {
    return false;
  }
  // Direct file URLs are left to the static layer — see resolveLegacyRequest.
  return !/\.[a-z0-9]+$/i.test(normalizeLegacyPath(record.oldPath));
}

function isRedirectEligible(record: LegacyUrlRecord): boolean {
  if (record.proposedNewPath === null) return false;
  if (record.action === "REDIRECT_301" || record.action === "MERGE") return true;
  if (record.action === "REBUILD") {
    return (
      normalizeLegacyPath(record.oldPath) !== normalizeLegacyPath(record.proposedNewPath)
    );
  }
  return false;
}

type Tables = {
  exact: Map<string, string>;
  gone: Set<string>;
  byWordpressId: Map<number, string>;
};

let tables: Tables | null = null;

/** Test-only reset — vitest shares module state across cases. */
export function resetLegacyResolver(): void {
  tables = null;
}

function buildTables(): Tables {
  const exact = new Map<string, string>();
  for (const rule of buildLegacyRedirectRules()) {
    exact.set(
      normalizeLegacyPath(rule.source),
      toCanonicalLegacyDestination(rule.destination),
    );
  }

  const gone = new Set<string>();
  const byWordpressId = new Map<number, string>();

  for (const record of legacyUrls) {
    if (record.host !== "bukanpipe.com") continue;

    if (isGoneRecord(record)) {
      gone.add(normalizeLegacyPath(record.oldPath));
      continue;
    }

    // A WordPress id can appear twice — once for the page, once for an
    // attachment with no successor. Only the row that redirects is indexed.
    if (record.wordpressId !== undefined && isRedirectEligible(record)) {
      const destination = exact.get(normalizeLegacyPath(record.oldPath));
      if (destination && !byWordpressId.has(record.wordpressId)) {
        byWordpressId.set(record.wordpressId, destination);
      }
    }
  }

  return { exact, gone, byWordpressId };
}

function getTables(): Tables {
  if (!tables) tables = buildTables();
  return tables;
}

function matchPattern(pathname: string): string | null {
  const candidates = LEGACY_PATH_PATTERNS.filter(
    ({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  ).sort((a, b) => b.prefix.length - a.prefix.length);

  const best = candidates[0];
  return best ? toCanonicalLegacyDestination(best.destination) : null;
}

function matchWordpressQuery(
  pathname: string,
  searchParams: URLSearchParams,
): string | null {
  // Only WordPress' own front controller carries these ids.
  if (pathname !== "/index.php" && pathname !== "/") return null;

  for (const key of WORDPRESS_QUERY_KEYS) {
    const raw = searchParams.get(key);
    if (raw === null) continue;
    const id = Number(raw);
    if (!Number.isInteger(id)) continue;
    const destination = getTables().byWordpressId.get(id);
    if (destination) return destination;
  }
  return null;
}

/**
 * Resolve a full incoming request — path and query together.
 *
 * Order matters: spam is answered before anything can redirect it, 410 before
 * any redirect can resurrect a deleted URL, exact rows before patterns so a
 * child page keeps its own successor, and the WordPress query form last
 * because it is the same map addressed by id.
 */
export function resolveLegacyRequest(
  pathname: string,
  searchParams: URLSearchParams = new URLSearchParams(),
): LegacyOutcome {
  if (hasSpamQueryParam(searchParams)) {
    return { kind: "gone" };
  }

  if (!isLegacyRedirectsEnabled()) {
    return null;
  }

  const normalized = normalizeLegacyPath(pathname);

  // Direct file URLs (/wp-content/**.pdf) and anything else with an extension
  // are never claimed here, so they keep whatever the static layer answers.
  if (/\.[a-z0-9]+$/i.test(normalized) && normalized !== "/index.php") {
    return null;
  }

  if (getTables().gone.has(normalized)) {
    return { kind: "gone" };
  }

  const exact = getTables().exact.get(normalized);
  if (exact) return { kind: "redirect", destination: exact };

  const byQuery = matchWordpressQuery(normalized, searchParams);
  if (byQuery) return { kind: "redirect", destination: byQuery };

  const pattern = matchPattern(normalized);
  if (pattern) return { kind: "redirect", destination: pattern };

  return null;
}
