import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContentHubPage } from "@/components/content/ContentHubPage";
import { isLocale } from "@/lib/i18n/config";
import { createContentMetadata } from "@/lib/content/metadata";
import { getContentByPath } from "@/lib/content/registry";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const doc = getContentByPath(localeParam, "/calculator");
  if (!doc) return {};
  return createContentMetadata(doc, localeParam);
}

export default async function CalculatorHubPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const hub = getContentByPath(localeParam, "/calculator");
  if (!hub) notFound();
  const child = getContentByPath(localeParam, "/calculator/pipeline-design");
  return <ContentHubPage doc={hub} children={child ? [child] : []} />;
}
