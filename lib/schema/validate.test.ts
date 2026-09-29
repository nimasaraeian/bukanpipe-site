import { describe, expect, it } from "vitest";
import { locales, type Locale } from "@/lib/i18n/config";
import { getPublishedContent } from "@/lib/content/registry";
import { contentDocumentSchemas } from "@/lib/schema/content-document";
import { contactPageSchemas } from "@/lib/schema/contact";
import { galleryPageSchema } from "@/lib/schema/gallery-schema";
import { entityIds, organizationSchema, webSiteSchema } from "@/lib/schema/builders";
import { isSchemaType, unknownProperties } from "@/lib/schema/vocabulary";

const localePath = (locale: Locale) => (path: string) =>
  path === "/" ? `/${locale}` : `/${locale}${path}`;

type Node = Record<string, unknown>;

/** Every JSON-LD node the site emits, with the page it came from. */
function allNodes(): { page: string; node: Node }[] {
  const out: { page: string; node: Node }[] = [];
  const push = (page: string, nodes: readonly unknown[]) => {
    for (const node of nodes) {
      if (!node || typeof node !== "object") continue;
      const record = node as Node;
      if (Array.isArray(record["@graph"])) {
        push(page, record["@graph"] as unknown[]);
        continue;
      }
      out.push({ page, node: record });
    }
  };

  for (const locale of locales) {
    push(`/${locale} (layout)`, [organizationSchema(locale), webSiteSchema(locale)]);
    push(`/${locale}/gallery`, galleryPageSchema(locale));
    for (const doc of getPublishedContent(locale)) {
      const schemas =
        doc.path === "/contact"
          ? contactPageSchemas(doc, localePath(locale))
          : contentDocumentSchemas(doc, localePath(locale));
      push(`/${locale}${doc.path}`, schemas);
    }
  }
  return out;
}

/** Walks a node and every object nested inside it. */
function walk(node: Node, visit: (n: Node) => void) {
  visit(node);
  for (const value of Object.values(node)) {
    for (const child of Array.isArray(value) ? value : [value]) {
      if (child && typeof child === "object") walk(child as Node, visit);
    }
  }
}

function typesOf(node: Node): string[] {
  const type = node["@type"];
  if (typeof type === "string") return [type];
  if (Array.isArray(type)) return type.map(String);
  return [];
}

describe("structured data validates against schema.org", () => {
  const nodes = allNodes();

  it("emits something to check", () => {
    expect(nodes.length).toBeGreaterThan(200);
  });

  it("names only types schema.org defines", () => {
    const bad: string[] = [];
    for (const { page, node } of nodes) {
      walk(node, (n) => {
        for (const type of typesOf(n)) {
          if (!isSchemaType(type)) bad.push(`${page}: @type "${type}"`);
        }
      });
    }
    expect([...new Set(bad)]).toEqual([]);
  });

  /*
   * The check the Rich Results Test is really useful for: a property that the
   * type does not define is silently dropped, so the markup looks fine and
   * says nothing.
   */
  it("uses only properties those types define", () => {
    const bad: string[] = [];
    for (const { page, node } of nodes) {
      walk(node, (n) => {
        const types = typesOf(n);
        if (types.length === 0) return;
        const keys = Object.keys(n);
        // a property is fair game if any of the node's types defines it
        const unknown = types
          .map((type) => new Set(unknownProperties(type, keys)))
          .reduce((a, b) => new Set([...a].filter((key) => b.has(key))));
        for (const key of unknown) bad.push(`${page}: ${types.join("+")}.${key}`);
      });
    }
    expect([...new Set(bad)].sort()).toEqual([]);
  });

  it("leaves no empty values behind", () => {
    const bad: string[] = [];
    for (const { page, node } of nodes) {
      walk(node, (n) => {
        for (const [key, value] of Object.entries(n)) {
          if (value === null || value === undefined) bad.push(`${page}: ${key} is ${value}`);
          if (typeof value === "string" && value.trim() === "") bad.push(`${page}: ${key} is ""`);
          if (Array.isArray(value) && value.length === 0) bad.push(`${page}: ${key} is []`);
        }
      });
    }
    expect([...new Set(bad)]).toEqual([]);
  });

  it("writes absolute urls and ISO dates", () => {
    const bad: string[] = [];
    const DATE_KEYS = ["datePublished", "dateModified", "foundingDate", "expires"];
    for (const { page, node } of nodes) {
      walk(node, (n) => {
        for (const [key, value] of Object.entries(n)) {
          if (typeof value !== "string") continue;
          if ((key === "url" || key === "contentUrl") && !/^https?:\/\//.test(value)) {
            bad.push(`${page}: ${key}=${value}`);
          }
          if (DATE_KEYS.includes(key) && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            bad.push(`${page}: ${key}=${value}`);
          }
        }
      });
    }
    expect([...new Set(bad)]).toEqual([]);
  });

  /*
   * Every @id a page points at must be a node some page actually defines, or
   * the reference dangles and the manufacturer/publisher slot resolves to
   * nothing.
   */
  it("resolves every @id it points at", () => {
    const defined = new Set<string>([entityIds.organization, entityIds.website]);
    for (const { node } of nodes) {
      walk(node, (n) => {
        const id = n["@id"];
        if (typeof id === "string" && Object.keys(n).length > 1) defined.add(id);
      });
    }

    const dangling: string[] = [];
    for (const { page, node } of nodes) {
      walk(node, (n) => {
        const id = n["@id"];
        if (typeof id === "string" && Object.keys(n).length === 1 && !defined.has(id)) {
          dangling.push(`${page}: ${id}`);
        }
      });
    }
    expect([...new Set(dangling)]).toEqual([]);
  });
});

/**
 * Google's own requirements for the result types this site is eligible for.
 * Taken from the developer documentation for each feature; the vocabulary
 * check above cannot see these, because a missing property is still valid
 * schema.org.
 */
describe("Google rich result requirements", () => {
  const nodes = allNodes();
  const ofType = (type: string) =>
    nodes.filter(({ node }) => typesOf(node).includes(type));

  it("gives every ProductModel a name and an image", () => {
    const products = ofType("ProductModel");
    expect(products.length).toBeGreaterThan(0);
    for (const { page, node } of products) {
      expect(node.name, page).toEqual(expect.any(String));
      expect(node.image, page).toBeDefined();
      expect(node.description, page).toEqual(expect.any(String));
    }
  });

  it("gives every Question an acceptedAnswer with text", () => {
    for (const { page, node } of ofType("FAQPage")) {
      const questions = node.mainEntity as { name: string; acceptedAnswer: { text: string } }[];
      expect(questions.length, page).toBeGreaterThan(0);
      for (const question of questions) {
        expect(question.name, page).toEqual(expect.any(String));
        expect(question.acceptedAnswer.text, page).toEqual(expect.any(String));
      }
    }
  });

  it("numbers every breadcrumb from one, with a name and an item", () => {
    for (const { page, node } of ofType("BreadcrumbList")) {
      const items = node.itemListElement as { position: number; name: string; item: string }[];
      expect(items.length, page).toBeGreaterThan(0);
      items.forEach((item, index) => {
        expect(item.position, page).toBe(index + 1);
        expect(item.name, page).toEqual(expect.any(String));
        expect(item.item, page).toMatch(/^https?:\/\//);
      });
    }
  });

  it("gives every article a headline, both dates, an author and a publisher", () => {
    const articles = [...ofType("Article"), ...ofType("TechArticle")];
    expect(articles.length).toBeGreaterThan(0);
    for (const { page, node } of articles) {
      expect(node.headline, page).toEqual(expect.any(String));
      expect(node.datePublished, page).toEqual(expect.any(String));
      expect(node.dateModified, page).toEqual(expect.any(String));
      expect(node.author, page).toEqual({ "@id": entityIds.organization });
      expect(node.publisher, page).toEqual({ "@id": entityIds.organization });
    }
  });

  it("gives the company a name, a logo, an address and a telephone", () => {
    for (const locale of locales) {
      const org = organizationSchema(locale);
      expect(org.name).toEqual(expect.any(String));
      expect(org.logo).toMatchObject({ "@type": "ImageObject" });
      expect(org.address).toMatchObject({ "@type": "PostalAddress", addressCountry: "IR" });
      expect(org.telephone).toEqual(expect.any(String));
      expect(org.url).toMatch(/^https?:\/\//);
    }
  });
});
