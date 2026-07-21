/** Intrinsic pixel sizes for brand screenshots (used to preserve aspect ratio). */
export const BRAND_IMAGE_SIZES: Record<string, { width: number; height: number }> = {
  "/brands/clubpack/clubpack.png": { width: 3420, height: 1900 },
  "/brands/clubpack/screenshot.png": { width: 3420, height: 1902 },

  "/brands/modbrew/wide.jpeg": { width: 2362, height: 1329 },
  "/brands/modbrew/line1.jpeg": { width: 1536, height: 2048 },
  "/brands/modbrew/line2.jpeg": { width: 2048, height: 1536 },
  "/brands/modbrew/shop.jpeg": { width: 1536, height: 2048 },
  "/brands/modbrew/shop2.jpeg": { width: 1536, height: 2048 },
  "/brands/modbrew/group.jpeg": { width: 1536, height: 2048 },
  "/brands/modbrew/hand.jpeg": { width: 2847, height: 3687 },
  "/brands/modbrew/window.jpeg": { width: 768, height: 1022 },
  "/brands/modbrew/hub.png": { width: 2808, height: 1774 },
  "/brands/modbrew/mary.jpeg": { width: 724, height: 1086 },

  "/brands/happy-mile/gathering.jpeg": { width: 1086, height: 724 },
  "/brands/happy-mile/community.jpeg": { width: 6240, height: 4160 },
  "/brands/happy-mile/pickle-ball.jpeg": { width: 1086, height: 724 },
  "/brands/happy-mile/more-runners-2.jpeg": { width: 1585, height: 1982 },
  "/brands/happy-mile/runners-more.jpeg": { width: 1586, height: 1982 },
  "/brands/happy-mile/runner-brdige.jpeg": { width: 1586, height: 1982 },
  "/brands/happy-mile/merch.jpeg": { width: 808, height: 972 },

  "/brands/drifters/3-shot.jpeg": { width: 1086, height: 724 },
  "/brands/drifters/hero.png": { width: 3420, height: 1966 },
  "/brands/drifters/instagram.jpg": { width: 1206, height: 2481 },
  "/brands/drifters/ever-to-explore.jpeg": { width: 724, height: 1086 },
  "/brands/drifters/journal.png": { width: 3420, height: 1966 },
  "/brands/drifters/mary-claire.jpeg": { width: 724, height: 1086 },
};

/** Relative difference under this = "close enough" to share one aspect ratio. */
const SIMILAR_RATIO_THRESHOLD = 0.15;

export function getBrandImageSize(src: string): { width: number; height: number } {
  return BRAND_IMAGE_SIZES[src] ?? { width: 1600, height: 900 };
}

export function getImageRatio(src: string): number {
  const { width, height } = getBrandImageSize(src);
  return width / height;
}

export function isPortraitImage(src: string): boolean {
  return getImageRatio(src) < 1;
}

export function ratiosAreClose(a: string, b: string, threshold = SIMILAR_RATIO_THRESHOLD): boolean {
  const ra = getImageRatio(a);
  const rb = getImageRatio(b);
  const max = Math.max(ra, rb);
  if (max === 0) return false;
  return Math.abs(ra - rb) / max <= threshold;
}

export type MediaBlock =
  | { type: "single"; src: string }
  | { type: "pair"; images: [string, string]; sharedRatio: number };

export interface MediaPlan {
  /** Opening visual under the title - solo shot or matched-ratio pair. */
  hero: MediaBlock | null;
  blocks: MediaBlock[];
}

/**
 * Build a hero (preferring a landscape pair when ratios are close), then
 * greedy-pair remaining shots with similar aspect ratios so side-by-side
 * tiles share one frame.
 */
export function planStartupMedia(shots: string[]): MediaPlan {
  if (shots.length === 0) return { hero: null, blocks: [] };

  const used = new Set<string>();
  const landscapes = shots.filter((src) => !isPortraitImage(src));

  let hero: MediaBlock;

  if (landscapes.length >= 2 && ratiosAreClose(landscapes[0], landscapes[1])) {
    const sharedRatio =
      (getImageRatio(landscapes[0]) + getImageRatio(landscapes[1])) / 2;
    hero = {
      type: "pair",
      images: [landscapes[0], landscapes[1]],
      sharedRatio,
    };
    used.add(landscapes[0]);
    used.add(landscapes[1]);
  } else {
    const heroSrc = landscapes[0] ?? shots[0];
    hero = { type: "single", src: heroSrc };
    used.add(heroSrc);
  }

  const remaining = shots.filter((src) => !used.has(src));
  const blocks: MediaBlock[] = [];

  for (let i = 0; i < remaining.length; i++) {
    const a = remaining[i];
    if (used.has(a)) continue;

    let pairIndex = -1;
    for (let j = i + 1; j < remaining.length; j++) {
      const b = remaining[j];
      if (used.has(b)) continue;
      if (ratiosAreClose(a, b)) {
        pairIndex = j;
        break;
      }
    }

    if (pairIndex >= 0) {
      const b = remaining[pairIndex];
      const sharedRatio = (getImageRatio(a) + getImageRatio(b)) / 2;
      blocks.push({ type: "pair", images: [a, b], sharedRatio });
      used.add(a);
      used.add(b);
    } else {
      blocks.push({ type: "single", src: a });
      used.add(a);
    }
  }

  return { hero, blocks };
}
