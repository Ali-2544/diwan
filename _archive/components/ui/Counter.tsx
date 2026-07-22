"use client";

import { animate, m, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useMotionSafe } from "@/components/motion/useMotionSafe";
import { DURATION, EASE_BRAND } from "@/components/motion/variants";

type CounterProps = {
  /** Target value. Must be a neutral, brief-verifiable fact — never a
   *  business metric, customer count or other invented statistic. */
  value: number;
  suffix?: string;
  className?: string;
};

/**
 * Counts up once when scrolled into view. Under reduced motion it renders the
 * final value immediately. Uses tabular figures so the container doesn't
 * reflow as digits change width.
 */
export function Counter({ value, suffix, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const { safe } = useMotionSafe();
  const [display, setDisplay] = useState(safe ? 0 : value);

  useEffect(() => {
    if (!inView) return;
    if (!safe) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, value, {
      duration: DURATION.counter,
      ease: EASE_BRAND,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, safe, value]);

  return (
    <m.span ref={ref} className={cn("tabular", className)}>
      {display}
      {suffix}
    </m.span>
  );
}
