"use client";

import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContentBlockRenderer } from "@/components/content/ContentBlocks";
import { IndustrialPageHero } from "@/components/industrial/IndustrialPageHero";
import { IndustrialGlassCard } from "@/components/industrial/IndustrialGlassCard";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { ContentDocument } from "@/content/models/content-document";
import { breadcrumbListSchema } from "@/lib/schema/builders";
import { getPageHeroImage } from "@/data/media/page-hero-images";
import { getDirection } from "@/lib/i18n/config";

type ContentHubPageProps = {
  doc: ContentDocument;
  children: readonly ContentDocument[];
};

export function ContentHubPage({ doc, children }: ContentHubPageProps) {
  const { locale, path: localePath } = useLocale();
  const direction = getDirection(locale);
  const hero = getPageHeroImage(doc.path, direction);

  return (
    <>
      <JsonLd
        data={breadcrumbListSchema(
          doc.breadcrumbs.map((item) => ({
            name: item.label,
            path: localePath(item.path),
          })),
        )}
      />

      <IndustrialPageHero
        title={doc.title}
        description={doc.description}
        imageSrc={hero.src}
        imagePosition={hero.position}
        breadcrumb={doc.breadcrumbs.map((item, index, arr) => ({
          label: item.label,
          href: index < arr.length - 1 ? localePath(item.path) : undefined,
        }))}
      />

      <section className="ind-section ind-section-muted">
        <div className="ind-container">
          {doc.sections.map((block, index) => (
            <ContentBlockRenderer key={`${block.type}-${index}`} block={block} />
          ))}

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {children.map((child) => (
              <Link key={child.id} href={localePath(child.path)} className="block h-full">
                <IndustrialGlassCard
                  meta={child.primaryKeyword}
                  title={child.title}
                  description={child.description}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
