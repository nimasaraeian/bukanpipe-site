import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContentDocumentPage } from "@/components/content/ContentDocumentPage";
import { isLocale } from "@/lib/i18n/config";
import { createContentMetadata } from "@/lib/content/metadata";
import { getContentByPath } from "@/lib/content/registry";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const doc = getContentByPath(localeParam, "/polyethylene-pipe");
  if (!doc) return {};
  return createContentMetadata(doc, localeParam);
}

export default async function PolyethylenePillarPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const doc = getContentByPath(localeParam, "/polyethylene-pipe");
  if (!doc) notFound();
  return <ContentDocumentPage doc={doc} />;
}
