import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { getGalleryPageCopy, gallerySeo } from "@/data/gallery/content";
import {
  getFeaturedGalleryImages,
  getGalleryCategories,
  getGalleryHero,
  getGalleryImages,
  getGallerySitemapImageUrls,
  getGalleryStats,
} from "@/data/gallery";
import { createPageMetadata } from "@/lib/seo/metadata";
import { galleryPageSchema } from "@/lib/schema/gallery-schema";
import { serializeJsonLd } from "@/lib/schema/serialize";

describe("gallery manifest", () => {
  it("loads published images with unique ids and dimensions", () => {
    const images = getGalleryImages();
    expect(images.length).toBeGreaterThan(0);

    const ids = new Set<string>();
    for (const image of images) {
      expect(ids.has(image.id)).toBe(false);
      ids.add(image.id);
      expect(image.width).toBeGreaterThan(0);
      expect(image.height).toBeGreaterThan(0);
      expect(image.src).toMatch(/^\/media\/gallery\//);
      expect(image.altFa.length).toBeGreaterThan(10);
      expect(image.altEn.length).toBeGreaterThan(10);
      expect(image.altFa).not.toBe(image.altEn);
    }
  });

  it("has active categories only with images", () => {
    const categories = getGalleryCategories();
    const images = getGalleryImages();
    for (const cat of categories) {
      expect(cat.count).toBeGreaterThan(0);
      expect(images.some((img) => img.category === cat.id)).toBe(true);
    }
  });

  it("includes featured images and hero asset", () => {
    expect(getFeaturedGalleryImages().length).toBeGreaterThan(0);
    const hero = getGalleryHero();
    expect(hero?.src).toContain("bukan-pipe-hdpe-factory-aerial-hero");
  });

  it("uses editorial titles without numbered database labels", () => {
    const images = getGalleryImages();
    const numberedFa = /^(محصولات|خط تولید|انبار|لجستیک|کنترل کیفیت|محوطه کارخانه) \d+/;
    const numberedEn = /^(Products|Production line|Warehouse|Logistics|Quality control|Factory facility) \d+/;
    for (const image of images) {
      expect(image.titleFa).not.toMatch(numberedFa);
      expect(image.titleEn).not.toMatch(numberedEn);
      expect(image.titleFa).not.toContain(" — ");
      expect(image.titleEn).not.toMatch(/ — Bukan Pipe$/);
    }
  });

  it("maps sitemap image URLs for all published photos", () => {
    const urls = getGallerySitemapImageUrls();
    expect(urls.length).toBe(getGalleryStats().published);
  });
});

describe("gallery page metadata", () => {
  it("sets absolute titles without double brand suffix (FA)", () => {
    const metadata = createPageMetadata({
      title: gallerySeo.fa.title,
      description: gallerySeo.fa.description,
      path: "/gallery",
      locale: "fa",
      titleAbsolute: true,
    });
    expect(metadata.title).toEqual({ absolute: gallerySeo.fa.title });
    expect(gallerySeo.fa.title).not.toContain("| Bukan Pipe | Bukan Pipe");
    expect(metadata.alternates?.canonical).toBe("http://localhost:3000/fa/gallery");
    expect(metadata.alternates?.languages?.fa).toBe("http://localhost:3000/fa/gallery");
    expect(metadata.alternates?.languages?.en).toBe("http://localhost:3000/en/gallery");
  });

  it("sets absolute titles without double brand suffix (EN)", () => {
    const metadata = createPageMetadata({
      title: gallerySeo.en.title,
      description: gallerySeo.en.description,
      path: "/gallery",
      locale: "en",
      titleAbsolute: true,
    });
    expect(metadata.title).toEqual({ absolute: gallerySeo.en.title });
    expect(metadata.alternates?.canonical).toBe("http://localhost:3000/en/gallery");
  });
});

describe("gallery JSON-LD", () => {
  it("serializes valid JSON-LD for FA and EN", () => {
    for (const locale of ["fa", "en"] as const) {
      const schema = galleryPageSchema(locale);
      expect(() => JSON.parse(serializeJsonLd(schema))).not.toThrow();
      const raw = JSON.parse(serializeJsonLd(schema)) as
        | { "@graph": Array<Record<string, unknown>> }
        | Array<{ "@graph": Array<Record<string, unknown>> }>;
      const graph = Array.isArray(raw) ? raw[0]?.["@graph"] ?? [] : raw["@graph"];
      const nodes = Array.isArray(graph) ? graph : [graph];
      const types = nodes.flatMap((n) => (typeof n["@type"] === "string" ? [n["@type"]] : []));
      expect(types).toContain("CollectionPage");
      expect(types).toContain("ImageGallery");
      expect(types).toContain("BreadcrumbList");
    }
  });
});

describe("gallery page copy", () => {
  it("provides distinct FA and EN hero H1 copy", () => {
    const fa = getGalleryPageCopy("fa");
    const en = getGalleryPageCopy("en");
    expect(fa.h1).toBe("گالری کارخانه بوکان پایپ");
    expect(en.h1).toBe("Bukan Pipe Factory Gallery");
    expect(fa.intro.length).toBeGreaterThan(80);
    expect(en.intro.length).toBeGreaterThan(80);
  });
});

describe("gallery sitemap integration", () => {
  it("includes /gallery in locale sitemap paths", async () => {
    const { getSitemapPathsForLocale } = await import("@/lib/sitemap/paths");
    expect(getSitemapPathsForLocale("fa")).toContain("/gallery");
    expect(getSitemapPathsForLocale("en")).toContain("/gallery");
  });

  it("builds sitemap with gallery image attachments", async () => {
    const sitemap = (await import("@/app/sitemap")).default;
    const entries = sitemap();
    const faGallery = entries.find((e) => e.url === "http://localhost:3000/fa/gallery");
    const enGallery = entries.find((e) => e.url === "http://localhost:3000/en/gallery");
    expect(faGallery).toBeDefined();
    expect(enGallery).toBeDefined();
    expect(faGallery?.images?.length).toBe(getGalleryStats().published);
    expect(enGallery?.images?.length).toBe(getGalleryStats().published);
  });
});

describe("gallery SEO map document", () => {
  it("exists and lists published images", () => {
    const mapPath = path.join(process.cwd(), "docs", "seo", "GALLERY_IMAGE_SEO_MAP.md");
    const content = readFileSync(mapPath, "utf8");
    expect(content).toContain("# Gallery Image SEO Map");
    expect(content).toContain("bukan-pipe-hdpe-factory-aerial");
    const rowCount = content.split("\n").filter((line) => line.startsWith("|") && !line.includes("---")).length;
    expect(rowCount).toBeGreaterThan(getGalleryStats().published);
  });
});
