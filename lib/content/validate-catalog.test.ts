import { describe, expect, it } from "vitest";
import { contentCatalogFa } from "@/data/content/fa/catalog";
import { getAllPublishedPaths } from "@/lib/content/registry";

describe("content catalog validation", () => {
  it("has unique seo titles per published FA document", () => {
    const titles = contentCatalogFa.map((d) => d.seoTitle);
    const unique = new Set(titles);
    expect(unique.size).toBe(titles.length);
  });

  it("has unique seo descriptions per published FA document", () => {
    const descriptions = contentCatalogFa.map((d) => d.seoDescription);
    const unique = new Set(descriptions);
    expect(unique.size).toBe(descriptions.length);
  });

  it("every document has a non-empty title and path", () => {
    for (const doc of contentCatalogFa) {
      expect(doc.title.trim().length).toBeGreaterThan(0);
      expect(doc.path.startsWith("/")).toBe(true);
      expect(doc.seoTitle.trim().length).toBeGreaterThan(0);
      expect(doc.seoDescription.trim().length).toBeGreaterThan(0);
    }
  });

  it("product slugs are distinct primary keywords owners", () => {
    const products = contentCatalogFa.filter((d) => d.kind === "product");
    const keywords = products.map((d) => d.primaryKeyword);
    expect(new Set(keywords).size).toBe(keywords.length);
  });

  it("published paths are valid", () => {
    const paths = getAllPublishedPaths("fa");
    expect(paths.length).toBeGreaterThan(20);
    for (const p of paths) {
      expect(p).toMatch(/^\/[a-z0-9-/]+$/);
    }
  });

  it("public sections do not expose internal verification labels", () => {
    const forbidden = /VERIFY_BEFORE_PRODUCTION|DATA_REQUIRED|legacy claim|placeholder|TODO/i;
    for (const doc of contentCatalogFa) {
      for (const section of doc.sections) {
        if (section.type === "paragraph") {
          expect(section.text).not.toMatch(forbidden);
        }
        if (section.type === "data-required" && section.showPublic !== false) {
          expect(section.message).not.toMatch(forbidden);
          expect(section.title).not.toMatch(forbidden);
        }
      }
    }
  });
});
