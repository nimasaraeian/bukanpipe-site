function readSiteUrl(): string {
  const fromPublic = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const fromVercel = process.env.VERCEL_URL?.trim();
  const fallback =
    fromPublic || (fromVercel ? `https://${fromVercel}` : "http://localhost:3000");
  const normalized = fallback.replace(/\/$/, "");

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
