import manifest from "@/data/photography.json";

export type Photo = {
  src: string;
  folderSlug: string;
  folder: string;
  width: number;
  height: number;
  blurDataURL: string;
  color: string;
  contextAlt: string;
  alt: string;
  title: string;
  indexInFolder: number;
  totalInFolder: number;
};

export const FOLDER_ORDER: readonly string[] = manifest.folderOrder;

export const photos: Photo[] = manifest.photos as Photo[];

export const folders: string[] = (() => {
  const set = new Set(photos.map((p) => p.folder));
  const ordered = FOLDER_ORDER.filter((f) => set.has(f));
  const rest = Array.from(set).filter((f) => !FOLDER_ORDER.includes(f)).sort();
  return [...ordered, ...rest];
})();

const folderCountsBase: Record<string, number> = (() => {
  const counts: Record<string, number> = {};
  for (const p of photos) counts[p.folder] = (counts[p.folder] ?? 0) + 1;
  return counts;
})();

/** Leading sort prefix from filenames like `006-film-....jpg` (film / graduation). */
function leadingSortPrefix(src: string): number | null {
  const base = decodeURIComponent(src.split("/").pop() ?? "");
  const m = base.match(/^(\d{3})-/);
  return m ? parseInt(m[1], 10) : null;
}

/** Trailing seq from Option A landscape names: `landscape-YYYYMMDD-004.jpg`. */
function landscapeFileSeq(src: string): number | null {
  const base = decodeURIComponent(src.split("/").pop() ?? "");
  const m = base.match(/landscape-\d{8}-(\d{3})\.[a-z]+$/i);
  return m ? parseInt(m[1], 10) : null;
}

/** Trailing seq from graduation names: `NNN-graduation-YYYYMMDD-XXX.jpg`. */
function graduationFileSeq(src: string): number | null {
  const base = decodeURIComponent(src.split("/").pop() ?? "");
  const m = base.match(/^\d{3}-graduation-\d{8}-(\d{3})\.[a-z]+$/i);
  return m ? parseInt(m[1], 10) : null;
}

function isOriginalGraduationAspect(p: Photo): boolean {
  return (
    (p.width === 1920 && p.height === 1280) ||
    (p.width === 1280 && p.height === 1920)
  );
}

/**
 * Curated picks for the default "Top" tab (prefix index per folder rules above).
 * Film / graduation: leading `NNN-`; landscape: trailing `-NNN` before extension.
 */
const TOP_PICKS: Record<string, readonly number[]> = {
  film: [6, 8, 10, 14, 20, 21, 22],
  graduation: [1, 2, 4, 8, 18, 19],
  landscape: [4, 5, 13, 14, 16],
};

function orderTopByPickList(folderSlug: string, picks: readonly number[]): Photo[] {
  const map = new Map<number, Photo>();
  for (const p of photos) {
    if (p.folderSlug !== folderSlug) continue;
    const key =
      folderSlug === "landscape"
        ? landscapeFileSeq(p.src)
        : folderSlug === "graduation"
          ? graduationFileSeq(p.src)
          : leadingSortPrefix(p.src);
    if (key == null || !picks.includes(key)) continue;
    if (folderSlug === "graduation" && !isOriginalGraduationAspect(p)) continue;
    map.set(key, p);
  }
  return picks.map((k) => map.get(k)).filter((p): p is Photo => p != null);
}

/**
 * Default "Top" view: selected shots only, round-robin Graduation → 35mm → Landscape.
 */
export const topPhotosInterleaved: Photo[] = (() => {
  const buckets = [
    orderTopByPickList("graduation", TOP_PICKS.graduation),
    orderTopByPickList("film", TOP_PICKS.film),
    orderTopByPickList("landscape", TOP_PICKS.landscape),
  ];
  const out: Photo[] = [];
  let round = 0;
  let more = true;
  while (more) {
    more = false;
    for (const b of buckets) {
      if (round < b.length) {
        out.push(b[round]);
        more = true;
      }
    }
    round++;
  }
  return out;
})();

export const folderCounts: Record<string, number> = {
  ...folderCountsBase,
  Top: topPhotosInterleaved.length,
};

/**
 * Legacy: full-gallery interleave (no longer used as default tab).
 * Kept for scripts / future use.
 */
export const allPhotosInterleaved: Photo[] = (() => {
  const byFolder = new Map<string, Photo[]>();
  for (const p of photos) {
    const list = byFolder.get(p.folder) ?? [];
    list.push(p);
    byFolder.set(p.folder, list);
  }
  const order = folders;
  const out: Photo[] = [];
  let round = 0;
  let more = true;
  while (more) {
    more = false;
    for (const f of order) {
      const list = byFolder.get(f);
      if (list && round < list.length) {
        out.push(list[round]);
        more = true;
      }
    }
    round++;
  }
  return out;
})();

export function photosForFilter(filter: string): Photo[] {
  if (filter === "Top" || !filter) return topPhotosInterleaved;
  return photos.filter((p) => p.folder === filter);
}
