"use client";

import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContentBlockRenderer } from "@/components/content/ContentBlocks";
import { IndustrialPageHero } from "@/components/industrial/IndustrialPageHero";
import { IndustrialButton } from "@/components/industrial/IndustrialPrimitives";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { faDownloadsPublic, faDownloadsHub } from "@/data/content/fa/downloads";
import { breadcrumbListSchema } from "@/lib/schema/builders";
import { getPageHeroImage } from "@/data/media/page-hero-images";
import { getDirection } from "@/lib/i18n/config";
import { routes } from "@/lib/config/routes";

const categoryLabels: Record<string, string> = {
  "company-catalogue": "کاتالوگ شرکت",
  "water-standards": "استانداردهای آب",
  "gas-standards": "استانداردهای گاز",
  "irrigation-standards": "استانداردهای آبیاری",
  "technical-publications": "انتشارات فنی",
  "laboratory-resources": "منابع آزمایشگاه",
};

export function DownloadsPageContent() {
  const { locale, path: localePath } = useLocale();
  const doc = faDownloadsHub;
  const hero = getPageHeroImage(doc.path, getDirection(locale));
  const hasFiles = faDownloadsPublic.length > 0;

  const grouped = faDownloadsPublic.reduce<Record<string, typeof faDownloadsPublic>>(
    (acc, item) => {
      const list = [...(acc[item.category] ?? []), item];
      acc[item.category] = list;
      return acc;
    },
    {},
  );

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
      >
        <IndustrialButton href={localePath(routes.contact.path)}>تماس برای دریافت کاتالوگ</IndustrialButton>
      </IndustrialPageHero>

      <section className="ind-section ind-section-muted">
        <div className="ind-container max-w-4xl">
          {doc.sections.map((block, index) => (
            <ContentBlockRenderer key={`${block.type}-${index}`} block={block} />
          ))}
        </div>
      </section>

      {hasFiles ? (
        <section className="ind-section">
          <div className="ind-container space-y-10">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <h2 className="ind-display text-xl">{categoryLabels[category] ?? category}</h2>
                <ul className="mt-4 space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="ind-glass p-5">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="ind-lead mt-2 text-sm">{item.description}</p>
                      {item.fileUrl ? (
                        <Link
                          href={item.fileUrl}
                          className="mt-3 inline-block text-sm text-[color:var(--ind-accent)]"
                          download
                        >
                          دانلود {item.fileType ?? "فایل"}
                        </Link>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
