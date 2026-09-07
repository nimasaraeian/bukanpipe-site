/**
 * Build homepage hero assets from the full pyramid pipe photograph.
 * Desktop: full 16:9 frame (contain in CSS).
 * Mobile: portrait crop anchored on the pipe stack (cover in CSS).
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SOURCE = process.argv[2];
if (!SOURCE) {
  console.error("Usage: node scripts/build-home-hero-pyramid.mjs <source-image>");
  process.exit(1);
}

const OUT_DIR = path.join("public", "media", "brand");
await mkdir(OUT_DIR, { recursive: true });

const meta = await sharp(SOURCE).metadata();
console.log("Source:", meta.width, "x", meta.height, meta.format);

const DESKTOP_WIDTH = 2560;
const MOBILE_OUT = { width: 1440, height: 1920 };

async function writeVariant(name, pipeline) {
  const out = path.join(OUT_DIR, name);
  await pipeline.jpeg({ quality: 94, mozjpeg: true }).toFile(out);
  const info = await sharp(out).metadata();
  console.log("Wrote", name, info.width, "x", info.height);
}

const base = sharp(SOURCE).rotate();
const scaledBuffer = await base.clone().resize({ width: DESKTOP_WIDTH, withoutEnlargement: false }).toBuffer();
const scaledMeta = await sharp(scaledBuffer).metadata();
const sw = scaledMeta.width;
const sh = scaledMeta.height;

await writeVariant("home-hero-pyramid-source.jpg", base.clone());
await writeVariant("home-hero-pyramid-en.jpg", sharp(scaledBuffer));
await writeVariant("home-hero-pyramid-fa.jpg", sharp(scaledBuffer).flop());

/** FA mobile crop — canonical portrait framing (pipes on the left). */
function buildFaMobileCrop() {
  const cropW = Math.round(sw * 0.58);
  const cropH = Math.round(sh * 0.92);
  const cropY = Math.round(sh * 0.04);
  const cropX = sw - cropW;

  return sharp(scaledBuffer)
    .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
    .resize({
      width: MOBILE_OUT.width,
      height: MOBILE_OUT.height,
      fit: "cover",
      position: "right",
    })
    .flop();
}

const faMobileBuffer = await buildFaMobileCrop().toBuffer();
await writeVariant("home-hero-pyramid-mobile-fa.jpg", sharp(faMobileBuffer));
/** EN mobile is an exact horizontal mirror of the approved FA crop. */
await writeVariant("home-hero-pyramid-mobile-en.jpg", sharp(faMobileBuffer).flop());

console.log("Done.");
