// @ts-nocheck -- the scene below is the approved viewer's own script, kept unedited.
/* eslint-disable */
"use client";

import { useEffect, useRef } from "react";

/*
 * The hero's product panel: the approved pipe viewer, re-laid for the hero.
 * The scene itself (geometry, materials, lighting, the drag and the roll) is
 * the same script that was signed off — only the surrounding layout is new, so
 * the product reads the same here as it did standing on its own page.
 */

const CSS = String.raw`
.hp{position:absolute;inset:0;z-index:2;display:flex;align-items:center;pointer-events:none}
.hp-wrap{display:flex;align-items:stretch;
  width:min(54%,760px);height:min(70vh,540px);margin-inline-start:clamp(8px,2vw,40px);
  pointer-events:auto}
[dir="ltr"] .hp{justify-content:flex-end}
[dir="ltr"] .hp-wrap{margin-inline-start:0;margin-inline-end:clamp(8px,2vw,40px)}

.hp-stage{position:relative;flex:1;min-width:0;touch-action:none}
.hp-stage canvas{display:block;width:100%;height:100%;cursor:grab;outline:none}
.hp-stage canvas:active{cursor:grabbing}
.hp-hint{position:absolute;inset-inline-start:12px;bottom:10px;font-size:11.5px;
  color:rgba(214,226,242,.66);background:rgba(8,18,32,.6);border:1px solid rgba(255,255,255,.09);
  border-radius:99px;padding:4px 11px;pointer-events:none;transition:opacity .5s ease}
.hp-hint.gone{opacity:0}
.hp-fallback{position:absolute;inset:0;display:none;place-items:center;text-align:center;
  padding:22px;font-size:13px;color:rgba(200,214,232,.8)}
.hp-stage.nogl .hp-fallback{display:grid}
.hp-stage.nogl canvas,.hp-stage.nogl .hp-hint{display:none}

/* The size rail. It stands beside the product, not around it: no panel, no
   box, no fill — a caption, five numbers separated by hairlines, and a short
   blue tick against the one in view. Everything that could compete with the
   pipe for attention has been taken out. */
.hp-side{display:flex;flex-direction:column;justify-content:center;gap:13px;
  flex:none;width:clamp(96px,10vw,124px);padding-inline-start:clamp(12px,1.5vw,24px)}
.hp-lab{font-size:9px;letter-spacing:.14em;text-transform:uppercase;line-height:1.5;
  color:rgba(168,186,210,.48);margin:0 0 7px}
.hp-chips{display:flex;flex-direction:column}
.hp-chip{position:relative;font:inherit;font-size:13.5px;font-variant-numeric:tabular-nums;
  line-height:1;text-align:start;padding:8px 0;cursor:pointer;
  background:none;border:0;border-top:1px solid rgba(255,255,255,.07);
  color:rgba(214,226,242,.58);transition:color .2s ease}
.hp-chip:first-child{border-top:0}
.hp-chip:hover{color:rgba(255,255,255,.92)}
.hp-chip[aria-pressed="true"]{color:#fff;font-weight:600}
.hp-chip[aria-pressed="true"]::before{content:"";position:absolute;inset-inline-start:-11px;
  top:50%;margin-top:-7px;width:2px;height:14px;border-radius:2px;background:#0A64F5}
.hp-chip:focus-visible{outline:2px solid #0A64F5;outline-offset:3px;border-radius:3px}
.hp-note{margin:7px 0 0;font-size:9px;letter-spacing:.12em;text-transform:uppercase;
  color:rgba(160,180,206,.4)}


/* The light page turns the hero's ground from navy to near-white, and every
   colour above was written for the dark one. They are restated here against
   the light palette so the rail keeps the same weight either way: the same
   hairlines, the same hierarchy, the same blue marker. */
[data-theme="light"] .hp-lab,
[data-theme="light"] .hp-note,
[data-theme="light"] .hp-spec dt{color:rgba(38,58,86,.6)}
[data-theme="light"] .hp-chip{color:rgba(20,38,62,.6);border-top-color:rgba(18,32,52,.14)}
[data-theme="light"] .hp-chip:hover{color:#0b1728}
[data-theme="light"] .hp-chip[aria-pressed="true"]{color:#0b1728}
[data-theme="light"] .hp-specs{border-top-color:rgba(18,32,52,.14)}
[data-theme="light"] .hp-spec dd{color:#132540}
[data-theme="light"] .hp-spec dd small{color:rgba(38,58,86,.66)}

/* The hero body is laid out left-to-right even on the Persian page, so that
   the product keeps the same side in both languages. The rail's words are
   Persian though, and inherited that direction with them — which put the unit
   ahead of the number it belongs to. The text is set back to the page's
   direction here, while the alignment and the marker stay on the side nearest
   the product, exactly where the English page has them. */
[dir="rtl"] .hp-side{direction:rtl}
[dir="rtl"] .hp-lab,[dir="rtl"] .hp-note,
[dir="rtl"] .hp-chip,[dir="rtl"] .hp-spec dt,[dir="rtl"] .hp-spec dd{text-align:end}
[dir="rtl"] .hp-spec dd.pair{justify-content:flex-end}
[dir="rtl"] .hp-chip[aria-pressed="true"]::before{inset-inline-start:auto;inset-inline-end:-11px}
.hp-specs{margin:0;display:grid;gap:8px;padding-top:12px;
  border-top:1px solid rgba(255,255,255,.07)}
.hp-spec{display:grid;gap:2px}
.hp-spec dt{font-size:8.5px;letter-spacing:.1em;text-transform:uppercase;color:rgba(160,180,206,.48)}
.hp-spec dd{margin:0;font-size:12.5px;font-variant-numeric:tabular-nums;color:rgba(234,241,250,.9);
  font-family:ui-monospace,"SF Mono",Menlo,monospace}
.hp-spec dd small{font-size:9px;color:rgba(160,180,206,.6);font-family:inherit}
.hp-spec dd.pair{display:flex;flex-wrap:wrap;gap:1px 9px;font-size:11.5px}
.hp-spec dd.pair>span{unicode-bidi:isolate;display:inline-flex;gap:3px;align-items:baseline}

@media (max-width:1023.98px){
  .engine-hero .engine-hero-body{flex-direction:column;align-items:stretch}
  .hp{position:static;padding:0;width:100%}
  .hp-wrap{width:100%;height:auto;margin:0;flex-direction:column}
  [dir="ltr"] .hp-wrap{margin:0}
  /* flex:none, or the height below is never applied: the wrap turns into a
     column here and a flex item's basis rules its height, so the stage stood
     at nothing until the canvas arrived and then jumped to meet it — which
     pushed the whole hero down several seconds into the page. With the height
     definite from the first paint there is nothing left to shift. */
  .hp-stage{flex:none;height:min(34vh,290px)}
  /* On a phone the rail lies down under the product: the same five numbers,
     turned a quarter turn, with the marker as an underline. The readout goes
     — the hero is already tall here, and the figures are a tap away on the
     size's own page. */
  .hp-side{width:auto;flex-direction:row;align-items:center;justify-content:center;
    gap:0;padding:12px 2px 2px}
  .hp-lab,.hp-note,.hp-specs{display:none}
  .hp-chips{flex-direction:row;gap:0}
  .hp-chip{padding:5px 13px 9px;border-top:0;border-inline-start:1px solid rgba(255,255,255,.08)}
  .hp-chip:first-child{border-inline-start:0}
  .hp-chip[aria-pressed="true"]::before,
  [dir="rtl"] .hp-chip[aria-pressed="true"]::before{inset-inline:11px;top:auto;bottom:1px;
    margin-top:0;width:auto;height:2px}
  [data-theme="light"] .hp-chip{border-inline-start-color:rgba(18,32,52,.14)}
}
@media (prefers-reduced-motion:reduce){.hp-stage canvas{display:none}.hp-stage.nogl .hp-fallback{display:grid}}
`;
const MARKUP = String.raw`
<div class="hp-wrap">
  <div class="hp-stage" id="stage">
    <div class="hp-hint" id="hint">برای چرخاندن بکشید</div>
    <p class="hp-fallback">مرورگر شما WebGL را پشتیبانی نمی‌کند. مشخصات کنار تصویر همچنان درست است.</p>
  </div>
  <div class="hp-side">
    <div>
      <p class="hp-lab">قطر خارجی — میلی‌متر</p>
      <div class="hp-chips" id="dnRow" role="group" aria-label="انتخاب قطر لوله">
        <button class="hp-chip" type="button" data-dn="25" aria-pressed="false">۲۵</button>
        <button class="hp-chip" type="button" data-dn="63" aria-pressed="false">۶۳</button>
        <button class="hp-chip" type="button" data-dn="110" aria-pressed="true">۱۱۰</button>
        <button class="hp-chip" type="button" data-dn="160" aria-pressed="false">۱۶۰</button>
        <button class="hp-chip" type="button" data-dn="225" aria-pressed="false">۲۲۵</button>
      </div>
      <p class="hp-note">کلاس SDR ۱۱</p>
    </div>
    <dl class="hp-specs">
      <div class="hp-spec"><dt>ضخامت دیواره</dt><dd id="oWall">۱۰ <small>میلی‌متر</small></dd></div>
      <div class="hp-spec"><dt>قطر داخلی</dt><dd id="oId">۹۰ <small>میلی‌متر</small></dd></div>
      <div class="hp-spec"><dt>فشار اسمی</dt><dd id="oPn" class="pair"><span>۱۲٫۵<small>PE80</small></span><span>۱۶<small>PE100</small></span></dd></div>
    </dl>
  </div>
</div>
`;

/* The English panel is the same markup with its words swapped. The scene
   script reads the page's lang itself, so the numerals and the unit inside
   the readout follow without being listed here. */
const EN_WORDS: readonly (readonly [string, string])[] = [
  ["برای چرخاندن بکشید", "Drag to rotate"],
  [
    "مرورگر شما WebGL را پشتیبانی نمی‌کند. مشخصات کنار تصویر همچنان درست است.",
    "This browser does not support WebGL, so the model is not shown.",
  ],
  ["قطر خارجی — میلی‌متر", "Outside diameter — mm"],
  ["انتخاب قطر لوله", "Choose a pipe diameter"],
  ["کلاس SDR ۱۱", "SDR 11 class"],
  ["ضخامت دیواره", "Wall thickness"],
  ["قطر داخلی", "Bore"],
  ["فشار اسمی", "Pressure rating"],
];

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/* The markup now carries the reference size's own figures, so the English
   panel has numerals to translate as well as words. */
const EN_MARKUP = EN_WORDS.reduce((markup, [fa, en]) => markup.replace(fa, en), MARKUP)
  .replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d)))
  .replace(/٫/g, ".")
  .replaceAll("میلی‌متر", "mm");   /* the unit, on each readout line */

export function HeroProductPanel({ locale }: { locale: "fa" | "en" }) {
  const host = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    /*
     * Two gates before three.js is fetched at all, and a wait after them.
     *
     * The gate: the vendored scene script probes for WebGL itself, but it can
     * only do that once it has loaded, which meant every visitor paid 179 KB
     * for a library they might not be able to use — measured: a browser with
     * WebGL switched off downloaded exactly as much as one without. The probe
     * happens before the import now, so a visitor with no WebGL, or one who
     * has asked for reduced motion, fetches nothing.
     *
     * The wait: the import used to start during hydration and competed with
     * first paint. Both the probe and the import go after load and then into
     * idle time — the probe too, because asking the platform for a GL context
     * is itself slow enough to show up in first paint.
     */
    const stage = document.getElementById("stage");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stage?.classList.add("nogl");
      return;
    }

    let cancelled = false;
    let idle = 0;

    const load = () => {
      if (cancelled) return;
      // the probe itself asks the platform for a GL context, which is not free;
      // it waits with the import so nothing GL-shaped runs before the page paints
      let probe: WebGLRenderingContext | null = null;
      try {
        probe = document.createElement("canvas").getContext("webgl");
      } catch {
        probe = null;
      }
      if (!probe) {
        stage?.classList.add("nogl");
        return;
      }
      import("three")
        .then((THREE) => {
          if (cancelled || !host.current) return;
          (window as unknown as { THREE: unknown }).THREE = THREE;
          run();
        })
        .catch(() => {
          stage?.classList.add("nogl");
        });
    };

    const schedule = () => {
      const ric = (window as unknown as {
        requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      }).requestIdleCallback;
      idle = ric ? ric(load, { timeout: 2000 }) : window.setTimeout(load, 200);
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      const cic = (window as unknown as { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback;
      if (idle) (cic ?? window.clearTimeout)(idle);
    };
  }, []);

  return (
    <div className="hp" ref={host}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        dangerouslySetInnerHTML={{
          __html:
            locale === "en"
              ? EN_MARKUP
              : MARKUP,
        }}
        style={{ display: "contents" }}
      />
    </div>
  );
}

function run() {

const TABLE = {"sdr":[51,41,33,26,21,17,13.6,11,9,7.4,6],"pn80":[2.5,3.2,4,5,6,8,10,12.5,16,20,25],"pn100":[3.2,4,5,6,8,10,12.5,16,20,25,null],"dn":[16,20,25,32,40,50,63,75,90,110,125,140,160,180,200,225,250,280,315,355,400,450,500,560,630],"wall":[[null,null,null,null,null,null,null,null,2,2.3,3],[null,null,null,null,null,null,null,2,2.3,3,3.4],[null,null,null,null,1.5,1.8,2,2.3,3,3.5,4.2],[null,null,null,null,null,2,2.4,3,3.6,4.4,5.4],[null,null,null,1.8,2,2.4,3,3.7,4.5,5.5,6.7],[null,null,1.8,2,2.4,3,3.7,4.6,5.6,6.9,8.3],[null,1.8,2,2.5,3,3.8,4.7,5.8,7.1,8.6,10.5],[1.8,2,2.3,2.9,3.6,4.5,5.6,6.8,8.4,10.3,12.5],[1.8,2.2,2.8,3.5,4.3,5.4,6.7,8.2,10.1,12.3,15],[2.2,2.7,3.4,4.2,5.3,6.6,8.1,10,12.3,15.1,18.3],[2.5,3.1,3.9,4.8,6,7.4,9.2,11.4,14,17.1,20.8],[2.8,3.5,4.3,5.4,6.7,8.3,10.3,12.7,15.7,19.2,23.3],[3.2,4,4.9,6.2,7.7,9.5,11.8,14.6,17.9,21.9,26.6],[3.6,4.4,5.5,6.9,8.6,10.7,13.3,16.4,20.1,24.6,29.9],[3.9,4.9,6.2,7.7,9.6,11.9,14.7,18.2,22.4,27.4,33.2],[4.4,5.5,6.9,8.6,10.8,13.4,16.6,20.5,25.2,30.8,37.4],[4.9,6.2,7.7,9.6,11.9,14.8,18.4,22.7,27.9,34.2,41.6],[5.5,6.9,8.6,10.7,13.4,16.6,20.6,25.4,31.3,38.3,46.5],[6.2,7.7,9.7,12.1,15,18.7,23.2,28.6,35.2,43.1,52.3],[7,8.7,10.9,13.6,16.9,21.1,26.1,32.2,39.7,48.5,59],[7.9,9.8,12.3,15.3,19.1,23.7,29.4,36.3,44.7,54.7,66.5],[8.8,11,13.8,17.2,21.5,26.7,33.1,40.9,50.3,61.5,null],[9.8,12.3,15.3,19.1,23.9,29.7,36.8,45.4,55.8,68.3,null],[11,13.7,17.2,21.4,26.7,33.2,41.2,50.8,62.5,null,null],[12.3,15.4,19.3,24.1,30,37.4,46.3,57.2,null,null,null]]};

/* ---------------------------------------------------------------- state
   Five diameters out of the catalogue's twenty-five. They are the ones the
   factory makes for more than one product line: 25 is in the water, gas and
   irrigation tables all three; 63, 110, 160 and 225 are in both water and
   gas, and 225 is the largest diameter the gas licence covers. So each is a
   size the plant runs as a matter of course, not to order, and together they
   span the range end to end.

   All five are held at SDR 11 — the class the gas standard works in, and one
   the water catalogue lists a wall for at every one of these diameters — so
   the wall the viewer sees is one real pressure class throughout, never an
   average of several.

   DN 110 is the reference: it renders exactly as the approved viewer did, and
   the others are drawn true to it — the same length of pipe, the diameter to
   scale. */
const SIZES = [25, 63, 110, 160, 225], REF = 110;
let dnIdx = TABLE.dn.indexOf(REF);
const sdrIdx = TABLE.sdr.indexOf(11);
const wallOf = (d, s) => TABLE.wall[d][s];

/* ------------------------------------------------------------ the chips */
const dnRow = document.getElementById('dnRow');
const EN = document.documentElement.lang === 'en';
const fa = n => EN ? String(n)
  : String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]).replace('.', '٫');
const MM = EN ? 'mm' : 'میلی‌متر';

/* The chips are in the markup, already showing the reference size, so the rail
   has its full height from the first paint. Building them here instead pushed
   the copy below it down the moment the scene finished loading — a layout
   shift several seconds in, which is the worst kind. This only wires them. */
[...dnRow.querySelectorAll('.hp-chip')].forEach(b => {
  const i = TABLE.dn.indexOf(Number(b.dataset.dn));
  b.dataset.i = i;
  b.addEventListener('click', () => { dnIdx = i; sync(); });
});

/* --------------------------------------------------------- the readout */
function sync() {
  const dn = TABLE.dn[dnIdx], t = wallOf(dnIdx, sdrIdx);
  [...dnRow.children].forEach(b => b.setAttribute('aria-pressed', +b.dataset.i === dnIdx));

  const wallEl = document.getElementById('oWall'), idEl = document.getElementById('oId');
  if (t == null) {
    wallEl.textContent = '—'; idEl.textContent = '—';
  } else {
    wallEl.innerHTML = fa(t) + ' <small>' + MM + '</small>';
    idEl.innerHTML = fa(Math.round((dn - 2 * t) * 10) / 10) + ' <small>' + MM + '</small>';
  }
  const p80 = TABLE.pn80[sdrIdx], p100 = TABLE.pn100[sdrIdx];
  const pn = (v, grade) => '<span>' + (v != null ? fa(v) : '—') + '<small>' + grade + '</small></span>';
  document.getElementById('oPn').innerHTML = pn(p80, 'PE80') + pn(p100, 'PE100');

  /* the model takes the wall as a fraction of the diameter, and the diameter
     itself relative to DN 110 — length is the same cut of pipe either way */
  if (window.__setPipe) window.__setPipe(t == null ? null : (2 * t) / dn, dn / REF);
}

/* ------------------------------------------------------------ the model */
(function () {
  const stage = document.getElementById('stage'), hint = document.getElementById('hint');
  let probe; try { probe = document.createElement('canvas').getContext('webgl'); } catch (e) {}
  if (!probe || typeof THREE === 'undefined') { stage.classList.add('nogl'); sync(); return; }

  const T = THREE, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lin = hex => new T.Color(hex);   /* r186 manages colour space itself */
  const dark = () => document.documentElement.dataset.theme === 'dark' ||
    (document.documentElement.dataset.theme !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches);

  const renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
  renderer.toneMapping = T.ACESFilmicToneMapping;
  stage.appendChild(renderer.domElement);

  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(26, 1, .1, 100);

  /* a small studio, so the black polyethylene picks up strip highlights the way it does
     under shop lighting — without them a black tube reads as a flat silhouette */
  const pmrem = new T.PMREMGenerator(renderer), studio = new T.Scene();
  const gc = document.createElement('canvas'); gc.width = 8; gc.height = 256;
  const gx = gc.getContext('2d'), gg = gx.createLinearGradient(0, 0, 0, 256);
  gg.addColorStop(0, '#5b6a81'); gg.addColorStop(.52, '#1d2839'); gg.addColorStop(1, '#0a1019');
  gx.fillStyle = gg; gx.fillRect(0, 0, 8, 256);
  const gt = new T.CanvasTexture(gc); gt.colorSpace = T.SRGBColorSpace;
  studio.add(new T.Mesh(new T.SphereGeometry(16, 32, 16), new T.MeshBasicMaterial({ map: gt, side: T.BackSide })));
  const box = (w, h, x, y, z, c) => {
    const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: c, side: T.DoubleSide }));
    m.position.set(x, y, z); m.lookAt(0, 0, 0); studio.add(m);
  };
  box(12, 2.4, -3, 7, 5, new T.Color(5.4, 5.4, 5.2));      /* long key strip overhead: the highlight down the barrel */
  box(1.6, 10, 8, 1.5, -3, new T.Color(4.6, 5.8, 7.6));    /* cool rim, back right */
  box(1.2, 9, -8, 1, -3.5, new T.Color(5.2, 4.2, 3.2));    /* warm rim, back left */
  box(12, 1.2, 0, -3.4, 7, new T.Color(1.5, 1.6, 1.8));    /* low fill, so the underside is not solid black */
  scene.environment = pmrem.fromScene(studio, .03).texture;

  const key = new T.DirectionalLight(lin(0xfff4e8), 3.2); key.position.set(-3, 6, 5); scene.add(key);
  const rim = new T.DirectionalLight(lin(0x9dc8ff), 5.5); rim.position.set(5, 2, -4); scene.add(rim);
  const hemi = new T.HemisphereLight(lin(0xc4d4e8), lin(0x070d18), .45); scene.add(hemi);

  /* ---- materials: extruded HDPE is a satin black, the sawn face is matte ---- */
  const WALL = new T.MeshStandardMaterial({ color: lin(0x212328), roughness: .46, metalness: 0, envMapIntensity: 1 });
  const BORE = new T.MeshStandardMaterial({ color: lin(0x101216), roughness: .62, metalness: 0, side: T.BackSide, envMapIntensity: .55 });
  const FACE = new T.MeshStandardMaterial({ color: lin(0x3a3d43), roughness: .8, metalness: 0, side: T.DoubleSide, envMapIntensity: .5 });
  const EDGE = new T.MeshStandardMaterial({ color: lin(0x8f96a2), roughness: .3, metalness: 0, envMapIntensity: 1.5 });
  const STRIPE = new T.MeshStandardMaterial({ color: lin(0x0a64f5), roughness: .3, metalness: 0, envMapIntensity: 1.1 });

  /* the moulded surface: a seamless pebble grain, the stipple visible on the factory's
     own render. Fine enough to read as texture on black, not as noise. */
  const pebble = (size, density) => {
    const c = document.createElement('canvas'); c.width = c.height = size;
    const x = c.getContext('2d'); x.fillStyle = '#808080'; x.fillRect(0, 0, size, size);
    const dot = document.createElement('canvas'); dot.width = dot.height = 32;
    const dx = dot.getContext('2d'), dg = dx.createRadialGradient(16, 16, 0, 16, 16, 16);
    dg.addColorStop(0, 'rgba(255,255,255,1)'); dg.addColorStop(.55, 'rgba(255,255,255,.45)'); dg.addColorStop(1, 'rgba(255,255,255,0)');
    dx.fillStyle = dg; dx.fillRect(0, 0, 32, 32);
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < size * size / density; i++) {
      const r = 1.8 + rnd() * 2.2, X0 = rnd() * size, Y0 = rnd() * size;
      x.globalAlpha = .16 + rnd() * .18;
      for (const ox of [0, -size, size]) for (const oy of [0, -size, size]) {
        const X = X0 + ox, Y = Y0 + oy;
        if (X > -r && X < size + r && Y > -r && Y < size + r) x.drawImage(dot, X - r, Y - r, r * 2, r * 2);
      }
    }
    x.globalAlpha = 1;
    const t = new T.CanvasTexture(c); t.wrapS = t.wrapT = T.RepeatWrapping;
    t.anisotropy = renderer.capabilities.getMaxAnisotropy(); return t;
  };
  const grain = pebble(512, 24); grain.repeat.set(26, 14);
  WALL.roughnessMap = grain; WALL.bumpMap = grain; WALL.bumpScale = .0045;

  /* the marking: the blue lockup and the grade, printed once down one side.
     Drawn into a wrapped canvas, so it curves with the pipe instead of floating on it. */
  const MARK_W = 2048, MARK_H = 1024, MARK_U = 890 / 2048;
  const markCv = document.createElement('canvas'); markCv.width = MARK_W; markCv.height = MARK_H;
  const mk = markCv.getContext('2d');
  const markTex = new T.CanvasTexture(markCv);
  /* Clamped, not repeated. The printed mark is resized per diameter below, and
     once its window reaches past the canvas the wrapped edges would bring a
     second copy of the lettering round the far side. The canvas is clear at
     all four edges, so clamping puts nothing there instead. */
  markTex.wrapS = markTex.wrapT = T.ClampToEdgeWrapping;
  markTex.colorSpace = T.SRGBColorSpace;
  markTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const MARK = new T.MeshStandardMaterial({ map: markTex, alphaTest: .08, roughness: .34,
    metalness: 0, envMapIntensity: 1 });
  const logo = new Image();
  /* AXIS_FLIP turns the lettering end for end if it reads the wrong way round */
  const AXIS_FLIP = false;
  function drawMark() {
    mk.clearRect(0, 0, MARK_W, MARK_H);
    mk.save();
    mk.translate(MARK_U * MARK_W, MARK_H / 2);   /* about 20 degrees off the stripe, as on the real pipe */
    mk.rotate(AXIS_FLIP ? Math.PI / 2 : -Math.PI / 2);   /* the lettering runs along the pipe */
    const lh = 210, lw = logo.width ? lh * logo.width / logo.height : lh;
    let x = -(lw + 42 + 265) / 2;
    if (logo.width) mk.drawImage(logo, x, -lh / 2, lw, lh);
    x += lw + 17;
    mk.fillStyle = 'rgba(214,220,230,.5)'; mk.fillRect(x, -lh * .22, 4, lh * .44);
    x += 21;
    mk.fillStyle = '#E6EBF2';
    mk.font = '700 96px ui-sans-serif, system-ui, "Segoe UI", Arial, sans-serif';
    mk.textBaseline = 'middle';
    mk.fillText('PE100', x, 4);
    mk.restore();
    markTex.needsUpdate = true;
  }
  logo.onload = drawMark; drawMark();
  /* The lockup is a file, not a data URI. Inlined it rode in the page's own
     JavaScript — 26 KB of base64 that every reader downloaded, including the
     ones whose browser never loads the scene at all. As a file it is fetched
     only here, once the model is being built, and is cached on its own. */
  logo.crossOrigin = 'anonymous';
  logo.src = '/media/brand/pipe-mark-bukan.7aa81458.png';

  const spin = new T.Group(); scene.add(spin);
  const tube = new T.Group(); tube.rotation.z = Math.PI / 2; spin.add(tube);   /* lay the axis along X */

  const L = 3.5, SEG = 160, STRIPES = 4, ARC = .12;
  let parts = [], OUT = 1;                           /* OUT: outer radius, 1 at the reference DN 110 */
  function rebuild(wallFrac, outerR) {
    parts.forEach(m => { tube.remove(m); m.geometry.dispose(); }); parts = [];
    if (wallFrac == null) return;
    OUT = outerR || 1;
    const R = OUT, r = Math.max(.04, 1 - wallFrac) * R;
    /* the moulding grain is a property of the surface, not of the size, so it
       keeps its density as the circumference grows */
    grain.repeat.set(26 * R, 14);

    /*
     * The printed mark, kept in proportion.
     *
     * Its canvas is wrapped once round the pipe, so the lettering's height
     * runs with the circumference while its length runs with the pipe's axis.
     * The circumference grows with the diameter and the length does not, so
     * left alone the mark stretched taller on a large pipe and squashed flat
     * on a small one — the same lockup, out of shape at every size but the
     * one it was drawn for.
     *
     * Holding repeat.x at repeat.y times the diameter is exactly the condition
     * for a canvas pixel to stay square on the surface, so the shape of the
     * lettering is fixed whatever else is done. What that leaves free is S,
     * the mark's size against the reference, and it is pinched from both
     * sides.
     *
     * Above the reference the limit is the pipe's length: the lockup already
     * runs half the length at DN 110, so a mark that grew with the diameter
     * would run off both ends of the largest. The square root keeps it on.
     *
     * Below the reference the limit is the blue stripe. The four stripes sit
     * at fixed angles, and the arc between two of them is all the room the
     * mark has. A mark that shrinks more slowly than the pipe takes a wider
     * arc as the pipe thins — which is what put the lockup under the stripe
     * at DN 63 and buried it at DN 25. Growing with the diameter instead
     * holds its arc constant, so it keeps the clearance it has at DN 110 all
     * the way down.
     *
     * The smaller of the two is the one that satisfies both, and at the
     * reference they meet at 1 with the offsets at 0, leaving DN 110 exactly
     * as it was drawn.
     */
    const S = Math.min(R, Math.sqrt(R)), kx = R / S, ky = 1 / S;
    markTex.repeat.set(kx, ky);
    markTex.offset.set(MARK_U * (1 - kx), .5 * (1 - ky));

    const outer = new T.Mesh(new T.CylinderGeometry(R, R, L, SEG, 1, true), WALL);
    const bore  = new T.Mesh(new T.CylinderGeometry(r, r, L, SEG, 1, true), BORE);
    parts.push(outer, bore);
    for (const s of [1, -1]) {                       /* the sawn ends: the annulus is the whole point */
      const ring = new T.Mesh(new T.RingGeometry(r, R, SEG, 1), FACE);
      ring.rotation.x = Math.PI / 2 * s; ring.position.y = s * L / 2;
      parts.push(ring);
    }
    for (let i = 0; i < STRIPES; i++) {              /* the blue lines that mark it as water pipe */
      const th = i * Math.PI * 2 / STRIPES - ARC / 2;
      const st = new T.Mesh(new T.CylinderGeometry(R * 1.004, R * 1.004, L, 24, 1, true, th, ARC), STRIPE);
      parts.push(st);
    }
    const sleeve = new T.Mesh(new T.CylinderGeometry(R * 1.006, R * 1.006, L, SEG, 1, true), MARK);
    parts.push(sleeve);
    for (const s2 of [1, -1]) {                      /* the cut edge catches a hard highlight */
      const lip = new T.Mesh(new T.TorusGeometry(R * .998, R * .006, 8, SEG), EDGE);
      lip.rotation.x = Math.PI / 2; lip.position.y = s2 * L / 2;
      parts.push(lip);
    }
    parts.forEach(m => tube.add(m));
    fit();                                           /* a fatter pipe needs the camera a step back */
  }
  window.__setPipe = rebuild;

  /* The camera follows the pipe instead of sitting at a fixed distance. The
     geometry is never distorted to fit the frame — every wall, bore and
     diameter stays exactly to the catalogue, and only the camera moves, the
     way you step closer to a small pipe and back from a large one. FILL is
     chosen so the reference DN 110 lands at 2.15, the distance the approved
     viewer used, which leaves that size rendering exactly as it did. */
  const FILL = 2.15 / Math.hypot(L / 2, 1);
  const fit = () => {
    const w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const R = Math.hypot(L / 2, OUT) * FILL, vf = camera.fov * Math.PI / 180;
    const hf = 2 * Math.atan(Math.tan(vf / 2) * camera.aspect);
    camera.position.set(0, .55, R / Math.sin(Math.min(vf, hf) / 2) * .92);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  };
  const theme = () => {
    const d = dark();
    renderer.toneMappingExposure = d ? .86 : 1.06;
    hemi.intensity = d ? .26 : .45;
    WALL.envMapIntensity = d ? .72 : 1;
  };
  theme(); fit();
  new ResizeObserver(fit).observe(stage);
  new MutationObserver(theme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', theme);

  /* ---- turning it: free rotation about the screen axes, with a fling ---- */
  const cv = renderer.domElement;
  cv.style.touchAction = 'none';
  cv.setAttribute('tabindex', '0');
  cv.setAttribute('role', 'img');
  cv.setAttribute('aria-label', EN
    ? 'Three-dimensional model of a polyethylene pipe — drag to rotate'
    : 'مدل سه‌بعدی لوله پلی اتیلن — با کشیدن بچرخانید');
  const qU = new T.Quaternion(), qT = new T.Quaternion();
  const UP = new T.Vector3(0, 1, 0), RIGHT = new T.Vector3();
  let dragging = false, lastX = 0, lastY = 0, lastT = 0, wx = 0, wy = 0, touched = false;

  const turn = (ay, ax) => {
    RIGHT.set(1, 0, 0).applyQuaternion(camera.quaternion);
    qU.premultiply(qT.setFromAxisAngle(UP, ay));
    qU.premultiply(qT.setFromAxisAngle(RIGHT, ax));
    qU.normalize();
  };
  cv.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.preventDefault(); dragging = true; wx = wy = 0;
    lastX = e.clientX; lastY = e.clientY; lastT = performance.now();
    if (!touched) { touched = true; hint.classList.add('gone'); }
    try { cv.setPointerCapture(e.pointerId); } catch (_) {}
  });
  cv.addEventListener('pointermove', e => {
    if (!dragging) return;
    const now = performance.now(), k = Math.max(.016, (now - lastT) / 1000);
    const ay = (e.clientX - lastX) / cv.clientWidth * 4.4;
    const ax = (e.clientY - lastY) / cv.clientHeight * 4.4;
    turn(ay, ax); wy = ay / k; wx = ax / k;
    lastX = e.clientX; lastY = e.clientY; lastT = now;
  });
  const release = () => { dragging = false; };
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(t => cv.addEventListener(t, release));
  cv.addEventListener('dragstart', e => e.preventDefault());
  cv.addEventListener('keydown', e => {                    /* the keyboard turns it too */
    const step = .22;
    const map = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    if (!map[e.key]) return;
    e.preventDefault(); turn(map[e.key][0], map[e.key][1]);
    if (!touched) { touched = true; hint.classList.add('gone'); }
  });

  let running = true;
  new IntersectionObserver(es => { running = es[0].isIntersecting; if (running) loop(); }).observe(stage);
  document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) loop(); });

  const clock = new T.Clock();
  const AUTO = still ? 0 : .24;
  let ticking = false;
  function loop() { if (ticking) return; ticking = true; requestAnimationFrame(frame); }
  function frame() {
    ticking = false; if (!running) return;
    const dt = Math.min(clock.getDelta(), .05);
    if (!dragging) {
      if (Math.abs(wx) + Math.abs(wy) > .001) {            /* the fling, fading out */
        turn(wy * dt, wx * dt);
        const f = Math.exp(-dt * 2.1); wx *= f; wy *= f;
      } else {
        turn(AUTO * dt, 0);                                /* otherwise it idles round */
      }
    }
    spin.quaternion.copy(qU);
    renderer.render(scene, camera);
    loop();
  }

  /* it opens already turned to where the cut end reads: the wall is what people came for */
  turn(-.62, -.30);
  sync(); loop();
})();

}
