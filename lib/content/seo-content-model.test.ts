import { describe, expect, it } from "vitest";
import { buildSeoProductDocument } from "@/lib/content/seo-content-model";
import { enSeoProductSeeds } from "@/data/content/en/seo-product-seeds";
import { faSeoProductSeeds } from "@/data/content/fa/seo-product-seeds";
import { enPe100TechnicalGuideSeed } from "@/data/content/en/seo-article-seeds";
import { faPolyethylenePipeSpecificationsSeed } from "@/data/content/fa/seo-article-seeds";
import { buildSeoArticleDocument } from "@/lib/content/seo-content-model";
import { getContentByPath } from "@/lib/content/registry";

describe("SEO content model", () => {
  it("builds product landing pages with spec table, FAQ and internal links", () => {
    const water = buildSeoProductDocument("en", enSeoProductSeeds[0]!);
    expect(water.path).toBe("/products/water-supply-pipe");
    expect(water.title).toBe(enSeoProductSeeds[0]!.title);
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

  it("keeps FA PE100 as a commercial product with engineering sections and FAQs", () => {
    const seed = faSeoProductSeeds.find((item) => item.slug === "pe100-pipe")!;
    const pe100 = buildSeoProductDocument("fa", seed);
    expect(pe100.path).toBe("/products/pe100-pipe");
    expect(pe100.primaryKeyword).toBe("لوله پلی اتیلن PE100");
    expect(pe100.faqs?.length).toBeGreaterThanOrEqual(5);
    expect(pe100.sections.some((block) => block.type === "heading" && block.text.includes("SDR"))).toBe(
      true,
    );
    const explore = pe100.sections.find(
      (block) => block.type === "internal-links" && block.title === "منابع مرتبط",
    );
    expect(explore?.type).toBe("internal-links");
    if (explore?.type === "internal-links") {
      const hrefs = explore.links.map((link) => link.path);
      expect(hrefs).toContain("/technical-center");
      expect(hrefs).toContain("/quality");
      expect(hrefs).toContain("/products/water-supply-pipe");
    }
  });

  it("expands FA specifications into an SDR/PN reference without a public dimension inventory", () => {
    const specs = buildSeoArticleDocument("fa", faPolyethylenePipeSpecificationsSeed);
    expect(specs.path).toBe("/technical-center/polyethylene-pipe-specifications");
    expect(specs.primaryKeyword).toBe("مشخصات فنی لوله پلی اتیلن");
    expect(specs.faqs?.length).toBeGreaterThanOrEqual(5);
    const headings = specs.sections
      .filter((block) => block.type === "heading")
      .map((block) => (block.type === "heading" ? block.text : ""));
    expect(headings.some((text) => text.includes("SDR"))).toBe(true);
    expect(headings.some((text) => text.includes("PN"))).toBe(true);
    expect(specs.sections.some((block) => block.type === "paragraph" && /موجودی/.test(block.text))).toBe(
      true,
    );
  });
});

describe("SEO Wave A FA destinations", () => {
  const extraValid = new Set(["/request-quote"]);

  it("resolves internal links on the three Wave A pages", () => {
    const docs = [
      getContentByPath("fa", "/products/pe100-pipe"),
      getContentByPath("fa", "/technical-center/polyethylene-pipe-specifications"),
      getContentByPath("fa", "/polyethylene-pipe"),
    ];
    for (const doc of docs) {
      expect(doc, "missing Wave A document").toBeDefined();
      const hrefs = doc!.sections.flatMap((block) =>
        block.type === "internal-links" ? block.links.map((link) => link.path) : [],
      );
      for (const href of hrefs) {
        if (extraValid.has(href)) continue;
        expect(getContentByPath("fa", href), href).toBeDefined();
      }
    }
  });

  it("keeps the polyethylene overview distinct from specifications and PE100", () => {
    const overview = getContentByPath("fa", "/polyethylene-pipe")!;
    const specs = getContentByPath("fa", "/technical-center/polyethylene-pipe-specifications")!;
    const pe100 = getContentByPath("fa", "/products/pe100-pipe")!;
    expect(overview.primaryKeyword).toBe("لوله پلی اتیلن چیست");
    expect(specs.primaryKeyword).toBe("مشخصات فنی لوله پلی اتیلن");
    expect(pe100.primaryKeyword).toBe("لوله پلی اتیلن PE100");
    expect(new Set([overview.seoTitle, specs.seoTitle, pe100.seoTitle]).size).toBe(3);
    expect(overview.faqs?.length).toBeGreaterThanOrEqual(5);
  });
});
