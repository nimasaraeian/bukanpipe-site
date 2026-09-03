import { describe, expect, it } from "vitest";
import {
  organizationSchema,
  productSchema,
  webSiteSchema,
} from "@/lib/schema/builders";
import { serializeJsonLd } from "@/lib/schema/serialize";

describe("structured data builders", () => {
  it("emits Organization data without invented business facts", () => {
    const schema = organizationSchema();

    expect(schema["@type"]).toBe("Organization");
    expect(schema.name).toBe("Bukan Pipe");
    expect(schema.address).toBeUndefined();
    expect(schema.logo).toBeUndefined();
    expect(schema.sameAs).toBeUndefined();
    expect(schema.foundingDate).toBeUndefined();
    expect(Object.keys(schema).sort()).toEqual(
      ["@context", "@type", "name", "url"].sort(),
    );
  });

  it("emits WebSite language without search-action invention", () => {
    const schema = webSiteSchema();

    expect(schema["@type"]).toBe("WebSite");
    expect(schema.inLanguage).toBe("fa");
    expect(schema.potentialAction).toBeUndefined();
  });

  it("omits Product offers and unverified specifications", () => {
    const schema = productSchema({
      id: "draft-1",
      slug: "example",
      title: "Example product",
      description: "Draft record for helper tests only.",
      status: "draft",
      updatedAt: "2026-09-03",
    });

    expect(schema["@type"]).toBe("Product");
    expect(schema.offers).toBeUndefined();
    expect(schema.brand).toBeUndefined();
    expect(schema.sku).toBeUndefined();
    expect(schema.url).toBe("http://localhost:3000/products/example");
  });
});

describe("serializeJsonLd", () => {
  it("escapes < to avoid script breakout", () => {
    expect(serializeJsonLd({ name: "</script>" })).toContain("\\u003c/script>");
  });
});
