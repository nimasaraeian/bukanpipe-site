import { describe, expect, it } from "vitest";
import { getAllGuideDestinations, getGuideSections, getPriorityDestinations } from "./guide";
import { isAssistantPathAllowed } from "./routes";

describe("assistant guide catalog", () => {
  it("exposes the four navigation sections", () => {
    expect(getGuideSections().map((section) => section.id)).toEqual([
      "products",
      "technical",
      "company",
      "sales",
    ]);
  });

  it("only links to allowlisted paths", () => {
    for (const destination of getAllGuideDestinations()) {
      expect(isAssistantPathAllowed(destination.path)).toBe(true);
    }
  });

  it("includes required product and sales destinations", () => {
    const paths = getAllGuideDestinations().map((destination) => destination.path);
    expect(paths).toContain("/products/water-supply-pipe");
    expect(paths).toContain("/products/gas-pipe");
    expect(paths).toContain("/products/irrigation-pipe");
    expect(paths).toContain("/products/industrial-pipe");
    expect(paths).toContain("/request-quote");
    expect(paths).toContain("/contact");
    expect(paths).toContain("/downloads");
  });

  it("exposes two-click hubs for products, technical center, quote, and contact", () => {
    const paths = getPriorityDestinations().map((destination) => destination.path);
    expect(paths).toEqual(["/products", "/technical-center", "/request-quote", "/contact"]);
  });
});
