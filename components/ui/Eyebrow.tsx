import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  /** `gold` on light sections, `gold2` on the dark navy sections. */
  tone?: "gold" | "gold2";
  /** Rules on both sides + centered (dashboard showcase, CTA). */
  centered?: boolean;
};

/** The recurring gold rule + uppercase label that opens every section. */
export function Eyebrow({
  children,
  className,
  tone = "gold",
  centered = false,
}: EyebrowProps) {
  const color = tone === "gold" ? "text-gold" : "text-gold-2";
  const ruleBg = tone === "gold" ? "bg-gold" : "bg-gold-2";
  const ruleW = centered ? "w-6" : "w-[30px]";

  return (
    <div
      className={cn(
        "flex items-center gap-3",
        centered && "justify-center",
        className,
      )}
    >
      <span aria-hidden className={cn("h-[1.5px]", ruleW, ruleBg)} />
      <span className={cn("text-eyebrow uppercase", color)}>{children}</span>
      {centered && <span aria-hidden className={cn("h-[1.5px]", ruleW, ruleBg)} />}
    </div>
  );
}
