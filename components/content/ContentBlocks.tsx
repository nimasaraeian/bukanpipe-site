"use client";

import Link from "next/link";
import type { ContentBlock } from "@/content/models/content-document";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { routes } from "@/lib/config/routes";

const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

function toWesternDigits(value: string): string {
  return value.replace(/[۰-۹]/g, (d) => String(persianDigits.indexOf(d)));
}

function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u0600-\u06FF-]+/g, "");
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isPhoneLike(value: string): boolean {
  const normalized = toWesternDigits(value.trim());
  if (isEmail(normalized)) return false;
  const digits = normalized.replace(/[^\d+]/g, "");
  return digits.length >= 7 && /^[\d۰-۹+\-\s(),.]+$/.test(value.trim());
}

function telHref(value: string): string {
  const western = toWesternDigits(value);
  const digits = western.replace(/[^\d+]/g, "");
  if (digits.startsWith("0")) {
    return `tel:+98${digits.slice(1)}`;
  }
  return `tel:${digits}`;
}

export function ContactListItem({ item }: { item: string }) {
  const trimmed = item.trim();
  if (isEmail(trimmed)) {
    return (
      <a href={`mailto:${trimmed}`} className="hover:text-[color:var(--ind-accent)]">
        {item}
      </a>
    );
  }
  if (isPhoneLike(trimmed)) {
    return (
      <a href={telHref(trimmed)} className="hover:text-[color:var(--ind-accent)]">
        {item}
      </a>
    );
  }
  return <>{item}</>;
}

type SpecCatalogCtaProps = {
  text: string;
};

export function SpecCatalogCta({ text }: SpecCatalogCtaProps) {
  const { path, locale } = useLocale();
  const isFa = locale === "fa";

  return (
    <div className="ind-glass mt-8 p-6">
      <h3 className="text-base font-semibold text-[color:var(--ind-text)]">
        {isFa ? "مشخصات فنی و جدول انتخاب" : "Technical specifications"}
      </h3>
      <p className="ind-lead mt-3 text-sm text-[color:var(--ind-text-muted)]">{text}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={path(routes.requestQuote.path)}
          className="inline-flex items-center rounded border border-[color:var(--ind-accent)] px-4 py-2 text-sm font-medium text-[color:var(--ind-accent)] transition hover:bg-[color:var(--ind-accent)] hover:text-white"
        >
          {isFa ? "دریافت جدول مشخصات فنی" : "Request specification table"}
        </Link>
        <Link
          href={path(routes.contact.path)}
          className="inline-flex items-center rounded border border-[color:var(--ind-border)] px-4 py-2 text-sm font-medium transition hover:border-[color:var(--ind-accent)]"
        >
          {isFa ? "تماس با واحد فروش" : "Contact sales"}
        </Link>
      </div>
    </div>
  );
}

type DataRequiredBlockProps = {
  title: string;
  message: string;
  fields?: readonly string[];
};

/** Internal/admin-facing placeholder — hidden from public pages by default. */
export function DataRequiredBlock({ title, message, fields }: DataRequiredBlockProps) {
  return (
    <div className="ind-glass mt-6 p-6">
      <h3 className="text-base font-semibold text-[color:var(--ind-text)]">{title}</h3>
      <p className="ind-lead mt-3 text-sm text-[color:var(--ind-text-muted)]">{message}</p>
      {fields && fields.length > 0 ? (
        <ul className="mt-4 list-inside list-disc text-sm text-[color:var(--ind-text-muted)]">
          {fields.map((field) => (
            <li key={field}>{field}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export type ContentBlockOptions = {
  contactLinks?: boolean;
  articleMode?: boolean;
};

export function ArticleTableOfContents({ sections }: { sections: readonly ContentBlock[] }) {
  const headings = sections.filter(
    (block): block is Extract<ContentBlock, { type: "heading" }> =>
      block.type === "heading" && block.level === 2,
  );

  if (headings.length < 3) return null;

  return (
    <nav aria-label="فهرست مطالب" className="ind-glass mb-10 p-5">
      <p className="text-sm font-semibold text-[color:var(--ind-text)]">فهرست مطالب</p>
      <ol className="mt-3 list-decimal space-y-2 ps-5 text-sm text-[color:var(--ind-text-muted)]">
        {headings.map((heading) => (
          <li key={heading.text}>
            <a href={`#${slugifyHeading(heading.text)}`} className="hover:text-[color:var(--ind-accent)]">
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ContentBlockRenderer({
  block,
  options = {},
}: {
  block: ContentBlock;
  options?: ContentBlockOptions;
}) {
  const { contactLinks = false, articleMode = false } = options;

  if (block.type === "paragraph") {
    return (
      <p
        className={
          articleMode
            ? "ind-lead mt-4 max-w-prose text-[color:var(--ind-text)]"
            : "ind-lead mt-4 max-w-3xl text-[color:var(--ind-text)]"
        }
      >
        {block.text}
      </p>
    );
  }

  if (block.type === "heading") {
    const Tag = block.level === 2 ? "h2" : "h3";
    const id = block.level === 2 ? slugifyHeading(block.text) : undefined;
    const cls = articleMode
      ? block.level === 2
        ? "mt-10 scroll-mt-28 text-xl font-semibold text-[color:var(--ind-text)]"
        : "mt-8 scroll-mt-28 text-lg font-semibold text-[color:var(--ind-text)]"
      : block.level === 2
        ? "ind-display mt-10 text-2xl text-[color:var(--ind-text)]"
        : "mt-8 text-lg font-semibold text-[color:var(--ind-text)]";
    return (
      <Tag id={id} className={cls}>
        {block.text}
      </Tag>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="mt-4 list-inside list-disc space-y-2 text-[color:var(--ind-text-muted)]">
        {block.items.map((item) => (
          <li key={item}>{contactLinks ? <ContactListItem item={item} /> : item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "spec-cta") {
    return <SpecCatalogCta text={block.text} />;
  }

  if (block.type === "data-required" && block.showPublic === false) {
    return null;
  }

  return (
    <div className="mt-6">
      <DataRequiredBlock title={block.title} message={block.message} fields={block.fields} />
    </div>
  );
}
