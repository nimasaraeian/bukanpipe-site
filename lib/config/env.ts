function readSiteUrl(): string {
  const fromPublic = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  // Production and staging must set NEXT_PUBLIC_SITE_URL explicitly.
  // Never infer bukanpipe.com from Vercel — preview hostnames must not leak into canonical metadata.
  if (fromPublic) {
    return normalizeSiteUrl(fromPublic);
  }

  const fromVercel = process.env.VERCEL_URL?.trim();
  const fallback = fromVercel ? `https://${fromVercel}` : "http://localhost:3000";
  return normalizeSiteUrl(fallback);
}

function normalizeSiteUrl(value: string): string {
  const normalized = value.replace(/\/$/, "");

  try {
    const parsed = new URL(normalized);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return value.replace(/\/$/, "");
    }
    return normalized;
  } catch {
    return value.replace(/\/$/, "");
  }
}

export const env = {
  siteUrl: readSiteUrl(),
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
} as const;
