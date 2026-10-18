import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const pages = JSON.parse(await readFile(path.join(root, "data/social/pages.json"), "utf8"));
const fontfile = path.join(root, "public/fonts/vazirmatn-variable.8addd9db.woff2");
const escape = text => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
async function textLayer(text, size, color, width, align = "left") {
  return sharp({ text: { text: `<span foreground="${color}">${escape(text)}</span>`, font: `Vazirmatn Bold ${size}`, fontfile, width, align, rgba: true, spacing: 10 } }).png().toBuffer({ resolveWithObject: true });
}
const brand = await textLayer("BUKAN PIPE", 28, "#67d9ef", 510);
const domain = await textLayer("bukanpipe.com", 22, "#b4c8d5", 510);
const photos = new Map();
for (const page of pages) {
  const photoKey = `${page.photo}:${page.contain}`;
  let photo = photos.get(photoKey);
  if (!photo) {
    photo = await sharp(path.join(root, "public", page.photo)).rotate().resize(580, 630, { fit: page.contain ? "contain" : "cover", background: "#e8edf0", position: "attention" }).toBuffer();
    photos.set(photoKey, photo);
  }
  let title = await textLayer((page.locale === "fa" ? "\u200f" : "") + page.title, 46, "#ffffff", 510, page.locale === "fa" ? "right" : "left");
  if (title.info.height > 310) title = await sharp(title.data).resize({ width: 510, height: 310, fit: "inside" }).png().toBuffer({ resolveWithObject: true });
  const destination = path.join(root, "public", page.image);
  await mkdir(path.dirname(destination), { recursive: true });
  await sharp({create:{width:1200,height:630,channels:3,background:"#081723"}}).composite([
    { input:photo,left:620,top:0 },
    { input:Buffer.from('<svg width="1200" height="630"><rect x="608" width="12" height="630" fill="#45bed7"/><rect x="44" y="126" width="72" height="4" fill="#45bed7"/></svg>'),left:0,top:0 },
    {input:brand.data,left:44,top:64},
    {input:title.data,left:page.locale === "fa" ? 554-title.info.width : 44,top:188},
    {input:domain.data,left:44,top:554},
  ]).jpeg({quality:86,mozjpeg:true}).toFile(destination);
}
console.log(`Generated ${pages.length} page-specific social images (1200x630 JPEG)`);
