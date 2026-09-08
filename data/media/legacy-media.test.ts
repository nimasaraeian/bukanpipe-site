import { describe, expect, it } from "vitest";
import {
  HERO_IMAGE_POLICY,
  PUBLIC_MEDIA_SOURCES,
  descriptiveAlt,
  displayMediaIds,
  displayableStill,
  getLegacyMedia,
  legacyMedia,
  mediaByGrade,
} from "@/data/media/legacy-media";
import { mediaCategories, mediaGrades } from "@/data/media/types";
import { imageSitemapAttachments } from "@/lib/seo/image-sitemap";
import { ogCompositions } from "@/lib/seo/og";
import { createPageMetadata } from "@/lib/seo/metadata";

describe("legacy media inventory", () => {
  it("records WordPress library items with unique ids", () => {
    const ids = legacyMedia.map((item) => item.id);
    expect(ids.length).toBeGreaterThan(100);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has no A-grade hero stills", () => {
    expect(mediaByGrade("A")).toEqual([]);
    expect(HERO_IMAGE_POLICY.homepageTreatment).toBe("INDUSTRIAL_SIGNATURE");
    expect(HERO_IMAGE_POLICY.professionalPhotographyRequired).toBe(true);
    expect(HERO_IMAGE_POLICY.authenticHeroGrade).toBeNull();
  });

  it("keeps grades and categories inside the approved enums", () => {
    for (const item of legacyMedia) {
      expect(mediaGrades).toContain(item.visualQuality);
      expect(mediaCategories).toContain(item.category);
    }
  });

  it("only displays sampled stills that are not rejected", () => {
    for (const id of Object.values(displayMediaIds)) {
      const record = displayableStill(id);
      expect(record).toBeDefined();
      expect(record?.proposedFilename).toMatch(/^bukan-pipe-.*\.jpg$/);
      expect(record?.width).toBeGreaterThan(0);
      expect(record?.height).toBeGreaterThan(0);
      expect(record?.visualQuality).not.toBe("REJECT");
      expect(record?.visualQuality).not.toBe("A");
      expect(record?.sourceUrl).toMatch(/^https:\/\/bukanpipe\.com\/wp-content\/uploads\//);
      expect(record?.publicAccess?.primaryUrl).toBe(record?.sourceUrl);
      expect(record?.publicAccess?.fetchStatus).toBeDefined();
      expect(descriptiveAlt(record!)).not.toMatch(/قیمت/);
      expect(descriptiveAlt(record!).length).toBeGreaterThan(8);
    }
  });

  it("documents public-only sources with no factory network", () => {
    expect(PUBLIC_MEDIA_SOURCES.factoryNetworkUsed).toBe(false);
    expect(PUBLIC_MEDIA_SOURCES.primary).toBe("https://bukanpipe.com");
  });

  it("does not invent a public filename for the unconfirmed klaf still", () => {
    expect(getLegacyMedia("wp-800")?.proposedFilename).toBeNull();
    expect(getLegacyMedia("wp-800")?.authenticity).toBe("SUBJECT_UNCONFIRMED");
  });

  it("rejects specification tables as photography", () => {
    const gasTable = getLegacyMedia("wp-1059");
    expect(gasTable?.visualQuality).toBe("REJECT");
    expect(gasTable?.websiteRole).toBe("SPEC_TABLE");
  });
});

describe("image SEO helpers", () => {
  it("does not attach images to the sitemap until public photos exist", () => {
    expect(imageSitemapAttachments()).toBeUndefined();
  });

  it("attaches brand OG images for hub routes", () => {
    const metadata = createPageMetadata({
      title: "Laboratory",
      description: "Quality testing laboratory.",
      path: "/laboratory",
    });
    const images = metadata.openGraph?.images;
    const first = Array.isArray(images) ? images[0] : images;
    expect(first && typeof first === "object" && "url" in first ? first.url : "").toContain(
      "01_02_13 AM (5)",
    );
    expect((metadata.twitter as { card?: string } | undefined)?.card).toBe(
      "summary_large_image",
    );
  });

  it("specifies OG compositions without rendering files", () => {
    expect(ogCompositions).toHaveLength(6);
    expect(ogCompositions.every((item) => item.status === "specified-not-rendered")).toBe(
      true,
    );
    expect(ogCompositions.every((item) => item.clutter === "none")).toBe(true);
  });
});
