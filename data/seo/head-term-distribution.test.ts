import { describe, expect, it } from "vitest";
import { getContentCatalog, getAllPublishedPaths } from "@/lib/content/registry";
import { getPrimaryNavStructure, getFooterColumns } from "@/lib/i18n/nav-items";
import { locales, type Locale } from "@/lib/i18n/config";
import { dictionaryFa } from "@/messages/fa";
import { dictionaryEn } from "@/messages/en";

const dictionaries = { fa: dictionaryFa, en: dictionaryEn } as const;

/**
 * "لوله پلی اتیلن" is the head term of this market, and
 * /technical-center/polyethylene-pipe-complete-guide is the page that owns it.
 *
 * It was also, until this was written, reachable from neither the navigation
 * nor the footer, and carried five inbound internal links while a product page
 * carried thirty-six — the site was voting against its own most valuable page.
 * These assertions keep that from happening again silently: a refactor that
 * drops the guide out of the nav, or lets another page overtake it on internal
 * links, fails here rather than in six months of lost position.
 */
const HEAD_TERM = "لوله پلی اتیلن";
const GUIDE = "/technical-center/polyethylene-pipe-complete-guide";
const MIN_INBOUND = 12;

function inboundCounts(locale: Locale): Map<string, number> {
  const published = new Set(getAllPublishedPaths(locale));
  const docs = getContentCatalog(locale).filter((d) => published.has(d.path));
  const counts = new Map<string, number>();
  for (const p of published) counts.set(p, 0);

  for (const doc of docs) {
    const seen = new Set<string>();
    for (const block of doc.sections) {
      if (block.type === "internal-links") {
        for (const link of block.links) seen.add(link.path);
      }
    }
    for (const rel of [
      ...(doc.related?.articles ?? []).map((s) => `/technical-center/${s}`),
      ...(doc.related?.products ?? []).map((s) => `/products/${s}`),
      ...(doc.related?.applications ?? []).map((s) => `/applications/${s}`),
    ]) {
      seen.add(rel);
    }
    for (const p of seen) {
      if (counts.has(p)) counts.set(p, counts.get(p)! + 1);
    }
  }
  return counts;
}

describe("head term distribution", () => {
  it("keeps exactly one FA page claiming the bare head term", () => {
    const owners = getContentCatalog("fa").filter(
      (doc) => doc.primaryKeyword.trim() === HEAD_TERM,
    );
    expect(owners.map((d) => d.path)).toEqual([GUIDE]);
  });

  it("does not let the pillar re-title itself onto the head term", () => {
    const pillar = getContentCatalog("fa").find((d) => d.path === "/polyethylene-pipe")!;
    // The pillar answers "what is", which is a different query. If its seoTitle
    // ever stops saying so, the two pages compete for the same result again.
    expect(pillar.seoTitle).toContain("چیست");
    expect(pillar.primaryKeyword).toBe("لوله پلی اتیلن چیست");
  });

  it("does not let the head-term page lead with the pillar's query", () => {
    const guide = getContentCatalog("fa").find((d) => d.path === GUIDE)!;
    expect(guide.seoTitle.startsWith(HEAD_TERM)).toBe(true);
    expect(guide.seoTitle).not.toContain("چیست");
  });

  it.each(locales)("keeps the guide in the %s navigation and footer", (locale) => {
    const t = dictionaries[locale as Locale];
    const path = (p: string) => `/${locale}${p}`;

    const nav = getPrimaryNavStructure(locale as Locale, t, path);
    const navHrefs = nav.flatMap((entry) =>
      entry.kind === "group" ? entry.items.map((i) => i.href) : [entry.href],
    );
    expect(navHrefs).toContain(path(GUIDE));

    const footerHrefs = getFooterColumns(locale as Locale, t, path).flatMap((col) =>
      col.links.map((l) => l.href),
    );
    expect(footerHrefs).toContain(path(GUIDE));
  });

  it.each(locales)("gives the guide real internal link equity in %s", (locale) => {
    const counts = inboundCounts(locale as Locale);
    expect(counts.get(GUIDE) ?? 0).toBeGreaterThanOrEqual(MIN_INBOUND);
  });

  it.each(locales)("keeps the guide among the most-linked pages in %s", (locale) => {
    const counts = inboundCounts(locale as Locale);
    const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    const rank = ranked.findIndex(([p]) => p === GUIDE);
    expect(rank).toBeGreaterThanOrEqual(0);
    expect(rank).toBeLessThan(5);
  });
});
