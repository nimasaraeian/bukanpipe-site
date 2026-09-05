import type { Metadata } from "next";
import type { Dictionary } from "@/messages/en";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { routes } from "@/lib/config/routes";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getOgImageForPath, isNoindexPath } from "@/lib/seo/page-config";

export type RouteMessageKey = keyof Dictionary["routes"];

function routeSeoTitle(
  routeMsg: Dictionary["routes"][RouteMessageKey],
  fallbackTitle: string,
): string {
  if ("seoTitle" in routeMsg && typeof routeMsg.seoTitle === "string") {
    return routeMsg.seoTitle;
  }
  return fallbackTitle;
}

export function createRouteMetadata(locale: Locale, routeKey: RouteMessageKey): Metadata {
  const t = getDictionary(locale);
  const route = routes[routeKey as keyof typeof routes];
  const routeMsg = t.routes[routeKey];
  const title = routeSeoTitle(routeMsg, routeMsg.title);

  return createPageMetadata({
    title,
    description: routeMsg.seoDescription,
    path: route.path,
    locale,
    ogImage: getOgImageForPath(route.path),
    index: !isNoindexPath(route.path),
    titleAbsolute: title.includes("|"),
  });
}
