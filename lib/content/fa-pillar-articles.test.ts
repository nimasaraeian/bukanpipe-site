import { describe, expect, it } from "vitest";
import { getContentByPath, getPublishedContent } from "@/lib/content/registry";
import { createContentMetadata } from "@/lib/content/metadata";
import { contentDocumentSchemas } from "@/lib/schema/content-document";
import { getSitemapPathsForLocale } from "@/lib/sitemap/paths";
import { withLocale } from "@/lib/i18n/path";

const slugs = [
  "polyethylene-pipe-complete-guide",
  "water-supply-polyethylene-pipe-guide",
  "gas-polyethylene-pipe-guide",
] as const;

describe.each(slugs)("Persian pillar: %s", (slug) => {
  const path = `/technical-center/${slug}`;
  const doc = getContentByPath("fa", path)!;

  it("publishes through the existing article registry and sitemap", () => {
    expect(doc).toBeDefined();
    expect(getPublishedContent("fa", "article")).toContain(doc);
    expect(getSitemapPathsForLocale("fa")).toContain(path);
    const metadata = createContentMetadata(doc, "fa");
    expect(metadata.description).toBe(doc.seoDescription);
    expect(metadata.keywords).toContain(doc.primaryKeyword);
    expect(metadata.alternates?.canonical).toContain(`/fa${path}`);
  });

  it("has at least 3500 Persian prose words without counting SEO, headings, tables or FAQ", () => {
    const paragraphs = doc.sections.flatMap((block) =>
      block.type === "paragraph" || block.type === "spec-cta" ? [block.text] : [],
    );
    // Whitespace separates words; Persian half-spaces remain inside a word.
    // Exclude Latin-only tokens and numbers from the conservative minimum.
    const words = paragraphs.join(" ").split(/\s+/u).filter((word) =>
      /[\u0621-\u064a\u067e\u0686\u0698\u06a9\u06af\u06cc]/u.test(word),
    );
    expect(words.length).toBeGreaterThanOrEqual(3500);
    expect(new Set(paragraphs).size).toBe(paragraphs.length);
    expect(paragraphs.join(" ")).not.toMatch(/بزرگ‌ترین تولیدکننده|بزرگترین تولیدکننده|اولین تولیدکننده|تنها تولیدکننده/);
  });

  it("links to valid products, laboratory, technical center, quote and contact pages", () => {
    const paths = doc.sections.flatMap((block) =>
      block.type === "internal-links" ? block.links.map((link) => link.path) : [],
    );
    expect(paths.some((href) => href.startsWith("/products/"))).toBe(true);
    for (const required of ["/laboratory", "/technical-center", "/request-quote", "/contact"]) {
      expect(paths).toContain(required);
    }
    for (const href of paths) {
      if (href !== "/request-quote") expect(getContentByPath("fa", href), href).toBeDefined();
    }
  });

  it("uses the visible FAQ entries verbatim in FAQ schema", () => {
    expect(doc.faqs?.length).toBeGreaterThanOrEqual(6);
    const schemas = contentDocumentSchemas(doc, (href) => withLocale(href, "fa"));
    const faq = schemas.find((schema) => schema["@type"] === "FAQPage");
    expect(faq?.mainEntity).toEqual(doc.faqs!.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })));
    expect(schemas.find((schema) => schema["@type"] === "Article")).toMatchObject({
      headline: doc.title,
      inLanguage: "fa",
    });
  });
});
