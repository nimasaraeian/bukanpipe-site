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

describe.each(slugs)("English pillar: %s", (slug) => {
  const path = `/technical-center/${slug}`;
  const doc = getContentByPath("en", path)!;

  it("publishes through the existing article registry and sitemap", () => {
    expect(doc).toBeDefined();
    expect(getPublishedContent("en", "article")).toContain(doc);
    expect(getSitemapPathsForLocale("en")).toContain(path);
    const metadata = createContentMetadata(doc, "en");
    expect(metadata.description).toBe(doc.seoDescription);
    expect(metadata.keywords).toContain(doc.primaryKeyword);
    expect(metadata.alternates?.canonical).toContain(`/en${path}`);
  });

  it("has at least 3500 English prose words without counting SEO, headings, tables or FAQ", () => {
    const paragraphs = doc.sections.flatMap((block) =>
      block.type === "paragraph" || block.type === "spec-cta" ? [block.text] : [],
    );
    const words = paragraphs
      .join(" ")
      .split(/\s+/u)
      .filter((word) => /[a-z]/i.test(word));
    expect(words.length).toBeGreaterThanOrEqual(3500);
    expect(new Set(paragraphs).size).toBe(paragraphs.length);
    expect(paragraphs.join(" ")).not.toMatch(
      /largest manufacturer|biggest manufacturer|only manufacturer|sole manufacturer/i,
    );
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
      if (href !== "/request-quote") expect(getContentByPath("en", href), href).toBeDefined();
    }
  });

  it("uses the visible FAQ entries verbatim in FAQ schema", () => {
    expect(doc.faqs?.length).toBeGreaterThanOrEqual(6);
    const schemas = contentDocumentSchemas(doc, (href) => withLocale(href, "en"));
    const faq = schemas.find((schema) => schema["@type"] === "FAQPage");
    expect(faq?.mainEntity).toEqual(
      doc.faqs!.map((entry) => ({
        "@type": "Question",
        name: entry.question,
        acceptedAnswer: { "@type": "Answer", text: entry.answer },
      })),
    );
    expect(schemas.find((schema) => schema["@type"] === "Article")).toMatchObject({
      headline: doc.title,
      inLanguage: "en",
    });
  });
});
