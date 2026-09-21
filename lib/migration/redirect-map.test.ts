import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { resolveLegacyRequest } from "@/lib/migration/legacy-resolver";
import {
  CONFLICT_COUNT,
  DECISION_COUNT,
  MAP_ROW_COUNT,
  SKIPPED_ROWS,
} from "@/data/migration/redirect-map";
import { resetLegacyRedirectLookup } from "@/lib/migration/redirects";
import { legacyUrls } from "@/data/migration/legacy-urls";
import overlap from "@/data/migration/redirect-conflicts.json";
import { getAllPublishedPaths } from "@/lib/content/registry";
import { locales } from "@/lib/i18n/config";

/**
 * Production runs ENABLE_LEGACY_REDIRECTS=true, so the inventory base layer is
 * live. Every assertion below is made against that reality.
 */
beforeAll(() => {
  process.env.ENABLE_LEGACY_REDIRECTS = "true";
  resetLegacyRedirectLookup();
});

/**
 * The inventory outcome for a path, recomputed from the records here rather
 * than trusted from the compiled map. "410" for a gone row, a `/fa...` path
 * for a redirect, null when the inventory does not claim the path.
 */
function inventoryOutcome(p: string): string | null {
  const record = legacyUrls.find(
    (r) => r.host === "bukanpipe.com" && normalize(r.oldPath) === p,
  );
  if (!record) return null;

  if (record.proposedNewPath === null) {
    const gone =
      record.action === "IGNORE_NONINDEXABLE" && !/\.[a-z0-9]+$/i.test(p);
    return gone ? "410" : null;
  }

  const eligible =
    record.action === "REDIRECT_301" ||
    record.action === "MERGE" ||
    (record.action === "REBUILD" &&
      normalize(record.oldPath) !== normalize(record.proposedNewPath));
  if (!eligible) return null;

  const d = normalize(record.proposedNewPath);
  return d === "/" ? "/fa" : `/fa${d}`;
}

/** What the resolver actually answers, in the same vocabulary. */
function actualOutcome(p: string): string | null {
  const outcome = resolveLegacyRequest(p);
  if (outcome === null) return null;
  return outcome.kind === "gone" ? "410" : outcome.destination;
}

const ROOT = path.resolve(__dirname, "../..");

type Row = {
  line: number;
  oldPath: string;
  action: string;
  destination: string;
  reason: string;
};

function readRows(): Row[] {
  return readFileSync(path.join(ROOT, "redirect-map-draft.csv"), "utf8")
    .replace(/^﻿/, "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(1)
    .map((line, i) => {
      const cols = line.split(",");
      return {
        line: i + 2,
        oldPath: cols[0] ?? "",
        action: cols[1] ?? "",
        destination: cols[2] ?? "",
        reason: cols[3] ?? "",
      };
    });
}

const rows = readRows();

/** Rows whose `old_path` is a pattern or a query form rather than a plain path. */
function isSpecial(oldPath: string): boolean {
  return /[*?()]| and /.test(oldPath);
}

function normalize(p: string): string {
  let s = p.trim();
  try {
    s = decodeURIComponent(s);
  } catch {
    /* malformed encoding stays raw */
  }
  if (s === "" || s === "/") return "/";
  return s.replace(/\/+$/, "") || "/";
}

const skipped = new Set(SKIPPED_ROWS.map((r) => r.source));

/** Every route that actually answers 200, per locale prefix. */
function realPaths(): Set<string> {
  const all = new Set<string>();
  const staticRoutes = [
    "",
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
  ];
  for (const locale of locales) {
    for (const p of staticRoutes) all.add(`/${locale}${p}`);
    for (const p of getAllPublishedPaths(locale)) {
      all.add(p === "/" ? `/${locale}` : `/${locale}${p}`);
    }
  }
  return all;
}

describe("redirect map is compiled from the CSV", () => {
  it("has a compiled module that matches the CSV exactly", () => {
    // Fails if redirect-map-draft.csv changed without regenerating.
    execFileSync("node", [path.join(ROOT, "scripts/build-redirect-map.mjs"), "--check"], {
      cwd: ROOT,
    });
  });

  it("accounts for every CSV row", () => {
    expect(rows).toHaveLength(MAP_ROW_COUNT);
    expect(rows.length).toBe(248);
  });

  it("gives a reason for every skipped row", () => {
    expect(SKIPPED_ROWS).toHaveLength(55);
    for (const row of SKIPPED_ROWS) expect(row.reason).toMatch(/\S/);
  });

  it("skips the three structurally unimplementable rows", () => {
    const structural = SKIPPED_ROWS.filter(
      (r) => !/inventory/.test(r.reason) && !/decided/.test(r.reason),
    );
    expect(structural.map((r) => r.source).sort()).toEqual([
      "/about",
      "/contact",
      "/fa/products/irrigation-pipe",
    ]);
  });
});

describe("overlap with the live inventory", () => {
  it("has no undecided conflicts left", () => {
    expect(CONFLICT_COUNT).toBe(0);
    expect(overlap.conflicts).toEqual([]);
  });

  it("records a decision for every path the two sources share", () => {
    expect(overlap.decisions).toHaveLength(DECISION_COUNT);
    expect(overlap.decisions).toHaveLength(52);

    const shared = rows.filter((r) => {
      if (isSpecial(r.oldPath)) return false;
      return inventoryOutcome(normalize(r.oldPath)) !== null;
    });
    expect(new Set(overlap.decisions.map((d) => d.path))).toEqual(
      new Set(shared.map((r) => normalize(r.oldPath))),
    );
  });

  it("serves every decided path from the inventory, exactly as decided", () => {
    for (const d of overlap.decisions) {
      expect(inventoryOutcome(d.path), `${d.path} inventory`).toBe(d.outcome);
      expect(actualOutcome(d.path), `${d.path} served`).toBe(d.outcome);
    }
  });

  it("keeps the inventory's answer where the inventory won the ruling", () => {
    const invWins = overlap.decisions.filter((d) => d.winner === "inventory");
    expect(invWins).toHaveLength(9);

    for (const d of invWins) {
      expect(actualOutcome(d.path), d.path).toBe(d.outcome);
      expect(actualOutcome(d.path), `${d.path} must not take the CSV value`).not.toBe(
        d.csvWanted,
      );
    }
  });

  it("matches the CSV wherever the ruling adopted it", () => {
    const agreed = overlap.decisions.filter((d) => d.winner === "agreed");
    expect(agreed).toHaveLength(43);

    for (const d of agreed) {
      const row = rows.find((r) => r.line === d.csvLine);
      const csvOutcome = row!.action === "410" ? "410" : row!.destination;
      expect(csvOutcome, `L${d.csvLine}`).toBe(d.outcome);
      expect(actualOutcome(d.path), d.path).toBe(csvOutcome);
    }
  });

  it("answers 410 for the rows the inventory marks non-indexable", () => {
    // These used to fall through to the locale hop and a soft 404.
    for (const p of ["/customer-poll", "/lab-poll", "/cart", "/my-account", "/feed"]) {
      expect(actualOutcome(p), p).toBe("410");
    }
  });

  it("applies the rulings that moved an inventory destination", () => {
    const moved: [string, string][] = [
      ["/certs", "/fa/certifications"],
      ["/policy", "/fa/quality"],
      ["/training", "/fa/laboratory/training"],
      ["/shop", "/fa/products"],
      ["/آخرین-نوشته-ها", "/fa/technical-center"],
    ];
    for (const [p, expected] of moved) expect(actualOutcome(p), p).toBe(expected);
  });

  it("410s the author and demo pages that used to dilute About", () => {
    const demos = [
      "/پیمان-دادخواه",
      "/مدیر-فروش",
      "/الیزا-روما",
      "/استراتژی-محتوا",
      "/پشتیبانی-رایگان-از-سایت-شما-در-هر-زمان",
      "/category/تبلیغات",
      "/category/blog/برندینگ",
    ];
    for (const p of demos) expect(actualOutcome(p), p).toBe("410");
  });

  it("leaves the rulings that kept the inventory destination", () => {
    const kept: [string, string][] = [
      ["/pipeline_design", "/fa/calculator/pipeline-design"],
      ["/lab-scope", "/fa/laboratory/test-scope"],
      ["/standards", "/fa/downloads"],
      ["/خط-مشی-کیفیت-آزمایشگاه", "/fa/laboratory"],
      ["/آبیاری-زیرسطحی", "/fa/applications/agriculture-irrigation"],
      ["/category/blog", "/fa/technical-center"],
      ["/بلوک-ریکاردو", "/fa/projects"],
    ];
    for (const [p, expected] of kept) expect(actualOutcome(p), p).toBe(expected);
  });
});

describe("every plain CSV row", () => {
  const plain = rows.filter((r) => !isSpecial(r.oldPath));

  it("is the bulk of the map", () => {
    expect(plain.length).toBeGreaterThan(200);
  });

  describe.each(plain.map((r) => [r.line, r.oldPath, r.action, r.destination] as const))(
    "L%i %s",
    (line, oldPath, action, destination) => {
      const source = normalize(oldPath);

      it(`resolves to ${action === "410" ? "410" : destination}`, () => {
        if (skipped.has(source)) {
          // Conflicts and already-covered paths stay on the inventory; the
          // three structural skips resolve to nothing. Asserted in detail by
          // the overlap suite above.
          const inv = inventoryOutcome(source);
          if (inv === null) expect(actualOutcome(source)).toBeNull();
          else expect(actualOutcome(source), source).toBe(inv);
          return;
        }

        const outcome = resolveLegacyRequest(source);
        expect(outcome, `L${line} ${source} unmatched`).not.toBeNull();

        if (action === "410") {
          expect(outcome!.kind).toBe("gone");
        } else {
          expect(outcome!.kind).toBe("redirect");
          expect((outcome as { destination: string }).destination).toBe(destination);
        }
      });

      it("matches with and without a trailing slash, encoded or not", () => {
        if (source === "/") return;

        const expected = resolveLegacyRequest(source);
        for (const variant of [`${source}/`, encodeURI(source), `${encodeURI(source)}/`]) {
          expect(resolveLegacyRequest(variant), `${variant}`).toEqual(expected);
        }
      });
    },
  );
});

describe("destinations", () => {
  const redirects = rows.filter((r) => r.action === "301" && !isSpecial(r.oldPath));

  it("every 301 destination is a route that exists", () => {
    const real = realPaths();
    const missing = [...new Set(redirects.map((r) => r.destination))].filter(
      (d) => !real.has(d),
    );
    expect(missing).toEqual([]);
  });

  it("no row sends traffic to a locale homepage that was not asked for", () => {
    // `/fa` and `/en` are legitimate destinations only for old homepage rows.
    for (const row of redirects) {
      if (row.destination === "/fa" || row.destination === "/en") {
        expect(
          /index|^\/ar\/$|home/i.test(row.oldPath),
          `L${row.line} ${row.oldPath} falls back to a locale homepage`,
        ).toBe(true);
      }
    }
  });

  it("is single-hop: no destination is itself a mapped source", () => {
    for (const row of redirects) {
      const onward = resolveLegacyRequest(row.destination);
      expect(onward, `L${row.line} ${row.destination} redirects onward`).toBeNull();
    }
  });

  it("never redirects a row onto itself", () => {
    // The CSV does contain one self-redirect (L43). It is caught at compile
    // time and skipped, so no such row reaches the resolver.
    const selfRedirects = redirects.filter(
      (row) => normalize(row.oldPath) === row.destination,
    );
    expect(selfRedirects.map((r) => r.oldPath)).toEqual(["/fa/products/irrigation-pipe"]);

    for (const row of selfRedirects) {
      expect(skipped.has(normalize(row.oldPath)), `L${row.line} must be skipped`).toBe(true);
      expect(resolveLegacyRequest(normalize(row.oldPath))).toBeNull();
    }

    for (const row of redirects.filter((r) => !skipped.has(normalize(r.oldPath)))) {
      expect(normalize(row.oldPath), `L${row.line}`).not.toBe(row.destination);
    }
  });
});

describe("wildcard rows", () => {
  const cases: [string, "gone" | string][] = [
    ["/fa/news/item/12-something", "gone"],
    ["/fa/news/itemlist/tag/pipe", "gone"],
    ["/fa/component/users/login", "gone"],
    ["/ar/news/item/7-news", "gone"],
    ["/ar/2-moarefi/19-introduction", "/en/about"],
    ["/index.php/fa/products/2018-01-01-item", "/fa/products"],
    ["/index.php/fa/blog/item/44-post", "gone"],
    ["/index.php/fa/home1/2018-05-01-x", "gone"],
    ["/index.php/fa/2016-04-02-title", "gone"],
    ["/index.php/fa/2018-04-02-title", "gone"],
    ["/index.php/fa/component/search", "gone"],
    ["/index.php/en/component/tags", "gone"],
    ["/footer/anything", "gone"],
    ["/ct-mega-menu/col-1", "gone"],
  ];

  it.each(cases)("%s", (source, expected) => {
    const outcome = resolveLegacyRequest(source);
    expect(outcome, source).not.toBeNull();
    if (expected === "gone") {
      expect(outcome!.kind).toBe("gone");
    } else {
      expect((outcome as { destination: string }).destination).toBe(expected);
    }
  });

  it("an exact row beats the wildcard that would also match it", () => {
    // /index.php/fa/products/* → /fa/products, but this child has its own row.
    expect(
      (resolveLegacyRequest("/index.php/fa/products/irrigation-pipe") as {
        destination: string;
      }).destination,
    ).toBe("/fa/products/irrigation-pipe");
  });

  it("does not match a prefix that only shares characters with a segment", () => {
    expect(resolveLegacyRequest("/footer-links")).toBeNull();
    expect(resolveLegacyRequest("/fa/newsletter")).toBeNull();
  });
});

describe("query-string rows", () => {
  function q(query: string): URLSearchParams {
    return new URL(`/x${query}`, "https://bukanpipe.com").searchParams;
  }

  it("routes irantech_cms ids to their successor", () => {
    const cases: [string, string, string][] = [
      ["/fa/user/temp.php", "?irantech_cms=11801&type=PE", "/fa/laboratory/services"],
      ["/fa/user/temp.php", "?irantech_cms=11801&type=PP", "/fa/laboratory/services"],
      ["/fa/user/temp.php", "?irantech_cms=11801&type=PVC", "/fa/laboratory/services"],
      ["/en/user/temp.php", "?irantech_cms=11801", "/en/laboratory"],
      ["/fa/user/temp.php", "?irantech_cms=1141", "/fa/gallery"],
      ["/en/user/temp.php", "?irantech_cms=1141", "/en/gallery"],
    ];
    for (const [p, query, expected] of cases) {
      const outcome = resolveLegacyRequest(p, q(query));
      expect(outcome?.kind, `${p}${query}`).toBe("redirect");
      expect((outcome as { destination: string }).destination, `${p}${query}`).toBe(expected);
    }
  });

  it("410s temp.php for any other parameters, and for none", () => {
    for (const query of ["?irantech_cms=99999", "?other=1", ""]) {
      expect(resolveLegacyRequest("/fa/user/temp.php", q(query))?.kind, query).toBe("gone");
      expect(resolveLegacyRequest("/en/user/temp.php", q(query))?.kind, query).toBe("gone");
    }
  });

  it("routes product detail by any ID", () => {
    for (const id of ["1", "4096", "abc"]) {
      expect(
        (resolveLegacyRequest("/fa/user/product2/detail.php", q(`?ID=${id}`)) as {
          destination: string;
        }).destination,
      ).toBe("/fa/products");
    }
    expect(
      (resolveLegacyRequest("/en/user/product2/detail.php", q("?ID=7")) as {
        destination: string;
      }).destination,
    ).toBe("/en/products");
  });

  it("leaves product detail without an ID to 404", () => {
    expect(resolveLegacyRequest("/fa/user/product2/detail.php", q(""))).toBeNull();
  });

  it("drops the legacy parameter, so the destination is not duplicated under it", () => {
    const cases: [string, string][] = [
      ["/fa/user/temp.php", "?irantech_cms=11801&type=PE"],
      ["/fa/user/product2/detail.php", "?ID=55"],
      ["/", "?download=catalog"],
    ];
    for (const [p, query] of cases) {
      const outcome = resolveLegacyRequest(p, q(query));
      expect(outcome?.kind, `${p}${query}`).toBe("redirect");
      expect(
        (outcome as { preserveQuery: boolean }).preserveQuery,
        `${p}${query} must not carry its legacy query across`,
      ).toBe(false);
    }
  });

  it("keeps the query on a path-matched row, so utm tags survive", () => {
    const outcome = resolveLegacyRequest("/about_us", q("?utm_source=google"));
    expect(outcome?.kind).toBe("redirect");
    expect((outcome as { preserveQuery: boolean }).preserveQuery).toBe(true);
  });

  it("routes the catalog download to products", () => {
    expect(
      (resolveLegacyRequest("/", q("?download=catalog")) as { destination: string }).destination,
    ).toBe("/fa/products");
  });

  it("leaves the bare homepage alone", () => {
    expect(resolveLegacyRequest("/", q(""))).toBeNull();
  });
});

describe("spam rows", () => {
  function q(query: string): URLSearchParams {
    return new URL(`/x${query}`, "https://bukanpipe.com").searchParams;
  }

  it("410s LOSS and Male on any path, mapped or not", () => {
    for (const p of ["/", "/about_us/", "/fa/products", "/never-existed", "/index.php"]) {
      expect(resolveLegacyRequest(p, q("?LOSS=1"))?.kind, p).toBe("gone");
      expect(resolveLegacyRequest(p, q("?Male=1"))?.kind, p).toBe("gone");
    }
  });

  it("410s the spam posts by path", () => {
    expect(
      resolveLegacyRequest("/2021/10/08/onlajn-pinap-kazino-veb-resurs-dlja-aktivnyh/")?.kind,
    ).toBe("gone");
    expect(resolveLegacyRequest("/2022/03/01/korean-home-theater-devices/")?.kind).toBe("gone");
  });
});

describe("paths outside the map", () => {
  it("are left alone so they keep their own 404", () => {
    for (const p of [
      "/wp-admin",
      "/wp-admin/install.php",
      "/wp-content/uploads/2022/10/article_204.pdf",
      "/robots.txt",
      "/never-existed",
      "/fa/products",
      "/fa/technical-center/air-vent-valve",
    ]) {
      expect(resolveLegacyRequest(p), p).toBeNull();
    }
  });
});
