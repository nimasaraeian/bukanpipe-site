/** Assistant viewport overlap audit — run: node scripts/assistant-viewport-qa.mjs */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const WIDTHS = [320, 375, 390, 430, 768, 1440];
const PAGES = [
  { locale: "fa", path: "/fa" },
  { locale: "fa", path: "/fa/products" },
  { locale: "fa", path: "/fa/products/gas-pipe" },
  { locale: "fa", path: "/fa/laboratory" },
  { locale: "fa", path: "/fa/gallery" },
  { locale: "fa", path: "/fa/calculator" },
  { locale: "en", path: "/en" },
  { locale: "en", path: "/en/products" },
  { locale: "en", path: "/en/products/gas-pipe" },
  { locale: "en", path: "/en/laboratory" },
];

function overlaps(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

async function audit(page, width, url, locale) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(`${BASE}${url}`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForSelector(".bpg-guide-launcher", { state: "attached", timeout: 30000 });
  await page.evaluate(() => sessionStorage.removeItem("bukan-assistant-open"));
  await page.evaluate(() => {
    for (const node of document.querySelectorAll("nextjs-portal")) node.remove();
  });
  const launcher = page.locator(".bpg-guide-launcher");
  await launcher.waitFor({ state: "visible", timeout: 10000 });
  await launcher.dispatchEvent("click");
  await page.waitForFunction(
    () => document.querySelector(".bpg-guide-launcher")?.getAttribute("aria-expanded") === "true",
    { timeout: 15000 },
  );

  return page.evaluate(
    ({ locale, width }) => {
      const panel = document.querySelector(".bpg-guide-panel");
      const launcher = document.querySelector(".bpg-guide-launcher");
      const header = document.querySelector("header");
      const footer = document.querySelector("footer");
      const pr = panel?.getBoundingClientRect();
      const lr = launcher?.getBoundingClientRect();
      const hr = header?.getBoundingClientRect();
      const fr = footer?.getBoundingClientRect();
      const dir = document.documentElement.getAttribute("dir");
      const clip = panel
        ? Array.from(panel.querySelectorAll("*")).some((el) => {
            const r = el.getBoundingClientRect();
            return r.width > 0 && (r.right < pr.left + 4 || r.left > pr.right - 4);
          })
        : false;
      return {
        width,
        locale,
        dir,
        panelInViewport: pr ? pr.top >= -1 && pr.bottom <= window.innerHeight + 2 : false,
        launcherVisible: lr ? lr.width > 0 && lr.height > 0 : false,
        headerOverlap: pr && hr ? pr.top < hr.bottom : false,
        footerOverlap: pr && fr ? pr.bottom > fr.top && fr.top < window.innerHeight : false,
        clipped: clip,
      };
    },
    { locale, width },
  );
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const { locale, path } of PAGES) {
    for (const width of WIDTHS) {
      const page = await browser.newPage();
      results.push({ path, ...(await audit(page, width, path, locale)) });
      await page.close();
    }
  }

  await browser.close();

  const failures = results.filter(
    (r) =>
      r.dir !== (r.locale === "fa" ? "rtl" : "ltr") ||
      r.headerOverlap ||
      r.footerOverlap ||
      !r.panelInViewport,
  );

  console.log(JSON.stringify({ total: results.length, failures: failures.length, failures }, null, 2));
  process.exit(failures.length ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
