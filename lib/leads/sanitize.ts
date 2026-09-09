const CONTROL_CHARS = /[\u0000-\u001F\u007F-\u009F]/g;

export function sanitizeText(raw: string | undefined, maxLength: number): string | undefined {
  if (raw === undefined) return undefined;
  const cleaned = raw.trim().replace(CONTROL_CHARS, "").slice(0, maxLength);
  return cleaned.length > 0 ? cleaned : undefined;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(raw: string | undefined): boolean {
  if (!raw) return true;
  const trimmed = raw.trim();
  if (!trimmed) return true;
  if (trimmed.length > 254) return false;
  return EMAIL_PATTERN.test(trimmed);
}

/** Allow only same-origin or relative page URLs — block open redirects. */
export function sanitizePageUrl(raw: string, allowedOrigin: string): string {
  const trimmed = raw.trim().slice(0, 512);
  if (!trimmed) return allowedOrigin;

  try {
    if (trimmed.startsWith("/")) {
      return trimmed;
    }
    const parsed = new URL(trimmed);
    const allowed = new URL(allowedOrigin);
    if (parsed.origin === allowed.origin) {
      return `${parsed.pathname}${parsed.search}`;
    }
  } catch {
    // fall through
  }

  return "/";
}
