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

.hp-side{display:none}
.hp-lab{font-size:10.5px;letter-spacing:.02em;color:rgba(168,186,210,.72);margin:0 0 6px}
.hp-chips{display:flex;flex-wrap:wrap;gap:5px;max-height:92px;overflow-y:auto;
  mask-image:linear-gradient(180deg,#000 82%,transparent 100%);
  scrollbar-width:thin;padding-inline-end:2px}
.hp-chip{font:inherit;font-size:12px;font-variant-numeric:tabular-nums;line-height:1;
  padding:6px 9px;border-radius:7px;cursor:pointer;
  background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.1);color:rgba(214,226,242,.86);
  transition:background .15s,border-color .15s,color .15s}
.hp-chip:hover:not(:disabled){border-color:rgba(30,111,217,.75);color:#fff}
.hp-chip[aria-pressed="true"]{background:#0A64F5;border-color:#0A64F5;color:#fff;font-weight:600}
.hp-chip:disabled{opacity:.28;cursor:not-allowed}
.hp-chip:focus-visible{outline:2px solid #0A64F5;outline-offset:2px}

.hp-specs{margin:2px 0 0;display:grid;grid-template-columns:1fr 1fr;gap:1px;
  background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.08);border-radius:12px;overflow:hidden}
.hp-spec{background:rgba(9,17,30,.86);padding:9px 10px;display:grid;gap:2px}
.hp-spec dt{font-size:10px;color:rgba(160,180,206,.75)}
.hp-spec dd{margin:0;font-size:15px;font-weight:600;font-variant-numeric:tabular-nums;color:#EAF1FA;
  font-family:ui-monospace,"SF Mono",Menlo,monospace}
.hp-spec dd small{font-size:9.5px;font-weight:400;color:rgba(160,180,206,.75);font-family:inherit}
.hp-spec dd.pair{display:flex;flex-wrap:wrap;gap:2px 8px;font-size:12.5px}
.hp-spec dd.pair>span{unicode-bidi:isolate;display:inline-flex;gap:3px;align-items:baseline}

@media (max-width:1023.98px){
  .engine-hero .engine-hero-body{flex-direction:column;align-items:stretch}
  .hp{position:static;order:-1;padding:0;width:100%}
  .hp-wrap{width:100%;height:auto;margin:0}
  [dir="ltr"] .hp-wrap{margin:0}
  .hp-stage{height:min(52vh,420px)}
}
@media (prefers-reduced-motion:reduce){.hp-stage canvas{display:none}.hp-stage.nogl .hp-fallback{display:grid}}
`;
const MARKUP = String.raw`
<div class="hp-wrap">
  <div class="hp-stage" id="stage">
    <div class="hp-hint" id="hint">برای چرخاندن بکشید</div>
    <p class="hp-fallback">مرورگر شما WebGL را پشتیبانی نمی‌کند. مشخصات کنار تصویر همچنان درست است.</p>
  </div>
  <div class="hp-side" hidden>
    <div>
      <p class="hp-lab">قطر خارجی اسمی — DN (میلی‌متر)</p>
      <div class="hp-chips" id="dnRow" role="group" aria-label="انتخاب قطر"></div>
    </div>
    <div>
      <p class="hp-lab">کلاس فشار — SDR</p>
      <div class="hp-chips" id="sdrRow" role="group" aria-label="انتخاب کلاس فشار"></div>
    </div>
    <dl class="hp-specs">
      <div class="hp-spec"><dt>قطر خارجی</dt><dd id="oOd">—</dd></div>
      <div class="hp-spec"><dt>ضخامت دیواره</dt><dd id="oWall">—</dd></div>
      <div class="hp-spec"><dt>قطر داخلی</dt><dd id="oId">—</dd></div>
      <div class="hp-spec"><dt>فشار اسمی</dt><dd id="oPn" class="pair">—</dd></div>
    </dl>
  </div>
</div>
`;

export function HeroProductPanel() {
  const host = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    let cancelled = false;
    import("three")
      .then((THREE) => {
        if (cancelled || !host.current) return;
        (window as unknown as { THREE: unknown }).THREE = THREE;
        run();
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="hp" ref={host}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div dangerouslySetInnerHTML={{ __html: MARKUP }} style={{ display: "contents" }} />
    </div>
  );
}

function run() {

const TABLE = {"sdr":[51,41,33,26,21,17,13.6,11,9,7.4,6],"pn80":[2.5,3.2,4,5,6,8,10,12.5,16,20,25],"pn100":[3.2,4,5,6,8,10,12.5,16,20,25,null],"dn":[16,20,25,32,40,50,63,75,90,110,125,140,160,180,200,225,250,280,315,355,400,450,500,560,630],"wall":[[null,null,null,null,null,null,null,null,2,2.3,3],[null,null,null,null,null,null,null,2,2.3,3,3.4],[null,null,null,null,1.5,1.8,2,2.3,3,3.5,4.2],[null,null,null,null,null,2,2.4,3,3.6,4.4,5.4],[null,null,null,1.8,2,2.4,3,3.7,4.5,5.5,6.7],[null,null,1.8,2,2.4,3,3.7,4.6,5.6,6.9,8.3],[null,1.8,2,2.5,3,3.8,4.7,5.8,7.1,8.6,10.5],[1.8,2,2.3,2.9,3.6,4.5,5.6,6.8,8.4,10.3,12.5],[1.8,2.2,2.8,3.5,4.3,5.4,6.7,8.2,10.1,12.3,15],[2.2,2.7,3.4,4.2,5.3,6.6,8.1,10,12.3,15.1,18.3],[2.5,3.1,3.9,4.8,6,7.4,9.2,11.4,14,17.1,20.8],[2.8,3.5,4.3,5.4,6.7,8.3,10.3,12.7,15.7,19.2,23.3],[3.2,4,4.9,6.2,7.7,9.5,11.8,14.6,17.9,21.9,26.6],[3.6,4.4,5.5,6.9,8.6,10.7,13.3,16.4,20.1,24.6,29.9],[3.9,4.9,6.2,7.7,9.6,11.9,14.7,18.2,22.4,27.4,33.2],[4.4,5.5,6.9,8.6,10.8,13.4,16.6,20.5,25.2,30.8,37.4],[4.9,6.2,7.7,9.6,11.9,14.8,18.4,22.7,27.9,34.2,41.6],[5.5,6.9,8.6,10.7,13.4,16.6,20.6,25.4,31.3,38.3,46.5],[6.2,7.7,9.7,12.1,15,18.7,23.2,28.6,35.2,43.1,52.3],[7,8.7,10.9,13.6,16.9,21.1,26.1,32.2,39.7,48.5,59],[7.9,9.8,12.3,15.3,19.1,23.7,29.4,36.3,44.7,54.7,66.5],[8.8,11,13.8,17.2,21.5,26.7,33.1,40.9,50.3,61.5,null],[9.8,12.3,15.3,19.1,23.9,29.7,36.8,45.4,55.8,68.3,null],[11,13.7,17.2,21.4,26.7,33.2,41.2,50.8,62.5,null,null],[12.3,15.4,19.3,24.1,30,37.4,46.3,57.2,null,null,null]]};

/* ---------------------------------------------------------------- state */
let dnIdx = TABLE.dn.indexOf(110), sdrIdx = TABLE.sdr.indexOf(11);
const wallOf = (d, s) => TABLE.wall[d][s];

/* ------------------------------------------------------------ the chips */
const dnRow = document.getElementById('dnRow'), sdrRow = document.getElementById('sdrRow');
const fa = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]).replace('.', '٫');

TABLE.dn.forEach((dn, i) => {
  const b = document.createElement('button');
  b.className = 'hp-chip'; b.type = 'button'; b.textContent = fa(dn);
  b.addEventListener('click', () => { dnIdx = i; if (wallOf(dnIdx, sdrIdx) == null) sdrIdx = firstSdr(i); sync(); });
  dnRow.appendChild(b);
});
TABLE.sdr.forEach((sdr, i) => {
  const b = document.createElement('button');
  b.className = 'hp-chip'; b.type = 'button'; b.textContent = fa(sdr);
  b.addEventListener('click', () => { sdrIdx = i; sync(); });
  sdrRow.appendChild(b);
});
function firstSdr(d) { return TABLE.wall[d].findIndex(v => v != null); }

/* --------------------------------------------------------- the readout */
function sync() {
  const dn = TABLE.dn[dnIdx], t = wallOf(dnIdx, sdrIdx);
  [...dnRow.children].forEach((b, i) => b.setAttribute('aria-pressed', i === dnIdx));
  [...sdrRow.children].forEach((b, i) => {
    b.setAttribute('aria-pressed', i === sdrIdx);
    b.disabled = wallOf(dnIdx, i) == null;           /* the dash in the catalogue: not produced */
  });

  document.getElementById('oOd').innerHTML = fa(dn) + ' <small>میلی‌متر</small>';
  const wallEl = document.getElementById('oWall'), idEl = document.getElementById('oId');
  if (t == null) {
    wallEl.textContent = '—'; idEl.textContent = '—';
  } else {
    wallEl.innerHTML = fa(t) + ' <small>میلی‌متر</small>';
    idEl.innerHTML = fa(Math.round((dn - 2 * t) * 10) / 10) + ' <small>میلی‌متر</small>';
  }
  const p80 = TABLE.pn80[sdrIdx], p100 = TABLE.pn100[sdrIdx];
  const pn = (v, grade) => '<span>' + (v != null ? fa(v) : '—') + '<small>' + grade + '</small></span>';
  document.getElementById('oPn').innerHTML = pn(p80, 'PE80') + pn(p100, 'PE100');

  if (window.__setPipe) window.__setPipe(t == null ? null : (2 * t) / dn);
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
  const MARK_W = 2048, MARK_H = 1024;
  const markCv = document.createElement('canvas'); markCv.width = MARK_W; markCv.height = MARK_H;
  const mk = markCv.getContext('2d');
  const markTex = new T.CanvasTexture(markCv);
  markTex.wrapS = markTex.wrapT = T.RepeatWrapping; markTex.colorSpace = T.SRGBColorSpace;
  markTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const MARK = new T.MeshStandardMaterial({ map: markTex, alphaTest: .08, roughness: .34,
    metalness: 0, envMapIntensity: 1 });
  const logo = new Image();
  /* AXIS_FLIP turns the lettering end for end if it reads the wrong way round */
  const AXIS_FLIP = false;
  function drawMark() {
    mk.clearRect(0, 0, MARK_W, MARK_H);
    mk.save();
    mk.translate(890, MARK_H / 2);   /* about 20 degrees off the stripe, as on the real pipe */
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
  logo.src = 'data:image/png;base64,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';

  const spin = new T.Group(); scene.add(spin);
  const tube = new T.Group(); tube.rotation.z = Math.PI / 2; spin.add(tube);   /* lay the axis along X */

  const L = 3.5, SEG = 160, STRIPES = 4, ARC = .12;
  let parts = [];
  function rebuild(wallFrac) {
    parts.forEach(m => { tube.remove(m); m.geometry.dispose(); }); parts = [];
    if (wallFrac == null) return;
    const r = Math.max(.04, 1 - wallFrac);

    const outer = new T.Mesh(new T.CylinderGeometry(1, 1, L, SEG, 1, true), WALL);
    const bore  = new T.Mesh(new T.CylinderGeometry(r, r, L, SEG, 1, true), BORE);
    parts.push(outer, bore);
    for (const s of [1, -1]) {                       /* the sawn ends: the annulus is the whole point */
      const ring = new T.Mesh(new T.RingGeometry(r, 1, SEG, 1), FACE);
      ring.rotation.x = Math.PI / 2 * s; ring.position.y = s * L / 2;
      parts.push(ring);
    }
    for (let i = 0; i < STRIPES; i++) {              /* the blue lines that mark it as water pipe */
      const th = i * Math.PI * 2 / STRIPES - ARC / 2;
      const st = new T.Mesh(new T.CylinderGeometry(1.004, 1.004, L, 24, 1, true, th, ARC), STRIPE);
      parts.push(st);
    }
    const sleeve = new T.Mesh(new T.CylinderGeometry(1.006, 1.006, L, SEG, 1, true), MARK);
    parts.push(sleeve);
    for (const s2 of [1, -1]) {                      /* the cut edge catches a hard highlight */
      const lip = new T.Mesh(new T.TorusGeometry(.998, .006, 8, SEG), EDGE);
      lip.rotation.x = Math.PI / 2; lip.position.y = s2 * L / 2;
      parts.push(lip);
    }
    parts.forEach(m => tube.add(m));
  }
  window.__setPipe = rebuild;

  const fit = () => {
    const w = stage.clientWidth, h = stage.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const R = 2.15, vf = camera.fov * Math.PI / 180;
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
  cv.setAttribute('aria-label', 'مدل سه‌بعدی لوله پلی اتیلن — با کشیدن بچرخانید');
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
