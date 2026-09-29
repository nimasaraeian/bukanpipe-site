import { describe, expect, it } from "vitest";
import { getContentByPath } from "@/lib/content/registry";
import { contactPageSchemas } from "@/lib/schema/contact";
import { entityIds } from "@/lib/schema/builders";

describe("contactPageSchemas", () => {
  /*
   * The contact page used to describe the company itself, a third time, with
   * its own name and telephone. It now points at the one company node the
   * layout emits, so there is nothing here for the two to disagree about.
   */
  it("points at the site-wide company instead of describing it again", () => {
    const doc = getContentByPath("en", "/contact");
    expect(doc).toBeDefined();

    const schemas = contactPageSchemas(doc!, (path) => `/en${path}`);
    const types = schemas.map((s) => s["@type"]);

    expect(types).toEqual(["ContactPage", "BreadcrumbList"]);
    expect(schemas[0]?.mainEntity).toEqual({ "@id": entityIds.organization });
    expect(types).not.toContain("Organization");
    expect(types).not.toContain("LocalBusiness");
  });

  it("carries no geo coordinates, because the factory pin is unverified", () => {
    const doc = getContentByPath("en", "/contact");
    expect(doc).toBeDefined();
    const serialized = JSON.stringify(contactPageSchemas(doc!, (p) => `/en${p}`));
    expect(serialized).not.toContain("GeoCoordinates");
    expect(serialized).not.toContain("latitude");
  });
});
