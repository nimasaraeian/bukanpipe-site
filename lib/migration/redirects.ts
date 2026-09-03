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

export function isLegacyRedirectsEnabled(): boolean {
  return process.env.ENABLE_LEGACY_REDIRECTS === "true";
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
 * Next.js `redirects()` payload. Empty unless ENABLE_LEGACY_REDIRECTS=true.
 * Must stay disabled in development and until destination pages exist.
 */
export function getNextLegacyRedirects(): LegacyRedirectRule[] {
  if (!isLegacyRedirectsEnabled()) {
    return [];
  }

  return buildLegacyRedirectRules();
}
