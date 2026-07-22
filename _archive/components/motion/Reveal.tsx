"use client";

import { m } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useMotionSafe } from "./useMotionSafe";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Extra delay in seconds, for the rare hand-tuned sequence. */
  delay?: number;
  as?: ElementType;
  /** Use `fadeIn` instead of the default `fadeUp` (e.g. for large imagery). */
  variant?: "fadeUp" | "fadeIn";
};

/**
 * Scroll-triggered reveal. Fires once, when 25% of the element is in view.
 * This is the default motion primitive for every section on the site.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  variant = "fadeUp",
}: RevealProps) {
  const { variants, safe } = useMotionSafe();
  const MotionTag = m[as as keyof typeof m] as typeof m.div;

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -80px 0px" }}
      variants={variants[variant]}
      transition={safe && delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
