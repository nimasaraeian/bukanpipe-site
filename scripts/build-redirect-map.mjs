#!/usr/bin/env node
/**
 * Compile redirect-map-draft.csv into data/migration/redirect-map.ts.
 *
 * Middleware runs on the edge and cannot read a file at request time, so the
 * CSV is compiled to a module. The CSV stays the source of truth:
 * redirect-map.test.ts re-runs this compiler and fails if the checked-in
 * module has drifted from it.
 *
 * Usage: node scripts/build-redirect-map.mjs [--check]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CSV = path.join(root, "redirect-map-draft.csv");
const CONFLICTS = path.join(root, "data/migration/redirect-conflicts.json");
const OUT = path.join(root, "data/migration/redirect-map.ts");

/** Strip trailing slashes (origin `/` survives) and percent-decode. */
function normalize(p) {
  let s = p.trim();
  try {
    s = decodeURIComponent(s);
  } catch {
    /* keep raw when the encoding is malformed */
  }
  if (s === "" || s === "/") return "/";
  if (!s.startsWith("/")) s = `/${s}`;
  return s.replace(/\/+$/, "") || "/";
}

function parseCsv(text) {
  return text
    .replace(/^﻿/, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(1)
    .map((line, i) => {
      const [old_path, action, destination, reason, confidence, era] = line.split(",");
      return { line: i + 2, old_path, action, destination, reason, confidence, era };
    });
}

/**
 * Paths the CSV shares with data/migration/legacy-urls.ts.
 *
 * The inventory is live in production (ENABLE_LEGACY_REDIRECTS=true), so this
 * map only ever ADDS. A `conflicts` entry — same path, different outcome —
 * is left to the inventory and awaits a human decision. A `covered` entry
 * agrees with the inventory: the redirect ones are already served and are
 * skipped, the 410 ones were only an intent the inventory never implemented,
 * so the CSV row is what finally implements them.
 */
const overlap = JSON.parse(readFileSync(CONFLICTS, "utf8"));
const conflictPaths = new Map(
  overlap.conflicts.map((c) => [
    c.path,
    `conflicts with the live inventory (${c.inventory}); awaiting a decision — CSV L${c.csvLine} wants ${c.csv}`,
  ]),
);
const coveredRedirects = new Map(
  overlap.covered
    .filter((c) => c.outcome !== "410")
    .map((c) => [c.path, `already served by the inventory (${c.outcome}) — CSV L${c.csvLine} agrees`]),
);

/**
 * Rows the map deliberately does not implement, with the reason. Kept in the
 * output so the count is auditable rather than silently dropped.
 */
const SKIP = new Map([
  [
    "/fa/products/irrigation-pipe",
    "self-redirect: source and destination are the same live route (CSV L43)",
  ],
  ["/about", "locale redirect already reaches /fa/about in one hop (CSV L91)"],
  ["/contact", "locale redirect already reaches /fa/contact in one hop (CSV L92)"],
]);

/** Rows whose old_path is not a plain path. Each returns the rules it implies. */
function parseSpecial(row) {
  const src = row.old_path;
  const dest = row.destination || null;

  // Spam query keys — matched on every path, so they are not path rules.
  const spam = src.match(/^\/\?(\w+)=\*$/);
  if (spam) return { spamParam: spam[1] };

  // /?download=catalog
  const rootQuery = src.match(/^\/\?(\w+)=([\w-]+)$/);
  if (rootQuery) {
    return { query: [{ path: "/", param: rootQuery[1], value: rootQuery[2], destination: dest }] };
  }

  // /fa/user/temp.php?irantech_cms=11801&*(PE)  — the (PE)/(PP)/(PVC) variants
  // all share one destination, so only the irantech_cms id has to match.
  const cms = src.match(/^(\S+?)\?irantech_cms=(\d+)&\*(?:\([A-Z]+\))?$/);
  if (cms) {
    return { query: [{ path: cms[1], param: "irantech_cms", value: cms[2], destination: dest }] };
  }

  // /fa/user/product2/detail.php?ID=*  — any value
  const anyValue = src.match(/^(\S+?)\?(\w+)=\*$/);
  if (anyValue) {
    return { query: [{ path: anyValue[1], param: anyValue[2], value: null, destination: dest }] };
  }

  // "/fa/user/temp.php (other params)" — the fallback once the ids above miss.
  const fallback = src.match(/^(\S+?)\s*\(other params\)$/);
  if (fallback) {
    return { queryFallback: [{ path: fallback[1], destination: dest }] };
  }

  // "/index.php/*/component/* + ?format=feed"
  if (src.includes("+ ?format=feed")) {
    const base = src.split("+")[0].trim();
    return { pattern: [{ source: base, destination: dest }] };
  }

  // "/index.php/fa/2016-* and /2018-*" — two patterns sharing one row.
  if (src.includes(" and ")) {
    const [first, second] = src.split(" and ").map((s) => s.trim());
    const prefix = first.slice(0, first.lastIndexOf("/"));
    return {
      pattern: [
        { source: first, destination: dest },
        { source: second.startsWith("/2") ? `${prefix}${second}` : second, destination: dest },
      ],
    };
  }

  if (src.includes("*")) return { pattern: [{ source: src, destination: dest }] };

  return null;
}

// Three wildcard shapes appear in the map: a trailing `/`+star (children of a
// section), a trailing star after text (a segment prefix, e.g. `19-`), and a
// star standing in for one whole segment in the middle of a path.
function patternToRegex(source) {
  const normalized = normalize(source.replace(/\*$/, "")).replace(/\/$/, "");
  const raw = source.trim();

  // Escape everything, then re-open the wildcards.
  const escaped = raw
    .replace(/\/+$/, "")
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\*/g, "\u0000");

  const body = escaped
    // `/\u0000` (a whole segment) must consume at least one segment.
    .replace(/\/\u0000/g, "/[^/]+")
    // a trailing wildcard after text is a segment prefix
    .replace(/\u0000/g, "[^/]*");

  // A source ending in `/*` addresses children, so require the separator.
  const endsWithSegmentWildcard = /\/\*$/.test(raw.replace(/\/+$/, ""));
  const suffix = endsWithSegmentWildcard ? "(?:/.*)?" : "";
  return { regex: `^${body}${suffix}$`, normalized };
}

function build() {
  const rows = parseCsv(readFileSync(CSV, "utf8"));

  const exactRedirects = [];
  const exactGone = [];
  const patterns = [];
  const queries = [];
  const queryFallbacks = [];
  const spamParams = [];
  const skipped = [];

  for (const row of rows) {
    const gone = row.action === "410";
    const dest = gone ? null : row.destination;

    if (!gone && !dest) {
      throw new Error(`L${row.line}: 301 row with no destination`);
    }

    const special = parseSpecial(row);
    if (special) {
      if (special.spamParam) spamParams.push(special.spamParam);
      if (special.query) queries.push(...special.query.map((q) => ({ ...q, line: row.line })));
      if (special.queryFallback) queryFallbacks.push(...special.queryFallback);
      if (special.pattern) {
        for (const p of special.pattern) {
          const { regex } = patternToRegex(p.source);
          patterns.push({ source: p.source, regex, destination: p.destination, line: row.line });
        }
      }
      continue;
    }

    const source = normalize(row.old_path);
    const skipReason =
      SKIP.get(source) ?? conflictPaths.get(source) ?? coveredRedirects.get(source);
    if (skipReason) {
      skipped.push({ source, reason: skipReason });
      continue;
    }

    if (gone) exactGone.push(source);
    else exactRedirects.push({ source, destination: dest, line: row.line });
  }

  // Longest pattern first, so a more specific one is never shadowed.
  patterns.sort((a, b) => b.source.length - a.source.length);

  // The (PE)/(PP)/(PVC) variants collapse onto one rule once the label is
  // dropped, so the same path+param+value would otherwise appear three times.
  const seenQuery = new Set();
  const dedupedQueries = queries.filter((q) => {
    const key = `${q.path}\u0000${q.param}\u0000${q.value}\u0000${q.destination}`;
    if (seenQuery.has(key)) return false;
    seenQuery.add(key);
    return true;
  });
  queries.length = 0;
  queries.push(...dedupedQueries);

  const j = (v) => JSON.stringify(v, null, 2).replace(/\n/g, "\n");

  return `// GENERATED FILE — do not edit.
// Source: redirect-map-draft.csv
// Regenerate: node scripts/build-redirect-map.mjs
// Verified in sync by lib/migration/redirect-map.test.ts.

export type ExactRedirect = { source: string; destination: string };
export type PatternRedirect = { source: string; regex: string; destination: string | null };
export type QueryRedirect = {
  path: string;
  param: string;
  /** null matches any value. */
  value: string | null;
  destination: string | null;
};
export type QueryFallback = { path: string; destination: string | null };
export type SkippedRow = { source: string; reason: string };

/** Exact path → destination. Sources are normalized: decoded, no trailing slash. */
export const EXACT_REDIRECTS: readonly ExactRedirect[] = ${j(
    exactRedirects.map(({ source, destination }) => ({ source, destination })),
  )};

/** Exact paths that answer 410. */
export const EXACT_GONE: readonly string[] = ${j(exactGone)};

/** Wildcard rows, longest source first. A null destination means 410. */
export const PATTERN_RULES: readonly PatternRedirect[] = ${j(
    patterns.map(({ source, regex, destination }) => ({ source, regex, destination })),
  )};

/** Query-string rows. Matched on path + parameter. */
export const QUERY_RULES: readonly QueryRedirect[] = ${j(
    queries.map(({ path, param, value, destination }) => ({ path, param, value, destination })),
  )};

/** Applied when a QUERY_RULES path is hit but no rule above matched it. */
export const QUERY_FALLBACKS: readonly QueryFallback[] = ${j(queryFallbacks)};

/** Query keys that mark an injected spam URL on any path. */
export const SPAM_QUERY_PARAMS_FROM_MAP: readonly string[] = ${j(spamParams)};

/** Rows deliberately not implemented — see reason. */
export const SKIPPED_ROWS: readonly SkippedRow[] = ${j(skipped)};

export const MAP_ROW_COUNT = ${rows.length};

/** Paths left to the live inventory pending a decision. */
export const CONFLICT_COUNT = ${overlap.conflicts.length};
`;
}

const output = build();
if (process.argv.includes("--check")) {
  const current = readFileSync(OUT, "utf8");
  if (current !== output) {
    console.error("redirect-map.ts is out of sync with redirect-map-draft.csv");
    process.exit(1);
  }
  console.log("in sync");
} else {
  writeFileSync(OUT, output);
  console.log(`wrote ${OUT}`);
}
