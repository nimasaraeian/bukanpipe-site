import { afterEach, describe, expect, it } from "vitest";
import {
  buildLegacyRedirectRules,
  resetLegacyRedirectLookup,
  resolveLegacyRedirect,
  toCanonicalLegacyDestination,
} from "@/lib/migration/redirects";
import { normalizeLegacyPath } from "@/lib/migration/normalize";
import { getAllPublishedPaths } from "@/lib/content/registry";

const REPRESENTATIVE_LEGACY_ROUTES = [
  { source: "/gas-pipe", category: "product" },
  { source: "/لوله-های-پلی-اتیلن-آبرسانی", category: "product (water)" },
  { source: "/qc-and-laboratory", category: "laboratory" },
  { source: "/welding", category: "technical article" },
  { source: "/pipeline_design", category: "calculator" },
  { source: "/standards", category: "downloads / standards" },
  { source: "/training", category: "laboratory stub" },
  { source: "/about_us", category: "company" },
  { source: "/contact-us", category: "contact" },
  { source: "/articles", category: "old stub" },
] as const;

describe("legacy redirect runtime resolver", () => {
  afterEach(() => {
    delete process.env.ENABLE_LEGACY_REDIRECTS;
    resetLegacyRedirectLookup();
  });

  it("returns null when legacy redirects are disabled", () => {
    process.env.ENABLE_LEGACY_REDIRECTS = "false";
    expect(resolveLegacyRedirect("/gas-pipe")).toBeNull();
  });

  it("maps bare legacy paths to canonical /fa destinations in one hop", () => {
    process.env.ENABLE_LEGACY_REDIRECTS = "true";
    const rules = buildLegacyRedirectRules();
    const ruleMap = new Map(rules.map((rule) => [rule.source, rule]));
    const faPaths = new Set(getAllPublishedPaths("fa"));

    for (const { source } of REPRESENTATIVE_LEGACY_ROUTES) {
      const normalized = normalizeLegacyPath(source);
      const rule = ruleMap.get(normalized);
      expect(rule, `missing rule for ${source}`).toBeDefined();

      const resolved = resolveLegacyRedirect(source);
      expect(resolved, `no redirect for ${source}`).not.toBeNull();
      expect(resolved!).toBe(toCanonicalLegacyDestination(rule!.destination));
      expect(resolved!).toMatch(/^\/fa\//);
      expect(resolved!).not.toMatch(/\/fa\/fa\//);

      const localeLess = resolved!.replace(/^\/fa/, "") || "/";
      expect(
        faPaths.has(localeLess) || localeLess === "/calculator/pipeline-design",
      ).toBe(true);
    }
  });

  it("does not redirect modern locale-prefixed routes", () => {
    process.env.ENABLE_LEGACY_REDIRECTS = "true";
    expect(resolveLegacyRedirect("/fa/products/gas-pipe")).toBeNull();
    expect(resolveLegacyRedirect("/en/products/gas-pipe")).toBeNull();
  });

  it("does not redirect unknown paths", () => {
    process.env.ENABLE_LEGACY_REDIRECTS = "true";
    expect(resolveLegacyRedirect("/not-a-legacy-page")).toBeNull();
  });

  it("has no redirect loops among canonical destinations", () => {
    process.env.ENABLE_LEGACY_REDIRECTS = "true";
    const rules = buildLegacyRedirectRules();

    for (const rule of rules) {
      const canonical = toCanonicalLegacyDestination(rule.destination);
      expect(resolveLegacyRedirect(canonical)).toBeNull();
      expect(resolveLegacyRedirect(rule.destination)).toBeNull();
    }
  });
});
