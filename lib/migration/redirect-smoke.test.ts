import { describe, expect, it } from "vitest";
import { buildLegacyRedirectRules } from "@/lib/migration/redirects";
import { normalizeLegacyPath } from "@/lib/migration/normalize";
import { getAllPublishedPaths } from "@/lib/content/registry";

const HIGH_VALUE_CASES = [
  { source: "/pipeline_design", destination: "/calculator/pipeline-design" },
  { source: "/welding", destination: "/technical-center/polyethylene-pipe-welding" },
  { source: "/temp-cooficient", destination: "/technical-center/polyethylene-pipe-temperature-pressure" },
  { source: "/air-vent-valve", destination: "/technical-center/air-vent-valve" },
  { source: "/iso-iec17025", destination: "/laboratory/iso-17025" },
  { source: "/lab-scope", destination: "/laboratory/test-scope" },
  { source: "/qc-and-laboratory", destination: "/laboratory" },
  { source: "/about_us", destination: "/about" },
  { source: "/policy", destination: "/about" },
  { source: "/certs", destination: "/about" },
  { source: "/contact-us", destination: "/contact" },
  { source: "/gas-pipe", destination: "/products/gas-pipe" },
  { source: "/standards", destination: "/downloads" },
  { source: "/training", destination: "/laboratory" },
] as const;

describe("legacy redirect smoke test (rule map)", () => {
  const rules = buildLegacyRedirectRules();
  const ruleMap = new Map(rules.map((rule) => [rule.source, rule]));

  it("maps high-value legacy URLs in a single hop to implemented FA destinations", () => {
    const faPaths = new Set(getAllPublishedPaths("fa"));

    for (const { source, destination } of HIGH_VALUE_CASES) {
      const normalizedSource = normalizeLegacyPath(source);
      const rule = ruleMap.get(normalizedSource);
      expect(rule, `missing rule for ${source}`).toBeDefined();
      expect(rule?.permanent).toBe(true);
      expect(rule?.destination).toBe(normalizeLegacyPath(destination));
      expect(faPaths.has(rule!.destination) || rule!.destination === "/calculator/pipeline-design").toBe(
        true,
      );
    }
  });

  it("does not redirect high-value sources to homepage", () => {
    for (const { source } of HIGH_VALUE_CASES) {
      const rule = ruleMap.get(normalizeLegacyPath(source));
      expect(rule?.destination).not.toBe("/");
    }
  });

  it("has no redirect loops among mapped destinations", () => {
    for (const rule of rules) {
      const next = ruleMap.get(rule.destination);
      expect(next?.destination).not.toBe(rule.source);
    }
  });
});
