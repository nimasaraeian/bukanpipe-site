import sitemap from "@/app/sitemap";
import { canonicalUrl } from "@/lib/seo/canonical";
import evidence from "@/data/company/evidence.json";
import { existsSync } from "node:fs";
import { join } from "node:path";

import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { DocumentTableBlock } from "@/components/content/DocumentTable";

describe("source document images", () => {
  it("renders all 48 plaque scans with descriptive alt text and readable image links", () => {
    const html = renderToStaticMarkup(<DocumentTableBlock table="awards" caption="لوح‌های سپاس" locale="fa" />);
    expect((html.match(/<img /g) ?? []).length).toBe(48);
    expect(html).toContain("ImageObject");
    expect(html).toContain("نسخه‌های تکراری");
    expect(html).toContain("bukan-pipe-national-product-quality-1393.webp");
  });
  it("shows expired membership as an archive scan rather than a current qualification", () => {
    const html = renderToStaticMarkup(<DocumentTableBlock table="sector-approval" caption="مدارک" locale="fa" />);
    expect((html.match(/<img /g) ?? []).length).toBe(5);
    expect(html).toContain("سپتامبر ۲۰۲۶");
    expect(html).toContain("نسخهٔ آرشیوی");
    expect(html.split("</table>")[0]).not.toContain("عضویت");
  });
});


it.each(["fa", "en"])("includes every supplied scan as a real public asset in the %s certificates sitemap entry", (locale) => {
  const page = sitemap().find((entry) => entry.url.endsWith(`/${locale}/certifications`));
  expect(page?.images).toHaveLength(62);
  for (const item of evidence) {
    expect(existsSync(join(process.cwd(), "public", item.src))).toBe(true);
    expect(page?.images).toContain(canonicalUrl(item.src));
  }
});

it("renders the same scans on the English page, captioned in English", () => {
  const html = renderToStaticMarkup(<DocumentTableBlock table="awards" caption="Plaques" locale="en" />);
  expect((html.match(/<img /g) ?? []).length).toBe(48);
  expect(html).toContain("Scans of the plaques and commendations");
  expect(html).toContain("Top National Cooperative");
  expect(html).not.toContain("آرشیو تصویری");
  for (const item of evidence) {
    expect(item.captionEn, item.id).toMatch(/^Bukan Pipe; /);
    expect(item.captionEn).not.toMatch(/[\u0600-\u06FF]/);
    expect(item.noteEn).not.toMatch(/[\u0600-\u06FF]/);
  }
});

import sharp from "sharp";

it("ships decodable WebP images with the dimensions declared in the manifest", async () => {
  await Promise.all(evidence.map(async (item) => {
    const metadata = await sharp(join(process.cwd(), "public", item.src)).metadata();
    expect(metadata.format).toBe("webp");
    expect([metadata.width, metadata.height]).toEqual([item.width, item.height]);
  }));
});
