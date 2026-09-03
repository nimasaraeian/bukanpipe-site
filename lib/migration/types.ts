/**
 * Legacy URL migration types.
 *
 * Redirects derived from these records stay disabled until launch
 * prerequisites are met. See docs/HOST_CANONICAL_POLICY.md.
 */

export const MIGRATION_ACTIONS = [
  "KEEP",
  "REBUILD",
  "REDIRECT_301",
  "MERGE",
  "REVIEW",
  "IGNORE_NONINDEXABLE",
] as const;

export type MigrationAction = (typeof MIGRATION_ACTIONS)[number];

export const MIGRATION_CONFIDENCE = [
  "CONFIRMED",
  "HIGH",
  "MEDIUM",
  "LOW",
] as const;

export type MigrationConfidence = (typeof MIGRATION_CONFIDENCE)[number];

export const LEGACY_CONTENT_TYPES = [
  "html-page",
  "html-post",
  "archive",
  "attachment",
  "pdf",
  "feed",
  "sitemap",
  "other",
] as const;

export type LegacyContentType = (typeof LEGACY_CONTENT_TYPES)[number];

export const LEGACY_HOSTS = ["bukanpipe.com", "bukanpipe.ir"] as const;

export type LegacyHost = (typeof LEGACY_HOSTS)[number];

export type BacklinkStatus = "UNKNOWN" | "HAS_EVIDENCE";

export type HttpStatus = number | "UNKNOWN";

/**
 * One discovered legacy resource. Paths are WordPress permalink paths
 * (typically trailing-slash on the public site). New destinations use the
 * Phase 002 IA (no trailing slash except origin `/`).
 */
export type LegacyUrlRecord = {
  oldUrl: string;
  oldPath: string;
  host: LegacyHost;
  contentType: LegacyContentType;
  httpStatus: HttpStatus;
  title?: string;
  h1?: string;
  pageRole: string;
  proposedNewPath: string | null;
  action: MigrationAction;
  confidence: MigrationConfidence;
  evidence: string;
  notes: string;
  backlinkStatus: BacklinkStatus;
  backlinkEvidence?: string;
  indexability?: string;
  wordpressId?: number;
};

export type LegacyRedirectRule = {
  source: string;
  destination: string;
  permanent: true;
};

export const REDIRECT_ELIGIBLE_ACTIONS = [
  "REDIRECT_301",
  "MERGE",
] as const;

export type RedirectEligibleAction = (typeof REDIRECT_ELIGIBLE_ACTIONS)[number];
