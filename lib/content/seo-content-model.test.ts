import { describe, expect, it } from "vitest";
import { buildSeoProductDocument } from "@/lib/content/seo-content-model";
import { enSeoProductSeeds } from "@/data/content/en/seo-product-seeds";
import { enPe100TechnicalGuideSeed } from "@/data/content/en/seo-article-seeds";
import { buildSeoArticleDocument } from "@/lib/content/seo-content-model";

describe("SEO content model", () => {
  it("builds product landing pages with spec table, FAQ and internal links", () => {
    const water = buildSeoProductDocument("en", enSeoProductSeeds[0]!);
    expect(water.path).toBe("/products/water-supply-pipe");
    expect(water.title).toBe("Water HDPE Pipes");
    expect(water.sections.some((b) => b.type === "spec-table")).toBe(true);
    expect(water.sections.some((b) => b.type === "internal-links")).toBe(true);
    expect(water.faqs?.length).toBeGreaterThan(0);
    expect(water.heroImage?.alt).toContain("HDPE");
  });

  it("includes industrial pipe landing in EN catalog seeds", () => {
    const industrial = enSeoProductSeeds.find((s) => s.slug === "industrial-pipe");
    expect(industrial?.title).toBe("Industrial HDPE Pipes");
  });

  it("builds PE100 technical guide article", () => {
    const guide = buildSeoArticleDocument("en", enPe100TechnicalGuideSeed);
    expect(guide.path).toBe("/technical-center/pe100-technical-guide");
    expect(guide.sections[0]?.type).toBe("definition");
    expect(guide.faqs?.length).toBeGreaterThan(0);
  });
});
