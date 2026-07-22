import type { Variants, Transition } from "framer-motion";

/**
 * The site's entire motion vocabulary.
 *
 * Do NOT import these directly into a component. Use `useMotionSafe()`, which
 * returns either these or their opacity-only equivalents depending on the
 * user's `prefers-reduced-motion` setting. Importing from here directly is how
 * reduced-motion support silently rots.
 */

/** Matches `transitionTimingFunction.brand` in tailwind.config.ts. */
export const EASE_BRAND: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DURATION = {
  fast: 0.2,
  base: 0.5,
  slow: 0.6,
  counter: 1.2,
} as const;

export const STAGGER = {
  /** Between words in the hero headline. */
  word: 0.04,
  /** Between sibling cards / list rows. */
  child: 0.06,
} as const;

/* ------------------------------------------------------------------ */
/* Full motion                                                         */
/* ------------------------------------------------------------------ */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_BRAND },
  },
};

/** Hero headline words: a taller rise than section reveals. */
export const heroWord: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_BRAND },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE_BRAND },
  },
};

/** Horizontal rule / connector line that draws in on scroll. */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: EASE_BRAND },
  },
};

export const staggerParent = (stagger: number = STAGGER.child, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/* ------------------------------------------------------------------ */
/* Reduced motion — opacity only, faster, no transforms                */
/* ------------------------------------------------------------------ */

const reducedTransition: Transition = { duration: DURATION.fast, ease: "linear" };

export const reduced = {
  fadeUp: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: reducedTransition },
  } satisfies Variants,
  heroWord: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: reducedTransition },
  } satisfies Variants,
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: reducedTransition },
  } satisfies Variants,
  /** A line that is simply already drawn. */
  drawLine: {
    hidden: { scaleX: 1, opacity: 0 },
    visible: { scaleX: 1, opacity: 1, transition: reducedTransition },
  } satisfies Variants,
};
