#!/usr/bin/env node
/**
 * Generate data/photography.json from public/photography/**.
 *
 * For each image: real width/height (post-EXIF rotate), per-image base64
 * blurDataURL, dominant color, folder slug + display label, and alt scaffold.
 *
 * Idempotent and cache-aware: skips work when the existing manifest entry
 * has the same mtime + size for that file.
 *
 * Run: pnpm run photo:manifest   (or directly: node scripts/build-photo-manifest.mjs)
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { getPlaiceholder } from "plaiceholder";
import sharp from "sharp";

const ROOT = path.resolve(process.cwd(), "public/photography");
const OUT = path.resolve(process.cwd(), "data/photography.json");
const VALID_EXT = new Set([".jpg", ".jpeg", ".png"]);

/** Bump when folder labels/order change so cached manifest rows refresh without touching files. */
const MANIFEST_REV = 2;

const FOLDERS = {
  graduation: { label: "Graduation", contextAlt: "Boston College graduation" },
  film: { label: "35mm", contextAlt: "Boston College on 35mm film" },
  landscape: { label: "Landscape", contextAlt: "landscape" },
  "5k Run & Roll '25": { label: "5K Run & Roll '25", contextAlt: "5K Run & Roll 2025 charity event" },
  "5k Run & Roll '24": { label: "5K Run & Roll '24", contextAlt: "5K Run & Roll 2024 charity event" },
};
const FOLDER_DISPLAY_ORDER = ["Graduation", "35mm", "Landscape", "5K Run & Roll '25", "5K Run & Roll '24"];

async function* walk(dir, base = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries.sort((a, b) => a.name.localeCompare(b.name, "en"))) {
    if (e.name.startsWith(".")) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(full, base);
    else yield { full, rel: path.relative(base, full) };
  }
}

async function loadCache() {
  try {
    const raw = await fs.readFile(OUT, "utf8");
    const json = JSON.parse(raw);
    const map = new Map();
    for (const item of json.photos ?? []) map.set(item.src, item);
    return map;
  } catch {
    return new Map();
  }
}

async function main() {
  const cache = await loadCache();
  const photos = [];
  let processed = 0, cached = 0;

  for await (const { full, rel } of walk(ROOT)) {
    const ext = path.extname(full).toLowerCase();
    if (!VALID_EXT.has(ext)) continue;

    const stat = await fs.stat(full);
    const folderSlug = rel.split(path.sep)[0];
    const folder = FOLDERS[folderSlug];
    if (!folder) {
      console.warn(`  ! unknown folder "${folderSlug}" — skipping ${rel}`);
      continue;
    }

    const src = "/" + path.posix.join("photography", ...rel.split(path.sep));
    const cacheKey = `${src}@${stat.size}@${Math.floor(stat.mtimeMs)}@r${MANIFEST_REV}`;

    const cached_ = cache.get(src);
    if (cached_ && cached_.cacheKey === cacheKey) {
      photos.push(cached_);
      cached++;
      continue;
    }

    const buf = await fs.readFile(full);
    const { base64, metadata, color } = await getPlaiceholder(buf, { size: 10 });
    const w = metadata.width;
    const h = metadata.height;

    photos.push({
      src,
      folderSlug,
      folder: folder.label,
      width: w,
      height: h,
      blurDataURL: base64,
      color: color?.hex ?? "#222",
      contextAlt: folder.contextAlt,
      cacheKey,
    });
    processed++;
    console.log(`  ✓ ${rel}  ${w}x${h}`);
  }

  // Per-folder ordering and per-folder index for human-friendly alt text.
  const byFolder = new Map();
  for (const p of photos) {
    const list = byFolder.get(p.folder) ?? [];
    list.push(p);
    byFolder.set(p.folder, list);
  }
  for (const [, list] of byFolder) {
    list.forEach((p, i) => {
      p.indexInFolder = i + 1;
      p.totalInFolder = list.length;
      p.alt = `${p.contextAlt} \u2014 photo ${i + 1} of ${list.length}`;
      p.title = p.folder;
    });
  }

  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(
    OUT,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        folderOrder: FOLDER_DISPLAY_ORDER,
        photos,
      },
      null,
      2,
    ),
  );

  console.log(
    `\nManifest: ${photos.length} photos (${processed} fresh, ${cached} cached) -> ${path.relative(process.cwd(), OUT)}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
