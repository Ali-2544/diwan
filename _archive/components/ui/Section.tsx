import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

/**
 * Surface colours. Page files must never set their own `bg-*` — alternating
 * dark/light rhythm across six pages only stays coherent if it lives here.
 */
const surfaces = {
  darkest: "bg-ink-950 text-text-on-dark",
  dark: "bg-ink-900 text-text-on-dark",
  light: "bg-sand-50 text-text-on-light",
  sand: "bg-sand-100 text-text-on-light",
} as const;

/** Vertical rhythm. `flush` is for sections that manage their own padding. */
const paddings = {
  none: "",
  tight: "py-16 lg:py-22",
  base: "py-20 lg:py-30",
  loose: "py-26 lg:py-34",
} as const;

type SectionProps = {
  children: ReactNode;
  className?: string;
  /** Anchor target — `scroll-mt` is applied automatically for the sticky nav. */
  id?: string;
  surface?: keyof typeof surfaces;
  padding?: keyof typeof paddings;
  containerWidth?: "narrow" | "default" | "wide";
  /** Skip the inner Container for full-bleed content. */
  bleed?: boolean;
  /**
   * Skip style/layout work until the section nears the viewport.
   * On by default — set false only for a section visible on first paint.
   */
  deferRender?: boolean;
};

export function Section({
  children,
  className,
  id,
  surface = "light",
  padding = "base",
  containerWidth = "default",
  bleed = false,
  deferRender = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24",
        surfaces[surface],
        paddings[padding],
        deferRender && "defer-render",
        className,
      )}
    >
      {bleed ? children : <Container width={containerWidth}>{children}</Container>}
    </section>
  );
}
