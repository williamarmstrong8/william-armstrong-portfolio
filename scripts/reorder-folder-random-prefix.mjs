#!/usr/bin/env node
/**
 * Randomize gallery order under public/photography/<folder>/ by prefixing:
 *   001-{originalStem}.jpg
 * Strips an existing leading NNN- sort prefix first (idempotent reshuffles).
 *
 * Usage:
 *   node scripts/reorder-folder-random-prefix.mjs graduation
 *   node scripts/reorder-folder-random-prefix.mjs film
 */

import crypto from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(process.cwd(), "public/photography");

function stripSortPrefix(name) {
  return name.replace(/^\d{3}-/, "");
}

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

async function twoPhaseRename(dir, pairs) {
  const steps = pairs.map(({ from, to }) => ({
    from,
    to,
    tmp: path.join(dir, `.__shuffle_${crypto.randomUUID()}`),
  }));
  for (const s of steps) await fs.rename(s.from, s.tmp);
  for (const s of steps) await fs.rename(s.tmp, s.to);
}

export async function run(folderSegment) {
  const DIR = path.join(ROOT, folderSegment);
  try {
    await fs.access(DIR);
  } catch {
    console.error(`Folder not found: ${DIR}`);
    process.exit(1);
  }

  const names = (await fs.readdir(DIR))
    .filter((n) => /\.(jpe?g|png)$/i.test(n) && !n.startsWith(".") && !n.startsWith(".__"));

  if (names.length === 0) {
    console.log(`No images in ${folderSegment}/`);
    return;
  }

  const stems = names.map(stripSortPrefix);
  if (new Set(stems).size !== stems.length) {
    console.error("Duplicate stems after stripping sort prefix — abort.");
    process.exit(1);
  }

  shuffleInPlace(stems);
  console.log(`${folderSegment} shuffle order (new 001..):`);
  stems.forEach((s, i) => console.log(`  ${String(i + 1).padStart(3, "0")}  ${s}`));

  const pairs = [];
  for (let i = 0; i < stems.length; i++) {
    const stem = stems[i];
    const sort = String(i + 1).padStart(3, "0");
    const newName = `${sort}-${stem}`;
    const oldName = names.find((n) => stripSortPrefix(n) === stem);
    if (!oldName) {
      console.error(`Lost mapping for stem: ${stem}`);
      process.exit(1);
    }
    const from = path.join(DIR, oldName);
    const to = path.join(DIR, newName);
    if (oldName !== newName) pairs.push({ from, to });
  }

  if (pairs.length === 0) {
    console.log("Already in target naming — reshuffle skipped (same names).");
    return;
  }

  console.log(`\nRenaming ${pairs.length} file(s)...`);
  await twoPhaseRename(DIR, pairs);
  console.log("Done. Run: pnpm photo:manifest");
}

async function main() {
  const folder = process.argv[2];
  if (!folder) {
    console.error("Usage: node scripts/reorder-folder-random-prefix.mjs <folder>");
    console.error("Example: node scripts/reorder-folder-random-prefix.mjs graduation");
    process.exit(1);
  }
  await run(folder);
}

const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
