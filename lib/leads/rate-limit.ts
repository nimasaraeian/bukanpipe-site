import type { Lead } from "./types";

type RateEntry = { count: number; firstAt: number; lastFingerprint: string };

const WINDOW_MS = 5 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const store = new Map<string, RateEntry>();

/** In-memory rate limit — best-effort on serverless; duplicate detection uses phone hash. */
export function checkRateLimit(clientKey: string, fingerprint: string): "ok" | "rate_limited" | "duplicate" {
  const now = Date.now();
  const entry = store.get(clientKey);

  if (!entry || now - entry.firstAt > WINDOW_MS) {
    store.set(clientKey, { count: 1, firstAt: now, lastFingerprint: fingerprint });
    return "ok";
  }

  if (entry.lastFingerprint === fingerprint && now - entry.firstAt < 60_000) {
    return "duplicate";
  }

  if (entry.count >= MAX_PER_WINDOW) {
    return "rate_limited";
  }

  entry.count += 1;
  entry.lastFingerprint = fingerprint;
  return "ok";
}

export function leadFingerprint(phoneNormalized: string, requestType: string, message?: string): string {
  const snippet = (message ?? "").slice(0, 64);
  return `${phoneNormalized}:${requestType}:${snippet}`;
}

export function clientKeyFromRequest(ip: string | null, userAgent: string | null): string {
  return `${ip ?? "unknown"}:${(userAgent ?? "unknown").slice(0, 64)}`;
}

/** Test helper */
export function resetRateLimitStore(): void {
  store.clear();
}

export function recentDuplicateWithinMs(): number {
  return WINDOW_MS;
}

export type { Lead };
