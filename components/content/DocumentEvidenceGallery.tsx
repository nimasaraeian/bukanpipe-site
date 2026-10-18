import Image from "next/image";
import evidence from "@/data/company/evidence.json";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config/site";

type Locale = "fa" | "en";

const COPY = {
  fa: {
    ariaAwards: "تصاویر لوح‌های سپاس",
    ariaDocs: "تصاویر مدارک",
    headingAwards: "آرشیو تصویری لوح‌ها و تقدیرنامه‌ها",
    headingDocs: "تصویر اسناد این بخش",
    lead: "برای خواندن متن کامل، روی تصویر بزنید.",
    leadAwards:
      " این آرشیو شامل نسخه‌های تکراری، نامه‌های تقدیر و پوستر رویداد هم هست؛ تعداد تصاویر، تعداد افتخارات مستقل نیست.",
    leadDocs: " تاریخ‌ها و شرایط اعتبار مطابق متن هر سند است؛ نسخه‌های آرشیوی، تأییدیهٔ جاری محسوب نمی‌شوند.",
    open: (caption: string) => `مشاهدهٔ تصویر خوانا: ${caption} (در زبانهٔ جدید)`,
  },
  en: {
    ariaAwards: "Plaque scans",
    ariaDocs: "Document scans",
    headingAwards: "Scans of the plaques and commendations",
    headingDocs: "Scans of the documents in this section",
    lead: "Click a scan to read it at full size.",
    leadAwards:
      " The archive also holds duplicate copies, letters of appreciation and an event poster, so the number of scans is not the number of distinct awards.",
    leadDocs:
      " Dates and validity terms are as printed on each document; archive copies are not a current approval.",
    open: (caption: string) => `Open readable scan: ${caption} (new tab)`,
  },
} as const;

/**
 * Original scans; captions describe the supplied document, not current
 * accreditation. The Persian caption is what was read off the scan; the
 * English one is its translation, kept in the same manifest so both pages
 * show the same set of documents.
 */
export function DocumentEvidenceGallery({ group, locale = "fa" }: { group: string; locale?: Locale }) {
  const items = evidence.filter((item) => item.group === group);
  if (!items.length) return null;
  const t = COPY[locale];
  const isAwards = group === "awards";
  const captionOf = (item: (typeof items)[number]) => (locale === "en" ? item.captionEn ?? item.caption : item.caption);
  const noteOf = (item: (typeof items)[number]) => (locale === "en" ? item.noteEn ?? item.note : item.note);

  return (
    <section className="mt-8" aria-label={isAwards ? t.ariaAwards : t.ariaDocs}>
      <h3 className="text-lg font-semibold text-[color:var(--ind-text)]">
        {isAwards ? t.headingAwards : t.headingDocs}
      </h3>
      <p className="ind-lead mt-3 text-sm">
        {t.lead}
        {isAwards ? t.leadAwards : t.leadDocs}
      </p>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const caption = captionOf(item);
          const note = noteOf(item);
          return (
            <figure key={item.id} className="ind-glass min-w-0 p-4">
              <a
                href={item.src}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded focus-visible:outline-2 focus-visible:outline-offset-4"
                aria-label={t.open(caption)}
              >
                <Image
                  src={item.src}
                  alt={caption}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 30vw"
                  className="h-72 w-full object-contain"
                  loading="lazy"
                />
              </a>
              <figcaption className="mt-4 text-sm leading-7 text-[color:var(--ind-text)]">
                {caption}
                {note ? (
                  <span className="mt-2 block text-xs font-normal text-[color:var(--ind-text-muted)]">{note}</span>
                ) : null}
              </figcaption>
            </figure>
          );
        })}
      </div>
      <JsonLd
        data={items.map((item) => ({
          "@context": "https://schema.org",
          "@type": "ImageObject",
          "@id": `${siteConfig.siteUrl}${item.src}#image`,
          contentUrl: `${siteConfig.siteUrl}${item.src}`,
          name: captionOf(item),
          caption: [captionOf(item), noteOf(item)].filter(Boolean).join(" — "),
          width: item.width,
          height: item.height,
          encodingFormat: "image/webp",
          inLanguage: locale,
        }))}
      />
    </section>
  );
}
