import { writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const logo = path.resolve("public/media/brand/bukan-pipe-google-favicon-source.png");
const publicDir = path.resolve("public");
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };
/**
 * The tile is white and the monogram is the logo's own blue (#0015BF, sampled
 * from the original artwork). The earlier tiles were a white monogram on
 * #707070 gray, which at the 16px Google paints in a result row washed out to
 * a featureless blob: white-on-gray holds almost no contrast once the mark is
 * that small, and the brand color was gone. Blue-on-white keeps the mark's
 * silhouette readable on both the light and the dark result row, and matches
 * the icon Google already shows for the old bukanpipe.ir entry.
 */
const TILE = { r: 255, g: 255, b: 255, alpha: 1 };
const BRAND_BLUE = { r: 0, g: 21, b: 191 };
const PAD_RATIO = 0.05;
/**
 * The source artwork is the full lockup: the arch monogram stacked over the
 * "BUKAN" wordmark, separated by an empty band at y 965..1026. Google renders
 * the favicon at 16px, where that wordmark collapses into an illegible smear
 * and drags the monogram down with it, so every tile below is built from the
 * monogram alone.
 */
const MONOGRAM_HEIGHT = 966;

function pngsToIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  const payloads = [];
  let offset = 6 + images.length * 16;

  for (const { size, png } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    payloads.push(png);
    offset += png.length;
  }

  return Buffer.concat([header, ...entries, ...payloads]);
}

/** Repaint the white source artwork in the brand blue, keeping its alpha. */
async function recolour(png) {
  const mark = sharp(png);
  const { width, height } = await mark.metadata();
  const alpha = await mark.clone().extractChannel("alpha").raw().toBuffer();

  return sharp({
    create: { width, height, channels: 3, background: BRAND_BLUE },
  })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();
}

async function brandMonogram() {
  // The original PNG already has an alpha channel. Preserve it, drop the
  // wordmark band, then trim so the monogram fills its own bounding box.
  const { width, height } = await sharp(logo).metadata();
  const cropped = await sharp(logo)
    .ensureAlpha()
    .extract({ left: 0, top: 0, width, height: Math.min(MONOGRAM_HEIGHT, height) })
    .png()
    .toBuffer();

  const trimmed = await sharp(cropped).trim({ threshold: 10 }).png().toBuffer();
  return recolour(trimmed);
}

async function squareIcon(source, size) {
  const inner = Math.max(1, Math.round(size * (1 - PAD_RATIO * 2)));
  const mark = await sharp(source)
    .resize(inner, inner, { fit: "contain", background: TRANSPARENT })
    .png()
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: TILE },
  })
    .composite([{ input: mark, gravity: "centre" }])
    .png()
    .toBuffer();
}

const source = await brandMonogram();
const png16 = await squareIcon(source, 16);
const png32 = await squareIcon(source, 32);
const png48 = await squareIcon(source, 48);
const png96 = await squareIcon(source, 96);
const png180 = await squareIcon(source, 180);
const png192 = await squareIcon(source, 192);
const png256 = await squareIcon(source, 256);
const png512 = await squareIcon(source, 512);

writeFileSync(path.join(publicDir, "bukan-pipe-icon.png"), png96);
writeFileSync(path.join(publicDir, "icon-48.png"), png48);
writeFileSync(path.join(publicDir, "icon-96.png"), png96);
writeFileSync(path.join(publicDir, "icon-192.png"), png192);
writeFileSync(path.join(publicDir, "icon-512.png"), png512);
writeFileSync(path.join(publicDir, "apple-touch-icon.png"), png180);
writeFileSync(path.join(publicDir, "apple-touch-icon-precomposed.png"), png180);
writeFileSync(
  path.join(publicDir, "favicon.ico"),
  pngsToIco([
    { size: 16, png: png16 },
    { size: 32, png: png32 },
    { size: 48, png: png48 },
  ]),
);

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="Bukan Pipe">
  <title>Bukan Pipe</title>
  <image width="256" height="256" href="data:image/png;base64,${png256.toString("base64")}"/>
</svg>
`;
writeFileSync(path.join(publicDir, "favicon.svg"), svg);

console.log("Official Bukan monogram icons written in brand blue #0015BF on a white tile");
