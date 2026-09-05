import { describe, expect, it } from "vitest";
import {
  organizationSchema,
  manufacturingBusinessSchema,
  productSchema,
  webSiteSchema,
} from "@/lib/schema/builders";
import { serializeJsonLd } from "@/lib/schema/serialize";

describe("structured data builders", () => {
  it("emits Organization data with verified postal address only", () => {
    const schema = organizationSchema();

    expect(schema["@type"]).toBe("Organization");
    expect(schema.name).toBe("Bukan Pipe");
    expect(schema.address).toMatchObject({
      "@type": "PostalAddress",
      postalCode: "5955164341",
      addressLocality: "Bukan",
    });
    expect(schema.address).not.toHaveProperty("geo");
    expect(schema.logo).toContain("/media/demo/logo.png");
    expect(schema.sameAs).toBeUndefined();
    expect(schema.foundingDate).toBeUndefined();
    expect(schema.alternateName).toBe("Bukan Pipe");
  });

  it("emits WebSite language per locale", () => {
    expect(webSiteSchema("en").inLanguage).toBe("en");
    expect(webSiteSchema("fa").inLanguage).toBe("fa");
    expect(webSiteSchema("en").potentialAction).toBeUndefined();
  });

  it("emits ManufacturingBusiness with factory contact", () => {
    const schema = manufacturingBusinessSchema();
    expect(schema["@type"]).toBe("ManufacturingBusiness");
    expect(schema.telephone).toBe("+98-44-46433444");
    expect(schema.logo).toContain("/media/demo/logo.png");
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
    expect(schema.brand).toMatchObject({ name: "Bukan Pipe" });
    expect(schema.manufacturer).toMatchObject({ name: "Bukan Pipe" });
    expect(schema.sku).toBeUndefined();
    expect(schema.url).toBe("http://localhost:3000/products/example");
  });
});

describe("serializeJsonLd", () => {
  it("escapes < to avoid script breakout", () => {
    expect(serializeJsonLd({ name: "</script>" })).toContain("\\u003c/script>");
  });
});
