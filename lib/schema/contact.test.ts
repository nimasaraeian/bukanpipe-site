import { describe, expect, it } from "vitest";
import { contactPageSchemas } from "@/lib/schema/contact";
import { enContact } from "@/data/content/en/company";

describe("contactPageSchemas", () => {
  it("includes LocalBusiness address without geo coordinates", () => {
    const schemas = contactPageSchemas(enContact, (path) => `/en${path === "/" ? "" : path}`);
    const localBusiness = schemas.find(
      (schema) => schema["@type"] === "LocalBusiness",
    ) as Record<string, unknown>;

    expect(localBusiness).toBeDefined();
    const address = localBusiness.address as Record<string, string>;
    expect(address["@type"]).toBe("PostalAddress");
    expect(address.postalCode).toBe("5955164341");
    expect(address).not.toHaveProperty("geo");
  });
});
