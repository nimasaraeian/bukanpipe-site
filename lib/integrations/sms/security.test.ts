import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = path.resolve(process.cwd());
const SKIP_DIRS = new Set(["node_modules", ".next", ".git"]);

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, files);
    } else if (/\.(tsx?|jsx?|mjs|css)$/.test(entry) || entry === ".env.example") {
      files.push(full);
    }
  }
  return files;
}

describe("SMS credential isolation", () => {
  it("never exposes SMS_API_KEY through NEXT_PUBLIC_ variables", () => {
    const offenders: string[] = [];
    for (const file of walk(ROOT)) {
      if (file.endsWith("security.test.ts")) continue;
      const content = readFileSync(file, "utf8");
      if (content.includes("NEXT_PUBLIC_SMS") || content.includes("NEXT_PUBLIC_SMS_API_KEY")) {
        offenders.push(path.relative(ROOT, file));
      }
    }
    expect(offenders).toEqual([]);
  });

  it("keeps SMS secrets out of client lead modules", () => {
    const clientFiles = [
      "lib/leads/client.ts",
      "lib/leads/public-config.ts",
      "lib/leads/api-response.ts",
    ];
    for (const relative of clientFiles) {
      const content = readFileSync(path.join(ROOT, relative), "utf8");
      expect(content).not.toContain("SMS_API_KEY");
      expect(content).not.toContain("Api-Key");
      expect(content).not.toContain("iranpayamak");
    }
  });

  it("does not let the browser client set the SMS destination", () => {
    const client = readFileSync(path.join(ROOT, "lib/leads/client.ts"), "utf8");
    expect(client).not.toMatch(/recipients|SMS_SALES_RECIPIENT|line_number/);
    const inputType = client.includes("SubmitLeadClientInput");
    expect(inputType).toBe(true);
    expect(client).not.toMatch(/smsTo|destinationNumber|salesRecipient/);
  });
});
