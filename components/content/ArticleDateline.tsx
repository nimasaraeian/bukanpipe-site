import Link from "next/link";
import type { ContentDocument } from "@/content/models/content-document";

/**
 * The byline and the two dates the article's structured data declares,
 * printed where a reader can check them.
 *
 * Structured data is supposed to describe the page, not add to it. The
 * articles declare the factory as `author` and a datePublished and
 * dateModified; none of that appeared on screen, which leaves the reader
 * unable to tell who wrote a guide or how old a dimension table or a standard
 * reference is. Both are worth showing on a technical page in their own
 * right: a buyer reading a selection guide wants to know it comes from a
 * licensed manufacturer, not an anonymous content site. The byline names the
 * company, which is what the schema's `author` says; it does not name a
 * department, because no department has signed off on the text.
 */
export function ArticleDateline({
  doc,
  locale,
}: {
  doc: ContentDocument;
  locale: "fa" | "en";
}) {
  const fa = locale === "fa";
  const format = (iso: string) =>
    new Intl.DateTimeFormat(fa ? "fa-IR" : "en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(`${iso}T00:00:00Z`));

  const reviewed = doc.lastReviewed && doc.lastReviewed !== doc.publishedAt;
  const hasDates = Boolean(doc.publishedAt || doc.lastReviewed);
  const certifications = `/${locale}/certifications`;

  return (
    <div className="ind-article-dateline">
      <p className="ind-article-byline">
        {fa ? (
          <>
            بوکان پایپ — تولیدکننده لوله پلی اتیلن از ۱۳۷۶،{" "}
            <Link href={certifications}>دارنده پروانه استاندارد ۱۴۴۲۷-۲</Link>
          </>
        ) : (
          <>
            Bukan Pipe — polyethylene pipe manufacturer since 1997,{" "}
            <Link href={certifications}>INSO 14427-2 standard mark licence holder</Link>
          </>
        )}
      </p>
      {hasDates ? (
        <p className="ind-article-dates">
          {doc.publishedAt ? (
            <span>
              {fa ? "انتشار: " : "Published "}
              <time dateTime={doc.publishedAt}>{format(doc.publishedAt)}</time>
            </span>
          ) : null}
          {doc.publishedAt && reviewed ? <span aria-hidden="true"> · </span> : null}
          {reviewed ? (
            <span>
              {fa ? "آخرین بازبینی: " : "Last reviewed "}
              <time dateTime={doc.lastReviewed}>{format(doc.lastReviewed)}</time>
            </span>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}
