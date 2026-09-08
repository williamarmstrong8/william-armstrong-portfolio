/**
 * Shared motion system.
 *
 * Every page composes the same choreographed entrance. These constants are the
 * single source of truth for that choreography - pages and sections import
 * them instead of re-declaring magic numbers, so timing can never drift
 * between routes.
 */

/** Standard ease used by all framer-motion transitions. */
export const EASE = [0.25, 0.46, 0.45, 0.94] as const;

/** The site-wide entrance sequence, in seconds. */
export const DELAY = {
  /** Page header block fade-up. */
  header: 0.07,
  /** Page title pop-in. */
  title: 0.13,
  /** Filter row fade-up. */
  filter: 0.27,
  /** Grid section wrapper fade. */
  grid: 0.4,
  /** First card in a grid. */
  card: 0.47,
  /** Stagger step between cards on first paint. */
  cardStep: 0.1,
  /** Stagger step between cards after a filter swap. */
  cardStepAfter: 0.053,
  /** Delay for the first card after a filter swap. */
  cardAfter: 0.13,
} as const;

export const DURATION = {
  header: 0.4,
  title: 0.47,
  filter: 0.33,
  grid: 0.2,
  card: 0.4,
  cardHover: 0.3,
  swap: 0.25,
  exit: 0.2,
} as const;

/** Header block: fades up first. */
export const pageHeader = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATION.header, ease: EASE, delay: DELAY.header },
} as const;

/** Page title: pops from 90% scale. */
export const pageTitle = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: DURATION.title, ease: EASE, delay: DELAY.title },
} as const;

/** Subtitle / filter rows: gentle fade-up after the title. */
export const fadeUp = (delay: number = DELAY.filter) =>
  ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATION.filter, ease: EASE, delay },
  }) as const;

/** Grid wrapper: plain fade that lets the cards carry the stagger. */
export const gridWrap = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: DURATION.swap },
} as const;

/** Standard card entrance; pass the index and whether this is first paint. */
export const cardEntrance = (index: number, initialMount = true) => ({
  initial: { opacity: 0, y: 40, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.98,
    transition: { duration: DURATION.exit },
  },
  transition: {
    duration: DURATION.card,
    delay: initialMount
      ? DELAY.card + index * DELAY.cardStep
      : DELAY.cardAfter + index * DELAY.cardStepAfter,
    ease: EASE,
  },
});

/** Standard card hover lift. */
export const cardHover = {
  y: -8,
  transition: { duration: DURATION.cardHover },
} as const;
