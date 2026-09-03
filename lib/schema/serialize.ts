/**
 * Serialize JSON-LD for a script tag without introducing HTML injection.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function omitUndefined<T extends Record<string, unknown>>(
  value: T,
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined),
  );
}
