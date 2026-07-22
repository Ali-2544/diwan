import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = {
  neutralDark: "border-ink-600 bg-ink-800 text-text-on-dark-muted",
  neutralLight: "border-sand-200 bg-sand-100 text-text-on-light-muted",
  gold: "border-gold-500/40 bg-gold-500/10 text-gold-300",
  goldLight: "border-gold-600/30 bg-gold-500/10 text-gold-700",
  /** Reserved for Roadmap / §8 items. Never used for shipped features. */
  comingSoon: "border-gold-600/40 bg-transparent text-gold-600",
} as const;

type PillProps = {
  children: ReactNode;
  className?: string;
  tone?: keyof typeof tones;
};

export function Pill({ children, className, tone = "neutralLight" }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1",
        "text-eyebrow uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
