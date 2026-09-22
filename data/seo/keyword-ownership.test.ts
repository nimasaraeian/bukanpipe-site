import { describe, expect, it } from "vitest";
import { getContentCatalog, getAllPublishedPaths } from "@/lib/content/registry";
import { locales, type Locale } from "@/lib/i18n/config";

/**
 * One page, one intent.
 *
 * Six laboratory pages once declared the same primary keyword, so they
 * competed with each other and none of them ranked. These assertions are what
 * stops that coming back — a new page that reuses an owned keyword fails here
 * rather than quietly splitting the intent in production.
 *
 * The ownership rules being enforced are the ones written down in
 * docs/07-keyword-map.md: product pages own commercial intent, technical
 * pages own engineering intent, application pages support rather than
 * duplicate.
 */
function publishedDocs(locale: Locale) {
  const published = new Set(getAllPublishedPaths(locale));
  return getContentCatalog(locale).filter((doc) => published.has(doc.path));
}

describe.each(locales)("%s keyword ownership", (locale) => {
  const docs = publishedDocs(locale as Locale);

  it("gives every published page a primary keyword", () => {
    const missing = docs.filter((doc) => !doc.primaryKeyword?.trim());
    expect(missing.map((doc) => doc.path)).toEqual([]);
  });

  it("never lets two pages claim the same primary keyword", () => {
    const owners = new Map<string, string[]>();
    for (const doc of docs) {
      const key = doc.primaryKeyword.trim();
      owners.set(key, [...(owners.get(key) ?? []), doc.path]);
    }

    const clashes = [...owners.entries()]
      .filter(([, paths]) => paths.length > 1)
      .map(([keyword, paths]) => `${keyword} → ${paths.join(" , ")}`);

    expect(clashes).toEqual([]);
  });

  it("does not grow the list of secondaries that borrow another page's primary", () => {
    // Softer than a duplicate primary, but the same risk wearing another hat:
    // the page tells Google it is also about a term a different page owns.
    // These are the ones that exist today. The list is a ratchet — a new
    // overlap fails here, and clearing one means deleting its line. Each needs
    // an editorial call on which page should keep the term, so none are
    // rewritten blindly.
    const known: Record<string, readonly string[]> = {
      fa: [
        "/products uses \"لوله پلی اتیلن PE100\", owned by /products/pe100-pipe",
        "/products/water-supply-pipe uses \"لوله انتقال آب پلی اتیلن\", owned by /applications/water-transfer",
        "/products/gas-pipe uses \"لوله گازرسانی پلی اتیلن\", owned by /applications/gas-distribution",
        "/products/sewage-pipe uses \"لوله فاضلاب پلی اتیلن\", owned by /applications/sewage",
        "/products/drainage-pipe uses \"لوله زهکشی پلی اتیلن\", owned by /applications/drainage",
        "/applications uses \"لوله پلی اتیلن آبرسانی\", owned by /products/water-supply-pipe",
        "/applications uses \"لوله پلی اتیلن کشاورزی\", owned by /applications/agriculture-irrigation",
        "/applications uses \"لوله پلی اتیلن صنعتی\", owned by /products/industrial-pipe",
        "/applications/water-transfer uses \"لوله پلی اتیلن آبرسانی\", owned by /products/water-supply-pipe",
        "/applications/gas-distribution uses \"لوله پلی اتیلن گاز\", owned by /products/gas-pipe",
        "/laboratory uses \"کنترل کیفیت لوله پلی اتیلن\", owned by /quality",
        "/technical-center/polyethylene-pipe-complete-guide uses \"تولید کننده لوله پلی اتیلن\", owned by /about",
        "/technical-center/polyethylene-pipe-complete-guide uses \"استاندارد لوله پلی اتیلن\", owned by /technical-center/polyethylene-pipe-standards",
        "/polyethylene-pipe uses \"کاربرد لوله پلی اتیلن\", owned by /applications",
        "/technical-center/hdpe-pipe-what-is uses \"لوله پلی اتیلن چیست\", owned by /polyethylene-pipe",
        "/about uses \"خرید لوله پلی اتیلن از کارخانه\", owned by /products",
        "/quality uses \"تولید کننده لوله پلی اتیلن\", owned by /about",
        "/certifications uses \"استاندارد لوله پلی اتیلن\", owned by /technical-center/polyethylene-pipe-standards",
      ],
      en: [
        "/laboratory/services uses \"polyethylene pipe testing\", owned by /laboratory",
        "/laboratory/test-scope uses \"PE pipe quality testing\", owned by /laboratory/services",
        "/technical-center/polyethylene-pipe-complete-guide uses \"HDPE pipe\", owned by /polyethylene-pipe",
        "/polyethylene-pipe uses \"polyethylene pipe\", owned by /technical-center/polyethylene-pipe-complete-guide",
      ],
    };

    const primaries = new Map(docs.map((doc) => [doc.primaryKeyword.trim(), doc.path]));
    const overlaps: string[] = [];

    for (const doc of docs) {
      for (const secondary of doc.secondaryKeywords ?? []) {
        const owner = primaries.get(secondary.trim());
        if (owner && owner !== doc.path) {
          overlaps.push(`${doc.path} uses "${secondary}", owned by ${owner}`);
        }
      }
    }

    expect(overlaps.sort()).toEqual([...known[locale]!].sort());
  });
});

describe("laboratory cluster", () => {
  it("splits the six pages across six distinct intents", () => {
    const lab = publishedDocs("fa").filter((doc) => doc.path.startsWith("/laboratory"));
    expect(lab).toHaveLength(6);

    const keywords = lab.map((doc) => doc.primaryKeyword);
    expect(new Set(keywords).size).toBe(6);

    // The hub keeps the generic term; the children must not repeat it.
    const hub = lab.find((doc) => doc.path === "/laboratory");
    expect(hub?.primaryKeyword).toBe("آزمایشگاه لوله پلی اتیلن");
    for (const doc of lab.filter((d) => d.path !== "/laboratory")) {
      expect(doc.primaryKeyword, doc.path).not.toBe(hub!.primaryKeyword);
    }
  });
});
