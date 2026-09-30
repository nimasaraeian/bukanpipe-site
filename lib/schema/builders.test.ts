import { describe, expect, it } from "vitest";
import { publishedDocuments, withheldDocuments } from "@/data/company/documents";
import { awards } from "@/data/company/awards";
import { schemaAwards } from "@/lib/schema/awards";
import { contactConfig, getGoogleMapsDirectionsUrl } from "@/lib/config/contact";
import {
  entityIds,
  organizationSchema,
  productSchema,
  webSiteSchema,
} from "@/lib/schema/builders";
import { serializeJsonLd } from "@/lib/schema/serialize";

describe("structured data builders", () => {
  it("emits Organization data with verified postal address only", () => {
    const schema = organizationSchema();

    /*
     * One node, typed as both. It was ManufacturingBusiness, which schema.org
     * does not define — there is no manufacturing subtype of LocalBusiness —
     * so the node named a type nothing understands. LocalBusiness is real and
     * takes the address, hours and telephone; Organization stays named
     * outright for anything that matches on that.
     */
    expect(schema["@type"]).toEqual(["Organization", "LocalBusiness"]);
    expect(schema["@id"]).toBe(entityIds.organization);
    expect(schema.name).toBe("Bukan Pipe");
    expect(schema.address).toMatchObject({
      "@type": "PostalAddress",
      postalCode: "5955164341",
      addressLocality: "Bukan",
    });
    expect(schema.address).not.toHaveProperty("geo");
    /*
     * geo belongs to the node, not to the postal address, and it must be the
     * same point the contact page's map shows.
     */
    expect(schema.geo).toEqual({
      "@type": "GeoCoordinates",
      latitude: contactConfig.factory.googleMaps.latitude,
      longitude: contactConfig.factory.googleMaps.longitude,
    });
    expect(schema.hasMap).toBe(getGoogleMapsDirectionsUrl());
    expect(schema.logo).toMatchObject({
      "@type": "ImageObject",
      url: expect.stringMatching(/^https?:\/\/.+\/media\/brand\/bukan-pipe-logo\.png$/),
      width: 1024,
      height: 1024,
    });
    expect(schema.sameAs).toEqual([
      "https://www.instagram.com/bukanpipe_company/",
      "https://t.me/+989352197676",
      "https://wa.me/989352197676",
    ]);
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
    expect(schema.legalName).toBe("Bukan Polyethylene Pipe Cooperative Company");
    expect(schema.alternateName).toBe("بوکان پایپ");
    expect(schema.description).toEqual(expect.any(String));
    expect(schema.isicV4).toBe("2220");
    expect(schema.contactPoint).toMatchObject([
      { "@type": "ContactPoint", contactType: "sales", email: "info@bukanpipe.com" },
      { "@type": "ContactPoint", contactType: "technical support", email: "lab@bukanpipe.com" },
    ]);
  });

  it("names the company in the language of the page", () => {
    expect(organizationSchema("fa").name).toBe("بوکان پایپ");
    expect(organizationSchema("fa").legalName).toBe("شرکت تعاونی لوله پلی اتیلن بوکان");
    expect(organizationSchema("en").name).toBe("Bukan Pipe");
  });

  /*
   * The opening hours are printed on the contact page as a sentence. If the
   * two ever disagree the structured data is telling search engines something
   * the page denies, so they are pinned to each other here.
   */
  it("declares the opening hours the contact page prints", () => {
    const hours = organizationSchema().openingHoursSpecification as Record<string, unknown>;
    const { opens, closes, days } = contactConfig.officeHoursSpec;

    expect(hours.opens).toBe(opens);
    expect(hours.closes).toBe(closes);
    expect(hours.dayOfWeek).toEqual(days.map((d) => `https://schema.org/${d}`));

    expect(contactConfig.officeHours.en).toContain(opens);
    expect(contactConfig.officeHours.en).toContain(closes);
    expect(contactConfig.officeHours.en).toContain(days[0]);
    expect(contactConfig.officeHours.en).toContain(days[days.length - 1]);
  });

  it("emits WebSite language per locale", () => {
    expect(webSiteSchema("en").inLanguage).toBe("en");
    expect(webSiteSchema("fa").inLanguage).toBe("fa");
    expect(webSiteSchema("en").potentialAction).toBeUndefined();
  });

  it("points the website at the company rather than restating it", () => {
    const site = webSiteSchema("fa");
    expect(site["@id"]).toBe(entityIds.website);
    expect(site.publisher).toEqual({ "@id": entityIds.organization });
  });

  it("omits offers and unverified specifications", () => {
    const schema = productSchema({
      id: "draft-1",
      slug: "example",
      title: "Example product",
      description: "Draft record for helper tests only.",
      status: "draft",
      updatedAt: "2026-09-03",
    });

    expect(schema["@type"]).toBe("ProductModel");
    expect(schema.offers).toBeUndefined();
    expect(schema.brand).toMatchObject({ name: "Bukan Pipe" });
    expect(schema.manufacturer).toEqual({ "@id": entityIds.organization });
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

  /*
   * The page lists all thirty-four commendations, with the provenance of
   * each written beside it. The graph cannot qualify a claim, so it carries
   * only the ones the archive can show — see lib/schema/awards.ts.
   */
  it("claims only the awards the selection keeps", () => {
    const schema = organizationSchema();
    const claimed = schema.award as string[];

    expect(claimed.length).toBe(schemaAwards().length);
    expect(claimed.length).toBeLessThan(awards.length);
    expect(claimed.length).toBeLessThanOrEqual(15);
  });

  /*
   * Matched by identity, not by title: several plaques share a title across
   * different years, so a catalogue entry's words can legitimately appear in
   * the graph by way of a different, evidenced award.
   */
  it("never claims an award with no plaque behind it", () => {
    const kept = schemaAwards();
    for (const award of awards) {
      if ((award.source ?? "plaque") === "plaque") continue;
      expect(kept, `${award.id} has no plaque in the archive`).not.toContain(award);
    }
    // and the caveat the page carries must never reach the graph as an issuer
    expect((organizationSchema().award as string[]).join(" | ")).not.toContain(
      "plaque not in the archive",
    );
  });

  it("does not count turning up at a trade fair as an award", () => {
    const kept = schemaAwards();
    for (const award of awards.filter((a) => a.category === "exhibition")) {
      expect(kept, award.id).not.toContain(award);
    }
    expect((organizationSchema().award as string[]).join(" | ")).not.toContain("Participation");
  });

  /*
   * `year` on the data is the plaque's whole date line, which belongs on the
   * page. In an English award string it reads as Persian prose dropped into
   * an English sentence.
   */
  it("writes a bare year, with no Persian left in the English string", () => {
    for (const name of organizationSchema().award as string[]) {
      expect(name, name).not.toMatch(/[\u0600-\u06FF]/);
      expect(name, name).toMatch(/\((1[34]\d{2}|(19|20)\d{2})\)$/);
    }
  });
});

describe("credential expiry dates", () => {
  /*
   * The printed expiry and the machine-readable one have to be the same day.
   * The page shows the first; structured data declares the second.
   */
  it("matches the ISO expiry to the date printed on the document", () => {
    const months = [
      "ژانویه", "فوریه", "مارس", "آوریل", "مه", "ژوئن",
      "ژوئیه", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر",
    ];
    const digits = (text: string) =>
      text.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));

    /*
     * Only the groups the credential schema draws from. The sector approvals
     * print their expiry in the Iranian calendar and never reach structured
     * data, so converting them would be work for nobody.
     */
    const dated = publishedDocuments().filter(
      (doc) =>
        doc.validUntil &&
        (doc.group === "management-system" || doc.group === "standard-mark"),
    );
    expect(dated.length).toBeGreaterThan(0);

    for (const doc of dated) {
      expect(doc.validUntilIso, doc.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);

      const [day = "", month = "", year = ""] = digits(doc.validUntil ?? "").split(" ");
      const iso = `${year}-${String(months.indexOf(month) + 1).padStart(2, "0")}-${day.padStart(2, "0")}`;
      expect(doc.validUntilIso, `${doc.id}: printed "${doc.validUntil}"`).toBe(iso);
    }
  });
});
