export type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster?: string };

export interface Metric {
  label: string;
  value: string;
}

/**
 * Fields shared by every showcase entity (projects and startups). Keeping them
 * in one place means the modal can render any of them generically.
 */
export interface ShowcaseSectionData {
  metrics?: Metric[];
  accomplishments?: string[];
  features?: string[];
  technologies?: string[];
  problem?: string;
  process?: string[];
  outcome?: string;
}

/** Builds the ordered media list (images first, then videos) the gallery renders. */
export function buildMediaItems({
  images,
  videos,
  videoPoster,
}: {
  images?: string[];
  videos?: string[];
  videoPoster?: string;
}): MediaItem[] {
  return [
    ...(images ?? []).map((src): MediaItem => ({ type: "image", src })),
    ...(videos ?? []).map(
      (src): MediaItem => ({ type: "video", src, poster: videoPoster })
    ),
  ];
}
