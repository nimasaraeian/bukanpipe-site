import { describe, expect, it } from "vitest";
import { editorialPhotos } from "@/data/media/editorial-photos";
import { getPageCardImages, getPageHeroImage, getIndustrialPageHeroImageProps, industrialSlides } from "@/data/media/page-hero-images";
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
      "/certifications",
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
    expect(calculatorHero.src).toBe("/media/brand/calculator-hero.webp");
    expect(calculatorHero.sceneModifier).toBe("calculator");

    const laboratoryHero = getPageHeroImage(routes.laboratory.path);
    expect(laboratoryHero.src).toBe(editorialPhotos.laboratoryHero);
    expect(laboratoryHero.sceneModifier).toBe("laboratory");

    const aboutHero = getPageHeroImage(routes.about.path);
    expect(aboutHero.src).toBe(editorialPhotos.aboutHero);

    const qualityHero = getPageHeroImage("/quality");
    expect(qualityHero.src).toBe(editorialPhotos.qualityHero);
    expect(qualityHero.sceneModifier).toBe("quality");

    const certificationsHero = getPageHeroImage("/certifications");
    expect(certificationsHero.src).toBe("/media/brand/certifications-page-hero.webp");
    expect(certificationsHero.variant).toBe("brand");
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
    expect(hub.src).toBe("/media/brand/applications-hero.webp");
    expect(hub.variant).toBe("brand");
  });

  it("keeps Engineering and Company heroes on EN sides", () => {
    expect(getIndustrialPageHeroImageProps(getPageHeroImage("/technical-center")).matchEnSides).toBe(true);
    expect(getIndustrialPageHeroImageProps(getPageHeroImage("/calculator")).matchEnSides).toBe(true);
    expect(getIndustrialPageHeroImageProps(getPageHeroImage("/downloads")).matchEnSides).toBe(true);
    expect(getIndustrialPageHeroImageProps(getPageHeroImage(routes.about.path)).matchEnSides).toBe(true);
    expect(getIndustrialPageHeroImageProps(getPageHeroImage(routes.laboratory.path)).matchEnSides).toBe(true);
    expect(getIndustrialPageHeroImageProps(getPageHeroImage("/quality")).matchEnSides).toBe(true);
    expect(getIndustrialPageHeroImageProps(getPageHeroImage("/certifications")).matchEnSides).toBe(true);
    expect(getIndustrialPageHeroImageProps(getPageHeroImage(routes.applications.path)).matchEnSides).toBe(false);
    expect(getIndustrialPageHeroImageProps(getPageHeroImage(routes.contact.path)).matchEnSides).toBe(false);
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
