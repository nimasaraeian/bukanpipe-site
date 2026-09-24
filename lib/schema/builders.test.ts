import { describe, expect, it } from "vitest";
import { publishedDocuments, withheldDocuments } from "@/data/company/documents";
import { awards } from "@/data/company/awards";
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
    expect(schema.logo).toMatchObject({
      "@type": "ImageObject",
      url: expect.stringMatching(/^https?:\/\/.+\/media\/demo\/logo\.png$/),
      width: 1024,
      height: 1024,
    });
    expect(schema.sameAs).toEqual(["https://www.instagram.com/bukanpipe_company/"]);
    /*
     * This used to assert foundingDate was absent, because nothing in the repo
     * established it. The industrial operating licence does: registration 121
     * of 1373/06/26. The guard now pins the verified value instead of the gap.
     */
    expect(schema.foundingDate).toBe("1994-09-17");
    expect(schema.identifier).toMatchObject({
      "@type": "PropertyValue",
      propertyID: "IR-NationalID",
      value: "10220007922",
    });
    expect(schema.legalName).toBe("Bukan Polyethylene Pipe Company");
    expect(schema.alternateName).toBe("بوکان پایپ");
    expect(schema.description).toEqual(expect.any(String));
    expect(schema.contactPoint).toMatchObject({
      "@type": "ContactPoint",
      telephone: "+98-44-46433444",
      email: "info@bukanpipe.com",
      contactType: "sales",
    });
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
    expect(schema.category).toBe("HDPE polyethylene pipe");
    expect(schema.url).toBe("http://localhost:3000/products/example");
  });
});

describe("serializeJsonLd", () => {
  it("escapes < to avoid script breakout", () => {
    expect(serializeJsonLd({ name: "</script>" })).toContain("\\u003c/script>");
  });
});

describe("organization credentials in structured data", () => {
  it("lists only credentials the document registry publishes", () => {
    const schema = organizationSchema();
    const credentials = schema.hasCredential as { identifier?: string; name: string }[];

    expect(credentials.length).toBeGreaterThan(0);

    const published = new Set(
      publishedDocuments()
        .filter((d) => d.group === "management-system" || d.group === "standard-mark")
        .map((d) => d.title.en),
    );
    for (const credential of credentials) {
      expect(published.has(credential.name)).toBe(true);
    }
  });

  it("never emits a withheld document's number", () => {
    const serialized = JSON.stringify(organizationSchema());
    for (const doc of withheldDocuments()) {
      if (doc.reference) expect(serialized).not.toContain(doc.reference);
    }
  });

  it("carries every published award", () => {
    const schema = organizationSchema();
    expect((schema.award as string[]).length).toBe(awards.length);
  });
});
