import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContentDocumentPage } from "@/components/content/ContentDocumentPage";
import { ContentHubPage } from "@/components/content/ContentHubPage";
import { isLocale } from "@/lib/i18n/config";
import { createContentMetadata } from "@/lib/content/metadata";
import { getContentByPath, getPublishedContent } from "@/lib/content/registry";

type PageProps = {
  params: Promise<{ locale: string; slug?: string[] }>;
};

export async function generateStaticParams() {
  const articles = getPublishedContent("fa", "article").filter(
    (doc) => doc.path.startsWith("/technical-center/") && doc.slug !== "technical-center",
  );
  return [
    { locale: "fa", slug: [] as string[] },
    ...articles.map((doc) => ({ locale: "fa", slug: [doc.slug] })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  const path =
    !slug || slug.length === 0 ? "/technical-center" : `/technical-center/${slug.join("/")}`;
  const doc = getContentByPath(localeParam, path);
  if (!doc) return {};
  return createContentMetadata(doc, localeParam);
}

export default async function TechnicalCenterRoute({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  if (!slug || slug.length === 0) {
    const hub = getContentByPath(localeParam, "/technical-center");
    if (!hub) notFound();
    const children = getPublishedContent(localeParam, "article").filter(
      (doc) => doc.path.startsWith("/technical-center/") && doc.slug !== "technical-center",
    );
    return <ContentHubPage doc={hub} children={children} />;
  }

  const doc = getContentByPath(localeParam, `/technical-center/${slug.join("/")}`);
  if (!doc) notFound();
  return <ContentDocumentPage doc={doc} />;
}
