import { writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const logo = path.resolve("public/media/demo/logo.png");
const publicDir = path.resolve("public");
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

function pngToIco(png, size = 48) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0);
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(22, 12);

  return Buffer.concat([header, entry, png]);
}

async function cutoutOnWhite(size) {
  const { data, info } = await sharp(logo).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] < 22 && data[i + 1] < 22 && data[i + 2] < 22) {
      data[i + 3] = 0;
    }
  }

  const trimmed = await sharp(data, { raw: info }).trim({ threshold: 8 }).png().toBuffer();
  const pad = Math.round(size * 0.1);
  const inner = Math.max(1, size - pad * 2);
  const mark = await sharp(trimmed)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: WHITE },
  })
    .composite([{ input: mark, gravity: "centre" }])
    .png()
    .toBuffer();
}

const png48 = await cutoutOnWhite(48);
const png96 = await cutoutOnWhite(96);
const png192 = await cutoutOnWhite(192);
const png256 = await cutoutOnWhite(256);
const png512 = await cutoutOnWhite(512);
const png180 = await cutoutOnWhite(180);

writeFileSync(path.join(publicDir, "icon-48.png"), png48);
writeFileSync(path.join(publicDir, "icon-96.png"), png96);
writeFileSync(path.join(publicDir, "icon-192.png"), png192);
writeFileSync(path.join(publicDir, "icon-512.png"), png512);
writeFileSync(path.join(publicDir, "apple-touch-icon.png"), png180);
writeFileSync(path.join(publicDir, "apple-touch-icon-precomposed.png"), png180);
writeFileSync(path.join(publicDir, "favicon.ico"), pngToIco(png48, 48));

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-label="Bukan Pipe">
  <title>Bukan Pipe</title>
  <rect width="256" height="256" fill="#ffffff"/>
  <image width="256" height="256" href="data:image/png;base64,${png256.toString("base64")}"/>
</svg>
`;
writeFileSync(path.join(publicDir, "favicon.svg"), svg);

console.log("Google SERP icons written: white tile + brand mark");
