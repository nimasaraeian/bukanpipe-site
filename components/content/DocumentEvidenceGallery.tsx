import Image from "next/image";
import evidence from "@/data/company/evidence.json";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config/site";

/** Original scans; captions describe the supplied document, not current accreditation. */
export function DocumentEvidenceGallery({ group }: { group: string }) {
  const items = evidence.filter((item) => item.group === group);
  if (!items.length) return null;
  return (
    <section className="mt-8" aria-label={group === "awards" ? "تصاویر لوح‌های سپاس" : "تصاویر مدارک"}>
      <h3 className="text-lg font-semibold text-[color:var(--ind-text)]">
        {group === "awards" ? "آرشیو تصویری لوح‌ها و تقدیرنامه‌ها" : "تصویر اسناد این بخش"}
      </h3>
      <p className="ind-lead mt-3 text-sm">
        برای خواندن متن کامل، روی تصویر بزنید.
        {group === "awards" ? " این آرشیو شامل نسخه‌های تکراری، نامه‌های تقدیر و پوستر رویداد هم هست؛ تعداد تصاویر، تعداد افتخارات مستقل نیست." : " تاریخ‌ها و شرایط اعتبار مطابق متن هر سند است؛ نسخه‌های آرشیوی، تأییدیهٔ جاری محسوب نمی‌شوند."}
      </p>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <figure key={item.id} className="ind-glass min-w-0 p-4">
            <a href={item.src} target="_blank" rel="noopener noreferrer" className="block rounded focus-visible:outline-2 focus-visible:outline-offset-4" aria-label={`مشاهدهٔ تصویر خوانا: ${item.caption} (در زبانهٔ جدید)`}>
              <Image src={item.src} alt={item.caption} width={item.width} height={item.height} sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 30vw" className="h-72 w-full object-contain" loading="lazy" />
            </a>
            <figcaption className="mt-4 text-sm leading-7 text-[color:var(--ind-text)]">
              {item.caption}
              {item.note ? <span className="mt-2 block text-xs font-normal text-[color:var(--ind-text-muted)]">{item.note}</span> : null}
            </figcaption>
          </figure>
        ))}
      </div>
      <JsonLd data={items.map((item) => ({
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "@id": `${siteConfig.siteUrl}${item.src}#image`,
        contentUrl: `${siteConfig.siteUrl}${item.src}`,
        name: item.caption,
        caption: [item.caption, item.note].filter(Boolean).join(" — "),
        width: item.width,
        height: item.height,
        encodingFormat: "image/webp",
        inLanguage: "fa",
      }))} />
    </section>
  );
}
