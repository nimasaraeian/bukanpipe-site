import { describe, expect, it } from "vitest";
import { faKeywordMap, getFaKeywordEntry } from "@/data/seo/fa-keyword-map";
import { getContentCatalog, getAllPublishedPaths } from "@/lib/content/registry";

/**
 * The map used to be a hand-picked subset that nothing validated, so it could
 * disagree with the pages it described. These assertions bind it to reality:
 * the content documents own the keywords (they are what metadata renders) and
 * the map adds intent and cluster on top.
 */
const publishedPaths = new Set(getAllPublishedPaths("fa"));
const publishedDocs = getContentCatalog("fa").filter((doc) => publishedPaths.has(doc.path));

/** Real routes with no content document behind them. */
const STATIC_ROUTES = new Set(["/", "/request-quote", "/solutions", "/industries"]);

describe("FA keyword map", () => {
  it("maps the commercial homepage to the manufacturer cluster", () => {
    const home = getFaKeywordEntry("/");
    expect(home?.primaryKeyword).toContain("تولید");
    expect(home?.intent).toBe("commercial");
  });

  it("covers every published FA page", () => {
    const mapped = new Set(faKeywordMap.map((entry) => entry.path));
    const missing = publishedDocs.map((doc) => doc.path).filter((path) => !mapped.has(path));

    expect(missing).toEqual([]);
    expect(faKeywordMap.length).toBeGreaterThanOrEqual(publishedDocs.length);
  });

  it("points only at routes that exist", () => {
    const missing = faKeywordMap
      .map((entry) => entry.path)
      .filter((path) => !publishedPaths.has(path) && !STATIC_ROUTES.has(path));

    expect(missing).toEqual([]);
  });

  it("never disagrees with the page it describes", () => {
    // Drift here is what let six laboratory pages share a keyword unnoticed.
    const drifted: string[] = [];

    for (const doc of publishedDocs) {
      const entry = getFaKeywordEntry(doc.path);
      if (!entry) continue;

      if (entry.primaryKeyword !== doc.primaryKeyword) {
        drifted.push(
          `${doc.path}: map says "${entry.primaryKeyword}", page says "${doc.primaryKeyword}"`,
        );
      }

      const onPage = [...doc.secondaryKeywords].sort().join("|");
      const onMap = [...entry.secondaryKeywords].sort().join("|");
      if (onPage !== onMap) {
        drifted.push(`${doc.path}: secondary keywords differ`);
      }
    }

    expect(drifted).toEqual([]);
  });

  it("gives every entry an intent and a cluster", () => {
    for (const entry of faKeywordMap) {
      expect(entry.intent, entry.path).toBeTruthy();
      expect(entry.cluster, entry.path).toBeTruthy();
      expect(entry.primaryKeyword.trim(), entry.path).not.toBe("");
    }
  });

  it("keeps product intent commercial and technical-centre intent informational", () => {
    // docs/07-keyword-map.md rules 1 and 2. `cluster` is a topical grouping
    // and is left as the map already had it; `intent` is the one the
    // ownership rules actually constrain.
    for (const entry of faKeywordMap) {
      if (entry.path.startsWith("/products")) {
        expect(["commercial", "transactional"], entry.path).toContain(entry.intent);
      }
      if (entry.path.startsWith("/technical-center")) {
        expect(entry.intent, entry.path).toBe("informational");
      }
    }
  });
});
