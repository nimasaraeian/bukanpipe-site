import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const CATALOG_SLUG_ROUTES = [
  "app/[locale]/products/[slug]/page.tsx",
  "app/[locale]/applications/[slug]/page.tsx",
  "app/[locale]/laboratory/[slug]/page.tsx",
  "app/[locale]/technical-center/[[...slug]]/page.tsx",
] as const;

describe("catalog slug routes reject unknown params", () => {
  it("sets dynamicParams = false on all enumerated slug routes", () => {
    for (const route of CATALOG_SLUG_ROUTES) {
      const source = readFileSync(join(process.cwd(), route), "utf8");
      expect(source, route).toMatch(/export const dynamicParams = false;/);
    }
  });
});
