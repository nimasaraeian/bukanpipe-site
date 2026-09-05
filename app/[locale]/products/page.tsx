import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { EnProductsHubPage } from "@/components/pages/EnProductsHubPage";

import { isLocale, type Locale } from "@/lib/i18n/config";

import { withLocale } from "@/lib/i18n/path";

import { createContentMetadata } from "@/lib/content/metadata";

import { getContentByPath } from "@/lib/content/registry";

import { faProductsHub } from "@/data/content/fa/catalog";

import type { ContentDocument } from "@/content/models/content-document";



type PageProps = {

  params: Promise<{ locale: string }>;

  searchParams: Promise<{ designQA?: string; designOpacity?: string }>;

};



function buildBreadcrumbHrefs(

  locale: Locale,

  breadcrumbs: ContentDocument["breadcrumbs"],

): readonly { label: string; href?: string }[] {

  return breadcrumbs.map((item, index, arr) => ({

    label: item.label,

    href: index < arr.length - 1 ? withLocale(item.path, locale) : undefined,

  }));

}



export async function generateMetadata({ params }: PageProps): Promise<Metadata> {

  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) return {};

  const doc = getContentByPath(localeParam, "/products") ?? faProductsHub;

  return createContentMetadata(doc, localeParam);

}



export default async function ProductsPage({ params, searchParams }: PageProps) {

  const { locale: localeParam } = await params;

  const query = await searchParams;

  if (!isLocale(localeParam)) notFound();



  const hub = getContentByPath(localeParam, "/products") ?? faProductsHub;

  const designQA = process.env.NODE_ENV === "development" && query.designQA === "1";

  const designOpacityRaw = Number(query.designOpacity ?? 40);

  const designOpacity = Number.isFinite(designOpacityRaw)

    ? Math.min(100, Math.max(0, designOpacityRaw)) / 100

    : 0.4;



  return (

    <EnProductsHubPage

      doc={hub}

      breadcrumbHrefs={buildBreadcrumbHrefs(localeParam, hub.breadcrumbs)}

      designQA={designQA}

      designOpacity={designOpacity}

    />

  );

}


