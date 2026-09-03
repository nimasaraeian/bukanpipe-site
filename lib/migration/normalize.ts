/** Decode a WordPress path and strip trailing slashes except origin `/`. */
export function normalizeLegacyPath(path: string): string {
  let decoded = path.trim();

  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    // Keep the raw path when it is not valid percent-encoding.
  }

  if (decoded === "" || decoded === "/") {
    return "/";
  }

  const withLeadingSlash = decoded.startsWith("/") ? decoded : `/${decoded}`;
  return withLeadingSlash.replace(/\/+$/, "");
}

export function pathnameFromLegacyUrl(oldUrl: string): string {
  const parsed = new URL(oldUrl);
  return normalizeLegacyPath(parsed.pathname);
}

/** Next.js redirect sources: both slash variants, one hop to the final dest. */
export function slashVariants(path: string): readonly string[] {
  const normalized = normalizeLegacyPath(path);

  if (normalized === "/") {
    return ["/"];
  }

  return [normalized, `${normalized}/`];
}

const NEW_PATH_PATTERN = /^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*)?$/;

/** Destination must be a Phase 002 IA path: latin, hyphenated, no trailing slash. */
export function isValidNewPath(path: string): boolean {
  if (path === "/") {
    return true;
  }

  if (!path.startsWith("/") || path.endsWith("/")) {
    return false;
  }

  if (path.includes("?") || path.includes("#") || path.includes("//")) {
    return false;
  }

  return NEW_PATH_PATTERN.test(path);
}
