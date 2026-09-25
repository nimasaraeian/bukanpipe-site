import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { inSubset } from "@/lib/fonts/subset-coverage";

const root = process.cwd();

/** Every file that holds text the site puts on a page. */
function contentFiles(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(path.join(root, dir))) {
      const rel = path.join(dir, entry);
      if (statSync(path.join(root, rel)).isDirectory()) walk(rel);
      else if (/\.tsx?$/.test(entry) && !/\.test\.tsx?$/.test(entry)) out.push(rel);
    }
  };
  for (const dir of ["messages", "data", "components", "app", "lib/config"]) walk(dir);
  return out;
}

describe("UI font subset coverage", () => {
  /*
   * The fonts in public/fonts are subsets. A character the subset does not
   * carry still renders — from the next family in the stack, at a different
   * size and weight, usually in the middle of a word, and nothing reports it.
   * This is the report.
   */
  it("ships no character the subset cannot draw", () => {
    const offenders = new Map<string, { file: string; sample: string }>();

    for (const file of contentFiles()) {
      const source = readFileSync(path.join(root, file), "utf8");
      for (const ch of source) {
        const cp = ch.codePointAt(0)!;
        if (cp < 0x80 || inSubset(cp)) continue;
        const key = `U+${cp.toString(16).toUpperCase().padStart(4, "0")} ${ch}`;
        if (!offenders.has(key)) {
          const at = source.indexOf(ch);
          offenders.set(key, { file, sample: source.slice(Math.max(0, at - 24), at + 24).replace(/\s+/g, " ") });
        }
      }
    }

    expect(
      [...offenders].map(([k, v]) => `${k} — ${v.file}: …${v.sample}…`),
    ).toEqual([]);
  });
});
