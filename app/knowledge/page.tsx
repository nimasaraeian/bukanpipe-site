import type { Metadata } from "next";
import { DevelopmentRoutePage } from "@/components/ui/DevelopmentRoutePage";
import { routes } from "@/lib/config/routes";
import { createPageMetadata } from "@/lib/seo/metadata";

const route = routes.knowledge;

export const metadata: Metadata = createPageMetadata({
  title: route.titleFa,
  description: route.seoDescription,
  path: route.path,
});

export default function KnowledgePage() {
  return <DevelopmentRoutePage route={route} />;
}
