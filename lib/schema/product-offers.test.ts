import { describe, expect, it } from "vitest";
import { locales } from "@/lib/i18n/config";
import { getPublishedContent } from "@/lib/content/registry";
import { contentDocumentSchemas } from "@/lib/schema/content-document";
import { entityIds } from "@/lib/schema/builders";
import { isSchemaType, unknownProperties } from "@/lib/schema/vocabulary";

type Node = Record<string, unknown>;

/** Every schema node on every product page, both languages. */
function productPages(): { page: string; nodes: Node[] }[] {
  const out: { page: string; nodes: Node[] }[] = [];
  for (const locale of locales) {
    for (const doc of getPublishedContent(locale, "product")) {
      out.push({
        page: `/${locale}${doc.path}`,
        nodes: contentDocumentSchemas(doc, (p) => `/${locale}${p}`) as Node[],
      });
    }
  }
  return out;
}

const entity = (nodes: Node[]) => nodes.find((n) => n["@type"] === "ProductModel");

describe("product pages carry no offer", () => {
  const pages = productPages();

  it("covers both languages", () => {
    expect(pages.length).toBeGreaterThanOrEqual(12);
  });

  /*
   * Search Console reported "Either offers, review, or aggregateRating should
   * be specified" on these pages. The three ways out of it are to publish a
   * price, to publish ratings, or to stop claiming the page offers something.
   * The site publishes neither prices nor reviews, and inventing either would
   * be worse than the warning, so the type is the one that makes no offer.
   */
  it("declares no offers, price, review or rating anywhere", () => {
    for (const { page, nodes } of pages) {
      const serialized = JSON.stringify(nodes);
      for (const forbidden of [
        '"offers"',
        '"price"',
        '"priceCurrency"',
        '"priceSpecification"',
        '"review"',
        '"aggregateRating"',
        '"ratingValue"',
        '"availability"',
      ]) {
        expect(serialized, `${page} declares ${forbidden}`).not.toContain(forbidden);
      }
    }
  });

  /*
   * The condition Google's check actually tests. A Product — "any *offered*
   * product or service" — with none of the three is the state that gets
   * flagged. A ProductModel is a specification and makes no offer, so the
   * question does not arise. This fails the moment anything re-types these
   * pages back to Product without also giving them an offer.
   */
  it("is never an offer-less Product, which is the state Google flags", () => {
    for (const { page, nodes } of pages) {
      for (const node of nodes) {
        if (node["@type"] !== "Product") continue;
        const offered =
          "offers" in node || "review" in node || "aggregateRating" in node;
        expect(
          offered,
          `${page}: a Product with no offers, review or aggregateRating — ` +
            "either give it one or type it ProductModel",
        ).toBe(true);
      }
    }
  });

  it("uses ProductModel, and schema.org defines it", () => {
    expect(isSchemaType("ProductModel")).toBe(true);
    for (const { page, nodes } of pages) {
      expect(entity(nodes), `${page} has no ProductModel`).toBeDefined();
    }
  });

  /* The move must not have cost the page anything it was saying before. */
  it("keeps the specification, the brand and the manufacturer", () => {
    for (const { page, nodes } of pages) {
      const product = entity(nodes)!;

      expect(product.material, page).toEqual(expect.any(String));
      expect((product.additionalProperty as unknown[]).length, page).toBeGreaterThan(0);
      expect(product.brand, page).toMatchObject({ "@type": "Brand" });
      expect(product.manufacturer, page).toEqual({ "@id": entityIds.organization });
      expect(product.name, page).toEqual(expect.any(String));
      expect(product.description, page).toEqual(expect.any(String));
      expect(product.image, page).toBeDefined();

      // and every property must still be one ProductModel defines
      expect(unknownProperties("ProductModel", Object.keys(product)), page).toEqual([]);
    }
  });

  /* The other markup on these pages was not part of the problem. */
  it("leaves the breadcrumb and the FAQ alone", () => {
    for (const { page, nodes } of pages) {
      const types = nodes.map((n) => String(n["@type"]));
      expect(types, page).toContain("BreadcrumbList");
      expect(types, page).toContain("FAQPage");
    }
  });
});
