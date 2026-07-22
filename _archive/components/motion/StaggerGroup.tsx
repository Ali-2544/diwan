"use client";

import { m } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useMotionSafe } from "./useMotionSafe";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Seconds between children. Defaults to the site standard (60ms). */
  stagger?: number;
  delay?: number;
};

/**
 * Parent orchestrator for a row/grid of `<StaggerItem>` children.
 * Children inherit `hidden`/`visible` — they must not set their own
 * `initial`/`whileInView`, or they'll animate independently of the group.
 */
export function StaggerGroup({
  children,
  className,
  as = "div",
  stagger: staggerAmount,
  delay = 0,
}: StaggerGroupProps) {
  const { stagger } = useMotionSafe();
  const MotionTag = m[as as keyof typeof m] as typeof m.div;

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
      variants={stagger(staggerAmount, delay)}
    >
      {children}
    </MotionTag>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/** A child of `<StaggerGroup>`. Inherits the parent's animation state. */
export function StaggerItem({
  children,
  className,
  as = "div",
}: StaggerItemProps) {
  const { variants } = useMotionSafe();
  const MotionTag = m[as as keyof typeof m] as typeof m.div;

  return (
    <MotionTag className={cn(className)} variants={variants.fadeUp}>
      {children}
    </MotionTag>
  );
}
