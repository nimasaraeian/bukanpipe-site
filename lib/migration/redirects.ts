import { legacyUrls } from "../../data/migration/legacy-urls";
import {
  isValidNewPath,
  normalizeLegacyPath,
  slashVariants,
} from "./normalize";
import type {
  LegacyRedirectRule,
  LegacyUrlRecord,
} from "./types";

/**
 * The Phase-002 inventory is the BASE layer of the historical URL map and is
 * live in production (ENABLE_LEGACY_REDIRECTS=true on Vercel). The flag below
 * gates only this layer.
 *
 * `lib/migration/legacy-resolver.ts` consults it first, then the additions
 * compiled from `redirect-map-draft.csv`. Where the two disagree the path is
 * excluded from the compiled map — see data/migration/redirect-conflicts.json.
 */
export function isLegacyRedirectsEnabled(): boolean {
  return process.env.ENABLE_LEGACY_REDIRECTS === "true";
}

/** Canonical locale for legacy WordPress URLs (FA is the primary published catalog). */
export const LEGACY_REDIRECT_LOCALE = "fa" as const;

/** Map a locale-less IA path to the canonical legacy redirect target. */
export function toCanonicalLegacyDestination(path: string): string {
  const normalized = normalizeLegacyPath(path);
  if (normalized === "/") {
    return `/${LEGACY_REDIRECT_LOCALE}`;
  }
  return `/${LEGACY_REDIRECT_LOCALE}${normalized}`;
}

let legacyRedirectLookup: Map<string, string> | null = null;

/** Test-only reset — vitest shares module state across cases. */
export function resetLegacyRedirectLookup(): void {
  legacyRedirectLookup = null;
}

function getLegacyRedirectLookup(): Map<string, string> {
  if (!legacyRedirectLookup) {
    legacyRedirectLookup = new Map(
      buildLegacyRedirectRules().map((rule) => [
        rule.source,
        toCanonicalLegacyDestination(rule.destination),
      ]),
    );
  }
  return legacyRedirectLookup;
}

/**
 * Resolve a bare legacy pathname to its canonical FA destination.
 * Returns null when redirects are disabled or the path is not in the inventory.
 */
export function resolveLegacyRedirect(pathname: string): string | null {
  if (!isLegacyRedirectsEnabled()) {
    return null;
  }

  return getLegacyRedirectLookup().get(normalizeLegacyPath(pathname)) ?? null;
}

function isRedirectEligible(record: LegacyUrlRecord): boolean {
  if (record.proposedNewPath === null) {
    return false;
  }

  if (record.action === "REDIRECT_301" || record.action === "MERGE") {
    return true;
  }

  if (record.action === "REBUILD") {
    return (
      normalizeLegacyPath(record.oldPath) !==
      normalizeLegacyPath(record.proposedNewPath)
    );
  }

  return false;
}

/**
 * Derive one-hop path redirects from the inventory.
 * Host/www/HTTP policy is not implemented here.
 */
export function buildLegacyRedirectRules(
  records: readonly LegacyUrlRecord[] = legacyUrls,
): LegacyRedirectRule[] {
  const rules: LegacyRedirectRule[] = [];
  const seenSources = new Set<string>();

  for (const record of records) {
    if (record.host !== "bukanpipe.com") {
      continue;
    }

    if (!isRedirectEligible(record) || record.proposedNewPath === null) {
      continue;
    }

    if (/\.[a-z0-9]+$/i.test(normalizeLegacyPath(record.oldPath))) {
      continue;
    }

    const destination = normalizeLegacyPath(record.proposedNewPath);

    if (!isValidNewPath(destination)) {
      continue;
    }

    for (const source of slashVariants(record.oldPath)) {
      if (seenSources.has(source)) {
        continue;
      }

      seenSources.add(source);
      rules.push({
        source,
        destination,
        permanent: true,
      });
    }
  }

  return rules;
}

/**
 * Legacy redirects are handled in middleware before locale routing.
 * next.config must not duplicate them — that layer runs after middleware
 * and would never see bare legacy paths once locale middleware ran first.
 */
export function getNextLegacyRedirects(): LegacyRedirectRule[] {
  return [];
}
