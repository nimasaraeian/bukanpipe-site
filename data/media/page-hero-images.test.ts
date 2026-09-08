import { describe, expect, it } from "vitest";
import { editorialPhotos } from "@/data/media/editorial-photos";
import { getPageCardImages, getPageHeroImage, industrialSlides } from "@/data/media/page-hero-images";
import { routes } from "@/lib/config/routes";
import { productSystemAssets } from "@/lib/products/product-assets";

describe("page hero images", () => {
  it("uses approved photography for inner pages", () => {
    const slideSrcs = new Set(Object.values(industrialSlides));
    const brandHeroPaths = new Set([
      routes.about.path,
      routes.applications.path,
      routes.laboratory.path,
      "/calculator",
      "/quality",
    ]);

    for (const path of Object.values(routes).map((r) => r.path)) {
      if (path === routes.home.path) continue;
      const hero = getPageHeroImage(path);
      if (brandHeroPaths.has(path)) {
        expect(hero.variant).toBe("brand");
        expect(
          hero.src.startsWith("/media/brand/") ||
            hero.src.startsWith("/media/editorial/") ||
            hero.src.startsWith("/media/demo/"),
        ).toBe(true);
        continue;
      }
      expect(slideSrcs.has(hero.src as (typeof industrialSlides)[keyof typeof industrialSlides])).toBe(
        true,
      );
    }

    const calculatorHero = getPageHeroImage("/calculator");
    expect(calculatorHero.src).toBe("/media/brand/calculator-hero.png");
    expect(calculatorHero.sceneModifier).toBe("calculator");

    const laboratoryHero = getPageHeroImage(routes.laboratory.path);
    expect(laboratoryHero.src).toBe(editorialPhotos.laboratoryHero);
    expect(laboratoryHero.sceneModifier).toBe("laboratory");

    const aboutHero = getPageHeroImage(routes.about.path);
    expect(aboutHero.src).toBe(editorialPhotos.aboutHero);

    const qualityHero = getPageHeroImage("/quality");
    expect(qualityHero.src).toBe(editorialPhotos.qualityHero);
    expect(qualityHero.sceneModifier).toBe("quality");
  });

  it("uses distinct heroes for each application detail page", () => {
    const water = getPageHeroImage("/applications/water-transfer");
    const sewage = getPageHeroImage("/applications/sewage");
    const drainage = getPageHeroImage("/applications/drainage");

    expect(water.src).toBe(productSystemAssets.water);
    expect(sewage.src).toBe(productSystemAssets.sewer);
    expect(drainage.src).toBe(productSystemAssets.drainage);
    expect(water.variant).toBe("product");
    expect(water.src).not.toBe(sewage.src);
    expect(sewage.src).not.toBe(drainage.src);
  });

  it("keeps the applications hub on brand photography", () => {
    const hub = getPageHeroImage(routes.applications.path);
    expect(hub.src).toBe("/media/brand/applications-hero.png");
    expect(hub.variant).toBe("brand");
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
