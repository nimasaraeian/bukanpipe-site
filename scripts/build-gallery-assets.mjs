/**
 * Non-destructive gallery asset pipeline.
 * Sources: image/ (local, gitignored). Outputs: public/media/gallery/
 * Generates data/gallery/gallery-manifest.json for the app + SEO docs.
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";

const ROOT = path.resolve(".");
const SOURCE_DIR = path.join(ROOT, "image");
const OUTPUT_DIR = path.join(ROOT, "public", "media", "gallery");
const MANIFEST_PATH = path.join(ROOT, "data", "gallery", "gallery-manifest.json");
const SEO_MAP_PATH = path.join(ROOT, "docs", "seo", "GALLERY_IMAGE_SEO_MAP.md");

const WIDTHS = [640, 960, 1280, 1920, 2560];

const SKIP_PATTERN =
  /ChatGPT|آرم|about-factory-gate|Copy \(2\) of|\.(dng|tif)$/i;

const EXCLUDE_BASENAMES = new Set([
  "photo_۲۰۲۳-۰۵-۰۴_۱۱-۱۶-۲۴.jpg",
  "photo_۲۰۲۳-۰۵-۰۴_۱۱-۱۶-۲۷.jpg",
]);

/** @typedef {'aerial' | 'production' | 'laboratory' | 'products' | 'warehouse' | 'logistics' | 'facility'} GalleryCategory */

/** @type {Record<GalleryCategory, string>} */
const CATEGORY_SLUG = {
  aerial: "bukan-pipe-hdpe-factory-aerial",
  production: "bukan-pipe-hdpe-pipe-production",
  laboratory: "bukan-pipe-quality-control-laboratory",
  products: "bukan-pipe-hdpe-pipe-products",
  warehouse: "bukan-pipe-hdpe-pipe-warehouse",
  logistics: "bukan-pipe-pipe-loading-logistics",
  facility: "bukan-pipe-production-facility",
};

/** @type {Record<GalleryCategory, { fa: string; en: string }>} */
const CATEGORY_LABELS = {
  aerial: { fa: "نمای هوایی و محوطه کارخانه", en: "Factory & Aerial Views" },
  production: { fa: "خطوط تولید", en: "Production" },
  laboratory: { fa: "آزمایشگاه و کنترل کیفیت", en: "Laboratory & Quality Control" },
  products: { fa: "محصولات", en: "Products" },
  warehouse: { fa: "انبار", en: "Warehouse" },
  logistics: { fa: "بارگیری و لجستیک", en: "Logistics" },
  facility: { fa: "زیرساخت و محیط کارخانه", en: "Facility & Infrastructure" },
};

/** Lab / QC filename hints in warehouse folders */
const LAB_HINT = /aaa052(11|12|16|59|64|89|93|96)|aaa053(11|17|28)|aaa054(38|39|40|41|42|43|44|45|46|47|48|49)/i;
const LOGISTICS_HINT = /aaa055(0[89]|1[0-9]|2[0-9]|3[0-6])|dji_0599|dji_0582|dji_0560|loading|truck|bar/i;
const WAREHOUSE_HINT = /aaa052(5[5-9]|6[0-9])|aaa053(00|22|25)|^2\.jpg$|^3\.jpg$|warehouse|انبار/i;

/**
 * @param {string} relPath
 * @param {string} basename
 * @returns {GalleryCategory}
 */
function classifyCategory(relPath, basename) {
  const lower = relPath.toLowerCase();
  const base = basename.toLowerCase();

  if (/^dji_/.test(base)) {
    if (/0599|0582|0560/.test(base) && /4-/.test(lower)) return "logistics";
    if (/محصولات|products/.test(lower) && /0580|0617|0554|0621/.test(base)) return "products";
    return "aerial";
  }

  if (/^3-تولید/.test(lower)) {
    if (/^1\.jpg$|^6\.jpg$/.test(base)) return "facility";
    return "production";
  }

  if (/^2-محصولات|^3-محصولات/.test(lower)) return "products";

  if (/^4-/.test(lower) || /انبار|آزمایش|محوطه/.test(lower)) {
    if (LAB_HINT.test(base)) return "laboratory";
    if (LOGISTICS_HINT.test(base)) return "logistics";
    if (WAREHOUSE_HINT.test(base)) return "warehouse";
    if (/^dji_/.test(base)) return "aerial";
    if (/^3\.jpg$|^2\.jpg$/.test(base)) return "warehouse";
    return "facility";
  }

  if (/^aaa052(11|12|16)/i.test(base)) return "laboratory";
  if (/^aaa055/i.test(base)) return "logistics";
  if (/^dsc_0191|^dsc_0160/i.test(base)) return "products";
  if (/^dji_/i.test(base)) return "aerial";
  if (/^aaa05/i.test(base)) return "production";
  if (/^img_/i.test(base)) return "facility";

  return "facility";
}

/** @param {unknown[]} pool @param {number} index */
function pick(pool, index) {
  return pool[(index - 1) % pool.length];
}

/** @type {Record<GalleryCategory, { titlesFa: string[]; titlesEn: string[]; altsFa: string[]; altsEn: string[]; captionsFa: string[]; captionsEn: string[] }>} */
const COPY_POOLS = {
  aerial: {
    titlesFa: [
      "نمای هوایی کارخانه بوکان پایپ",
      "محوطه مجموعه تولیدی از بالا",
      "سوله‌ها و محوطه کارخانه از نمای هوایی",
    ],
    titlesEn: [
      "Bukan Pipe factory aerial view",
      "Manufacturing site from above",
      "Factory buildings and grounds — aerial",
    ],
    altsFa: [
      "نمای هوایی مجموعه تولیدی بوکان پایپ و سوله‌های کارخانه",
      "نمای هوایی محوطه کارخانه تولید لوله پلی اتیلن بوکان پایپ",
      "نمای بالا از سوله‌ها و فضای تولیدی بوکان پایپ",
    ],
    altsEn: [
      "Aerial view of the Bukan Pipe manufacturing facility and factory buildings",
      "Aerial view of the HDPE pipe factory site at Bukan Pipe",
      "Overhead view of production halls at Bukan Pipe",
    ],
    captionsFa: ["نمایی از مجموعه تولیدی و محوطه کارخانه.", "محوطه کارخانه از نمای هوایی."],
    captionsEn: ["A view of the manufacturing site and factory grounds.", "The factory site from above."],
  },
  production: {
    titlesFa: [
      "خط تولید لوله پلی اتیلن",
      "محیط تولید در کارخانه بوکان پایپ",
      "بخشی از خط اکستروژن لوله",
      "فضای تولید لوله پلی اتیلن",
      "محیط ساخت لوله در کارخانه",
    ],
    titlesEn: [
      "HDPE pipe production line",
      "Manufacturing environment at Bukan Pipe",
      "Extrusion production area",
      "Polyethylene pipe production floor",
      "Pipe manufacturing workspace",
    ],
    altsFa: [
      "بخشی از خط تولید لوله پلی اتیلن در کارخانه بوکان پایپ",
      "محیط خط تولید لوله پلی اتیلن در کارخانه بوکان پایپ",
      "فضای تولید لوله پلی اتیلن در مجموعه بوکان پایپ",
      "نمایی از خط تولید در کارخانه لوله پلی اتیلن بوکان پایپ",
      "محیط ساخت لوله پلی اتیلن در کارخانه بوکان پایپ",
    ],
    altsEn: [
      "HDPE pipe production area inside the Bukan Pipe factory",
      "Polyethylene pipe production environment at Bukan Pipe",
      "Extrusion line area at the Bukan Pipe manufacturing facility",
      "View of pipe production at Bukan Pipe factory",
      "Manufacturing workspace for HDPE pipes at Bukan Pipe",
    ],
    captionsFa: ["محیط تولید لوله پلی اتیلن.", "بخشی از خط تولید در کارخانه."],
    captionsEn: ["Polyethylene pipe manufacturing environment.", "Part of the production line at the factory."],
  },
  laboratory: {
    titlesFa: [
      "آزمایشگاه کنترل کیفیت",
      "فضای آزمایشگاه لوله پلی اتیلن",
      "کنترل کیفیت در کارخانه بوکان پایپ",
      "آزمایش و بازرسی کیفیت",
    ],
    titlesEn: [
      "Quality control laboratory",
      "Pipe testing laboratory space",
      "Quality control at Bukan Pipe",
      "Laboratory inspection area",
    ],
    altsFa: [
      "تجهیزات آزمایشگاه کنترل کیفیت لوله پلی اتیلن بوکان پایپ",
      "فضای آزمایشگاه کنترل کیفیت در کارخانه بوکان پایپ",
      "آزمایشگاه و بازرسی کیفیت لوله پلی اتیلن بوکان پایپ",
      "محیط آزمایش و کنترل کیفیت در بوکان پایپ",
    ],
    altsEn: [
      "Quality control laboratory equipment at Bukan Pipe",
      "Laboratory space for HDPE pipe quality control at Bukan Pipe",
      "Quality inspection area at Bukan Pipe factory",
      "Laboratory and quality control environment at Bukan Pipe",
    ],
    captionsFa: ["آزمایشگاه و کنترل کیفیت.", "فضای آزمایش در کارخانه."],
    captionsEn: ["Laboratory and quality control.", "Testing space at the factory."],
  },
  products: {
    titlesFa: [
      "لوله‌های پلی‌اتیلن تولیدی در محوطه کارخانه",
      "کلاف لوله پلی‌اتیلن آماده نگهداری",
      "محصولات پلی‌اتیلن در محوطه تولید بوکان پایپ",
      "لوله‌های پلی‌اتیلن کلافی در کارخانه",
      "نگهداری لوله‌های تولیدی در محوطه",
      "لوله‌های پلی‌اتیلن در فضای باز کارخانه",
      "بخشی از تولید لوله‌های پلی‌اتیلن",
      "لوله‌های آماده در محوطه کارخانه",
      "محصولات لوله پلی اتیلن بوکان پایپ",
      "کلاف‌های لوله در محوطه تولید",
    ],
    titlesEn: [
      "HDPE pipes at the factory site",
      "Polyethylene pipe coils ready for storage",
      "Manufactured PE pipes in the production yard",
      "Coiled HDPE pipes at the factory",
      "Finished pipes stored on site",
      "HDPE pipe products in the open yard",
      "Part of the pipe production output",
      "Pipes staged at the manufacturing facility",
      "Bukan Pipe polyethylene pipe products",
      "Pipe coils in the production area",
    ],
    altsFa: [
      "لوله‌های پلی اتیلن تولید بوکان پایپ در محوطه کارخانه",
      "کلاف لوله پلی اتیلن آماده نگهداری در کارخانه بوکان پایپ",
      "لوله‌های پلی اتیلن در محوطه تولید بوکان پایپ",
      "محصولات لوله پلی اتیلن کلافی در کارخانه بوکان پایپ",
      "لوله‌های پلی اتیلن تولیدی در فضای باز کارخانه",
      "نگهداری لوله‌های پلی اتیلن در محوطه کارخانه بوکان پایپ",
      "بخشی از لوله‌های پلی اتیلن تولیدی بوکان پایپ",
      "لوله‌های آماده در محوطه مجموعه تولیدی بوکان پایپ",
      "محصولات لوله پلی اتیلن در کارخانه بوکان پایپ",
      "کلاف لوله پلی اتیلن در محوطه تولید",
    ],
    altsEn: [
      "HDPE pipes manufactured by Bukan Pipe at the factory site",
      "Coiled polyethylene pipes ready for storage at Bukan Pipe",
      "Manufactured PE pipes in the Bukan Pipe production yard",
      "Coiled HDPE pipe products at the Bukan Pipe factory",
      "Finished HDPE pipes stored on site at Bukan Pipe",
      "Polyethylene pipe products in the open yard at Bukan Pipe",
      "Part of the HDPE pipe production output at Bukan Pipe",
      "Pipes staged at the Bukan Pipe manufacturing facility",
      "Bukan Pipe polyethylene pipe products at the factory",
      "HDPE pipe coils in the production area at Bukan Pipe",
    ],
    captionsFa: ["لوله‌های تولیدی در محوطه کارخانه.", "محصولات پلی‌اتیلن بوکان پایپ."],
    captionsEn: ["Manufactured pipes at the factory site.", "Bukan Pipe polyethylene products."],
  },
  warehouse: {
    titlesFa: [
      "انبار لوله پلی اتیلن",
      "نگهداری لوله‌ها در انبار کارخانه",
      "لوله‌های پلی اتیلن در فضای انبار",
      "انبار محصولات در کارخانه",
    ],
    titlesEn: [
      "HDPE pipe warehouse",
      "Pipe storage at the factory",
      "Polyethylene pipes in warehouse space",
      "Product storage area",
    ],
    altsFa: [
      "لوله‌های پلی اتیلن آماده نگهداری در محوطه کارخانه بوکان پایپ",
      "انبار و نگهداری لوله‌های پلی اتیلن در کارخانه بوکان پایپ",
      "لوله‌های پلی اتیلن در فضای انبار کارخانه",
      "نگهداری محصولات لوله در انبار بوکان پایپ",
    ],
    altsEn: [
      "HDPE pipes stored at the Bukan Pipe factory warehouse area",
      "Warehouse storage of polyethylene pipes at Bukan Pipe",
      "HDPE pipes in the factory warehouse space",
      "Pipe product storage at Bukan Pipe",
    ],
    captionsFa: ["انبار و نگهداری لوله‌ها.", "فضای انبار در کارخانه."],
    captionsEn: ["Warehouse storage of pipes.", "Storage space at the factory."],
  },
  logistics: {
    titlesFa: [
      "بارگیری و ارسال لوله",
      "آماده‌سازی بار برای ارسال",
      "لجستیک و بارگیری در کارخانه",
      "فرآیند بارگیری محصولات",
    ],
    titlesEn: [
      "Pipe loading and dispatch",
      "Order preparation for shipment",
      "Logistics and loading at the factory",
      "Product loading process",
    ],
    altsFa: [
      "فرآیند بارگیری لوله پلی اتیلن برای ارسال از کارخانه بوکان پایپ",
      "آماده‌سازی بارگیری لوله در کارخانه بوکان پایپ",
      "بارگیری و ارسال لوله پلی اتیلن از کارخانه",
      "لجستیک بارگیری محصولات در بوکان پایپ",
    ],
    altsEn: [
      "HDPE pipe loading for dispatch from Bukan Pipe factory",
      "Pipe loading preparation at Bukan Pipe",
      "Loading polyethylene pipes for shipment from the factory",
      "Logistics and pipe loading at Bukan Pipe",
    ],
    captionsFa: ["بارگیری و آماده‌سازی ارسال.", "لجستیک در کارخانه."],
    captionsEn: ["Loading and dispatch preparation.", "Logistics at the factory."],
  },
  facility: {
    titlesFa: [
      "محوطه کارخانه بوکان پایپ",
      "فضای تولیدی و زیرساخت کارخانه",
      "محیط کارخانه تولید لوله",
      "زیرساخت مجموعه تولیدی",
    ],
    titlesEn: [
      "Bukan Pipe factory grounds",
      "Manufacturing facility infrastructure",
      "Factory environment at Bukan Pipe",
      "Production site infrastructure",
    ],
    altsFa: [
      "محوطه و فضای تولیدی کارخانه لوله پلی اتیلن بوکان پایپ",
      "زیرساخت و محوطه کارخانه بوکان پایپ",
      "محیط کارخانه تولید لوله پلی اتیلن",
      "فضای مجموعه تولیدی بوکان پایپ",
    ],
    altsEn: [
      "Manufacturing facility grounds at Bukan Pipe HDPE pipe factory",
      "Factory infrastructure and grounds at Bukan Pipe",
      "Factory environment at the Bukan Pipe pipe manufacturing site",
      "Production facility grounds at Bukan Pipe",
    ],
    captionsFa: ["محوطه و زیرساخت کارخانه.", "فضای مجموعه تولیدی."],
    captionsEn: ["Factory grounds and infrastructure.", "The manufacturing site."],
  },
};

/**
 * @param {GalleryCategory} category
 * @param {number} index
 */
function buildCopy(category, index, _aspectRatio, needsReview) {
  const pool = COPY_POOLS[category];
  return {
    titleFa: pick(pool.titlesFa, index),
    titleEn: pick(pool.titlesEn, index),
    altFa: pick(pool.altsFa, index),
    altEn: pick(pool.altsEn, index),
    captionFa: pick(pool.captionsFa, index),
    captionEn: pick(pool.captionsEn, index),
    needsReview: needsReview || false,
  };
}

/** @param {string[]} paths */
function chooseCanonicalPath(paths) {
  const inSubdirs = paths.filter((p) => p.includes("/") || p.includes("\\"));
  if (inSubdirs.length === 0) return paths[0];

  const scored = inSubdirs.map((p) => {
    let score = 0;
    if (p.includes("4-2انبار")) score += 10;
    if (p.startsWith("3-تولید")) score -= 5;
    if (p.startsWith("4-انبار")) score -= 8;
    score += p.length / 100;
    return { p, score };
  });
  scored.sort((a, b) => a.score - b.score);
  return scored[0].p;
}

async function walkSources(dir, rel = "") {
  /** @type {string[]} */
  const files = [];
  for (const entry of await import("node:fs/promises").then((m) => m.readdir(dir, { withFileTypes: true }))) {
    const abs = path.join(dir, entry.name);
    const relPath = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      files.push(...(await walkSources(abs, relPath)));
    } else if (/\.(jpe?g|png)$/i.test(entry.name) && !SKIP_PATTERN.test(relPath) && !EXCLUDE_BASENAMES.has(entry.name)) {
      files.push(relPath.replace(/\\/g, "/"));
    }
  }
  return files;
}

async function resizeToWebp(sourceAbs, maxWidth) {
  const meta = await sharp(sourceAbs).rotate().metadata();
  const srcW = meta.width ?? maxWidth;
  const targetW = Math.min(maxWidth, srcW);
  let pipeline = sharp(sourceAbs).rotate().toColorspace("srgb");
  if (targetW < srcW) {
    pipeline = pipeline.resize({ width: targetW, withoutEnlargement: true });
  }
  return pipeline.webp({ quality: 82, effort: 4 }).toBuffer();
}

async function processImage(sourceRel, category, index, slug) {
  const sourceAbs = path.join(SOURCE_DIR, sourceRel);
  const outDir = path.join(OUTPUT_DIR, slug);
  await mkdir(outDir, { recursive: true });

  const pipeline = sharp(sourceAbs).rotate().toColorspace("srgb");
  const meta = await pipeline.metadata();
  const srcW = meta.width ?? 0;
  const srcH = meta.height ?? 0;
  const aspectRatio = srcH > 0 ? srcW / srcH : 1;

  /** @type {Record<string, { path: string; width: number; height: number; bytes: number }>} */
  const variants = {};

  const applicableWidths = WIDTHS.filter((w) => w <= srcW || w === WIDTHS.find((x) => x >= srcW) || w === 640);
  const uniqueWidths = [...new Set([640, 1280, Math.min(2560, srcW || 2560), ...applicableWidths])]
    .filter((w) => w <= (srcW || w))
    .sort((a, b) => a - b);

  for (const w of uniqueWidths) {
    const label = w <= 640 ? "thumb" : w <= 1280 ? "card" : w <= 1920 ? "large" : "full";
    const key = w <= 640 ? "thumb" : w <= 1280 ? "card" : "full";
    if (variants[key] && key !== "full") continue;

    const outName = `${slug}-${label}.webp`;
    const outPath = path.join(outDir, outName);
    const buf = await resizeToWebp(sourceAbs, w);
    await writeFile(outPath, buf);
    const info = await sharp(buf).metadata();
    variants[key] = {
      path: `/media/gallery/${slug}/${outName}`,
      width: info.width ?? w,
      height: info.height ?? Math.round(w / aspectRatio),
      bytes: buf.length,
    };
  }

  // Ensure thumb + card + full exist
  if (!variants.thumb) {
    const outName = `${slug}-thumb.webp`;
    const outPath = path.join(outDir, outName);
    const buf = await resizeToWebp(sourceAbs, 640);
    await writeFile(outPath, buf);
    const info = await sharp(buf).metadata();
    variants.thumb = {
      path: `/media/gallery/${slug}/${outName}`,
      width: info.width ?? 640,
      height: info.height ?? Math.round(640 / aspectRatio),
      bytes: buf.length,
    };
  }
  if (!variants.card) {
    const cardW = Math.min(1280, srcW || 1280);
    const outName = `${slug}-card.webp`;
    const outPath = path.join(outDir, outName);
    const buf = await resizeToWebp(sourceAbs, cardW);
    await writeFile(outPath, buf);
    const info = await sharp(buf).metadata();
    variants.card = {
      path: `/media/gallery/${slug}/${outName}`,
      width: info.width ?? cardW,
      height: info.height ?? Math.round(cardW / aspectRatio),
      bytes: buf.length,
    };
  }
  if (!variants.full) {
    const fullW = Math.min(2560, srcW || 2560);
    const outName = `${slug}-full.webp`;
    const outPath = path.join(outDir, outName);
    const buf = await resizeToWebp(sourceAbs, fullW);
    await writeFile(outPath, buf);
    const info = await sharp(buf).metadata();
    variants.full = {
      path: `/media/gallery/${slug}/${outName}`,
      width: info.width ?? fullW,
      height: info.height ?? Math.round(fullW / aspectRatio),
      bytes: buf.length,
    };
  }

  return {
    sourceFile: sourceRel,
    slug,
    category,
    index,
    width: srcW,
    height: srcH,
    aspectRatio: Math.round(aspectRatio * 1000) / 1000,
    orientation: aspectRatio > 1.15 ? "landscape" : aspectRatio < 0.85 ? "portrait" : "square",
    variants,
    src: variants.card.path,
    thumbnailSrc: variants.thumb.path,
    fullSrc: variants.full.path,
  };
}

async function buildHeroAndOg(heroSource) {
  const heroSlug = "bukan-pipe-hdpe-factory-aerial-hero";
  const heroDir = path.join(OUTPUT_DIR, heroSlug);
  await mkdir(heroDir, { recursive: true });

  const sourceAbs = path.join(SOURCE_DIR, heroSource);
  const heroOut = path.join(heroDir, `${heroSlug}-card.webp`);
  const heroBuf = await sharp(sourceAbs)
    .rotate()
    .toColorspace("srgb")
    .resize({ width: 2560, withoutEnlargement: true })
    .webp({ quality: 85, effort: 4 })
    .toBuffer();
  await writeFile(heroOut, heroBuf);
  const heroMeta = await sharp(heroBuf).metadata();

  const ogOut = path.join(OUTPUT_DIR, "bukan-pipe-gallery-og.webp");
  const ogBuf = await sharp(sourceAbs)
    .rotate()
    .toColorspace("srgb")
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .webp({ quality: 85, effort: 4 })
    .toBuffer();
  await writeFile(ogOut, ogBuf);
  const ogMeta = await sharp(ogBuf).metadata();

  return {
    hero: {
      src: `/media/gallery/${heroSlug}/${heroSlug}-card.webp`,
      width: heroMeta.width ?? 2560,
      height: heroMeta.height ?? 1440,
      sourceFile: heroSource,
    },
    og: {
      src: "/media/gallery/bukan-pipe-gallery-og.webp",
      width: ogMeta.width ?? 1200,
      height: ogMeta.height ?? 630,
    },
  };
}

function pickFeatured(images) {
  const byCat = /** @type {Record<GalleryCategory, typeof images>} */ ({});
  for (const img of images) {
    if (!byCat[img.category]) byCat[img.category] = [];
    byCat[img.category].push(img);
  }

  /** @type {string[]} */
  const featuredIds = [];
  const pick = (cat, n = 1) => {
    const pool = byCat[cat] ?? [];
    for (const img of pool.slice(0, n)) featuredIds.push(img.id);
  };

  pick("aerial", 1);
  pick("production", 2);
  pick("laboratory", 1);
  pick("products", 1);
  pick("warehouse", 1);
  pick("logistics", 1);
  pick("facility", 1);

  return new Set(featuredIds);
}

async function writeSeoMap(images, stats) {
  await mkdir(path.dirname(SEO_MAP_PATH), { recursive: true });
  const lines = [
    "# Gallery Image SEO Map",
    "",
    "Source of truth for published factory gallery photographs.",
    "",
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    "",
    "## Summary",
    "",
    `- Discovered source files: ${stats.discovered}`,
    `- Published: ${stats.published}`,
    `- Excluded: ${stats.excluded}`,
    `- Categories: ${stats.categories.join(", ")}`,
    "",
    "## Images",
    "",
    "| Source | Public slug | Category | Featured | Sitemap | FA title | EN title | FA alt | EN alt | Production URL |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
  ];

  for (const img of images) {
    lines.push(
      `| ${img.sourceFile} | ${img.slug} | ${img.category} | ${img.featured ? "yes" : "no"} | yes | ${img.titleFa.replace(/\|/g, "/")} | ${img.titleEn.replace(/\|/g, "/")} | ${img.altFa.replace(/\|/g, "/")} | ${img.altEn.replace(/\|/g, "/")} | ${img.src} |`,
    );
  }

  await writeFile(SEO_MAP_PATH, lines.join("\n"), "utf8");
}

async function refreshManifestCopy() {
  const raw = await import("node:fs/promises").then((m) => m.readFile(MANIFEST_PATH, "utf8"));
  const manifest = JSON.parse(raw);
  /** @type {Record<GalleryCategory, number>} */
  const catCounters = {
    aerial: 0,
    production: 0,
    laboratory: 0,
    products: 0,
    warehouse: 0,
    logistics: 0,
    facility: 0,
  };

  for (const img of manifest.images) {
    const category = img.category;
    catCounters[category] += 1;
    const index = catCounters[category];
    const basename = path.basename(img.sourceFile);
    const needsReview = /^img_|^\(\d+\)|^237|^32 \(/.test(basename);
    Object.assign(img, buildCopy(category, index, img.aspectRatio, needsReview));
  }

  manifest.generatedAt = new Date().toISOString();
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");
  await writeSeoMap(manifest.images, {
    discovered: manifest.stats.discovered,
    published: manifest.stats.published,
    excluded: manifest.stats.discovered - manifest.stats.published,
    categories: manifest.stats.categories.map((c) => c.id),
  });
  console.log(JSON.stringify({ mode: "metadata-only", updated: manifest.images.length }, null, 2));
}

async function main() {
  if (process.argv.includes("--metadata-only")) {
    if (!existsSync(MANIFEST_PATH)) {
      console.error("Manifest not found — run full build first.");
      process.exit(1);
    }
    await refreshManifestCopy();
    return;
  }

  if (!existsSync(SOURCE_DIR)) {
    console.error("image/ directory not found — skipping asset generation.");
    process.exit(1);
  }

  const allFiles = await walkSources(SOURCE_DIR);
  const byBase = new Map();
  for (const f of allFiles) {
    const base = path.basename(f).toLowerCase();
    if (!byBase.has(base)) byBase.set(base, []);
    byBase.get(base).push(f);
  }

  const canonical = [];
  let excludedDupes = 0;
  for (const [, paths] of byBase) {
    if (paths.length > 1) excludedDupes += paths.length - 1;
    canonical.push(chooseCanonicalPath(paths));
  }
  canonical.sort();

  /** @type {Record<GalleryCategory, number>} */
  const catCounters = {
    aerial: 0,
    production: 0,
    laboratory: 0,
    products: 0,
    warehouse: 0,
    logistics: 0,
    facility: 0,
  };

  /** @type {Array<Record<string, unknown>>} */
  const processed = [];

  for (const sourceRel of canonical) {
    const basename = path.basename(sourceRel);
    const category = classifyCategory(sourceRel, basename);
    catCounters[category] += 1;
    const index = catCounters[category];
    const slug = `${CATEGORY_SLUG[category]}-${String(index).padStart(2, "0")}`;
    const needsReview = /^img_|^\(\d+\)|^237|^32 \(/.test(basename);

    const result = await processImage(sourceRel, category, index, slug);
    const copy = buildCopy(category, index, result.aspectRatio, needsReview);

    processed.push({
      id: slug,
      ...result,
      ...copy,
      category,
    });
  }

  // Hero from best aerial (prefer 3-تولید/DJI_0472)
  const heroCandidate =
    canonical.find((p) => p.includes("3-تولید/DJI_0472")) ??
    canonical.find((p) => /dji_0472/i.test(p)) ??
    canonical.find((p) => /dji_0609/i.test(p)) ??
    processed.find((i) => i.category === "aerial")?.sourceFile;

  const heroAssets = heroCandidate ? await buildHeroAndOg(heroCandidate) : null;

  const featuredSet = pickFeatured(processed);
  for (const img of processed) {
    img.featured = featuredSet.has(img.id);
    if (heroCandidate && img.sourceFile === heroCandidate) {
      img.hero = true;
    }
  }

  const activeCategories = /** @type {GalleryCategory[]} */ (
    Object.keys(catCounters).filter((k) => catCounters[k] > 0)
  );

  const manifest = {
    version: 1,
    generatedAt: new Date().toISOString(),
    stats: {
      discovered: allFiles.length,
      published: processed.length,
      excludedDuplicates: excludedDupes,
      excludedAssets: allFiles.length - canonical.length - excludedDupes + excludedDupes,
      categories: activeCategories.map((c) => ({ id: c, ...CATEGORY_LABELS[c], count: catCounters[c] })),
    },
    hero: heroAssets?.hero ?? null,
    ogImage: heroAssets?.og ?? null,
    images: processed,
  };

  await mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");

  await writeSeoMap(processed, {
    discovered: allFiles.length,
    published: processed.length,
    excluded: allFiles.length - processed.length,
    categories: activeCategories,
  });

  console.log(
    JSON.stringify(
      {
        published: processed.length,
        discovered: allFiles.length,
        excluded: allFiles.length - processed.length,
        categories: catCounters,
        hero: heroCandidate,
      },
      null,
      2,
    ),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
