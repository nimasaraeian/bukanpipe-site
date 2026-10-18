"use client";
/* eslint-disable @next/next/no-img-element -- the ring and lightbox position
   plain <img> elements inside 3D transforms; next/image's wrapper and sizing
   get in the way there, and every rendition is already a pre-sized WebP. */

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { AwardsPageCopy } from "@/data/company/awards-page";

/** One trophy, already localised and with its image renditions resolved. */
export type ShowcaseItem = {
  id: string;
  title: string;
  year: string;
  yearDisplay: string;
  level: "national" | "provincial";
  levelLabel: string;
  category: string;
  categoryLabel: string;
  issuer: string;
  alt: string;
  thumb: string;
  card: string;
  full: string;
};

type Props = {
  locale: "fa" | "en";
  copy: AwardsPageCopy;
  /** Ring order: as given. */
  items: readonly ShowcaseItem[];
};

const SPIN_DEG_PER_S = 9; // one full turn in about forty seconds

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function AwardsShowcase({ locale, copy, items }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const [autoPref, setAutoPref] = useState(true);
  const auto = autoPref && !reducedMotion;
  const [focused, setFocused] = useState<number>(-1);
  const [lightbox, setLightboxState] = useState<number>(-1);
  // Opening the lightbox also stops the ring, in the same event, not in an effect.
  const setLightbox = useCallback((next: number | ((i: number) => number)) => {
    setLightboxState(next);
    if (typeof next === "number" ? next >= 0 : true) setAutoPref(false);
  }, []);
  const [filter, setFilter] = useState<string>("all");

  // Motion state lives in refs: the loop runs every frame and must not re-render.
  const angle = useRef(0);
  const vel = useRef(0);
  const dragging = useRef(false);
  const autoRef = useRef(true);
  const lastShade = useRef(-999);
  const focusTimer = useRef<number | undefined>(undefined);
  const unfocusTimer = useRef<number | undefined>(undefined);

  const count = items.length;
  const step = 360 / count;

  useEffect(() => {
    autoRef.current = auto;
  }, [auto]);

  // Card geometry follows the stage width.
  useEffect(() => {
    const stage = stageRef.current;
    const ring = ringRef.current;
    if (!stage || !ring) return;
    const layout = () => {
      const w = stage.clientWidth;
      const cw = Math.max(110, Math.min(200, w * 0.19));
      const tagH = Math.round(Math.max(36, cw * 0.24));
      const radius = (cw * 1.18 * count) / (2 * Math.PI);
      stage.style.setProperty("--aw-cw", `${cw}px`);
      stage.style.setProperty("--aw-tag-h", `${tagH}px`);
      stage.style.setProperty("--aw-ch", `${(cw * 4) / 3 + tagH}px`);
      Array.from(ring.children).forEach((el, i) => {
        (el as HTMLElement).style.transform = `rotateY(${i * step}deg) translateZ(${radius}px)`;
      });
    };
    const ro = new ResizeObserver(layout);
    ro.observe(stage);
    layout();
    return () => ro.disconnect();
  }, [count, step]);

  // The animation loop.
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      if (!dragging.current) {
        if (Math.abs(vel.current) > 0.02) {
          angle.current += vel.current;
          vel.current *= 0.93;
        } else if (autoRef.current) {
          angle.current += dt * SPIN_DEG_PER_S;
        }
      }
      ring.style.transform = `translate3d(0,0,calc(var(--aw-cw) * -2.3)) rotateX(-6deg) rotateY(${angle.current}deg)`;
      // Shade the cards facing away — only every two degrees, so twenty style
      // writes do not run on every frame.
      if (Math.abs(angle.current - lastShade.current) >= 2) {
        lastShade.current = angle.current;
        const cards = ring.children;
        for (let i = 0; i < cards.length; i++) {
          const a = (((i * step + angle.current) % 360) + 360) % 360;
          const f = Math.cos((a * Math.PI) / 180);
          (cards[i] as HTMLElement).style.opacity = (0.3 + 0.7 * Math.max(0, (f + 0.35) / 1.35)).toFixed(2);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [step]);

  const clearTimers = () => {
    window.clearTimeout(focusTimer.current);
    window.clearTimeout(unfocusTimer.current);
  };
  const focusCard = useCallback((i: number) => {
    window.clearTimeout(unfocusTimer.current);
    setFocused(i);
  }, []);
  const unfocus = useCallback((delay = 0) => {
    clearTimers();
    unfocusTimer.current = window.setTimeout(() => setFocused(-1), delay);
  }, []);

  // Drag to turn; a tap (no movement) opens.
  const drag = useRef({ px: 0, last: 0, moved: 0 });
  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    drag.current = { px: e.clientX, last: e.clientX, moved: 0 };
    stageRef.current?.classList.add("is-dragging");
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    // On a touch screen there is no hover, so a finger landing on a card does
    // what the mouse does: the card lifts out at once and the ring keeps
    // turning behind it, blurred. A finger that then drags takes it back.
    if (coarsePointer) {
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-ring-index]");
      if (card) focusCard(Number(card.dataset.ringIndex));
      else unfocus(0);
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - drag.current.last;
    drag.current.last = e.clientX;
    drag.current.moved += Math.abs(dx);
    angle.current += dx * 0.3;
    vel.current = dx * 0.3;
    if (coarsePointer && drag.current.moved >= 10 && focused >= 0) unfocus(0);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    stageRef.current?.classList.remove("is-dragging");
    if (drag.current.moved >= 6) return;
    if (coarsePointer) return; // the lift already happened on pointerdown; a tap on the lifted card opens it
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-ring-index]");
    if (card) setLightbox(Number(card.dataset.ringIndex));
  };

  // Hover: lift the card out of the ring; the ring keeps turning behind it, blurred.
  const onRingPointerOver = (e: React.PointerEvent) => {
    if (coarsePointer) return;
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-ring-index]");
    if (!card) return;
    clearTimers();
    const i = Number(card.dataset.ringIndex);
    focusTimer.current = window.setTimeout(() => focusCard(i), 80);
  };
  const onRingPointerOut = (e: React.PointerEvent) => {
    if (coarsePointer) return;
    const to = e.relatedTarget as HTMLElement | null;
    if (to && to.closest?.("[data-ring-index],[data-focus-card]")) return;
    window.clearTimeout(focusTimer.current);
    unfocus(160);
  };

  // Lightbox keyboard.
  useEffect(() => {
    if (lightbox < 0) return;
    const prev = () => setLightbox((i) => (i - 1 + count) % count);
    const next = () => setLightbox((i) => (i + 1) % count);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(-1);
      // Arrow keys follow reading direction.
      const forward = locale === "fa" ? "ArrowLeft" : "ArrowRight";
      const back = locale === "fa" ? "ArrowRight" : "ArrowLeft";
      if (e.key === forward) next();
      if (e.key === back) prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox, count, locale, setLightbox]);

  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    for (const it of items) if (!seen.has(it.category)) seen.set(it.category, it.categoryLabel);
    return [...seen.entries()];
  }, [items]);

  // Grid order: national first, then by year descending.
  const gridOrder = useMemo(
    () =>
      [...items.keys()].sort((a, b) => {
        const A = items[a]!;
        const B = items[b]!;
        if ((A.level === "national") !== (B.level === "national")) return A.level === "national" ? -1 : 1;
        return B.year.localeCompare(A.year);
      }),
    [items],
  );

  const focusedItem = focused >= 0 ? items[focused] : undefined;
  const lbItem = lightbox >= 0 ? items[lightbox] : undefined;
  const prevGlyph = locale === "fa" ? "›" : "‹";
  const nextGlyph = locale === "fa" ? "‹" : "›";

  return (
    <>
      <div
        ref={showcaseRef}
        className={`aw-showcase${focused >= 0 ? " is-blurred" : ""}`}
        onPointerLeave={() => {
          // Touch pointers "leave" the moment the finger lifts; the lifted card must survive that.
          if (!coarsePointer) unfocus(0);
        }}
      >
        <div
          ref={stageRef}
          className="aw-stage"
          role="region"
          aria-label={copy.showcaseLabel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            dragging.current = false;
            stageRef.current?.classList.remove("is-dragging");
          }}
        >
          <div ref={ringRef} className="aw-ring" onPointerOver={onRingPointerOver} onPointerOut={onRingPointerOut}>
            {items.map((it, i) => (
              <div key={it.id} className="aw-card" data-ring-index={i}>
                <img
                  src={it.card}
                  alt={it.alt}
                  width={600}
                  height={800}
                  loading="eager"
                  fetchPriority={i < 6 ? "high" : "auto"}
                  decoding="async"
                  draggable={false}
                />
                <div className="aw-card__tag">
                  <b>{it.title}</b>
                  <span>{it.yearDisplay}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`aw-focus${focusedItem ? " is-on" : ""}`}
          data-focus-card
          aria-live="polite"
          onPointerLeave={() => {
            if (!coarsePointer) unfocus(140);
          }}
          onClick={() => {
            if (focused >= 0) setLightbox(focused);
          }}
        >
          {focusedItem ? (
            <>
              <img src={focusedItem.card} alt={focusedItem.alt} width={600} height={800} decoding="async" draggable={false} />
              <div className="aw-focus__tag">
                <b>{focusedItem.title}</b>
                <span>{focusedItem.yearDisplay}</span>
                <small>{copy.openLarge}</small>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className="aw-ctrls">
        <button
          type="button"
          className="aw-btn"
          aria-label={copy.previous}
          onClick={() => {
            vel.current = 0;
            angle.current -= step;
          }}
        >
          {prevGlyph}
        </button>
        <button type="button" className="aw-btn" aria-pressed={auto} onClick={() => setAutoPref(!auto)}>
          {copy.autoSpin}
        </button>
        <button
          type="button"
          className="aw-btn"
          aria-label={copy.next}
          onClick={() => {
            vel.current = 0;
            angle.current += step;
          }}
        >
          {nextGlyph}
        </button>
      </div>

      <section className="ind-section" aria-labelledby="aw-grid-heading">
        <div className="ind-container">
          <div className="aw-grid-head">
            <div>
              <h2 id="aw-grid-heading" className="aw-h2">
                {copy.gridHeading}
              </h2>
              <p className="aw-grid-intro">{copy.gridIntro}</p>
            </div>
            <div className="aw-filters" role="group" aria-label={copy.filterLabel}>
              <button
                type="button"
                className="aw-btn aw-btn--pill"
                aria-pressed={filter === "all"}
                onClick={() => setFilter("all")}
              >
                {copy.filterAll}
              </button>
              {categories.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className="aw-btn aw-btn--pill"
                  aria-pressed={filter === id}
                  onClick={() => setFilter(id)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <ul className="aw-grid">
            {gridOrder.map((i) => {
              const it = items[i]!;
              const hidden = filter !== "all" && it.category !== filter;
              return (
                <li key={it.id} className="aw-tilt" hidden={hidden}>
                  <button
                    type="button"
                    className="aw-tilt__btn"
                    onClick={() => setLightbox(i)}
                    onPointerMove={(e) => {
                      const el = e.currentTarget;
                      const r = el.getBoundingClientRect();
                      const x = (e.clientX - r.left) / r.width;
                      const y = (e.clientY - r.top) / r.height;
                      el.style.transform = `perspective(700px) rotateX(${(0.5 - y) * 12}deg) rotateY(${(x - 0.5) * -12}deg) translateY(-3px)`;
                      el.style.setProperty("--aw-gx", `${x * 100}%`);
                      el.style.setProperty("--aw-gy", `${y * 100}%`);
                    }}
                    onPointerLeave={(e) => {
                      e.currentTarget.style.transform = "";
                    }}
                  >
                    <img src={it.card} alt={it.alt} width={600} height={800} loading="lazy" decoding="async" />
                    <span className="aw-tilt__glare" aria-hidden="true" />
                    <span className="aw-tilt__cap">
                      <b>{it.title}</b>
                      <span>
                        <span>{it.yearDisplay}</span>
                        <span className={`aw-pill aw-pill--${it.level}`}>{it.levelLabel}</span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="aw-note">{copy.archiveNote}</p>
        </div>
      </section>

      {lbItem ? (
        <div
          className="aw-lb"
          role="dialog"
          aria-modal="true"
          aria-label={lbItem.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightbox(-1);
          }}
        >
          <button type="button" className="aw-btn aw-lb__close" onClick={() => setLightbox(-1)}>
            {copy.close}
          </button>
          <button
            type="button"
            className="aw-btn aw-lb__nav aw-lb__nav--prev"
            aria-label={copy.previous}
            onClick={() => setLightbox((i) => (i - 1 + count) % count)}
          >
            {prevGlyph}
          </button>
          <button
            type="button"
            className="aw-btn aw-lb__nav aw-lb__nav--next"
            aria-label={copy.next}
            onClick={() => setLightbox((i) => (i + 1) % count)}
          >
            {nextGlyph}
          </button>
          <figure className="aw-lb__figure">
            <img src={lbItem.full} alt={lbItem.alt} width={1080} height={1440} decoding="async" />
            <figcaption>
              <h3>{lbItem.title}</h3>
              <dl className="aw-lb__meta">
                <dt>{copy.year}</dt>
                <dd>{lbItem.year ? lbItem.yearDisplay : copy.undated}</dd>
                <dt>{locale === "fa" ? "سطح" : "Level"}</dt>
                <dd>{lbItem.levelLabel}</dd>
                <dt>{copy.issuer}</dt>
                <dd>{lbItem.issuer}</dd>
              </dl>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
