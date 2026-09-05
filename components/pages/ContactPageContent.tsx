"use client";

import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContentBlockRenderer } from "@/components/content/ContentBlocks";
import { ContactMessagingChannels } from "@/components/contact/ContactMessagingChannels";
import { FactoryLocationMap } from "@/components/contact/FactoryLocationMap";
import { IndustrialPageHero } from "@/components/industrial/IndustrialPageHero";
import { IndustrialButton } from "@/components/industrial/IndustrialPrimitives";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { ContentDocument } from "@/content/models/content-document";
import { contactConfig } from "@/lib/config/contact";
import { resolveRelatedLinks } from "@/lib/content/resolve-related";
import { contactPageSchemas } from "@/lib/schema/contact";
import { routes } from "@/lib/config/routes";
import { getIndustrialPageHeroImageProps, getPageHeroImage } from "@/data/media/page-hero-images";
import { getDirection } from "@/lib/i18n/config";

type ContactPageContentProps = {
  doc: ContentDocument;
};

export function ContactPageContent({ doc }: ContactPageContentProps) {
  const { locale, path: localePath } = useLocale();
  const direction = getDirection(locale);
  const hero = getPageHeroImage(routes.contact.path, direction);
  const related = resolveRelatedLinks(locale, doc);
  const isFa = locale === "fa";
  const blockOptions = { contactLinks: true, articleMode: false };

  return (
    <>
      <JsonLd data={contactPageSchemas(doc, localePath)} />

      <IndustrialPageHero
        title={doc.title}
        description={doc.description}
        {...getIndustrialPageHeroImageProps(hero)}
        breadcrumb={doc.breadcrumbs.map((item, index, arr) => ({
          label: item.label,
          href: index < arr.length - 1 ? localePath(item.path) : undefined,
        }))}
      >
        <IndustrialButton href={localePath(routes.requestQuote.path)}>
          {isFa ? "درخواست پیش‌فاکتور" : "Request quote"}
        </IndustrialButton>
      </IndustrialPageHero>

      <section className="ind-section">
        <div className="ind-container contact-page-layout">
          <FactoryLocationMap />

          <div className="contact-page-details max-w-4xl">
            {doc.sections.map((block, index) => (
              <ContentBlockRenderer
                key={`${block.type}-${index}`}
                block={block}
                options={blockOptions}
              />
            ))}

            <ContactMessagingChannels />

            <p className="ind-lead mt-8 text-sm text-[color:var(--ind-text-muted)]">
              {contactConfig.officeHours[locale]}
            </p>
          </div>

          {related.length > 0 ? (
            <div className="mt-12 max-w-4xl">
              <h2 className="ind-display text-2xl">
                {isFa ? "منابع مرتبط" : "Related resources"}
              </h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {related.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localePath(link.href)}
                      className="ind-glass inline-block px-4 py-2 text-sm font-medium transition hover:border-[color:var(--ind-accent)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
