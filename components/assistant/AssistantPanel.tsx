"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getAssistantCopy } from "@/data/assistant";
import {
  getGuideSections,
  getGuideDestinationLabel,
  getGuideSectionTitle,
  getPriorityDestinations,
} from "@/data/assistant/guide";
import { searchWebsiteGuide } from "@/lib/assistant/search";
import type { Locale } from "@/lib/i18n/config";

type AssistantPanelProps = {
  open: boolean;
  locale: Locale;
  localePath: (path: string) => string;
  onClose: () => void;
  onNavigate: (path: string) => void;
  panelRef: React.RefObject<HTMLDivElement | null>;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function AssistantPanel({
  open,
  locale,
  localePath,
  onClose,
  onNavigate,
  panelRef,
}: AssistantPanelProps) {
  const copy = getAssistantCopy(locale);
  const sections = getGuideSections();
  const priority = getPriorityDestinations();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      const nodes = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (node) => !node.hasAttribute("disabled") && node.getAttribute("aria-hidden") !== "true",
      );
      if (nodes.length === 0) {
        return;
      }

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) {
        return;
      }

      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && (active === last || !panel.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener("keydown", onKeyDown);
    return () => panel.removeEventListener("keydown", onKeyDown);
  }, [open, panelRef]);

  const results = useMemo(() => searchWebsiteGuide(query, locale), [query, locale]);
  const searching = query.trim().length >= 2;

  if (!open) {
    return null;
  }

  const resultStatus = searching
    ? results.length > 0
      ? `${results.length} ${copy.searchResults}`
      : copy.searchEmpty
    : "";

  return (
    <>
      <div className="bpg-guide-backdrop" aria-hidden="true" onClick={onClose} />
      <div
        ref={panelRef}
        id="bpg-guide-panel"
        className="bpg-guide-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bpg-guide-title"
        aria-describedby="bpg-guide-subtitle"
        dir={locale === "fa" ? "rtl" : "ltr"}
        tabIndex={-1}
      >
        <header className="bpg-guide-panel__header">
          <div className="bpg-guide-panel__heading">
            <p className="bpg-guide-panel__kicker">BUKAN PIPE</p>
            <h2 id="bpg-guide-title" className="bpg-guide-panel__title">
              {copy.name}
            </h2>
            <p id="bpg-guide-subtitle" className="bpg-guide-panel__subtitle">
              {copy.subtitle}
            </p>
          </div>
          <button type="button" className="bpg-guide-panel__close" onClick={onClose} aria-label={copy.closeAria}>
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="bpg-guide-search">
          <label className="bpg-guide-visually-hidden" htmlFor="bpg-guide-search">
            {copy.composerPlaceholder}
          </label>
          <input
            id="bpg-guide-search"
            type="search"
            className="bpg-guide-search__input"
            value={query}
            maxLength={copy.composerMaxLength}
            placeholder={copy.composerPlaceholder}
            autoComplete="off"
            enterKeyHint="search"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className="bpg-guide-panel__body">
          <p className="bpg-guide-visually-hidden" role="status" aria-live="polite">
            {resultStatus}
          </p>

          {searching ? (
            results.length > 0 ? (
              <section className="bpg-guide-results" aria-label={copy.searchResults}>
                <h3 className="bpg-guide-section__title">{copy.searchResults}</h3>
                <ul className="bpg-guide-results__list">
                  {results.map((hit) => (
                    <li key={hit.path}>
                      <Link
                        href={localePath(hit.path)}
                        className="bpg-guide-link"
                        onClick={() => onNavigate(hit.path)}
                      >
                        {hit.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : (
              <p className="bpg-guide-empty">{copy.searchEmpty}</p>
            )
          ) : null}

          {(!searching || results.length === 0) && (
            <>
              <section className="bpg-guide-section" aria-label={copy.quickAccess}>
                <h3 className="bpg-guide-section__title">{copy.quickAccess}</h3>
                <ul className="bpg-guide-section__list bpg-guide-section__list--priority">
                  {priority.map((destination) => (
                    <li key={destination.id}>
                      <Link
                        href={localePath(destination.path)}
                        className="bpg-guide-link"
                        onClick={() => onNavigate(destination.path)}
                      >
                        {getGuideDestinationLabel(destination, locale)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
              {sections.map((section) => (
                <section key={section.id} className="bpg-guide-section">
                  <h3 className="bpg-guide-section__title">{getGuideSectionTitle(section, locale)}</h3>
                  <ul className="bpg-guide-section__list">
                    {section.destinations.map((destination) => (
                      <li key={destination.id}>
                        <Link
                          href={localePath(destination.path)}
                          className="bpg-guide-link"
                          onClick={() => onNavigate(destination.path)}
                        >
                          {getGuideDestinationLabel(destination, locale)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
