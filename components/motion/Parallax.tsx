"use client";

import { m, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Drift factor (~0.05 in the handoff). Disabled under reduced motion. */
  speed?: number;
};

/**
 * Vertical parallax drift as the element passes through the viewport, matching
 * the handoff's rAF translate3d(0, -offset * speed). Uses Framer's scroll
 * progress; motion-safe only.
 */
export function Parallax({ children, className, speed = 0.05 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Element centre travels ~ (viewport height) across the range; scale that by
  // `speed` and invert so it drifts opposite the scroll like the reference.
  const travel = reduce ? 0 : speed * 320;
  const y = useTransform(scrollYProgress, [0, 1], [travel, -travel]);

  return (
    <m.div ref={ref} style={{ y }} className={cn(className)}>
      {children}
    </m.div>
  );
}
