import { describe, expect, it } from "vitest";
import { getPageCardImages, getPageHeroImage, industrialSlides } from "@/data/media/page-hero-images";
import { routes } from "@/lib/config/routes";

describe("page hero images", () => {
  it("uses approved slide photography for inner pages", () => {
    const slideSrcs = new Set(Object.values(industrialSlides));
    for (const path of Object.values(routes).map((r) => r.path)) {
      if (path === routes.home.path) continue;
      const hero = getPageHeroImage(path);
      expect(slideSrcs.has(hero.src as (typeof industrialSlides)[keyof typeof industrialSlides])).toBe(
        true,
      );
    }
  });

  it("assigns card images from the same slide set", () => {
    const slideSrcs = new Set(Object.values(industrialSlides));
    for (const images of [
      getPageCardImages(routes.products.path),
      getPageCardImages(routes.applications.path),
    ]) {
      for (const src of images) {
        expect(slideSrcs.has(src as (typeof industrialSlides)[keyof typeof industrialSlides])).toBe(
          true,
        );
      }
    }
  });
});
