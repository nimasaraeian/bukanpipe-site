import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getIndexableRobotsDisallowPaths } from "@/lib/seo/robots-disallow";
import { NOINDEX_PATHS } from "@/lib/seo/page-config";
import { dictionaryEn } from "@/messages/en";
import { getFooterColumns, getPrimaryNavStructure } from "@/lib/i18n/nav-items";

describe("robots disallow paths", () => {
  it("includes locale-prefixed noindex stubs used in production", () => {
    const disallow = getIndexableRobotsDisallowPaths();
    expect(disallow).toEqual(expect.arrayContaining([...NOINDEX_PATHS]));
    expect(disallow).toContain("/fa/projects");
    expect(disallow).toContain("/en/projects");
    expect(disallow).toContain("/fa/design-system");
    expect(disallow).toContain("/en/verify");
  });
});

describe("official brand icons", () => {
  it("commits the official Bukan Pipe mark as SVG, PNG, ICO and apple-touch icons", () => {
    const files = [
      "favicon.svg",
      "favicon.ico",
      "icon-48.png",
      "icon-192.png",
      "icon-512.png",
      "apple-touch-icon.png",
    ];
    for (const file of files) {
      expect(existsSync(resolve(process.cwd(), "public", file)), file).toBe(true);
    }
    expect(existsSync(resolve(process.cwd(), "app", "icon.svg"))).toBe(false);
  });
});

describe("internal linking A+B", () => {
  const pathFn = (p: string) => `/en${p === "/" ? "" : p}`;

  it("adds certifications to the company nav group", () => {
    const company = getPrimaryNavStructure("en", dictionaryEn, pathFn).find(
      (entry) => entry.kind === "group" && entry.id === "company",
    );
    expect(company?.kind).toBe("group");
    if (company?.kind !== "group") return;
    expect(company.items.map((item) => item.href)).toContain("/en/certifications");
  });

  it("adds certifications, request-quote, laboratory and industrial pipe to the footer", () => {
    const hrefs = getFooterColumns("en", dictionaryEn, pathFn).flatMap((col) =>
      col.links.map((link) => link.href),
    );
    expect(hrefs).toEqual(
      expect.arrayContaining([
        "/en/products",
        "/en/laboratory",
        "/en/certifications",
        "/en/technical-center",
        "/en/request-quote",
        "/en/products/industrial-pipe",
      ]),
    );
  });
});
