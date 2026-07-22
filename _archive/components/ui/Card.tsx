import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
  tone?: "onDark" | "onLight";
  /** Adds the lift + top-hairline hover treatment. */
  interactive?: boolean;
  /**
   * Persistent colored top-accent bar, echoing the app's KPI cards.
   * Defaults to none; the hover hairline follows this colour too.
   */
  accent?: "none" | "blue" | "gold";
};

const ACCENT_BAR = {
  none: "",
  blue: "bg-blue-500",
  gold: "bg-gold-500",
} as const;

const ACCENT_HAIR = {
  none: "from-gold-500 to-gold-500/0",
  blue: "from-blue-500 to-blue-500/0",
  gold: "from-gold-500 to-gold-500/0",
} as const;

const ACCENT_HOVER_BORDER = {
  none: "hover:border-gold-500/50",
  blue: "hover:border-blue-500/50",
  gold: "hover:border-gold-500/50",
} as const;

/**
 * Surface card. On light it uses shadow for elevation; on dark it uses
 * border-lightening plus a faint inset top highlight, because shadow is
 * invisible against ink-950.
 */
export function Card({
  children,
  className,
  tone = "onLight",
  interactive = false,
  accent = "none",
}: CardProps) {
  const hasAccentBar = accent !== "none";

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg p-6 lg:p-8",
        "transition-all duration-200 ease-brand",
        tone === "onLight"
          ? "border border-sand-200 bg-white shadow-card"
          : "border border-ink-700 bg-ink-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        interactive &&
          "hover:-translate-y-1 " +
            ACCENT_HOVER_BORDER[accent] +
            (tone === "onLight" ? " hover:shadow-card-hover" : ""),
        className,
      )}
    >
      {/* Persistent top-accent bar (app KPI-card style). */}
      {hasAccentBar && (
        <span
          aria-hidden="true"
          className={cn("absolute inset-x-0 top-0 h-[3px]", ACCENT_BAR[accent])}
        />
      )}

      {interactive && !hasAccentBar && (
        // Hairline that draws across the top edge on hover.
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r",
            ACCENT_HAIR[accent],
            "transition-transform duration-500 ease-brand group-hover:scale-x-100",
            "motion-reduce:transition-none",
          )}
        />
      )}
      {children}
    </div>
  );
}
