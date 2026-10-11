import { describe, expect, it } from "vitest";
import { getContentCatalog, getAllPublishedPaths } from "@/lib/content/registry";
import { getPrimaryNavStructure, getFooterColumns } from "@/lib/i18n/nav-items";
import { locales, type Locale } from "@/lib/i18n/config";
import { dictionaryFa } from "@/messages/fa";
import { dictionaryEn } from "@/messages/en";
import { getStubPermanentRedirects } from "@/lib/seo/stub-redirects";

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

  it.each(locales)("no longer publishes the short pillar in %s — it was merged into the guide", (locale) => {
    // Two pages split the head term for a month: the 1,000-word pillar at
    // /polyethylene-pipe took the impressions (74, position 71) and the
    // 5,000-word guide took almost none (4, position 7). Differentiating the
    // titles did not fix that. The pillar is now a 308 to the guide, and the
    // guide answers "what is" as well as the head term.
    expect(getContentCatalog(locale as Locale).find((d) => d.path === "/polyethylene-pipe")).toBeUndefined();
    expect(getAllPublishedPaths(locale as Locale)).not.toContain("/polyethylene-pipe");
  });

  it("redirects the old pillar to the guide in both locales, permanently", () => {
    const rules = getStubPermanentRedirects();
    for (const locale of locales) {
      const rule = rules.find((r) => r.source === `/${locale}/polyethylene-pipe`);
      expect(rule, locale).toBeDefined();
      expect(rule!.destination).toBe(`/${locale}${GUIDE}`);
      expect(rule!.permanent).toBe(true);
    }
  });

  it("lets the head-term page answer the what-is query too", () => {
    const guide = getContentCatalog("fa").find((d) => d.path === GUIDE)!;
    expect(guide.seoTitle.startsWith(HEAD_TERM)).toBe(true);
    expect(guide.title).toContain("چیست");
    expect(guide.secondaryKeywords).toContain("لوله پلی اتیلن چیست");
  });

  it("opens with a featured-snippet definition that starts with the head term", () => {
    const guide = getContentCatalog("fa").find((d) => d.path === GUIDE)!;
    const first = guide.sections[0];
    expect(first?.type).toBe("definition");
    if (!first || first.type !== "definition") return;
    expect(first.text.startsWith(HEAD_TERM)).toBe(true);
    const words = first.text.split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(40);
    expect(words).toBeLessThanOrEqual(80);
  });

  it.each(locales)("carries at least eight FAQs in %s, including price, PVC and service life", (locale) => {
    const guide = getContentCatalog(locale as Locale).find((d) => d.path === GUIDE)!;
    expect(guide.faqs?.length ?? 0).toBeGreaterThanOrEqual(8);
    const q = (guide.faqs ?? []).map((f) => f.question).join("\n");
    if (locale === "fa") {
      expect(q).toContain("قیمت لوله پلی اتیلن");
      expect(q).toContain("PVC");
      expect(q).toContain("چند سال عمر");
    } else {
      expect(q.toLowerCase()).toContain("price");
      expect(q).toContain("PVC");
      expect(q.toLowerCase()).toContain("how long");
    }
  });

  it.each(locales)("leaves no internal link pointing at the retired pillar in %s", (locale) => {
    const offenders: string[] = [];
    for (const doc of getContentCatalog(locale as Locale)) {
      for (const block of doc.sections) {
        if (block.type === "internal-links") {
          for (const link of block.links) {
            if (link.path === "/polyethylene-pipe") offenders.push(`${doc.path} → ${link.path}`);
          }
        }
      }
      for (const crumb of doc.breadcrumbs) {
        if (crumb.path === "/polyethylene-pipe") offenders.push(`${doc.path} breadcrumb`);
      }
    }
    const t = dictionaries[locale as Locale];
    const path = (p: string) => `/${locale}${p}`;
    const navHrefs = getPrimaryNavStructure(locale as Locale, t, path).flatMap((entry) =>
      entry.kind === "group" ? entry.items.map((i) => i.href) : [entry.href],
    );
    const footerHrefs = getFooterColumns(locale as Locale, t, path).flatMap((col) => col.links.map((l) => l.href));
    for (const href of [...navHrefs, ...footerHrefs]) {
      if (href === path("/polyethylene-pipe")) offenders.push(`chrome → ${href}`);
    }
    expect(offenders).toEqual([]);
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
