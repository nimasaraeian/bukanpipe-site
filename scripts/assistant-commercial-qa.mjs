/** Verify commercial handoff never exposes callback form/errors — run: node scripts/assistant-commercial-qa.mjs */
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

async function checkLocale(page, locale) {
  await page.goto(`${BASE}/${locale}`, { waitUntil: "networkidle", timeout: 60000 });
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

  const quoteLabel = locale === "fa" ? "استعلام قیمت" : "Request a Quote";
  await page.locator(".bpg-guide-quick-actions__btn", { hasText: quoteLabel }).first().click();
  await page.waitForTimeout(400);

  const handoff = await page.evaluate((locale) => {
    const text = document.querySelector(".bpg-guide-panel__body")?.textContent ?? "";
    const hasLeadForm = !!document.querySelector(".bpg-guide-lead__form");
    const hasNotConfigured =
      text.includes("not configured") ||
      text.includes("ثبت آنلاین هنوز فعال نیست") ||
      text.includes("not active");
    const hasCallbackButton = Array.from(document.querySelectorAll(".bpg-guide-quick-actions__btn")).some((btn) =>
      btn.textContent?.includes(locale === "fa" ? "درخواست تماس" : "Request callback"),
    );
    const handoffButtons = Array.from(document.querySelectorAll(".bpg-guide-quick-actions__btn")).map((btn) =>
      btn.textContent?.trim(),
    );
    return { hasLeadForm, hasNotConfigured, hasCallbackButton, handoffButtons };
  }, locale);

  await page.locator(".bpg-guide-quick-actions__btn", { hasText: quoteLabel }).last().click();
  await page.waitForTimeout(400);

  const link = await page.evaluate(() => document.querySelector(".bpg-guide-message__link")?.getAttribute("href") ?? "");
  const state = { ...handoff, link };

  return { locale, ...state };
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  for (const locale of ["fa", "en"]) {
    const page = await browser.newPage();
    results.push(await checkLocale(page, locale));
    await page.close();
  }
  await browser.close();
  console.log(JSON.stringify(results, null, 2));
  const failed = results.some(
    (r) => r.hasLeadForm || r.hasNotConfigured || r.hasCallbackButton || !r.link.includes(`/${r.locale}/`),
  );
  process.exit(failed ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
