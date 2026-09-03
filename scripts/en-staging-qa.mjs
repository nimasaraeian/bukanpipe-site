/** One-off EN staging QA script — run: node scripts/en-staging-qa.mjs */

const BASE = process.env.STAGING_BASE ?? "https://bukanpipe.vercel.app";

const EN_PATHS = [
  "/",
  "/products",
  "/products/water-supply-pipe",
  "/products/gas-pipe",
  "/products/sewage-pipe",
  "/products/drainage-pipe",
  "/products/irrigation-pipe",
  "/products/pe100-pipe",
  "/applications",
  "/applications/water-transfer",
  "/applications/agriculture-irrigation",
  "/applications/gas-distribution",
  "/applications/sewage",
  "/applications/drainage",
  "/applications/industrial",
  "/applications/cable-protection",
  "/laboratory",
  "/laboratory/services",
  "/laboratory/iso-17025",
  "/laboratory/test-scope",
  "/laboratory/standards",
  "/laboratory/training",
  "/technical-center",
  "/technical-center/polyethylene-pipe-welding",
  "/technical-center/air-vent-valve",
  "/technical-center/polyethylene-pipe-temperature-pressure",
  "/technical-center/subsurface-drip-irrigation",
  "/polyethylene-pipe",
  "/downloads",
  "/calculator",
  "/calculator/pipeline-design",
  "/about",
  "/quality",
  "/certifications",
  "/contact",
  "/request-quote",
];

const NOT_FOUND_PATHS = [
  "/does-not-exist",
  "/products/fake-slug",
  "/technical-center/fake",
  "/applications/fake",
];

function stripScripts(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
}

async function checkRoutes() {
  const results = [];
  for (const p of EN_PATHS) {
    const route = `/en${p === "/" ? "" : p}`;
    const res = await fetch(`${BASE}${route}`, { redirect: "manual" });
    results.push({ route, status: res.status, expect: 200 });
  }
  for (const p of NOT_FOUND_PATHS) {
    const route = `/en${p}`;
    const res = await fetch(`${BASE}${route}`, { redirect: "manual" });
    results.push({ route, status: res.status, expect: 404 });
  }
  const failed = results.filter((r) => r.status !== r.expect);
  return { results, failed };
}

async function checkMetadata() {
  const samples = ["/en", "/en/products/gas-pipe", "/en/about", "/en/polyethylene-pipe"];
  const out = [];
  for (const route of samples) {
    const html = await (await fetch(`${BASE}${route}`)).text();
    const body = stripScripts(html);
    out.push({
      route,
      title: html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] ?? "MISSING",
      description: html.match(/name="description" content="([^"]+)"/i)?.[1] ?? "MISSING",
      canonical: html.match(/rel="canonical" href="([^"]+)"/i)?.[1] ?? "MISSING",
      robots: html.match(/name="robots" content="([^"]+)"/i)?.[1] ?? "MISSING",
      h1: body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, "").trim() ?? "MISSING",
      hreflang: [...html.matchAll(/hreflang="([^"]+)" href="([^"]+)"/gi)].map((m) => `${m[1]}:${m[2]}`),
      persianLeak: /[\u0600-\u06FF]/.test(body),
      jsonLd: (html.match(/application\/ld\+json/gi) ?? []).length,
    });
  }
  return out;
}

async function checkSitemapAndHreflang() {
  const sm = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const enUrls = urls.filter((u) => u.includes("/en"));
  const hreflang404 = [];
  for (const u of enUrls.slice(0, 8)) {
    const html = await (await fetch(u)).text();
    for (const [, lang, href] of html.matchAll(/hreflang="([^"]+)" href="([^"]+)"/gi)) {
      const r = await fetch(href, { redirect: "manual" });
      if (r.status >= 400) hreflang404.push({ from: u, lang, href, status: r.status });
    }
  }
  const robots = await (await fetch(`${BASE}/robots.txt`)).text();
  return { total: urls.length, enCount: enUrls.length, faCount: urls.filter((u) => u.includes("/fa")).length, hreflang404, robots: robots.trim() };
}

async function checkLegacyRedirects() {
  const legacy = ["/gas-pipe", "/about_us/", "/welding/"];
  const out = [];
  for (const p of legacy) {
    const res = await fetch(`${BASE}${p}`, { redirect: "manual" });
    out.push({ path: p, status: res.status, location: res.headers.get("location") });
  }
  return out;
}

async function main() {
  console.log("BASE", BASE);
  const routes = await checkRoutes();
  console.log("\n## ROUTES");
  console.log("total", routes.results.length, "failed", routes.failed.length);
  if (routes.failed.length) console.log(JSON.stringify(routes.failed, null, 2));

  const meta = await checkMetadata();
  console.log("\n## METADATA");
  console.log(JSON.stringify(meta, null, 2));

  const sm = await checkSitemapAndHreflang();
  console.log("\n## SITEMAP");
  console.log(JSON.stringify(sm, null, 2));

  const legacy = await checkLegacyRedirects();
  console.log("\n## LEGACY (should NOT redirect at runtime)");
  console.log(JSON.stringify(legacy, null, 2));

  process.exit(routes.failed.length > 0 || meta.some((m) => m.persianLeak) || sm.hreflang404.length > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
