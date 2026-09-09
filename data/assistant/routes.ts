import { routes } from "@/lib/config/routes";
import { getAllPublishedPaths } from "@/lib/content/registry";
import type { Locale } from "@/lib/i18n/config";

/** Allowlisted internal paths the assistant may navigate to. */
export const ASSISTANT_STATIC_PATHS = [
  routes.home.path,
  routes.products.path,
  routes.applications.path,
  routes.laboratory.path,
  routes.about.path,
  routes.gallery.path,
  routes.contact.path,
  routes.requestQuote.path,
  "/quality",
  "/technical-center",
  "/calculator",
  "/calculator/pipeline-design",
  "/downloads",
  "/certifications",
  "/polyethylene-pipe",
  "/products/water-supply-pipe",
  "/products/gas-pipe",
  "/products/irrigation-pipe",
  "/products/sewage-pipe",
  "/products/drainage-pipe",
  "/products/pe100-pipe",
  "/products/industrial-pipe",
  "/applications/water-transfer",
  "/applications/agriculture-irrigation",
  "/applications/gas-distribution",
  "/applications/sewage",
  "/applications/drainage",
  "/applications/industrial",
  "/applications/cable-protection",
] as const;

export type AssistantStaticPath = (typeof ASSISTANT_STATIC_PATHS)[number];

const staticSet = new Set<string>(ASSISTANT_STATIC_PATHS);

export function isAssistantPathAllowed(path: string): boolean {
  const normalized = path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
  if (staticSet.has(normalized)) return true;
  return getAllPublishedPaths("fa").includes(normalized) || getAllPublishedPaths("en").includes(normalized);
}

export function assertAssistantPath(path: string): string {
  if (!isAssistantPathAllowed(path)) {
    throw new Error(`Assistant destination not allowlisted: ${path}`);
  }
  return path;
}

export function getAssistantAllowlist(locale: Locale): readonly string[] {
  const published = getAllPublishedPaths(locale);
  const merged = new Set<string>([...ASSISTANT_STATIC_PATHS, ...published]);
  return [...merged].sort();
}
