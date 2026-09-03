"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState, type CSSProperties } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { HeaderLogoMark } from "@/components/layout/HeaderLogoMark";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { localeLabel, locales, type Locale } from "@/lib/i18n/config";
import { setLocaleCookie } from "@/lib/i18n/locale-cookie";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/config/routes";
import { switchLocalePath } from "@/lib/i18n/path";

export function PremiumHeroHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, t, path } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navItems = [
    { label: t.nav.home, href: path(routes.home.path) },
    { label: t.nav.solutions, href: path(routes.solutions.path) },
    { label: t.nav.products, href: path(routes.products.path) },
    { label: t.nav.industries, href: path(routes.industries.path) },
    { label: t.nav.quality, href: path(routes.laboratory.path) },
    { label: t.nav.company, href: path(routes.about.path) },
  ] as const;

  useLayoutEffect(() => {
    setScrolled(window.scrollY > 48);
  }, []);

  useEffect(() => {
    setOpen(false);
    setLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        setScrolled((prev) => (prev ? y > 8 : y > 48));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const switchLocale = (targetLocale: Locale) => {
    setLangOpen(false);
    setOpen(false);
    setLocaleCookie(targetLocale);
    router.replace(switchLocalePath(pathname, targetLocale), { scroll: false });
  };

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={cn(
        "engine-header engine-hero-font fixed inset-x-0 top-0 z-50",
        scrolled ? "engine-header-scrolled" : "engine-header-hero",
      )}
    >
      <div className="engine-header-inner">
        <Link href={path(routes.home.path)} className="engine-header-brand" aria-label={t.common.brandHome}>
          <HeaderLogoMark />
          <span className="engine-header-wordmark" dir="ltr">
            BUKAN PIPE
          </span>
        </Link>

        <nav className="engine-header-nav hidden lg:block" aria-label={t.common.primaryNav}>
          <ul className="engine-header-nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "engine-header-nav-link",
                    isActive(item.href) && "engine-header-nav-link-active",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="engine-header-actions">
          <ThemeToggle className="hidden sm:inline-flex" />
          <div className="relative hidden sm:block">
            <button
              type="button"
              className="engine-header-lang inline-flex"
              aria-label={t.common.language}
              aria-expanded={langOpen}
              onClick={() => setLangOpen((value) => !value)}
            >
              {localeLabel[locale]}
              <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className="engine-header-chevron">
                <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
            {langOpen ? (
              <div className="engine-header-lang-menu">
                {locales.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={cn(
                      "engine-header-lang-option",
                      item === locale && "engine-header-lang-option-active",
                    )}
                    onClick={() => switchLocale(item)}
                  >
                    {localeLabel[item]}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <Link href={path(routes.requestQuote.path)} className="engine-header-cta hidden sm:inline-flex">
            {t.nav.requestQuote}
            <span aria-hidden="true">{t.common.arrow}</span>
          </Link>
          <button
            type="button"
            className={cn("engine-header-menu lg:hidden", open && "engine-header-menu-open")}
            aria-expanded={open}
            aria-label={open ? t.common.closeMenu : t.common.openMenu}
            onClick={() => {
              setLangOpen(false);
              setOpen((value) => !value);
            }}
          >
            <span className="engine-header-menu-line" />
            <span className="engine-header-menu-line" />
          </button>
        </div>
      </div>

      <div
        className={cn("engine-header-drawer-backdrop lg:hidden", open && "engine-header-drawer-backdrop-open")}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      <nav
        className={cn("engine-header-drawer lg:hidden", open && "engine-header-drawer-open")}
        aria-label={t.common.mobileNav}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <ul className="engine-header-drawer-list">
          {navItems.map((item, index) => (
            <li key={item.href} style={{ "--drawer-item-index": index } as CSSProperties}>
              <Link
                href={item.href}
                className="engine-header-drawer-link"
                onClick={() => setOpen(false)}
                tabIndex={open ? undefined : -1}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li
            className="flex gap-2 pt-2"
            style={{ "--drawer-item-index": navItems.length } as CSSProperties}
          >
            <ThemeToggle variant="drawer" />
            {locales.map((item) => (
              <button
                key={item}
                type="button"
                className={cn(
                  "engine-header-lang-option",
                  item === locale && "engine-header-lang-option-active",
                )}
                onClick={() => switchLocale(item)}
                tabIndex={open ? undefined : -1}
              >
                {localeLabel[item]}
              </button>
            ))}
          </li>
          <li className="pt-4" style={{ "--drawer-item-index": navItems.length + 1 } as CSSProperties}>
            <Link
              href={path(routes.requestQuote.path)}
              className="engine-header-cta inline-flex w-full justify-center"
              onClick={() => setOpen(false)}
              tabIndex={open ? undefined : -1}
            >
              {t.nav.requestQuote}
              <span aria-hidden="true">{t.common.arrow}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
