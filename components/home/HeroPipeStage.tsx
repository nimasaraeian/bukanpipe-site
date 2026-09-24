"use client";

import { useEffect, useRef } from "react";
/* Types only — erased at build time, so three still arrives through the dynamic import alone. */
import type * as Three from "three";
import type { Locale } from "@/lib/i18n/config";

/**
 * The homepage hero's pipe, modelled in the browser rather than photographed.
 *
 * It is a layer OVER the hero photo, never a replacement for it. The photo
 * stays the LCP element with its own preload; this canvas fades in only once
 * the first frame has been drawn, and the photo fades back the moment anything
 * here is unavailable. Three conditions skip it entirely — no WebGL, a reduced
 * motion preference, or a viewport under 1024px — and on each of those the hero
 * is exactly what it was before.
 *
 * Geometry is DN 110 SDR 11 from the factory's own dimension table: a 10 mm
 * wall on a 110 mm pipe, so the bore you see through the cut end is the real
 * proportion rather than a pleasing one.
 */

const MIN_WIDTH = "(min-width: 380px)"; // below this a phone is too small to read the product on
const WALL_FRACTION = (2 * 10) / 110; // DN 110, SDR 11 — wall as a fraction of the radius
const BODY = 0x212328; // sampled from the factory's own product render
const STRIPE_BLUE = 0x0a64f5;
const CUT_FACE = 0x3a3d43;
const BORE = 0x101216;

type Props = {
  locale: Locale;
  /** The blue lockup printed on the barrel. */
  markSrc: string;
};

export function HeroPipeStage({ locale, markSrc }: Props) {
  const host = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = host.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || !window.matchMedia(MIN_WIDTH).matches) return;

    let probe: WebGLRenderingContext | null = null;
    try {
      probe = document.createElement("canvas").getContext("webgl");
    } catch {
      probe = null;
    }
    if (!probe) return;

    let disposed = false;
    let teardown: (() => void) | null = null;

    import("three")
      .then((THREE) => {
        if (disposed) return;
        teardown = build(THREE, mount, locale, markSrc);
      })
      .catch(() => {
        /* the photo is already there; nothing to fall back to */
      });

    return () => {
      disposed = true;
      teardown?.();
    };
  }, [locale, markSrc]);

  return <div ref={host} className="engine-hero-pipe" aria-hidden="true" />;
}

/* ------------------------------------------------------------------ scene */

function build(
  THREE: typeof Three,
  mount: HTMLDivElement,
  locale: Locale,
  markSrc: string,
): () => void {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  const small = window.innerWidth < 1024;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.2 : 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0;
  mount.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(24, 1, 0.1, 100);

  /* A small studio, because black polyethylene has no colour of its own to
     show: what makes it read as a solid object is the strip highlights the
     shop lighting leaves down the barrel. */
  const pmrem = new THREE.PMREMGenerator(renderer);
  const studio = new THREE.Scene();
  const gc = document.createElement("canvas");
  gc.width = 8;
  gc.height = 256;
  const gx = gc.getContext("2d")!;
  const grad = gx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, "#5b6a81");
  grad.addColorStop(0.52, "#1d2839");
  grad.addColorStop(1, "#0a1019");
  gx.fillStyle = grad;
  gx.fillRect(0, 0, 8, 256);
  const gt = new THREE.CanvasTexture(gc);
  gt.colorSpace = THREE.SRGBColorSpace;
  studio.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(16, 32, 16),
      new THREE.MeshBasicMaterial({ map: gt, side: THREE.BackSide }),
    ),
  );
  const softbox = (w: number, h: number, x: number, y: number, z: number, c: Three.Color) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide }));
    m.position.set(x, y, z);
    m.lookAt(0, 0, 0);
    studio.add(m);
  };
  softbox(12, 2.8, -3, 7, 5, new THREE.Color(7.2, 7.2, 7)); // key strip overhead
  softbox(1.8, 11, 8, 1.5, -3, new THREE.Color(6.4, 8, 10.5)); // cool rim, back right
  softbox(1.2, 9, -8, 1, -3.5, new THREE.Color(5.2, 4.2, 3.2)); // warm rim, back left
  softbox(12, 1.2, 0, -3.4, 7, new THREE.Color(1.5, 1.6, 1.8)); // low fill
  const env = pmrem.fromScene(studio, 0.03);
  scene.environment = env.texture;

  const key = new THREE.DirectionalLight(0xfff4e8, 4.6);
  key.position.set(-3, 6, 5);
  const rim = new THREE.DirectionalLight(0x9dc8ff, 9);
  rim.position.set(5, 2, -4);
  const hemi = new THREE.HemisphereLight(0xc4d4e8, 0x070d18, 0.62);
  scene.add(key, rim, hemi);

  /* ------------------------------------------------------------ surfaces */
  const grain = pebble(THREE, renderer, 512, 24);
  grain.repeat.set(26, 14);

  const wall = new THREE.MeshStandardMaterial({
    color: BODY,
    roughness: 0.46,
    metalness: 0,
    roughnessMap: grain,
    bumpMap: grain,
    bumpScale: 0.0045,
  });
  const bore = new THREE.MeshStandardMaterial({ color: BORE, roughness: 0.62, metalness: 0, side: THREE.BackSide, envMapIntensity: 0.55 });
  const face = new THREE.MeshStandardMaterial({ color: CUT_FACE, roughness: 0.8, metalness: 0, side: THREE.DoubleSide, envMapIntensity: 0.5 });
  const stripeMat = new THREE.MeshStandardMaterial({ color: STRIPE_BLUE, roughness: 0.3, metalness: 0, envMapIntensity: 1.1 });
  const edge = new THREE.MeshStandardMaterial({ color: 0x8f96a2, roughness: 0.3, metalness: 0, envMapIntensity: 1.5 });

  const markCanvas = document.createElement("canvas");
  markCanvas.width = 2048;
  markCanvas.height = 1024;
  const markTex = new THREE.CanvasTexture(markCanvas);
  markTex.wrapS = markTex.wrapT = THREE.RepeatWrapping;
  markTex.colorSpace = THREE.SRGBColorSpace;
  markTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const markMat = new THREE.MeshStandardMaterial({ map: markTex, alphaTest: 0.08, roughness: 0.34, metalness: 0 });
  const logo = new Image();
  logo.onload = () => {
    drawMark(markCanvas, logo);
    markTex.needsUpdate = true;
  };
  logo.src = markSrc;

  /* -------------------------------------------------------------- the pipe */
  const L = 3.5;
  const SEG = small ? 96 : 180;
  const ARC = 0.124; // 7.1 degrees, measured off the factory's product render
  const STRIPES = 4;
  const r = 1 - WALL_FRACTION;

  const spin = new THREE.Group();
  /* The resting attitude. Laid flat along X the pipe is a side-on barrel with no
     end in view, and the bore is the whole point — so the pose swings it about a
     third of a turn away from the camera and tilts it, which is the three-quarter
     view the factory shoots its own product in. */
  const pose = new THREE.Group();
  const tube = new THREE.Group();
  const roller = new THREE.Group(); // the barrel turns about its own axis, as on the line
  tube.rotation.z = Math.PI / 2;
  pose.rotation.set(0.17, -0.52, 0);
  tube.add(roller);
  pose.add(tube);
  spin.add(pose);
  scene.add(spin);

  const geoms: Three.BufferGeometry[] = [];
  const add = (g: Three.BufferGeometry, m: Three.Material) => {
    geoms.push(g);
    const mesh = new THREE.Mesh(g, m);
    roller.add(mesh);
    return mesh;
  };
  add(new THREE.CylinderGeometry(1, 1, L, SEG, 1, true), wall);
  add(new THREE.CylinderGeometry(r, r, L, SEG, 1, true), bore);
  for (const s of [1, -1]) {
    const ring = add(new THREE.RingGeometry(r, 1, SEG, 1), face);
    ring.rotation.x = (Math.PI / 2) * s;
    ring.position.y = (s * L) / 2;
    const lip = add(new THREE.TorusGeometry(0.998, 0.006, 8, SEG), edge);
    lip.rotation.x = Math.PI / 2;
    lip.position.y = (s * L) / 2;
  }
  for (let i = 0; i < STRIPES; i++) {
    add(new THREE.CylinderGeometry(1.004, 1.004, L, 24, 1, true, (i * Math.PI * 2) / STRIPES - ARC / 2, ARC), stripeMat);
  }
  add(new THREE.CylinderGeometry(1.006, 1.006, L, SEG, 1, true), markMat);

  /* ------------------------------------------------------------- framing */
  const side = locale === "fa" ? -1 : 1; // the copy sits opposite the product
  const fit = () => {
    const w = mount.clientWidth;
    const h = mount.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const vf = (camera.fov * Math.PI) / 180;
    const hf = 2 * Math.atan(Math.tan(vf / 2) * camera.aspect);
    const portrait = w / h < 1;
    camera.position.set(0, 0.42, (2.1 / Math.sin(Math.min(vf, hf) / 2)) * (portrait ? 1.1 : 1.34));
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    if (portrait) {
      // the copy owns the top of the column, so the pipe sits under it, centred
      spin.position.x = 0;
      spin.position.y = -1.15;
    } else {
      spin.position.x = side * (w / h > 2.2 ? 1.85 : 1.35);
      spin.position.y = -0.32; // sits under the headline rather than through it
    }
  };
  fit();
  const ro = new ResizeObserver(fit);
  ro.observe(mount);

  /* ---------------------------------------------- turning it, and the idle */
  const cv = renderer.domElement;
  cv.style.touchAction = "pan-y";
  const qUser = new THREE.Quaternion();
  const qTmp = new THREE.Quaternion();
  const UP = new THREE.Vector3(0, 1, 0);
  const RIGHT = new THREE.Vector3();
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let lastT = 0;
  let wx = 0;
  let wy = 0;
  let roll = 0;
  let released = -99;

  const turn = (ay: number, ax: number) => {
    RIGHT.set(1, 0, 0).applyQuaternion(camera.quaternion);
    qUser.premultiply(qTmp.setFromAxisAngle(UP, ay));
    qUser.premultiply(qTmp.setFromAxisAngle(RIGHT, ax));
    qUser.normalize();
  };
  const onDown = (e: PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragging = true;
    wx = wy = 0;
    lastX = e.clientX;
    lastY = e.clientY;
    lastT = performance.now();
    mount.classList.add("is-held");
    try {
      cv.setPointerCapture(e.pointerId);
    } catch {
      /* capture is a convenience */
    }
  };
  const onMove = (e: PointerEvent) => {
    if (!dragging) return;
    const now = performance.now();
    const k = Math.max(0.016, (now - lastT) / 1000);
    const ay = ((e.clientX - lastX) / cv.clientWidth) * 4.2;
    const ax = ((e.clientY - lastY) / cv.clientHeight) * 4.2;
    turn(ay, ax);
    wy = ay / k;
    wx = ax / k;
    lastX = e.clientX;
    lastY = e.clientY;
    lastT = now;
  };
  const onUp = () => {
    if (dragging) released = performance.now() / 1000;
    dragging = false;
    mount.classList.remove("is-held");
  };
  cv.addEventListener("pointerdown", onDown);
  cv.addEventListener("pointermove", onMove);
  cv.addEventListener("pointerup", onUp);
  cv.addEventListener("pointercancel", onUp);
  cv.addEventListener("lostpointercapture", onUp);

  /* the camera drifts a little with the pointer, so the barrel has parallax */
  let px = 0;
  let py = 0;
  let tx = 0;
  let ty = 0;
  const hero = mount.closest(".engine-hero") as HTMLElement | null;
  const onHover = (e: PointerEvent) => {
    if (!hero) return;
    const b = hero.getBoundingClientRect();
    tx = (e.clientX - b.left) / b.width - 0.5;
    ty = (e.clientY - b.top) / b.height - 0.5;
  };
  const onLeave = () => {
    tx = 0;
    ty = 0;
  };
  hero?.addEventListener("pointermove", onHover);
  hero?.addEventListener("pointerleave", onLeave);

  /* it dims as the hero scrolls away rather than burning frames off-screen */
  let past = 0;
  const onScroll = () => {
    if (!hero) return;
    const b = hero.getBoundingClientRect();
    past = Math.min(1, Math.max(0, -b.top / Math.max(1, b.height)));
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  let running = true;
  const io = new IntersectionObserver((es) => {
    running = es[0]!.isIntersecting;
    if (running) loop();
  });
  io.observe(mount);
  const onVisible = () => {
    running = !document.hidden;
    if (running) loop();
  };
  document.addEventListener("visibilitychange", onVisible);

  const clock = new THREE.Clock();
  let t = 0;
  let raf = 0;
  let queued = false;
  let lit = false;
  let frames = 0;
  let elapsed = 0;
  let lite = false;

  const loop = () => {
    if (queued || !running) return;
    queued = true;
    raf = requestAnimationFrame(frame);
  };

  function frame() {
    queued = false;
    if (!running) return;
    const raw = clock.getDelta();
    const dt = Math.min(raw, 0.05);
    t += dt;

    if (!lite) {
      frames += 1;
      elapsed += raw;
      if (frames === 90) {
        if (elapsed / frames > 1 / 45) {
          lite = true;
          renderer.setPixelRatio(1);
          fit();
        }
        frames = 0;
        elapsed = 0;
      }
    }

    // the opening: exposure comes up and the pipe eases out of a slight turn
    const intro = Math.min(1, t / 1.5);
    const eased = 1 - Math.pow(1 - intro, 3);
    renderer.toneMappingExposure = (1.32 - past * 0.7) * eased;

    if (dragging) {
      // the hand is on it
    } else if (Math.abs(wx) + Math.abs(wy) > 0.001) {
      turn(wy * dt, wx * dt);
      const f = Math.exp(-dt * 2.1);
      wx *= f;
      wy *= f;
    } else if (t / 1 - released > 4) {
      // left alone, it returns upright and goes back to rolling on its axis
      qUser.slerp(qTmp.identity(), Math.min(1, dt * 0.8));
    }
    roll += (1 - past) * 0.16 * dt * (dragging ? 0 : 1);

    roller.rotation.y = roll;
    pose.rotation.z = (1 - eased) * 0.28;
    spin.quaternion.copy(qUser);

    px += (tx - px) * Math.min(1, dt * 3);
    py += (ty - py) * Math.min(1, dt * 3);
    camera.position.x = -px * 0.55;
    camera.position.y = 0.5 - py * 0.35;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    if (!lit) {
      lit = true;
      mount.classList.add("is-on");
      }
    loop();
  }
  loop();

  return () => {
    cancelAnimationFrame(raf);
    running = false;
    io.disconnect();
    ro.disconnect();
    removeEventListener("scroll", onScroll);
    document.removeEventListener("visibilitychange", onVisible);
    hero?.removeEventListener("pointermove", onHover);
    hero?.removeEventListener("pointerleave", onLeave);
    cv.removeEventListener("pointerdown", onDown);
    cv.removeEventListener("pointermove", onMove);
    cv.removeEventListener("pointerup", onUp);
    cv.removeEventListener("pointercancel", onUp);
    cv.removeEventListener("lostpointercapture", onUp);
    geoms.forEach((g) => g.dispose());
    [wall, bore, face, stripeMat, edge, markMat].forEach((m) => m.dispose());
    grain.dispose();
    markTex.dispose();
    gt.dispose();
    env.texture.dispose();
    pmrem.dispose();
    renderer.dispose();
    cv.remove();
  };
}

/* A seamless pebble grain: the stipple the moulded surface actually carries.
   Rounded bumps rather than pixel noise, or it reads as dirt on the black. */
function pebble(
  THREE: typeof Three,
  renderer: Three.WebGLRenderer,
  size: number,
  density: number,
): Three.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const x = c.getContext("2d")!;
  x.fillStyle = "#808080";
  x.fillRect(0, 0, size, size);

  const dot = document.createElement("canvas");
  dot.width = dot.height = 32;
  const dx = dot.getContext("2d")!;
  const dg = dx.createRadialGradient(16, 16, 0, 16, 16, 16);
  dg.addColorStop(0, "rgba(255,255,255,1)");
  dg.addColorStop(0.55, "rgba(255,255,255,.45)");
  dg.addColorStop(1, "rgba(255,255,255,0)");
  dx.fillStyle = dg;
  dx.fillRect(0, 0, 32, 32);

  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < (size * size) / density; i += 1) {
    const rad = 1.8 + rnd() * 2.2;
    const x0 = rnd() * size;
    const y0 = rnd() * size;
    x.globalAlpha = 0.16 + rnd() * 0.18;
    for (const ox of [0, -size, size]) {
      for (const oy of [0, -size, size]) {
        const X = x0 + ox;
        const Y = y0 + oy;
        if (X > -rad && X < size + rad && Y > -rad && Y < size + rad) {
          x.drawImage(dot, X - rad, Y - rad, rad * 2, rad * 2);
        }
      }
    }
  }
  x.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return tex;
}

/** The lockup and the grade, printed once down one side of the barrel. */
function drawMark(canvas: HTMLCanvasElement, logo: HTMLImageElement) {
  const mk = canvas.getContext("2d")!;
  mk.clearRect(0, 0, canvas.width, canvas.height);
  mk.save();
  mk.translate(890, canvas.height / 2); // about 20 degrees off a stripe, as on the real pipe
  mk.rotate(-Math.PI / 2); // the lettering runs along the pipe
  const lh = 210;
  const lw = (lh * logo.width) / logo.height;
  let x = -(lw + 42 + 265) / 2;
  mk.drawImage(logo, x, -lh / 2, lw, lh);
  x += lw + 17;
  mk.fillStyle = "rgba(214,220,230,.5)";
  mk.fillRect(x, -lh * 0.22, 4, lh * 0.44);
  x += 21;
  mk.fillStyle = "#E6EBF2";
  mk.font = '700 96px ui-sans-serif, system-ui, "Segoe UI", Arial, sans-serif';
  mk.textBaseline = "middle";
  mk.fillText("PE100", x, 4);
  mk.restore();
}
