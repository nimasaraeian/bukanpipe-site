import type { Metadata } from "next";
import type { Dictionary } from "@/messages/en";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { routes } from "@/lib/config/routes";
import { createPageMetadata } from "@/lib/seo/metadata";

export type RouteMessageKey = keyof Dictionary["routes"];

export function createRouteMetadata(locale: Locale, routeKey: RouteMessageKey): Metadata {
  const t = getDictionary(locale);
  const route = routes[routeKey as keyof typeof routes];

  return createPageMetadata({
    title: t.routes[routeKey].title,
    description: t.routes[routeKey].seoDescription,
    path: route.path,
    locale,
  });
}
