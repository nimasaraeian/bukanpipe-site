import { describe, expect, it } from "vitest";
import { locales, type Locale } from "@/lib/i18n/config";
import { getPublishedContent } from "@/lib/content/registry";
import { contentDocumentSchemas } from "@/lib/schema/content-document";
import { entityIds, organizationSchema, webSiteSchema } from "@/lib/schema/builders";
import type { ContentDocument } from "@/content/models/content-document";

const localePath = (locale: Locale) => (path: string) =>
  path === "/" ? `/${locale}` : `/${locale}${path}`;

function typesFor(doc: ContentDocument): string[] {
  return contentDocumentSchemas(doc, localePath(doc.locale)).map((s) => String(s["@type"]));
}

function every(check: (doc: ContentDocument, types: string[]) => void) {
  for (const locale of locales) {
    for (const doc of getPublishedContent(locale)) check(doc, typesFor(doc));
  }
}

describe("structured data coverage", () => {
  /*
   * Every page carries the company and the site, from the locale layout. The
   * per-page builders must not repeat them: two nodes for one company on the
   * same page is how an entity ends up ambiguous.
   */
  it("describes the company once per page, in the layout only", () => {
    every((doc, types) => {
      expect(types, doc.path).not.toContain("Organization");
      expect(types, doc.path).not.toContain("ManufacturingBusiness");
      expect(types, doc.path).not.toContain("WebSite");
    });
    expect(organizationSchema()["@id"]).toBe(entityIds.organization);
    expect(webSiteSchema()["@id"]).toBe(entityIds.website);
  });

  it("gives every content page a BreadcrumbList", () => {
    every((doc, types) => {
      expect(types, doc.path).toContain("BreadcrumbList");
    });
  });

  /*
   * The breadcrumb has to match the trail the page draws, or the two describe
   * different sites. Both read doc.breadcrumbs, and this holds them there.
   */
  it("builds the breadcrumb from the trail the page renders", () => {
    every((doc) => {
      const crumb = contentDocumentSchemas(doc, localePath(doc.locale)).find(
        (s) => s["@type"] === "BreadcrumbList",
      ) as { itemListElement: { name: string; position: number }[] };

      expect(crumb.itemListElement.map((i) => i.name), doc.path).toEqual(
        doc.breadcrumbs.map((b) => b.label),
      );
      expect(crumb.itemListElement.map((i) => i.position)).toEqual(
        doc.breadcrumbs.map((_, i) => i + 1),
      );
    });
  });

  it("marks up an FAQ wherever a page shows one, and nowhere else", () => {
    every((doc, types) => {
      const shown = Boolean(doc.faqs && doc.faqs.length > 0);
      expect(types.includes("FAQPage"), `${doc.path} shows ${doc.faqs?.length ?? 0} FAQs`).toBe(
        shown,
      );
    });
  });

  it("gives every product page a Product, and no other page one", () => {
    every((doc, types) => {
      expect(types.includes("Product"), doc.path).toBe(doc.kind === "product");
    });
  });

  it("types the technical centre as TechArticle and the rest as Article", () => {
    every((doc, types) => {
      if (doc.kind !== "article" && doc.kind !== "pillar") return;
      const technical =
        doc.path.startsWith("/technical-center") ||
        doc.path.startsWith("/pipe-size/") ||
        doc.kind === "pillar";
      expect(types, doc.path).toContain(technical ? "TechArticle" : "Article");
    });
  });

  it("dates every article, and shows the same dates on the page", () => {
    every((doc) => {
      if (doc.kind !== "article" && doc.kind !== "pillar") return;
      const article = contentDocumentSchemas(doc, localePath(doc.locale)).find((s) =>
        String(s["@type"]).endsWith("Article"),
      ) as Record<string, string>;

      expect(article.datePublished, `${doc.path} has no publication date`).toMatch(
        /^\d{4}-\d{2}-\d{2}$/,
      );
      expect(article.dateModified, doc.path).toBe(doc.lastReviewed);
      // the dateline component prints exactly these two fields
      expect(doc.publishedAt).toBe(article.datePublished);
    });
  });

  /*
   * A Product may not carry a price, because the site publishes none. An
   * offer without one is an empty promise in the search result.
   */
  it("never prices a product", () => {
    every((doc) => {
      const serialized = JSON.stringify(contentDocumentSchemas(doc, localePath(doc.locale)));
      expect(serialized, doc.path).not.toContain('"offers"');
      expect(serialized, doc.path).not.toContain('"price"');
    });
  });

  /*
   * Product properties are read out of the spec table the page draws, so a
   * value can only appear in the markup if it appears on the page.
   */
  it("takes every product property from the page's own spec table", () => {
    every((doc) => {
      if (doc.kind !== "product") return;
      const product = contentDocumentSchemas(doc, localePath(doc.locale)).find(
        (s) => s["@type"] === "Product",
      ) as { additionalProperty?: { name: string; value: string }[]; material?: string };

      const rows = doc.sections.flatMap((b) => (b.type === "spec-table" ? b.rows : []));
      expect(rows.length, `${doc.path} has no spec table`).toBeGreaterThan(0);

      for (const property of product.additionalProperty ?? []) {
        expect(
          rows.some((r) => r.label === property.name && r.value === property.value),
          `${doc.path}: "${property.name}" is not a row on the page`,
        ).toBe(true);
      }
      if (product.material) {
        expect(rows.some((r) => r.value === product.material)).toBe(true);
      }
    });
  });
});
