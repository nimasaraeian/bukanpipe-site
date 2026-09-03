"use client";

import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  ArticleTableOfContents,
  ContentBlockRenderer,
} from "@/components/content/ContentBlocks";
import { IndustrialPageHero } from "@/components/industrial/IndustrialPageHero";
import { IndustrialButton } from "@/components/industrial/IndustrialPrimitives";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { ContentDocument } from "@/content/models/content-document";
import { resolveRelatedLinks } from "@/lib/content/resolve-related";
import { contentDocumentSchemas } from "@/lib/schema/content-document";
import { routes } from "@/lib/config/routes";
import { getPageHeroImage } from "@/data/media/page-hero-images";
import { getDirection } from "@/lib/i18n/config";

type ContentDocumentPageProps = {
  doc: ContentDocument;
};

function HeroActions({ doc }: { doc: ContentDocument }) {
  const { locale, path: localePath } = useLocale();
  const isFa = locale === "fa";

  if (doc.path === "/contact") {
    return (
      <IndustrialButton href={localePath(routes.requestQuote.path)}>
        {isFa ? "درخواست پیش‌فاکتور" : "Request quote"}
      </IndustrialButton>
    );
  }

  if (doc.kind === "laboratory" || doc.path.startsWith("/laboratory")) {
    return (
      <>
        <IndustrialButton href="mailto:lab@bukanpipe.com">
          {isFa ? "درخواست آزمون" : "Request lab test"}
        </IndustrialButton>
        <IndustrialButton href={localePath(routes.contact.path)} variant="secondary">
          {isFa ? "تماس آزمایشگاه" : "Laboratory contact"}
        </IndustrialButton>
      </>
    );
  }

  if (doc.kind === "application") {
    return (
      <>
        <IndustrialButton href={localePath(routes.requestQuote.path)}>
          {isFa ? "استعلام محصول" : "Request quote"}
        </IndustrialButton>
        <IndustrialButton href={localePath(routes.products.path)} variant="secondary">
          {isFa ? "مشاهده محصولات" : "View products"}
        </IndustrialButton>
      </>
    );
  }

  if (doc.kind === "article" || doc.path.startsWith("/technical-center") || doc.path === "/polyethylene-pipe") {
    return (
      <>
        <IndustrialButton href={localePath("/calculator/pipeline-design")} variant="secondary">
          {isFa ? "ماشین‌حساب خط لوله" : "Pipeline calculator"}
        </IndustrialButton>
        <IndustrialButton href={localePath(routes.requestQuote.path)}>
          {isFa ? "استعلام قیمت" : "Request quote"}
        </IndustrialButton>
      </>
    );
  }

  return (
    <>
      <IndustrialButton href={localePath(routes.requestQuote.path)}>
        {isFa ? "درخواست پیش‌فاکتور" : "Request quote"}
      </IndustrialButton>
      <IndustrialButton href={localePath(routes.contact.path)} variant="secondary">
        {isFa ? "تماس" : "Contact"}
      </IndustrialButton>
    </>
  );
}

export function ContentDocumentPage({ doc }: ContentDocumentPageProps) {
  const { locale, path: localePath } = useLocale();
  const direction = getDirection(locale);
  const hero = getPageHeroImage(doc.path.split("/")[1] ? `/${doc.path.split("/")[1]}` : doc.path, direction);
  const related = resolveRelatedLinks(locale, doc);
  const isArticle =
    doc.kind === "article" ||
    doc.path.startsWith("/technical-center") ||
    doc.path === "/polyethylene-pipe";
  const blockOptions = {
    contactLinks: doc.path === "/contact",
    articleMode: isArticle,
  };

  return (
    <>
      <JsonLd data={contentDocumentSchemas(doc, localePath)} />

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
        <HeroActions doc={doc} />
      </IndustrialPageHero>

      <section className="ind-section">
        <div className="ind-container max-w-4xl">
          {isArticle ? <ArticleTableOfContents sections={doc.sections} /> : null}

          {doc.sections.map((block, index) => (
            <ContentBlockRenderer
              key={`${block.type}-${index}`}
              block={block}
              options={blockOptions}
            />
          ))}

          {doc.faqs && doc.faqs.length > 0 ? (
            <div className="mt-12">
              <h2 className={isArticle ? "text-xl font-semibold" : "ind-display text-2xl"}>
                {locale === "fa" ? "سوالات متداول" : "FAQ"}
              </h2>
              <dl className="mt-6 space-y-6">
                {doc.faqs.map((faq) => (
                  <div key={faq.question} className="ind-glass p-5">
                    <dt className="font-semibold text-[color:var(--ind-text)]">{faq.question}</dt>
                    <dd className="ind-lead mt-2 text-sm">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          {related.length > 0 ? (
            <div className="mt-12">
              <h2 className={isArticle ? "text-xl font-semibold" : "ind-display text-2xl"}>
                {locale === "fa" ? "منابع مرتبط" : "Related resources"}
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
