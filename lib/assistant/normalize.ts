const ARABIC_Y = /\u064A/g;
const PERSIAN_Y = "\u06CC";
const ARABIC_K = /\u0643/g;
const PERSIAN_K = "\u06A9";
const DIACRITICS = /[\u064B-\u065F\u0670\u06D6-\u06ED]/g;
const ZWNJ = /[\u200C\u200D\u00AD]/g;

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

/** Internal-only normalization for deterministic intent matching. */
export function normalizeAssistantQuery(raw: string): string {
  let text = raw.trim();
  text = text.replace(ARABIC_Y, PERSIAN_Y).replace(ARABIC_K, PERSIAN_K);
  text = text.replace(DIACRITICS, "").replace(ZWNJ, " ");
  text = normalizeDigits(text);
  text = text.toLowerCase();
  text = text.replace(/[^\p{L}\p{N}\s./-]/gu, " ");
  text = text.replace(/\s+/g, " ").trim();
  return text;
}

export function normalizeDigits(text: string): string {
  return text
    .split("")
    .map((char) => {
      const pi = PERSIAN_DIGITS.indexOf(char);
      if (pi >= 0) return String(pi);
      const ai = ARABIC_DIGITS.indexOf(char);
      if (ai >= 0) return String(ai);
      return char;
    })
    .join("");
}

export function tokenizeNormalized(text: string): string[] {
  return normalizeAssistantQuery(text).split(" ").filter(Boolean);
}
