"use client";

import { useReducedMotion } from "framer-motion";
import {
  drawLine,
  fadeIn,
  fadeUp,
  heroWord,
  reduced,
  STAGGER,
  staggerParent,
} from "./variants";

/**
 * The only sanctioned way to get animation variants.
 *
 * Returns the full-motion set, or opacity-only equivalents when the user has
 * `prefers-reduced-motion: reduce`. Also exposes `safe` so components can skip
 * parallax and long entrance sequences entirely rather than merely shortening
 * them — a 40px parallax drift is still motion even at 200ms.
 */
export function useMotionSafe() {
  const prefersReduced = useReducedMotion();
  const safe = !prefersReduced;

  return {
    /** true when full motion is allowed. */
    safe,
    /** true when the user asked for reduced motion. */
    prefersReduced: !!prefersReduced,
    variants: safe
      ? { fadeUp, fadeIn, heroWord, drawLine }
      : {
          fadeUp: reduced.fadeUp,
          fadeIn: reduced.fadeIn,
          heroWord: reduced.heroWord,
          drawLine: reduced.drawLine,
        },
    /**
     * Parent orchestrator. Under reduced motion the stagger collapses to 0 so
     * everything resolves at once instead of trickling in.
     */
    stagger: (amount: number = STAGGER.child, delay = 0) =>
      safe ? staggerParent(amount, delay) : staggerParent(0, 0),
  };
}
