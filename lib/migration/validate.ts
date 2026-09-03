import { isValidNewPath, normalizeLegacyPath } from "@/lib/migration/normalize";
import {
  LEGACY_CONTENT_TYPES,
  LEGACY_HOSTS,
  MIGRATION_ACTIONS,
  MIGRATION_CONFIDENCE,
  type LegacyUrlRecord,
} from "@/lib/migration/types";

const ACTION_SET = new Set<string>(MIGRATION_ACTIONS);
const CONFIDENCE_SET = new Set<string>(MIGRATION_CONFIDENCE);
const CONTENT_TYPE_SET = new Set<string>(LEGACY_CONTENT_TYPES);
const HOST_SET = new Set<string>(LEGACY_HOSTS);

export type MigrationIssue = {
  oldPath: string;
  code: string;
  message: string;
};

const ACTIONS_REQUIRING_DESTINATION = new Set([
  "KEEP",
  "REBUILD",
  "REDIRECT_301",
  "MERGE",
]);

function destinationOf(record: LegacyUrlRecord): string | null {
  return record.proposedNewPath === null
    ? null
    : normalizeLegacyPath(record.proposedNewPath);
}

export function collectMigrationIssues(
  records: readonly LegacyUrlRecord[],
): MigrationIssue[] {
  const issues: MigrationIssue[] = [];
  const byPath = new Map<string, LegacyUrlRecord[]>();

  for (const record of records) {
    const oldPath = normalizeLegacyPath(record.oldPath);

    if (!ACTION_SET.has(record.action)) {
      issues.push({
        oldPath,
        code: "unknown-action",
        message: `Unknown migration action: ${record.action}`,
      });
    }

    if (!CONFIDENCE_SET.has(record.confidence)) {
      issues.push({
        oldPath,
        code: "unknown-confidence",
        message: `Unknown confidence: ${record.confidence}`,
      });
    }

    if (!CONTENT_TYPE_SET.has(record.contentType)) {
      issues.push({
        oldPath,
        code: "unknown-content-type",
        message: `Unknown content type: ${record.contentType}`,
      });
    }

    if (!HOST_SET.has(record.host)) {
      issues.push({
        oldPath,
        code: "unknown-host",
        message: `Unknown host: ${record.host}`,
      });
    }

    if (normalizeLegacyPath(new URL(record.oldUrl).pathname) !== oldPath) {
      issues.push({
        oldPath,
        code: "path-url-mismatch",
        message: `oldPath does not match oldUrl pathname`,
      });
    }

    const destination = destinationOf(record);

    if (ACTIONS_REQUIRING_DESTINATION.has(record.action) && destination === null) {
      issues.push({
        oldPath,
        code: "missing-destination",
        message: `${record.action} requires proposedNewPath`,
      });
    }

    if (destination !== null && !isValidNewPath(destination)) {
      issues.push({
        oldPath,
        code: "invalid-destination",
        message: `Invalid destination format: ${record.proposedNewPath}`,
      });
    }

    if (record.action === "KEEP" && destination !== null && destination !== oldPath) {
      issues.push({
        oldPath,
        code: "keep-path-changed",
        message: `KEEP must preserve the old path (got ${destination})`,
      });
    }

    if (
      (record.action === "REDIRECT_301" || record.action === "MERGE") &&
      destination === oldPath
    ) {
      issues.push({
        oldPath,
        code: "redirect-to-self",
        message: `${record.action} destination matches the old path`,
      });
    }

    if (
      (record.action === "REDIRECT_301" || record.action === "MERGE") &&
      destination === "/" &&
      oldPath !== "/"
    ) {
      issues.push({
        oldPath,
        code: "homepage-dump",
        message: "Do not blanket-redirect legacy URLs to the homepage",
      });
    }

    const key = `${record.host}:${oldPath}`;
    const group = byPath.get(key) ?? [];
    group.push(record);
    byPath.set(key, group);
  }

  for (const [key, group] of byPath) {
    const oldPath = group[0]?.oldPath ?? key;

    if (group.length > 1) {
      issues.push({
        oldPath,
        code: "duplicate-old-path",
        message: `Duplicate old path (${group.length} records) for ${key}`,
      });
    }

    const destinations = new Set(
      group
        .map((record) => destinationOf(record))
        .filter((value): value is string => value !== null),
    );

    if (destinations.size > 1) {
      issues.push({
        oldPath,
        code: "conflicting-mapping",
        message: `Conflicting destinations: ${[...destinations].join(", ")}`,
      });
    }
  }

  const redirectMap = new Map<string, string>();

  for (const record of records) {
    if (record.host !== "bukanpipe.com") {
      continue;
    }

    if (
      record.action !== "REDIRECT_301" &&
      record.action !== "MERGE" &&
      !(
        record.action === "REBUILD" &&
        destinationOf(record) !== null &&
        destinationOf(record) !== normalizeLegacyPath(record.oldPath)
      )
    ) {
      continue;
    }

    const destination = destinationOf(record);
    if (destination === null) {
      continue;
    }

    redirectMap.set(normalizeLegacyPath(record.oldPath), destination);
  }

  for (const [source, destination] of redirectMap) {
    if (source === destination) {
      issues.push({
        oldPath: source,
        code: "redirect-to-self",
        message: "Redirect source and destination are the same",
      });
    }

    if (redirectMap.has(destination) && destination !== source) {
      issues.push({
        oldPath: source,
        code: "redirect-chain",
        message: `Chain: ${source} → ${destination} → ${redirectMap.get(destination)}`,
      });
    }

    const seen = new Set<string>();
    let cursor: string | undefined = source;

    while (cursor && redirectMap.has(cursor)) {
      if (seen.has(cursor)) {
        issues.push({
          oldPath: source,
          code: "redirect-loop",
          message: `Loop involving ${cursor}`,
        });
        break;
      }

      seen.add(cursor);
      cursor = redirectMap.get(cursor);
    }
  }

  return issues;
}

export function assertMigrationInventory(
  records: readonly LegacyUrlRecord[],
): void {
  const issues = collectMigrationIssues(records);

  if (issues.length > 0) {
    const summary = issues
      .map((issue) => `${issue.code}: ${issue.oldPath} — ${issue.message}`)
      .join("\n");
    throw new Error(`Migration inventory is invalid:\n${summary}`);
  }
}
