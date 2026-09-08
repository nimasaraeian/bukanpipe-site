/**
 * Post-DNS production verification — run after cPanel DNS cutover.
 *
 *   node scripts/verify-production-dns.mjs
 *   BASE=https://bukanpipe.com node scripts/verify-production-dns.mjs
 */

const BASE = (process.env.BASE ?? "https://bukanpipe.com").replace(/\/$/, "");
const WWW_BASE = process.env.WWW_BASE ?? "https://www.bukanpipe.com";
const TIMEOUT_MS = Number(process.env.TIMEOUT_MS ?? 15000);

const KEY_PATHS = [
  "/",
  "/fa",
  "/en",
  "/fa/products",
  "/en/products",
  "/fa/gallery",
  "/en/gallery",
  "/fa/about",
  "/en/about",
  "/fa/contact",
  "/en/contact",
  "/fa/laboratory",
  "/en/laboratory",
  "/fa/technical-center",
  "/en/technical-center",
  "/fa/calculator",
  "/en/calculator",
  "/fa/downloads",
  "/en/downloads",
  "/fa/quality",
  "/en/quality",
  "/fa/certifications",
  "/en/certifications",
  "/fa/request-quote",
  "/en/request-quote",
];

const LEGACY_PATHS = [
  "/gas-pipe",
  "/about_us",
  "/qc-and-laboratory",
  "/contact-us",
  "/pipeline_design",
];

async function fetchWithTimeout(url, init = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal, redirect: "manual" });
  } finally {
    clearTimeout(timer);
  }
}

async function followRedirectChain(url, maxHops = 8) {
  const chain = [];
  let current = url;

  for (let hop = 0; hop < maxHops; hop += 1) {
    const res = await fetchWithTimeout(current);
    chain.push({ url: current, status: res.status, location: res.headers.get("location") });
    if (res.status < 300 || res.status >= 400) {
      return chain;
    }
    const next = new URL(res.headers.get("location"), current).href;
    current = next;
  }

  chain.push({ url: current, status: "LOOP", location: null });
  return chain;
}

function extractMeta(html, name) {
  const re = new RegExp(
    `<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']+)["']`,
    "i",
  );
  const match = html.match(re);
  if (match) return match[1];
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']${name}["']`,
    "i",
  );
  return html.match(re2)?.[1] ?? null;
}

function extractCanonical(html) {
  const match = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  if (match) return match[1];
  return html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1] ?? null;
}

function extractLang(html) {
  return html.match(/<html[^>]+lang=["']([^"']+)["']/i)?.[1] ?? null;
}

async function checkWwwRedirect() {
  const chain = await followRedirectChain(`${WWW_BASE}/fa`);
  const final = chain[chain.length - 1];
  const ok =
    chain.length >= 2 &&
    chain[0].status >= 301 &&
    chain[0].status <= 308 &&
    final.url.startsWith(`${BASE}/`) &&
    !final.url.includes("www.");

  return {
    name: "www → non-www permanent redirect",
    ok,
    detail: chain.map((h) => `${h.status} ${h.url}`).join(" → "),
  };
}

async function checkRobots() {
  const res = await fetchWithTimeout(`${BASE}/robots.txt`);
  const body = await res.text();
  const ok =
    res.status === 200 &&
    /Allow:\s*\//i.test(body) &&
    !/Disallow:\s*\/\s*$/m.test(body) &&
    body.includes(`Sitemap: ${BASE}/sitemap.xml`) &&
    body.includes(`Host: ${BASE}`);

  return {
    name: "robots.txt indexable",
    ok,
    detail: body.slice(0, 400),
  };
}

async function checkSitemap() {
  const res = await fetchWithTimeout(`${BASE}/sitemap.xml`);
  const body = await res.text();
  const ok =
    res.status === 200 &&
    body.includes(`${BASE}/fa`) &&
    body.includes(`${BASE}/en`) &&
    !body.includes(".vercel.app");

  return {
    name: "sitemap.xml production URLs",
    ok,
    detail: `status=${res.status}, bytes=${body.length}`,
  };
}

async function checkPage(path) {
  const url = `${BASE}${path}`;
  const res = await fetchWithTimeout(url);
  const html = res.status === 200 ? await res.text() : "";
  const canonical = html ? extractCanonical(html) : null;
  const robots = html ? extractMeta(html, "robots") : null;
  const lang = html ? extractLang(html) : null;
  const locale = path.startsWith("/fa") ? "fa" : path.startsWith("/en") ? "en" : null;

  const canonicalOk = canonical ? canonical.startsWith(`${BASE}/`) && !canonical.includes(".vercel.app") : false;
  const robotsOk = !robots || (!/noindex/i.test(robots) && !/nofollow/i.test(robots));
  const langOk = locale ? lang === locale : true;

  return {
    name: `page ${path}`,
    ok: res.status === 200 && canonicalOk && robotsOk && langOk,
    detail: `status=${res.status} canonical=${canonical ?? "missing"} robots=${robots ?? "default"} lang=${lang ?? "missing"}`,
  };
}

async function checkLegacy(path) {
  const chain = await followRedirectChain(`${BASE}${path}`);
  const final = chain[chain.length - 1];
  const ok =
    chain.length >= 1 &&
    chain[0].status >= 301 &&
    chain[0].status <= 308 &&
    final.url.startsWith(`${BASE}/fa/`);

  return {
    name: `legacy redirect ${path}`,
    ok,
    detail: chain.map((h) => `${h.status} ${h.url}`).join(" → "),
  };
}

async function main() {
  console.log(`\nProduction DNS verification\nBASE=${BASE}\nWWW=${WWW_BASE}\n`);

  const checks = [
    await checkWwwRedirect(),
    await checkRobots(),
    await checkSitemap(),
  ];

  for (const path of KEY_PATHS) {
    checks.push(await checkPage(path));
  }

  for (const path of LEGACY_PATHS) {
    checks.push(await checkLegacy(path));
  }

  let failed = 0;
  for (const check of checks) {
    const mark = check.ok ? "PASS" : "FAIL";
    if (!check.ok) failed += 1;
    console.log(`[${mark}] ${check.name}`);
    console.log(`       ${check.detail}\n`);
  }

  console.log(`${checks.length - failed}/${checks.length} checks passed`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
