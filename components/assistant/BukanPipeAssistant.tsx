"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getAssistantCopy } from "@/data/assistant";
import { trackAssistantEvent } from "@/lib/assistant/analytics";
import { AssistantLauncher } from "./AssistantLauncher";
import { AssistantPanel } from "./AssistantPanel";

function lockBodyScroll() {
  const html = document.documentElement;
  const body = document.body;
  const scrollY = window.scrollY;
  const previous = {
    htmlOverflow: html.style.overflow,
    htmlOverscroll: html.style.overscrollBehavior,
    overflow: body.style.overflow,
    position: body.style.position,
    top: body.style.top,
    width: body.style.width,
    paddingInlineEnd: body.style.paddingInlineEnd,
    overscroll: body.style.overscrollBehavior,
  };
  const scrollbar = Math.max(0, window.innerWidth - html.clientWidth);

  html.style.overflow = "hidden";
  html.style.overscrollBehavior = "none";
  body.style.overflow = "hidden";
  body.style.overscrollBehavior = "none";
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.width = "100%";
  if (scrollbar > 0) {
    body.style.paddingInlineEnd = `${scrollbar}px`;
  }

  return (restoreScroll: boolean) => {
    html.style.overflow = previous.htmlOverflow;
    html.style.overscrollBehavior = previous.htmlOverscroll;
    body.style.overflow = previous.overflow;
    body.style.overscrollBehavior = previous.overscroll;
    body.style.position = previous.position;
    body.style.top = previous.top;
    body.style.width = previous.width;
    body.style.paddingInlineEnd = previous.paddingInlineEnd;
    if (restoreScroll) {
      window.scrollTo(0, scrollY);
    }
  };
}

export function BukanPipeAssistant() {
  const { locale, path: localePath } = useLocale();
  const pathname = usePathname();
  const copy = getAssistantCopy(locale);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const prevPathRef = useRef(pathname);
  const navigatingRef = useRef(false);

  const [open, setOpen] = useState(false);

  const closeAssistant = useCallback((options?: { restoreFocus?: boolean }) => {
    const restoreFocus = options?.restoreFocus ?? true;
    setOpen(false);
    trackAssistantEvent("assistant_closed");
    if (restoreFocus) {
      launcherRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      navigatingRef.current = false;
      setOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeAssistant();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeAssistant]);

  useEffect(() => {
    if (!open) {
      return;
    }

    panelRef.current?.focus();
    const unlock = lockBodyScroll();
    return () => {
      unlock(!navigatingRef.current);
    };
  }, [open]);

  const handleToggle = () => {
    if (open) {
      closeAssistant();
      return;
    }
    trackAssistantEvent("assistant_opened");
    setOpen(true);
  };

  const handleNavigate = (path: string) => {
    navigatingRef.current = true;
    trackAssistantEvent("assistant_navigation", { path });
    closeAssistant({ restoreFocus: false });
  };

  return (
    <div className="bpg-guide-root" data-locale={locale}>
      <AssistantLauncher
        label={copy.launcherLabel}
        ariaLabel={copy.launcherAria}
        open={open}
        onClick={handleToggle}
        launcherRef={launcherRef}
      />
      <AssistantPanel
        open={open}
        locale={locale}
        localePath={localePath}
        onClose={() => closeAssistant()}
        onNavigate={handleNavigate}
        panelRef={panelRef}
      />
    </div>
  );
}
