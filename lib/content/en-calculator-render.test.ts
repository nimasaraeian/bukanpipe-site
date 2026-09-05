import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import type { ContentBlock, ContentDocument } from "@/content/models/content-document";
import { enCalculatorHub, enCalculatorIndex } from "@/data/content/en/downloads";
import { dictionaryEn } from "@/messages/en";

/** Arabic/Persian script ranges used in public copy checks */
const PERSIAN_UNICODE = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

function collectStrings(value: unknown, strings: string[] = []): string[] {
  if (typeof value === "string") {
    strings.push(value);
    return strings;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, strings);
    return strings;
  }
  if (value && typeof value === "object") {
    for (const item of Object.values(value)) collectStrings(item, strings);
  }
  return strings;
}

function renderedStrings(doc: ContentDocument): string[] {
  const strings: string[] = [];
  if (doc.description) strings.push(doc.description);
  if (doc.title) strings.push(doc.title);
  if (doc.seoTitle) strings.push(doc.seoTitle);
  if (doc.seoDescription) strings.push(doc.seoDescription);

  for (const section of doc.sections) {
    strings.push(...textFromBlock(section));
  }

  for (const crumb of doc.breadcrumbs) {
    strings.push(crumb.label);
  }

  return strings;
}

function textFromBlock(block: ContentBlock): string[] {
  switch (block.type) {
    case "paragraph":
    case "spec-cta":
      return [block.text];
    case "heading":
      return [block.text];
    case "list":
      return [...block.items];
    default:
      return [];
  }
}

describe("EN calculator public copy — zero Persian leak", () => {
  const calculatorUiStrings = collectStrings(dictionaryEn.calculator.pipelineDesign);
  const calculatorDocs = [enCalculatorIndex, enCalculatorHub];

  it("EN calculator dictionary strings contain no Persian characters", () => {
    const violations = calculatorUiStrings.filter((text) => PERSIAN_UNICODE.test(text));
    expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
  });

  it("EN calculator content documents contain no Persian characters", () => {
    const violations: string[] = [];

    for (const doc of calculatorDocs) {
      for (const text of renderedStrings(doc)) {
        if (PERSIAN_UNICODE.test(text)) violations.push(`${doc.path}: ${text.slice(0, 80)}`);
      }
    }

    expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
  });

  it("PipelineDesignCalculator component has no hardcoded Persian UI strings", () => {
    const source = readFileSync(
      resolve(process.cwd(), "components/calculator/PipelineDesignCalculator.tsx"),
      "utf8",
    );
    const withoutComments = source
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/.*$/gm, "");
    expect(PERSIAN_UNICODE.test(withoutComments)).toBe(false);
  });

  it("pre-rendered EN calculator HTML contains no Persian characters", () => {
    const htmlPaths = [
      ".next/server/app/en/calculator.html",
      ".next/server/app/en/calculator/pipeline-design.html",
    ];

    const violations: string[] = [];

    for (const relativePath of htmlPaths) {
      const absolutePath = resolve(process.cwd(), relativePath);
      let html: string;
      try {
        html = readFileSync(absolutePath, "utf8");
      } catch {
        continue;
      }

      const visibleHtml = html
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<!--[\s\S]*?-->/g, "");

      if (PERSIAN_UNICODE.test(visibleHtml)) {
        const match = visibleHtml.match(
          new RegExp(`.{0,40}[\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF].{0,40}`),
        );
        violations.push(`${relativePath}: ${match?.[0] ?? "Persian detected"}`);
      }
    }

    if (!existsSync(resolve(process.cwd(), ".next/server/app/en/calculator.html"))) {
      expect(violations).toEqual([]);
      return;
    }

    expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
  });
});
