import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContentHubPage } from "@/components/content/ContentHubPage";
import { isLocale } from "@/lib/i18n/config";
import { createContentMetadata } from "@/lib/content/metadata";
import { getContentByPath } from "@/lib/content/registry";
import { getHubChildren } from "@/lib/content/resolve-related";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const doc = getContentByPath(localeParam, "/laboratory");
  if (!doc) return {};
  return createContentMetadata(doc, localeParam);
}

export default async function LaboratoryPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const hub = getContentByPath(localeParam, "/laboratory");
  if (!hub) notFound();
  const children = getHubChildren(localeParam, "/laboratory");
  return <ContentHubPage doc={hub} children={children} />;
}
