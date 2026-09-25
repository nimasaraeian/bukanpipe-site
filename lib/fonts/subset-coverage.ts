/**
 * The codepoint ranges the UI fonts in public/fonts were subset to.
 *
 * A character outside these ranges has no glyph in the subset, so the browser
 * silently draws it from whatever comes next in the font stack — a different
 * face, at a different size, usually mid-word. The ranges are repeated here so
 * a test can hold the site's own strings against them.
 *
 * See scripts/font-subset.md for how to rebuild the files after widening this.
 */
export const SUBSET_RANGES: readonly (readonly [number, number])[] = [
  [0x0000, 0x00ff], // ASCII and Latin-1: © « » ° · × ÷ é
  [0x03b1, 0x03c9], // Greek lowercase, for the engineering notation
  [0x0600, 0x06ff], // Arabic and Persian, including the Persian digits
  [0x200b, 0x200f], // the zero-width non-joiner and the direction marks
  [0x2010, 0x203a], // dashes, curly quotes, the bullet, the ellipsis
  [0x2044, 0x2044],
  [0x2070, 0x2070],
  [0x2074, 0x2079], // superscript digits
  [0x20ac, 0x20ac],
  [0x2116, 0x2116],
  [0x2122, 0x2122],
  [0x2190, 0x21af], // arrows
  [0x2212, 0x2212],
  [0x2215, 0x2215],
  [0x2248, 0x2248],
  [0x2260, 0x2260],
  [0x2264, 0x2265],
  [0xfdfc, 0xfdfc], // the rial sign
  [0xfffd, 0xfffd],
];

export function inSubset(codePoint: number): boolean {
  return SUBSET_RANGES.some(([lo, hi]) => codePoint >= lo && codePoint <= hi);
}
