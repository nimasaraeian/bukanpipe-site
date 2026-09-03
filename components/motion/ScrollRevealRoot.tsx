"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Elements that rise into view on scroll — one observer, site-wide. */
const REVEAL_SELECTOR = [
  ".ind-section-header-wide",
  ".ind-section .grid > *",
  ".ind-editorial-grid > *",
  ".ind-stat-strip > *",
  ".ind-cta-band-inner > *",
  ".ind-section .ind-container > .ind-glass",
  ".ind-feature-item",
].join(",");

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.12,
  rootMargin: "0px 0px -7% 0px",
};

const MAX_STAGGER_INDEX = 6;
const STAGGER_MS = 72;

function collectRevealTargets() {
  const seen = new Set<Element>();
  const targets: Element[] = [];

  document.querySelectorAll(REVEAL_SELECTOR).forEach((element) => {
    if (seen.has(element)) return;
    if (element.closest(".engine-hero, .ind-page-hero")) return;
    seen.add(element);
    targets.push(element);
  });

  return targets;
}

function applyRevealMarkup(targets: Element[]) {
  const viewportThreshold = window.innerHeight * 0.92;

  targets.forEach((element) => {
    const html = element as HTMLElement;
    html.classList.add("ind-scroll-reveal");
    html.classList.remove("is-revealed");

    const index = Array.from(element.parentElement?.children ?? [element]).indexOf(element);
    html.style.setProperty(
      "--reveal-delay",
      `${Math.min(Math.max(index, 0), MAX_STAGGER_INDEX) * STAGGER_MS}ms`,
    );

    const rect = element.getBoundingClientRect();
    const alreadyVisible = rect.top < viewportThreshold && rect.bottom > 0;
    if (alreadyVisible) {
      html.classList.add("is-revealed");
    }
  });
}

function resetRevealMarkup() {
  document.querySelectorAll(".ind-scroll-reveal").forEach((element) => {
    element.classList.remove("ind-scroll-reveal", "is-revealed");
    (element as HTMLElement).style.removeProperty("--reveal-delay");
  });
}

export function ScrollRevealRoot() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let frame = 0;

    const bind = () => {
      observer?.disconnect();
      resetRevealMarkup();

      const targets = collectRevealTargets();
      if (targets.length === 0) return;

      applyRevealMarkup(targets);

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer?.unobserve(entry.target);
        });
      }, OBSERVER_OPTIONS);

      targets.forEach((target) => observer?.observe(target));
    };

    bind();
    frame = window.requestAnimationFrame(bind);

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      resetRevealMarkup();
    };
  }, [pathname]);

  return null;
}
