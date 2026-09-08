import Link from "next/link";
import type { GalleryPageCopy } from "@/data/gallery/content";
import type { Locale } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/path";

type GalleryInternalLinksProps = {
  locale: Locale;
  copy: GalleryPageCopy;
};

export function GalleryInternalLinks({ locale, copy }: GalleryInternalLinksProps) {
  return (
    <nav className="gallery-internal-links" aria-label={copy.internalLinks.title}>
      <h2 className="gallery-internal-links__title">{copy.internalLinks.title}</h2>
      <ul className="gallery-internal-links__list">
        {copy.internalLinks.links.map((link) => (
          <li key={link.path}>
            <Link href={withLocale(link.path, locale)} className="ind-text-link">
              {link.label}
              {link.hint ? <span className="sr-only"> — {link.hint}</span> : null}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
