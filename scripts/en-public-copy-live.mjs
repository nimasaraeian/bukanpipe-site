/** Live EN public copy verification — run after staging deploy */

const BASE = process.env.STAGING_BASE ?? "https://bukanpipe.vercel.app";

const ROUTES = [
  "/en",
  "/en/polyethylene-pipe",
  "/en/laboratory",
  "/en/laboratory/iso-17025",
  "/en/certifications",
  "/en/products/pe100-pipe",
  "/en/applications/water-transfer",
  "/en/products/gas-pipe",
  "/en/downloads",
];

const FORBIDDEN = [
  "Source:",
  "commercial intent",
  "search intent",
  "cannibalization",
  "Legacy company content",
  "publish after verification",
  "purchase intent",
  "Educational pillar",
  "Engineering Trust for Infrastructure",
  "Premium HDPE",
];

function stripScripts(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
}

async function main() {
  let failed = false;
  for (const route of ROUTES) {
    const html = stripScripts(await (await fetch(`${BASE}${route}`)).text());
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, "").trim() ?? "";
    const hits = FORBIDDEN.filter((p) => html.includes(p));
    const persian = /[\u0600-\u06FF]/.test(html);
    console.log(route, "| h1:", h1.slice(0, 60), "| forbidden:", hits.length ? hits : "none", "| fa:", persian);
    if (hits.length) failed = true;
  }
  process.exit(failed ? 1 : 0);
}

main();
