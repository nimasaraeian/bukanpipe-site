import { describe, expect, it } from "vitest";
import { getAllPublishedPaths, getContentCatalog } from "@/lib/content/registry";
import { locales, type Locale } from "@/lib/i18n/config";

/**
 * Google renders roughly 150–160 characters of a description and rewrites the
 * ones that are too thin to be useful — which is the same as handing it the
 * snippet. Half the site sat between 25 and 70 characters.
 *
 * The band is deliberately loose at the top: going a little over only risks a
 * trailing clause being cut, while going under loses the snippet entirely.
 */
const MIN = 80;
const MAX = 175;

function publishedDocs(locale: Locale) {
  const published = new Set(getAllPublishedPaths(locale));
  return getContentCatalog(locale).filter((doc) => published.has(doc.path));
}

describe.each(locales)("%s meta descriptions", (locale) => {
  const docs = publishedDocs(locale as Locale);

  it("gives every published page a description in the useful range", () => {
    const bad = docs
      .filter((doc) => {
        const length = (doc.seoDescription ?? "").trim().length;
        return length < MIN || length > MAX;
      })
      .map((doc) => `${doc.path} (${(doc.seoDescription ?? "").trim().length})`);

    expect(bad).toEqual([]);
  });

  it("does not repeat one description across pages", () => {
    const seen = new Map<string, string[]>();
    for (const doc of docs) {
      const key = (doc.seoDescription ?? "").trim();
      seen.set(key, [...(seen.get(key) ?? []), doc.path]);
    }

    const duplicated = [...seen.entries()]
      .filter(([, paths]) => paths.length > 1)
      .map(([, paths]) => paths.join(" , "));

    expect(duplicated).toEqual([]);
  });

  it("puts the page's own primary keyword in its description", () => {
    // A snippet that never says the term it targets is a wasted snippet.
    // Compared on word stems: Persian word order moves, and "applications"
    // in a keyword legitimately appears as "application" in a sentence.
    const stem = (word: string) => word.replace(/(ies|es|s)$/u, "");
    const tokens = (text: string) =>
      text
        .toLowerCase()
        .split(/[^\p{L}\p{N}]+/u)
        .filter((word) => word.length > 3)
        .map(stem);

    const missing = docs
      .filter((doc) => {
        const keyword = doc.primaryKeyword.trim();
        if (!keyword) return false;

        const wanted = tokens(keyword);
        if (wanted.length === 0) return false;

        const present = new Set(tokens(doc.seoDescription ?? ""));
        const hits = wanted.filter((word) => present.has(word)).length;
        return hits / wanted.length < 0.5;
      })
      .map(
        (doc) =>
          `${doc.path} — "${doc.primaryKeyword}" vs "${(doc.seoDescription ?? "").slice(0, 60)}"`,
      );

    expect(missing).toEqual([]);
  });
});
