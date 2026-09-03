import { siteConfig } from "@/lib/config/site";

function normalizePath(path: string): string {
  if (path === "" || path === "/") {
    return "/";
  }

  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return withLeadingSlash.replace(/\/+$/, "");
}

export function canonicalUrl(path: string): string {
  const origin = siteConfig.siteUrl.replace(/\/$/, "");
  const normalizedPath = normalizePath(path);
  return normalizedPath === "/" ? `${origin}/` : `${origin}${normalizedPath}`;
}

export { normalizePath };
