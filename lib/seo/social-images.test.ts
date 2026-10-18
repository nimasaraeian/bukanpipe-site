import { describe, expect, it } from "vitest";
import { createPageMetadata } from "./metadata";
import { getSitemapPathsForLocale } from "@/lib/sitemap/paths";
import { getContentByPath } from "@/lib/content/registry";
import pages from "@/data/social/pages.json";
import { existsSync } from "node:fs";
import { join } from "node:path";

describe("page-specific share previews", () => {
  it("gives every public page and language a unique JPEG share image", () => {
    const urls: string[] = [];
    for (const locale of ["fa", "en"] as const) {
      for (const path of new Set([...getSitemapPathsForLocale(locale), ...pages.filter(p => p.locale === locale).map(p => p.path)])) {
        const page = pages.find(p => p.locale === locale && p.path === path);
        expect(page, `${locale}${path}`).toBeDefined();
        const doc = getContentByPath(locale, path);
        if (doc) expect(page?.title).toBe(doc.title);
        expect(existsSync(join(process.cwd(), "public", page!.photo))).toBe(true);
        const metadata = createPageMetadata({title: page!.title, description: "Page description", locale, path});
        const image = (metadata.openGraph?.images as {url: string; width: number; height: number; alt: string}[])[0];
        if (!image) throw new Error(`Missing share image for ${locale}${path}`);
        expect(image.url).toBe(page!.image);
        expect(image.url).toMatch(/\.jpg$/);
        expect([image.width, image.height]).toEqual([1200,630]);
        expect(image.alt).toContain(page!.title);
        expect(metadata.twitter?.images).toEqual([image.url]);
        urls.push(image.url);
      }
    }
    expect(new Set(urls).size).toBe(urls.length);
  });
  it("uses the certificates card even when content supplies a generic hero", () => {
    const metadata = createPageMetadata({title:"گواهی‌ها",description:"مدارک",path:"/certifications",locale:"fa",ogImage:{url:"/generic.png",width:1200,height:630,alt:"Generic"}});
    expect((metadata.openGraph?.images as {url:string}[])[0]?.url).toMatch(/\/fa\/certifications-/);
  });
});
