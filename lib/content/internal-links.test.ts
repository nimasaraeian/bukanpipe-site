import { describe, expect, it } from "vitest";
import { contentCatalogFa } from "@/data/content/fa/catalog";
import { contentCatalogEn } from "@/data/content/en/catalog";
import { faHomeApplications, faHomeArticles, faHomeProducts } from "@/data/content/fa/home";
import { enHomeApplications, enHomeArticles, enHomeProducts } from "@/data/content/en/home";
import { getPrimaryNavItems, getFooterColumns } from "@/lib/i18n/nav-items";
import { getAllPublishedPaths } from "@/lib/content/registry";
import { getSitemapPathsForLocale } from "@/lib/sitemap/paths";
import { dictionaryFa } from "@/messages/fa";
import { dictionaryEn } from "@/messages/en";
import type { Locale } from "@/lib/i18n/config";

function stripLocale(href: string): string {
  return href.replace(/^\/(fa|en)/, "") || "/";
}

function collectInternalLinks(
  locale: Locale,
  catalog: readonly { breadcrumbs: readonly { path: string }[]; related?: { products?: readonly string[]; applications?: readonly string[]; laboratory?: readonly string[]; articles?: readonly string[] } }[],
  homeProducts: readonly { href: string }[],
  homeApplications: readonly { href: string }[],
  homeArticles: readonly { href: string }[],
  dictionary: typeof dictionaryFa,
): string[] {
  const links: string[] = [];
  const pathFn = (p: string) => `/${locale}${p === "/" ? "" : p}`;

  for (const item of getPrimaryNavItems(locale, dictionary, pathFn)) {
    links.push(stripLocale(item.href));
  }
  for (const col of getFooterColumns(locale, dictionary, pathFn)) {
    for (const link of col.links) {
      links.push(stripLocale(link.href));
    }
  }
  for (const item of [...homeProducts, ...homeApplications, ...homeArticles]) {
    links.push(item.href);
  }
  links.push("/calculator/pipeline-design", "/polyethylene-pipe", "/request-quote");

  for (const doc of catalog) {
    for (const crumb of doc.breadcrumbs) {
      links.push(crumb.path);
    }
    const related = doc.related;
    if (related?.products) {
      for (const slug of related.products) links.push(`/products/${slug}`);
    }
    if (related?.applications) {
      for (const slug of related.applications) links.push(`/applications/${slug}`);
    }
    if (related?.laboratory) {
      for (const slug of related.laboratory) links.push(`/laboratory/${slug}`);
    }
    if (related?.articles) {
      for (const slug of related.articles) {
        links.push(
          slug === "polyethylene-pipe" ? "/polyethylene-pipe" : `/technical-center/${slug}`,
        );
      }
    }
  }

  return [...new Set(links)];
}

describe("internal link crawl (FA)", () => {
  const faValidPaths = new Set<string>([
    "/",
    ...getAllPublishedPaths("fa"),
    "/request-quote",
    "/solutions",
    "/industries",
    "/gallery",
  ]);

  it("has zero broken internal links in nav, footer, home, and related content", () => {
    const broken = collectInternalLinks(
      "fa",
      contentCatalogFa,
      faHomeProducts,
      faHomeApplications,
      faHomeArticles,
      dictionaryFa,
    ).filter((link) => !faValidPaths.has(link));
    expect(broken, `Broken links: ${broken.join(", ")}`).toEqual([]);
  });

  it("sitemap FA paths are subset of valid public paths", () => {
    for (const path of getSitemapPathsForLocale("fa")) {
      expect(faValidPaths.has(path)).toBe(true);
    }
  });
});

describe("internal link crawl (EN)", () => {
  const enValidPaths = new Set<string>([
    "/",
    ...getAllPublishedPaths("en"),
    "/request-quote",
    "/solutions",
    "/industries",
    "/gallery",
  ]);

  it("has zero broken internal links in nav, footer, home, and related content", () => {
    const broken = collectInternalLinks(
      "en",
      contentCatalogEn,
      enHomeProducts,
      enHomeApplications,
      enHomeArticles,
      dictionaryEn,
    ).filter((link) => !enValidPaths.has(link));
    expect(broken, `Broken links: ${broken.join(", ")}`).toEqual([]);
  });

  it("sitemap EN paths are subset of valid public paths", () => {
    for (const path of getSitemapPathsForLocale("en")) {
      expect(enValidPaths.has(path)).toBe(true);
    }
  });

  it("sitemap EN includes full content IA", () => {
    const enPaths = getSitemapPathsForLocale("en");
    expect(enPaths).toContain("/");
    expect(enPaths).toContain("/about");
    expect(enPaths).toContain("/laboratory");
    expect(enPaths).toContain("/solutions");
    expect(enPaths).toContain("/industries");
    expect(enPaths.some((p) => p.startsWith("/technical-center"))).toBe(true);
    expect(enPaths).toContain("/polyethylene-pipe");
    expect(enPaths).not.toContain("/projects");
  });
});
