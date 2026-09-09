/** Capture assistant QA screenshots — run: node scripts/capture-assistant-qa.mjs */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = path.join(process.cwd(), "docs", "assistant", "qa");

async function capture(page, name, width, height, mobile, url, openAssistant) {
  await page.setViewportSize({ width, height });
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForSelector(".bpg-guide-launcher", { state: "attached", timeout: 30000 });
  await page.evaluate(() => sessionStorage.removeItem("bukan-assistant-open"));

  if (openAssistant) {
    await page.evaluate(() => {
      for (const node of document.querySelectorAll("nextjs-portal")) node.remove();
    });
    const launcher = page.locator(".bpg-guide-launcher");
    await launcher.waitFor({ state: "visible", timeout: 10000 });
    await launcher.dispatchEvent("click");
    await page.waitForFunction(
      () => document.querySelector(".bpg-guide-launcher")?.getAttribute("aria-expanded") === "true",
      { timeout: 10000 },
    );
  }

  await page.evaluate((panelOpen) => {
    const el = document.querySelector(panelOpen ? "#bpg-guide-panel" : ".bpg-guide-launcher");
    el?.scrollIntoView({ block: "center", inline: "nearest" });
  }, openAssistant);

  await page.waitForTimeout(300);
  const file = path.join(OUT, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  return file;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  const shots = [
    ["fa-desktop-closed", 1440, 900, false, `${BASE}/fa`, false],
    ["fa-desktop-open", 1440, 900, false, `${BASE}/fa`, true],
    ["fa-mobile-open", 390, 844, true, `${BASE}/fa`, true],
    ["en-desktop-open", 1440, 900, false, `${BASE}/en`, true],
    ["en-mobile-open", 390, 844, true, `${BASE}/en`, true],
  ];

  for (const [name, w, h, , url, open] of shots) {
    const page = await browser.newPage();
    const file = await capture(page, name, w, h, false, url, open);
    console.log("saved", file);
    await page.close();
  }

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
