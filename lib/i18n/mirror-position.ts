/**
 * Mirror horizontal object-position so the clear side of hero photos
 * stays opposite the text overlay in RTL layouts.
 */
export function mirrorObjectPosition(position: string): string {
  return position.replace(/(\d+(?:\.\d+)?)%/g, (match, value: string) => {
    const numeric = Number.parseFloat(value);
    if (Number.isNaN(numeric)) {
      return match;
    }
    const mirrored = Math.min(100, Math.max(0, 100 - numeric));
    return `${mirrored}%`;
  });
}
