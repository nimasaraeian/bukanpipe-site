import type { ContentDocument } from "@/content/models/content-document";

/**
 * The two dates the article's structured data declares, printed where a
 * reader can check them.
 *
 * Structured data is supposed to describe the page, not add to it. The
 * articles were declaring a dateModified — and now a datePublished — that
 * appeared nowhere on screen, which leaves the reader unable to tell how old
 * a dimension table or a standard reference is. That is worth showing on a
 * technical page in its own right.
 */
export function ArticleDateline({
  doc,
  locale,
}: {
  doc: ContentDocument;
  locale: "fa" | "en";
}) {
  if (!doc.publishedAt && !doc.lastReviewed) return null;

  const fa = locale === "fa";
  const format = (iso: string) =>
    new Intl.DateTimeFormat(fa ? "fa-IR" : "en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(`${iso}T00:00:00Z`));

  const reviewed = doc.lastReviewed && doc.lastReviewed !== doc.publishedAt;

  return (
    <p className="ind-article-dateline">
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
  );
}
