import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { legacyUrls } from "@/data/migration/legacy-urls";
import {
  LEGACY_PATH_PATTERNS,
  resetLegacyResolver,
  resolveLegacyRequest,
} from "@/lib/migration/legacy-resolver";
import { resetLegacyRedirectLookup } from "@/lib/migration/redirects";
import { normalizeLegacyPath } from "@/lib/migration/normalize";
import { getAllPublishedPaths } from "@/lib/content/registry";

/**
 * Destinations that are real app routes without a content document behind
 * them. Everything else must be a published content path.
 */
const STATIC_APP_ROUTES = new Set([
  "/",
  "/about",
  "/applications",
  "/calculator",
  "/certifications",
  "/contact",
  "/dealers",
  "/downloads",
  "/gallery",
  "/industries",
  "/laboratory",
  "/polyethylene-pipe",
  "/pricing",
  "/products",
  "/projects",
  "/quality",
  "/request-quote",
  "/solutions",
  "/technical-center",
  "/verify",
]);

/** Stub routes that themselves redirect — never a valid final destination. */
const STUB_ROUTES = new Set(["/engineering", "/knowledge", "/tools", "/standards"]);

function params(query = ""): URLSearchParams {
  return new URL(`/x${query}`, "https://bukanpipe.com").searchParams;
}

function isRedirectEligible(record: (typeof legacyUrls)[number]): boolean {
  if (record.proposedNewPath === null) return false;
  if (record.action === "REDIRECT_301" || record.action === "MERGE") return true;
  if (record.action === "REBUILD") {
    return normalizeLegacyPath(record.oldPath) !== normalizeLegacyPath(record.proposedNewPath);
  }
  return false;
}

const comRecords = legacyUrls.filter((record) => record.host === "bukanpipe.com");
const redirectRows = comRecords.filter(isRedirectEligible);
const goneRows = comRecords.filter(
  (record) =>
    record.action === "IGNORE_NONINDEXABLE" &&
    record.proposedNewPath === null &&
    !/\.[a-z0-9]+$/i.test(normalizeLegacyPath(record.oldPath)),
);
const fileRows = comRecords.filter((record) =>
  /\.[a-z0-9]+$/i.test(normalizeLegacyPath(record.oldPath)),
);

describe("legacy map — every row", () => {
  beforeEach(() => {
    process.env.ENABLE_LEGACY_REDIRECTS = "true";
    resetLegacyResolver();
    resetLegacyRedirectLookup();
  });

  afterEach(() => {
    delete process.env.ENABLE_LEGACY_REDIRECTS;
    resetLegacyResolver();
    resetLegacyRedirectLookup();
  });

  it("covers the whole inventory across the three outcomes", () => {
    expect(redirectRows.length).toBeGreaterThan(0);
    expect(goneRows.length).toBeGreaterThan(0);
    expect(redirectRows.length + goneRows.length).toBe(49 + 15);
  });

  describe.each(redirectRows.map((r) => [r.oldPath, r.proposedNewPath!] as const))(
    "308 %s",
    (oldPath, proposed) => {
      const expected = `/fa${normalizeLegacyPath(proposed) === "/" ? "" : normalizeLegacyPath(proposed)}`;

      it(`redirects to ${expected} in one hop, both slash forms, encoded or not`, () => {
        const normalized = normalizeLegacyPath(oldPath);

        for (const variant of [
          normalized,
          `${normalized}/`,
          encodeURI(normalized),
          `${encodeURI(normalized)}/`,
        ]) {
          const outcome = resolveLegacyRequest(variant, params());
          expect(outcome, `no outcome for ${variant}`).not.toBeNull();
          expect(outcome!.kind, `${variant} should redirect`).toBe("redirect");
          expect(
            (outcome as { destination: string }).destination,
            `wrong destination for ${variant}`,
          ).toBe(expected);
        }
      });

      it("never lands on the homepage or a stub route", () => {
        const destination = normalizeLegacyPath(proposed);
        expect(destination).not.toBe("/");
        expect(STUB_ROUTES.has(destination)).toBe(false);
      });

      it("resolves to a real page, and that page is not itself mapped", () => {
        const destination = normalizeLegacyPath(proposed);
        const published = new Set(getAllPublishedPaths("fa"));
        expect(
          published.has(destination) || STATIC_APP_ROUTES.has(destination),
          `${destination} is not a real route`,
        ).toBe(true);

        // Single hop: the destination must not be another mapped source.
        const onward = resolveLegacyRequest(destination, params());
        expect(onward?.kind === "redirect" ? onward : null, `${destination} redirects onward`).toBeNull();
      });
    },
  );

  describe.each(goneRows.map((r) => [r.oldPath] as const))("410 %s", (oldPath) => {
    it("is gone, in both slash forms, and never redirected", () => {
      const normalized = normalizeLegacyPath(oldPath);

      for (const variant of [normalized, `${normalized}/`, encodeURI(normalized)]) {
        expect(resolveLegacyRequest(variant, params())?.kind, variant).toBe("gone");
      }
    });
  });

  describe.each(fileRows.map((r) => [r.oldPath] as const))("untouched %s", (oldPath) => {
    it("is left to the static layer", () => {
      expect(resolveLegacyRequest(normalizeLegacyPath(oldPath), params())).toBeNull();
    });
  });
});

describe("pattern rows", () => {
  beforeEach(() => {
    process.env.ENABLE_LEGACY_REDIRECTS = "true";
    resetLegacyResolver();
    resetLegacyRedirectLookup();
  });
  afterEach(() => {
    delete process.env.ENABLE_LEGACY_REDIRECTS;
    resetLegacyResolver();
    resetLegacyRedirectLookup();
  });

  it("collapses every child of a mapped section onto its successor", () => {
    const cases = [
      ["/pipeline_design/anything", "/fa/calculator/pipeline-design"],
      ["/pipeline_design/deep/er", "/fa/calculator/pipeline-design"],
      ["/engineering/whatever", "/fa/technical-center"],
      ["/knowledge/a/b", "/fa/technical-center"],
      ["/category/blog/any-post", "/fa/technical-center"],
      ["/articles/old-post", "/fa/technical-center"],
    ] as const;

    for (const [source, expected] of cases) {
      const outcome = resolveLegacyRequest(source, params());
      expect(outcome?.kind, source).toBe("redirect");
      expect((outcome as { destination: string }).destination, source).toBe(expected);
    }
  });

  it("prefers an exact row over the pattern that would also match it", () => {
    // /about_us/* → /about, but this child has its own row to the same place.
    const outcome = resolveLegacyRequest("/about_us/bukan-pipe-company", params());
    expect(outcome?.kind).toBe("redirect");
    expect((outcome as { destination: string }).destination).toBe("/fa/about");
  });

  it("prefers the longest matching prefix", () => {
    const prefixes = LEGACY_PATH_PATTERNS.map((p) => p.prefix);
    expect(prefixes).toContain("/category/blog");
    expect(prefixes).toContain("/category");
    expect(
      (resolveLegacyRequest("/category/blog/x", params()) as { destination: string }).destination,
    ).toBe("/fa/technical-center");
  });

  it("does not match a prefix that is only a string prefix of another segment", () => {
    expect(resolveLegacyRequest("/categories-of-pipe", params())).toBeNull();
    expect(resolveLegacyRequest("/engineering-services", params())).toBeNull();
  });
});

describe("query-string rows", () => {
  beforeEach(() => {
    process.env.ENABLE_LEGACY_REDIRECTS = "true";
    resetLegacyResolver();
    resetLegacyRedirectLookup();
  });
  afterEach(() => {
    delete process.env.ENABLE_LEGACY_REDIRECTS;
    resetLegacyResolver();
    resetLegacyRedirectLookup();
  });

  it("maps WordPress ?p= ids through index.php to the same destination as the permalink", () => {
    // 832 = /gas-pipe, 334 = /contact-us, 772 = the Persian water article.
    const cases = [
      [832, "/fa/products/gas-pipe"],
      [334, "/fa/contact"],
      [772, "/fa/products/water-supply-pipe"],
    ] as const;

    for (const [id, expected] of cases) {
      const outcome = resolveLegacyRequest("/index.php", params(`?p=${id}`));
      expect(outcome?.kind, `p=${id}`).toBe("redirect");
      expect((outcome as { destination: string }).destination, `p=${id}`).toBe(expected);
    }
  });

  it("accepts ?page_id= and the bare-root form too", () => {
    expect(
      (resolveLegacyRequest("/index.php", params("?page_id=42")) as { destination: string })
        .destination,
    ).toBe("/fa/about");
    expect(
      (resolveLegacyRequest("/", params("?p=832")) as { destination: string }).destination,
    ).toBe("/fa/products/gas-pipe");
  });

  it("ignores an unknown or malformed id instead of guessing", () => {
    expect(resolveLegacyRequest("/index.php", params("?p=999999"))).toBeNull();
    expect(resolveLegacyRequest("/index.php", params("?p=abc"))).toBeNull();
    expect(resolveLegacyRequest("/index.php", params())).toBeNull();
  });

  it("does not read ?p= on an ordinary path", () => {
    expect(resolveLegacyRequest("/some-page", params("?p=832"))).toBeNull();
  });
});

describe("spam and unmapped paths", () => {
  beforeEach(() => {
    process.env.ENABLE_LEGACY_REDIRECTS = "true";
    resetLegacyResolver();
    resetLegacyRedirectLookup();
  });
  afterEach(() => {
    delete process.env.ENABLE_LEGACY_REDIRECTS;
    resetLegacyResolver();
    resetLegacyRedirectLookup();
  });

  it("answers 410 for a spam parameter on any path, mapped or not", () => {
    for (const path of ["/", "/gas-pipe", "/fa/products", "/never-existed", "/index.php"]) {
      expect(resolveLegacyRequest(path, params("?LOSS=1"))?.kind, path).toBe("gone");
      expect(resolveLegacyRequest(path, params("?Male=2"))?.kind, path).toBe("gone");
    }
  });

  it("answers spam 410 even when redirects are disabled", () => {
    delete process.env.ENABLE_LEGACY_REDIRECTS;
    resetLegacyResolver();
    expect(resolveLegacyRequest("/gas-pipe", params("?LOSS=1"))?.kind).toBe("gone");
  });

  it("claims nothing when redirects are disabled", () => {
    delete process.env.ENABLE_LEGACY_REDIRECTS;
    resetLegacyResolver();
    expect(resolveLegacyRequest("/gas-pipe", params())).toBeNull();
  });

  it("leaves unmapped paths, static files and admin alone", () => {
    for (const path of [
      "/wp-admin",
      "/wp-admin/install.php",
      "/wp-content/uploads/2022/10/article_204.pdf",
      "/robots.txt",
      "/never-existed",
      "/fa/products",
    ]) {
      expect(resolveLegacyRequest(path, params()), path).toBeNull();
    }
  });
});
