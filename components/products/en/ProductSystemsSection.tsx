"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { ProductSystemDetailModal } from "@/components/products/en/ProductSystemDetailModal";
import { ProductSystemIconSvg } from "@/components/products/en/ProductSystemIcons";
import { getProductsHubUiCopy } from "@/lib/products/hub-ui-copy";
import { getProductSystems } from "@/lib/products/get-product-systems";
import type { ProductSystem, ProductSystemIcon } from "@/lib/products/en-product-systems";

function ProductPresentation({
  system,
  panelId,
  exploreArrow,
  onExplore,
  compact = false,
}: {
  system: ProductSystem;
  panelId: string;
  exploreArrow: string;
  onExplore: () => void;
  compact?: boolean;
}) {
  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={`${system.id}-tab`}
      className={`en-product-systems__panel${compact ? " en-product-systems__panel--compact" : ""}`}
      style={
        {
          "--ps-accent": system.accent,
          "--ps-accent-muted": system.accentMuted,
        } as CSSProperties
      }
    >
      <div className="en-product-systems__visual" key={system.id}>
        <Image
          src={system.image}
          alt={system.imageAlt}
          width={system.imageWidth}
          height={system.imageHeight}
          className="en-product-systems__image"
          sizes="(min-width: 1024px) 58vw, 100vw"
          priority={system.id === "water"}
        />
      </div>

      <div className="en-product-systems__copy">
        <p className="en-product-systems__eyebrow">{system.eyebrow}</p>
        <h3 className="en-product-systems__title">{system.title}</h3>
        <p className="en-product-systems__description">{system.description}</p>

        <ul className="en-product-systems__tags">
          {system.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <dl className="en-product-systems__specs">
          {system.specs.map((spec) => (
            <div key={spec.label} className="en-product-systems__spec">
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>

        <button type="button" className="en-product-systems__cta" onClick={onExplore}>
          {system.ctaLabel}
          <span aria-hidden="true">{exploreArrow}</span>
        </button>
      </div>
    </div>
  );
}

function SystemSelectorButton({
  system,
  selected,
  tabId,
  panelId,
  onSelect,
}: {
  system: ProductSystem;
  selected: boolean;
  tabId: string;
  panelId: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      id={tabId}
      aria-selected={selected}
      aria-controls={panelId}
      aria-expanded={selected}
      tabIndex={selected ? 0 : -1}
      className="en-product-systems__selector-item"
      data-selected={selected ? "true" : "false"}
      style={
        selected
          ? ({
              "--ps-accent": system.accent,
              "--ps-accent-muted": system.accentMuted,
            } as CSSProperties)
          : undefined
      }
      onClick={onSelect}
    >
      <span className="en-product-systems__selector-num">{system.number}</span>
      <ProductSystemIconSvg name={system.icon} className="en-product-systems__selector-icon" />
      <span className="en-product-systems__selector-label">{system.name}</span>
    </button>
  );
}

export function ProductSystemsSection() {
  const { locale } = useLocale();
  const ui = getProductsHubUiCopy(locale);
  const productSystems = getProductSystems(locale);
  const baseId = useId();
  const [activeId, setActiveId] = useState<ProductSystemIcon>("water");
  const [detailOpen, setDetailOpen] = useState(false);
  const accordionItemRefs = useRef<Map<ProductSystemIcon, HTMLDivElement>>(new Map());
  const active = productSystems.find((item) => item.id === activeId) ?? productSystems[0]!;

  const onSelect = useCallback((id: ProductSystemIcon) => {
    setActiveId(id);
    setDetailOpen(false);
  }, []);

  const onExplore = useCallback(() => {
    setDetailOpen(true);
  }, []);

  const onCloseDetail = useCallback(() => {
    setDetailOpen(false);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const scrollActive = () => {
      if (!mq.matches) return;
      const node = accordionItemRefs.current.get(activeId);
      node?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };
    const frame = window.requestAnimationFrame(scrollActive);
    return () => window.cancelAnimationFrame(frame);
  }, [activeId]);

  const onTablistKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const index = productSystems.findIndex((item) => item.id === activeId);
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        const next = productSystems[(index + 1) % productSystems.length]!;
        onSelect(next.id);
      }
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        const prev = productSystems[(index - 1 + productSystems.length) % productSystems.length]!;
        onSelect(prev.id);
      }
    },
    [activeId, onSelect, productSystems],
  );

  return (
    <section className="en-product-systems industrial-font" aria-labelledby="en-product-systems-heading">
      <div className="ind-container en-product-systems__inner">
        <header className="en-product-systems__header">
          <p className="en-product-systems__kicker">{ui.systemsKicker}</p>
          <h2 id="en-product-systems-heading" className="en-product-systems__heading">
            {ui.systemsHeading}
          </h2>
          <p className="en-product-systems__intro">{ui.systemsIntro}</p>
        </header>

        <div className="en-product-systems__accordion">
          {productSystems.map((system) => {
            const selected = system.id === activeId;
            const panelId = `${baseId}-${system.id}-panel-mobile`;
            const tabId = `${system.id}-tab-mobile`;

            return (
              <div
                key={system.id}
                ref={(node) => {
                  if (node) accordionItemRefs.current.set(system.id, node);
                  else accordionItemRefs.current.delete(system.id);
                }}
                className="en-product-systems__accordion-item"
                data-expanded={selected ? "true" : "false"}
                style={
                  selected
                    ? ({
                        "--ps-accent": system.accent,
                        "--ps-accent-muted": system.accentMuted,
                      } as CSSProperties)
                    : undefined
                }
              >
                <SystemSelectorButton
                  system={system}
                  selected={selected}
                  tabId={tabId}
                  panelId={panelId}
                  onSelect={() => onSelect(system.id)}
                />
                {selected ? (
                  <div className="en-product-systems__accordion-panel">
                    <ProductPresentation
                      key={system.id}
                      system={system}
                      panelId={panelId}
                      exploreArrow={ui.exploreArrow}
                      onExplore={onExplore}
                      compact
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="en-product-systems__layout en-product-systems__layout--desktop">
          <div
            role="tablist"
            aria-label={ui.systemsTablistLabel}
            className="en-product-systems__selector"
            onKeyDown={onTablistKeyDown}
          >
            {productSystems.map((system) => {
              const selected = system.id === activeId;
              return (
                <SystemSelectorButton
                  key={system.id}
                  system={system}
                  selected={selected}
                  tabId={`${system.id}-tab`}
                  panelId={`${baseId}-${system.id}-panel`}
                  onSelect={() => onSelect(system.id)}
                />
              );
            })}
          </div>

          <div className="en-product-systems__stage">
            <ProductPresentation
              key={active.id}
              system={active}
              panelId={`${baseId}-${active.id}-panel`}
              exploreArrow={ui.exploreArrow}
              onExplore={onExplore}
            />
          </div>
        </div>
      </div>

      <ProductSystemDetailModal system={active} open={detailOpen} onClose={onCloseDetail} />
    </section>
  );
}
