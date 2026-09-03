import { describe, expect, it } from "vitest";
import { contentCatalogFa } from "@/data/content/fa/catalog";
import { faHomeApplications, faHomeArticles, faHomeProducts } from "@/data/content/fa/home";
import { getPrimaryNavItems, getFooterColumns } from "@/lib/i18n/nav-items";
import { getAllPublishedPaths } from "@/lib/content/registry";
import { getSitemapPathsForLocale } from "@/lib/sitemap/paths";
import { dictionaryFa } from "@/messages/fa";

const faValidPaths = new Set<string>(["/", ...getAllPublishedPaths("fa"), "/request-quote"]);

function stripLocale(href: string): string {
  return href.replace(/^\/fa/, "") || "/";
}

function collectInternalLinks(): string[] {
  const links: string[] = [];
  const pathFn = (p: string) => `/fa${p === "/" ? "" : p}`;

  for (const item of getPrimaryNavItems("fa", dictionaryFa, pathFn)) {
    links.push(stripLocale(item.href));
  }
  for (const col of getFooterColumns("fa", dictionaryFa, pathFn)) {
    for (const link of col.links) {
      links.push(stripLocale(link.href));
    }
  }
  for (const item of [...faHomeProducts, ...faHomeApplications, ...faHomeArticles]) {
    links.push(item.href);
  }
  links.push("/calculator/pipeline-design", "/polyethylene-pipe");

  for (const doc of contentCatalogFa) {
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
  it("has zero broken internal links in nav, footer, home, and related content", () => {
    const broken = collectInternalLinks().filter((link) => !faValidPaths.has(link));
    expect(broken, `Broken links: ${broken.join(", ")}`).toEqual([]);
  });

  it("sitemap FA paths are subset of valid public paths", () => {
    for (const path of getSitemapPathsForLocale("fa")) {
      expect(faValidPaths.has(path)).toBe(true);
    }
  });

  it("sitemap EN excludes FA-only content paths", () => {
    const enPaths = getSitemapPathsForLocale("en");
    expect(enPaths).not.toContain("/about");
    expect(enPaths).not.toContain("/laboratory");
    expect(enPaths.some((p) => p.startsWith("/technical-center"))).toBe(false);
  });
});
