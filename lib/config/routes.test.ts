import { describe, expect, it } from "vitest";
import {
  deferredRoutes,
  plannedRoutes,
  publicRoutes,
  sitemapRoutes,
} from "@/lib/config/routes";

describe("route registry", () => {
  it("implements /verify as a public foundation route", () => {
    expect(publicRoutes.some((route) => route.path === "/verify")).toBe(true);
  });

  it("keeps export deferred and out of public routes and sitemap", () => {
    expect(deferredRoutes.export.path).toBe("/export");
    expect(publicRoutes.some((route) => route.path === "/export")).toBe(false);
    expect(sitemapRoutes.some((route) => route.path === "/export")).toBe(false);
  });

  it("excludes planned child URLs from the sitemap", () => {
    const sitemapPaths = new Set(sitemapRoutes.map((route) => route.path));

    for (const route of plannedRoutes) {
      expect(sitemapPaths.has(route.path)).toBe(false);
    }
  });

  it("only sitemaps implemented launch-indexable routes", () => {
    expect(sitemapRoutes.every((route) => route.includeInSitemap)).toBe(true);
    expect(sitemapRoutes.every((route) => route.lifecycle === "implemented")).toBe(
      true,
    );
  });

  it("keeps the internal design-system route out of the public sitemap", () => {
    expect(sitemapRoutes.some((route) => route.path === "/design-system")).toBe(
      false,
    );
    expect(publicRoutes.some((route) => route.path === "/design-system")).toBe(
      false,
    );
  });
});
