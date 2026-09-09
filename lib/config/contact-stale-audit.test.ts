import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const STALE_WHATSAPP = ["989013414979", "9013414979", "09013414979"];
const EXPECTED_SALES_MESSAGING = ["989352197676", "9352197676", "09352197676"];
const EXPECTED_SMS_RECIPIENT = ["989143820556", "9143820556", "09143820556"];

const SKIP_DIRS = new Set(["node_modules", ".next", ".git", "docs/lighthouse-home-mobile.json"]);

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, files);
    } else if (/\.(tsx?|jsx?|mjs|md|css)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

describe("stale contact number audit", () => {
  it("does not use old lab number as WhatsApp/Telegram sales fallback in source", () => {
    const root = path.resolve(process.cwd());
    const offenders: string[] = [];

    for (const file of walk(root)) {
      if (file.includes("contact-stale-audit.test.ts")) continue;
      const content = readFileSync(file, "utf8");
      if (
        content.includes('fallbackPhone: "+989013414979"') ||
        content.includes("wa.me/989013414979") ||
        content.includes("t.me/+989013414979")
      ) {
        offenders.push(path.relative(root, file));
      }
    }

    expect(offenders).toEqual([]);
  });

  it("documents expected role numbers", () => {
    expect(EXPECTED_SALES_MESSAGING.length).toBeGreaterThan(0);
    expect(EXPECTED_SMS_RECIPIENT.length).toBeGreaterThan(0);
    expect(STALE_WHATSAPP[0]).toBe("989013414979");
  });
});
