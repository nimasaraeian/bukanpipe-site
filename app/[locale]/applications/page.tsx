import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContentHubPage } from "@/components/content/ContentHubPage";
import { isLocale } from "@/lib/i18n/config";
import { createContentMetadata } from "@/lib/content/metadata";
import { getContentByPath } from "@/lib/content/registry";
import { getHubChildren } from "@/lib/content/resolve-related";
import { faApplicationsHub } from "@/data/content/fa/catalog";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const doc = getContentByPath(localeParam, "/applications") ?? faApplicationsHub;
  return createContentMetadata(doc, localeParam);
}

export default async function ApplicationsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const hub = getContentByPath(localeParam, "/applications") ?? faApplicationsHub;
  const children = getHubChildren(localeParam, "/applications");
  return <ContentHubPage doc={hub} children={children} />;
}
