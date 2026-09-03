function readSiteUrl(): string {
  const fallback = "http://localhost:3000";
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallback;
  const normalized = raw.replace(/\/$/, "");

  try {
    const parsed = new URL(normalized);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return fallback;
    }
    return normalized;
  } catch {
    return fallback;
  }
}

export const env = {
  siteUrl: readSiteUrl(),
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
} as const;
