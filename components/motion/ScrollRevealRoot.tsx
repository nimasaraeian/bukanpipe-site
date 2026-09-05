"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/** Elements that rise into view on scroll — one observer, site-wide. */
const REVEAL_SELECTOR = [
  ".ind-section-header-wide",
  ".ind-section .grid > *",
  ".ind-editorial-grid > *",
  ".ind-editorial-media",
  ".ind-stat-strip > *",
  ".ind-cta-band-inner > *",
  ".ind-section .ind-container > .ind-glass",
  ".ind-section .ind-container.max-w-4xl > *",
  ".ind-section .contact-page-layout > *",
  ".ind-section .contact-page-details > *",
  ".ind-section .flex.flex-wrap > *",
  ".ind-section .space-y-10 > div",
  ".ind-section dl.space-y-6 > *",
  ".ind-feature-item",
  ".ind-product-card",
  ".ind-panel-card",
  ".contact-channel-list > li",
  ".en-product-systems__header",
  ".en-product-systems__layout--desktop > *",
  ".en-product-systems__accordion-item",
  ".en-products-seo-links",
  "[data-scroll-reveal]",
].join(",");

const REVEAL_EXCLUDE = ".engine-hero, .ind-page-hero, .en-products-hero, .ind-footer";

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: [0, 0.08, 0.15],
  rootMargin: "0px 0px -2% 0px",
};

const MAX_STAGGER_INDEX = 8;
const STAGGER_MS = 72;

type RevealVariant = "default" | "media" | "card" | "header" | "aside";

const VARIANT_CLASS_NAMES = [
  "ind-scroll-reveal--media",
  "ind-scroll-reveal--card",
  "ind-scroll-reveal--header",
  "ind-scroll-reveal--aside",
] as const;

function getRevealVariant(element: HTMLElement): RevealVariant {
  if (element.classList.contains("ind-section-header-wide")) return "header";

  if (
    element.classList.contains("ind-editorial-media") ||
    element.classList.contains("en-product-systems__visual") ||
    element.classList.contains("contact-factory-map__embed-wrap")
  ) {
    return "media";
  }

  if (
    element.classList.contains("ind-product-card") ||
    element.classList.contains("ind-panel-card") ||
    element.classList.contains("ind-glass") ||
    element.classList.contains("en-product-systems__accordion-item") ||
    element.classList.contains("en-product-systems__stage") ||
    element.classList.contains("contact-factory-map")
  ) {
    return "card";
  }

  const editorial = element.parentElement;
  if (editorial?.classList.contains("ind-editorial-grid")) {
    const siblings = editorial.children;
    if (element === siblings[siblings.length - 1]) return "aside";
  }

  return "default";
}

function applyVariantClass(element: HTMLElement, variant: RevealVariant) {
  element.classList.remove(...VARIANT_CLASS_NAMES);
  if (variant !== "default") {
    element.classList.add(`ind-scroll-reveal--${variant}`);
  }
}

function shouldSkipTarget(element: Element) {
  return Boolean(element.closest(REVEAL_EXCLUDE));
}

function collectRevealTargets() {
  const seen = new Set<Element>();
  const targets: Element[] = [];

  document.querySelectorAll(REVEAL_SELECTOR).forEach((element) => {
    if (seen.has(element) || shouldSkipTarget(element)) return;
    seen.add(element);
    targets.push(element);
  });

  return targets;
}

function applyRevealMarkup(targets: Element[]) {
  targets.forEach((element) => {
    const html = element as HTMLElement;
    if (html.classList.contains("ind-scroll-reveal")) return;

    html.classList.add("ind-scroll-reveal");
    applyVariantClass(html, getRevealVariant(html));

    const index = Array.from(element.parentElement?.children ?? [element]).indexOf(element);
    html.style.setProperty(
      "--reveal-delay",
      `${Math.min(Math.max(index, 0), MAX_STAGGER_INDEX) * STAGGER_MS}ms`,
    );
  });
}

function clearRevealMarkup() {
  document.querySelectorAll(".ind-scroll-reveal").forEach((element) => {
    const html = element as HTMLElement;
    html.classList.remove("ind-scroll-reveal", "is-revealed", ...VARIANT_CLASS_NAMES);
    html.style.removeProperty("--reveal-delay");
  });
}

function revealIfAlreadyVisible(element: Element) {
  const rect = element.getBoundingClientRect();
  const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
  const ratio = visibleHeight / Math.max(rect.height, 1);
  if (ratio >= 0.08 && rect.top < window.innerHeight * 0.92) {
    element.classList.add("is-revealed");
    return true;
  }
  return false;
}

export function ScrollRevealRoot() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    let observer: IntersectionObserver | null = null;
    let deferredFrame = 0;

    const bind = () => {
      applyRevealMarkup(collectRevealTargets());

      const pending = document.querySelectorAll(".ind-scroll-reveal:not(.is-revealed)");
      if (pending.length === 0) return;

      observer?.disconnect();
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer?.unobserve(entry.target);
        });
      }, OBSERVER_OPTIONS);

      pending.forEach((target) => {
        if (!revealIfAlreadyVisible(target)) {
          observer?.observe(target);
        }
      });
    };

    clearRevealMarkup();
    bind();
    deferredFrame = window.requestAnimationFrame(bind);

    return () => {
      window.cancelAnimationFrame(deferredFrame);
      observer?.disconnect();
      clearRevealMarkup();
    };
  }, [pathname]);

  return null;
}
