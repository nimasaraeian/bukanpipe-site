import { writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const logo = path.resolve("public/media/brand/bukan-pipe-google-favicon-source.png");
const publicDir = path.resolve("public");
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };
/** Medium neutral gray requested for the official white logo. */
const CHARCOAL = { r: 112, g: 112, b: 112, alpha: 1 };
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

async function whiteMonogram() {
  // The original PNG already has an alpha channel. Preserve it, drop the
  // wordmark band, then trim so the monogram fills its own bounding box.
  const { width, height } = await sharp(logo).metadata();
  const cropped = await sharp(logo)
    .ensureAlpha()
    .extract({ left: 0, top: 0, width, height: Math.min(MONOGRAM_HEIGHT, height) })
    .png()
    .toBuffer();

  return sharp(cropped).trim({ threshold: 10 }).png().toBuffer();
}

async function squareIcon(source, size) {
  const inner = Math.max(1, Math.round(size * (1 - PAD_RATIO * 2)));
  const mark = await sharp(source)
    .resize(inner, inner, { fit: "contain", background: TRANSPARENT })
    .png()
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: CHARCOAL },
  })
    .composite([{ input: mark, gravity: "centre" }])
    .png()
    .toBuffer();
}

const source = await whiteMonogram();
const png16 = await squareIcon(source, 16);
const png32 = await squareIcon(source, 32);
const png48 = await squareIcon(source, 48);
const png96 = await squareIcon(source, 96);
const png180 = await squareIcon(source, 180);
const png192 = await squareIcon(source, 192);
const png256 = await squareIcon(source, 256);
const png512 = await squareIcon(source, 512);

writeFileSync(path.join(publicDir, "bukan-pipe-icon-gray.png"), png96);
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

console.log("Official Bukan monogram icons written on medium gray #707070");
