import { describe, expect, it } from "vitest";
import { legacyUrls } from "@/data/migration/legacy-urls";
import {
  isValidNewPath,
  normalizeLegacyPath,
  slashVariants,
} from "@/lib/migration/normalize";
import {
  buildLegacyRedirectRules,
  getNextLegacyRedirects,
  isLegacyRedirectsEnabled,
} from "@/lib/migration/redirects";
import type { LegacyUrlRecord } from "@/lib/migration/types";
import { collectMigrationIssues } from "@/lib/migration/validate";

function sample(
  overrides: Partial<LegacyUrlRecord> & Pick<LegacyUrlRecord, "oldUrl" | "oldPath">,
): LegacyUrlRecord {
  return {
    host: "bukanpipe.com",
    contentType: "html-page",
    httpStatus: 200,
    pageRole: "test",
    proposedNewPath: "/about",
    action: "REDIRECT_301",
    confidence: "HIGH",
    evidence: "unit-test",
    notes: "fixture",
    backlinkStatus: "UNKNOWN",
    ...overrides,
  };
}

describe("legacy URL inventory", () => {
  it("has no mapping integrity issues", () => {
    expect(collectMigrationIssues(legacyUrls)).toEqual([]);
  });

  it("only uses known action, confidence, and content-type values", () => {
    const issues = collectMigrationIssues(legacyUrls);
    expect(issues.some((issue) => issue.code.startsWith("unknown-"))).toBe(
      false,
    );
  });

  it("does not map redirect-eligible URLs onto the homepage", () => {
    const dumps = legacyUrls.filter(
      (record) =>
        record.host === "bukanpipe.com" &&
        (record.action === "REDIRECT_301" || record.action === "MERGE") &&
        record.proposedNewPath === "/" &&
        normalizeLegacyPath(record.oldPath) !== "/",
    );

    expect(dumps).toEqual([]);
  });

  it("keeps the homepage and /standards on the same path", () => {
    const home = legacyUrls.find(
      (record) =>
        record.host === "bukanpipe.com" &&
        normalizeLegacyPath(record.oldPath) === "/",
    );
    const standards = legacyUrls.find(
      (record) =>
        record.host === "bukanpipe.com" &&
        normalizeLegacyPath(record.oldPath) === "/standards",
    );

    expect(home?.action).toBe("KEEP");
    expect(home?.proposedNewPath).toBe("/");
    expect(standards?.action).toBe("REDIRECT_301");
    expect(standards?.proposedNewPath).toBe("/downloads");
  });

  it("maps confirmed high-value product and lab URLs one hop", () => {
    const gas = legacyUrls.find((record) => record.oldPath === "/gas-pipe");
    const lab = legacyUrls.find(
      (record) => record.oldPath === "/qc-and-laboratory",
    );

    expect(gas?.action).toBe("REDIRECT_301");
    expect(gas?.proposedNewPath).toBe("/products/gas-pipe");
    expect(lab?.proposedNewPath).toBe("/laboratory");
  });
});

describe("redirect rule builder", () => {
  it("stays disabled unless ENABLE_LEGACY_REDIRECTS is true", () => {
    expect(isLegacyRedirectsEnabled()).toBe(false);
    expect(getNextLegacyRedirects()).toEqual([]);
  });

  it("emits trailing-slash and non-slash sources to the same destination", () => {
    const rules = buildLegacyRedirectRules(legacyUrls);
    const gasRules = rules.filter((rule) =>
      rule.source.replace(/\/$/, "") === "/gas-pipe",
    );

    expect(gasRules).toHaveLength(2);
    expect(new Set(gasRules.map((rule) => rule.destination))).toEqual(
      new Set(["/products/gas-pipe"]),
    );
    expect(gasRules.every((rule) => rule.permanent)).toBe(true);
  });

  it("does not emit rules for IGNORE or REVIEW records", () => {
    const rules = buildLegacyRedirectRules(legacyUrls);
    const sources = new Set(rules.map((rule) => normalizeLegacyPath(rule.source)));

    // /shop was ruled a redirect to the catalogue on 2026-09-21; /cart is
    // still a non-indexable row and stands in for that case here.
    expect(sources.has("/cart")).toBe(false);
    expect(sources.has("/sitemap.xml")).toBe(false);
    expect(sources.has("/wp-content/uploads/2022/10/Bukan-Pipe-Company.pdf")).toBe(
      false,
    );
  });

  it("does not create redirect-to-self or chains inside derived rules", () => {
    const rules = buildLegacyRedirectRules(legacyUrls);
    const map = new Map<string, string>();

    for (const rule of rules) {
      const source = normalizeLegacyPath(rule.source);
      expect(source).not.toBe(rule.destination);
      expect(isValidNewPath(rule.destination)).toBe(true);

      const existing = map.get(source);
      if (existing) {
        expect(existing).toBe(rule.destination);
      } else {
        map.set(source, rule.destination);
      }
    }

    for (const [source, destination] of map) {
      expect(map.has(destination)).toBe(false);
      expect(source).not.toBe(destination);
    }
  });
});

describe("migration validator fixtures", () => {
  it("detects duplicate old paths and conflicting destinations", () => {
    const issues = collectMigrationIssues([
      sample({
        oldUrl: "https://bukanpipe.com/about_us/",
        oldPath: "/about_us",
        proposedNewPath: "/about",
      }),
      sample({
        oldUrl: "https://bukanpipe.com/about_us/",
        oldPath: "/about_us",
        proposedNewPath: "/contact",
      }),
    ]);

    expect(issues.some((issue) => issue.code === "duplicate-old-path")).toBe(
      true,
    );
    expect(issues.some((issue) => issue.code === "conflicting-mapping")).toBe(
      true,
    );
  });

  it("detects redirect loops, chains, self-redirects, and homepage dumps", () => {
    const issues = collectMigrationIssues([
      sample({
        oldUrl: "https://bukanpipe.com/a/",
        oldPath: "/a",
        proposedNewPath: "/b",
      }),
      sample({
        oldUrl: "https://bukanpipe.com/b/",
        oldPath: "/b",
        proposedNewPath: "/a",
      }),
      sample({
        oldUrl: "https://bukanpipe.com/c/",
        oldPath: "/c",
        proposedNewPath: "/c",
      }),
      sample({
        oldUrl: "https://bukanpipe.com/d/",
        oldPath: "/d",
        proposedNewPath: "/",
      }),
    ]);

    expect(issues.some((issue) => issue.code === "redirect-loop")).toBe(true);
    expect(issues.some((issue) => issue.code === "redirect-chain")).toBe(true);
    expect(issues.some((issue) => issue.code === "redirect-to-self")).toBe(true);
    expect(issues.some((issue) => issue.code === "homepage-dump")).toBe(true);
  });

  it("detects invalid destinations and unknown lifecycle values", () => {
    const issues = collectMigrationIssues([
      sample({
        oldUrl: "https://bukanpipe.com/x/",
        oldPath: "/x",
        proposedNewPath: "https://example.com/x",
        action: "NOT_A_REAL_ACTION" as LegacyUrlRecord["action"],
        confidence: "SURE" as LegacyUrlRecord["confidence"],
      }),
    ]);

    expect(issues.some((issue) => issue.code === "invalid-destination")).toBe(
      true,
    );
    expect(issues.some((issue) => issue.code === "unknown-action")).toBe(true);
    expect(issues.some((issue) => issue.code === "unknown-confidence")).toBe(
      true,
    );
  });

  it("normalizes trailing slashes and encoded paths", () => {
    expect(normalizeLegacyPath("/gas-pipe%2F")).toBe("/gas-pipe");
    expect(slashVariants("/about_us/")).toEqual(["/about_us", "/about_us/"]);
    expect(isValidNewPath("/products/gas-pipe")).toBe(true);
    expect(isValidNewPath("/products/gas-pipe/")).toBe(false);
  });
});
