import { describe, expect, it } from "vitest";
import type { ContentBlock, ContentDocument } from "@/content/models/content-document";
import { contentCatalogEn } from "@/data/content/en/catalog";

/** Phrases that must not appear in visitor-facing EN copy (sections, descriptions, FAQs). */
const FORBIDDEN_PUBLIC_PHRASES = [
  /Source:/i,
  /commercial intent/i,
  /search intent/i,
  /cannibalization/i,
  /Legacy company content/i,
  /publish after verification/i,
  /purchase intent/i,
  /this page owns/i,
  /this page covers commercial/i,
  /Educational pillar/i,
  /legacy web copy/i,
  /Historical company content/i,
  /verified documents/i,
  /development route/i,
  /factual safety/i,
] as const;

function collectRenderedStrings(doc: ContentDocument): string[] {
  const strings: string[] = [];
  if (doc.description) strings.push(doc.description);

  for (const section of doc.sections) {
    strings.push(...textFromBlock(section));
  }

  if (doc.faqs) {
    for (const faq of doc.faqs) {
      strings.push(faq.question, faq.answer);
    }
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
    case "data-required":
      return block.showPublic === false ? [] : [block.title, block.message];
    case "definition":
      return [block.term, block.text];
    case "spec-table":
      return [block.title, ...block.rows.flatMap((row) => [row.label, row.value]), ...(block.note ? [block.note] : [])];
    case "internal-links":
      return [block.title, ...block.links.flatMap((link) => [link.label, link.path])];
    default:
      return [];
  }
}

describe("EN public copy hygiene", () => {
  it("catalog body copy contains no internal SEO or editorial phrases", () => {
    const violations: { path: string; phrase: string; excerpt: string }[] = [];

    for (const doc of contentCatalogEn) {
      for (const text of collectRenderedStrings(doc)) {
        for (const pattern of FORBIDDEN_PUBLIC_PHRASES) {
          if (pattern.test(text)) {
            violations.push({
              path: doc.path,
              phrase: pattern.source,
              excerpt: text.slice(0, 120),
            });
          }
        }
      }
    }

    expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
  });

  it("does not rely on references field for public rendering", () => {
    const withRefs = contentCatalogEn.filter((d) => d.references && d.references.length > 0);
    expect(withRefs.length).toBeGreaterThan(0);
  });
});
