"use client";



import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";

import { useEffect, useLayoutEffect, useState, type CSSProperties } from "react";

import { HeaderNavDropdown } from "@/components/layout/HeaderNavDropdown";

import { MobileLocaleSwitch } from "@/components/layout/HeaderLocaleControls";

import { HeaderLogoMark } from "@/components/layout/HeaderLogoMark";

import { ThemeToggle } from "@/components/theme/ThemeToggle";

import { type Locale } from "@/lib/i18n/config";

import { setLocaleCookie } from "@/lib/i18n/locale-cookie";

import {

  getPrimaryNavStructure,

  type PrimaryNavGroup,

  type PrimaryNavEntry,

} from "@/lib/i18n/nav-items";

import { cn } from "@/lib/cn";

import { routes } from "@/lib/config/routes";

import { switchLocalePathSafe } from "@/lib/i18n/path";

import { useLocale } from "@/components/i18n/LocaleProvider";



export function PremiumHeroHeader() {

  const pathname = usePathname();

  const router = useRouter();

  const { locale, t, path } = useLocale();

  const [scrolled, setScrolled] = useState(false);

  const [open, setOpen] = useState(false);

  const [openDropdown, setOpenDropdown] = useState<PrimaryNavGroup["id"] | null>(null);



  const navStructure = getPrimaryNavStructure(locale, t, path);

  const homeHref = path(routes.home.path);



  useLayoutEffect(() => {

    setScrolled(window.scrollY > 48);

  }, []);



  useEffect(() => {

    setOpen(false);

    setOpenDropdown(null);

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

    setOpen(false);

    setOpenDropdown(null);

    setLocaleCookie(targetLocale);

    router.replace(switchLocalePathSafe(pathname, targetLocale), { scroll: false });

  };



  const isActive = (href: string) => {

    if (href === homeHref) return pathname === href;

    return pathname === href || pathname.startsWith(`${href}/`);

  };



  const isGroupActive = (group: PrimaryNavGroup) =>

    group.items.some((item) => isActive(item.href));



  let drawerIndex = 0;



  const renderDrawerEntry = (entry: PrimaryNavEntry) => {

    if (entry.kind === "link") {

      const index = drawerIndex++;

      return (

        <li key={entry.href} style={{ "--drawer-item-index": index } as CSSProperties}>

          <Link

            href={entry.href}

            className="engine-header-drawer-link"

            onClick={() => setOpen(false)}

            tabIndex={open ? undefined : -1}

          >

            {entry.label}

          </Link>

        </li>

      );

    }



    const groupIndex = drawerIndex++;

    return (

      <li key={entry.id} className="engine-header-drawer-group" style={{ "--drawer-item-index": groupIndex } as CSSProperties}>

        <p className="engine-header-drawer-group-label">{entry.label}</p>

        <ul className="engine-header-drawer-sublist">

          {entry.items.map((item) => {

            const index = drawerIndex++;

            return (

              <li key={item.href} style={{ "--drawer-item-index": index } as CSSProperties}>

                <Link

                  href={item.href}

                  className="engine-header-drawer-sublink"

                  onClick={() => setOpen(false)}

                  tabIndex={open ? undefined : -1}

                >

                  {item.label}

                </Link>

              </li>

            );

          })}

        </ul>

      </li>

    );

  };



  return (

    <header

      className={cn(

        "engine-header engine-hero-font fixed inset-x-0 top-0 z-50",

        scrolled ? "engine-header-scrolled" : "engine-header-hero",

      )}

    >

      <div className="engine-header-inner">

        <Link href={homeHref} className="engine-header-brand" aria-label={t.common.brandHome}>

          <HeaderLogoMark />

          <span className="engine-header-wordmark" dir={locale === "fa" ? "rtl" : "ltr"}>
            {t.common.brandWordmark}
          </span>

        </Link>



        <nav className="engine-header-nav" aria-label={t.common.primaryNav}>

          <ul className="engine-header-nav-list">

            {navStructure.map((entry) => {

              if (entry.kind === "link") {

                return (

                  <li key={entry.href}>

                    <Link

                      href={entry.href}

                      className={cn(

                        "engine-header-nav-link",

                        isActive(entry.href) && "engine-header-nav-link-active",

                      )}

                    >

                      {entry.label}

                    </Link>

                  </li>

                );

              }



              return (

                <HeaderNavDropdown

                  key={entry.id}

                  label={entry.label}

                  items={entry.items}

                  open={openDropdown === entry.id}

                  active={isGroupActive(entry)}

                  onToggle={() =>

                    setOpenDropdown((current) => (current === entry.id ? null : entry.id))

                  }

                  onClose={() => setOpenDropdown(null)}

                  isActiveHref={isActive}

                />

              );

            })}

          </ul>

        </nav>



        <div className="engine-header-actions">

          <MobileLocaleSwitch locale={locale} t={t} onSwitch={switchLocale} />

          <Link href={path(routes.requestQuote.path)} className="engine-header-cta engine-header-cta--compact">

            <span className="engine-header-cta-short">{t.nav.requestQuoteShort}</span>

            <span className="engine-header-cta-full">{t.nav.requestQuote}</span>

            <span aria-hidden="true">{t.common.arrow}</span>

          </Link>

          <button

            type="button"

            className={cn("engine-header-menu", open && "engine-header-menu-open")}

            aria-expanded={open}

            aria-label={open ? t.common.closeMenu : t.common.openMenu}

            onClick={() => {

              setOpenDropdown(null);

              setOpen((value) => !value);

            }}

          >

            <span className="engine-header-menu-line" />

            <span className="engine-header-menu-line" />

          </button>

        </div>

      </div>



      <div

        className={cn("engine-header-drawer-backdrop", open && "engine-header-drawer-backdrop-open")}

        aria-hidden="true"

        onClick={() => setOpen(false)}

      />



      <nav

        className={cn("engine-header-drawer", open && "engine-header-drawer-open")}

        aria-label={t.common.mobileNav}

        aria-hidden={!open}

        inert={!open ? true : undefined}

      >

        <ul className="engine-header-drawer-list">

          {navStructure.map((entry) => renderDrawerEntry(entry))}

          <li

            className="flex gap-2 pt-2"

            style={{ "--drawer-item-index": drawerIndex } as CSSProperties}

          >

            <ThemeToggle variant="drawer" />

          </li>

          <li className="pt-4" style={{ "--drawer-item-index": drawerIndex + 1 } as CSSProperties}>

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


