"use client";

import { m, useReducedMotion, type Variant, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type RevealVariant = "up" | "scale" | "left" | "right" | "img";

/** Matches the handoff: cubic-bezier(.16,.8,.24,1). */
const EASE: [number, number, number, number] = [0.16, 0.8, 0.24, 1];

const HIDDEN: Record<RevealVariant, Variant> = {
  up: { opacity: 0, y: 30 },
  scale: { opacity: 0, scale: 0.96 },
  left: { opacity: 0, x: -28 },
  right: { opacity: 0, x: 28 },
  img: { opacity: 0, scale: 1.06, filter: "blur(16px)" },
};

const SHOWN: Variant = { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };

type RevealProps = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  /** Per-element delay in ms, for staggering (as in the handoff). */
  delay?: number;
  as?: ElementType;
  /** Reveal is a `once` effect; fires when 12% is in view. */
  once?: boolean;
};

/**
 * Scroll reveal matching the handoff's IntersectionObserver behaviour: fade +
 * move/scale/blur-focus when 12% visible, once. `img` uses the blur-focus
 * effect (slower, 1s). Reduced motion renders the final state immediately.
 */
export function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
  as = "div",
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = m[as as keyof typeof m] as typeof m.div;
  const isImg = variant === "img";

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : HIDDEN[variant],
    visible: {
      ...(reduce ? { opacity: 1 } : SHOWN),
      transition: {
        duration: reduce ? 0.2 : isImg ? 1 : 0.7,
        ease: EASE,
        delay: reduce ? 0 : delay / 1000,
      },
    },
  };

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.12, margin: "0px 0px -6% 0px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
