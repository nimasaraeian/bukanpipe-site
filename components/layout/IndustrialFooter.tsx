"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { FooterSocialLinks } from "@/components/layout/FooterSocialLinks";
import { getFooterColumns } from "@/lib/i18n/nav-items";
import { siteConfig } from "@/lib/config/site";

export function IndustrialFooter() {
  const { t, path, locale } = useLocale();
  const columns = getFooterColumns(locale, t, path);

  return (
    <footer className="ind-footer industrial-font">
      <div className="ind-container py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/media/demo/logo.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
                aria-hidden
              />
              <p className="ind-footer-brand" dir="ltr">
                BUKAN PIPE
              </p>
            </div>
            <p className="ind-lead mt-5 max-w-sm text-sm">
              {t.footer.tagline}. {t.footer.description}
            </p>
            <FooterSocialLinks />
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="ind-footer-col-title">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={`${col.title}-${link.href}`}>
                      <Link href={link.href} className="ind-footer-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="ind-footer-meta mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--ind-border)] pt-8 text-xs">
          <p dir="ltr">
            © {new Date().getFullYear()} {siteConfig.brandName}
          </p>
          <p>{t.footer.tagline}</p>
          {/* the designer's credit: a single quiet line, deliberately the
              faintest thing in the footer until it is hovered */}
          <a
            className="ind-footer-credit"
            href="https://t.me/nimasaraeian"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram: @nimasaraeian"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M21.9 4.3 18.8 19c-.2 1-.8 1.3-1.7.8l-4.6-3.4-2.2 2.1c-.3.3-.5.5-1 .5l.3-4.7 8.6-7.8c.4-.3-.1-.5-.6-.2L6.9 13 2.4 11.6c-1-.3-1-1 .2-1.4L20.6 3.3c.8-.3 1.6.2 1.3 1Z"
              />
            </svg>
            <span>{t.footer.credit}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
