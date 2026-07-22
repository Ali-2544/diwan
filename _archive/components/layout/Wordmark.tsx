import { cn } from "@/lib/cn";
import { SITE } from "@/config/site";

/**
 * Typographic lockup — no image asset, so it stays crisp and costs nothing.
 * A gold monogram tile plus the short name in the display serif.
 * Swap this component if a real logo file arrives.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className="grid h-8 w-8 place-items-center rounded-sm border border-gold-500/40 bg-gold-500/10 font-display text-[0.8125rem] font-semibold leading-none text-gold-400"
      >
        DD
      </span>
      <span className="font-display text-[1.0625rem] font-medium tracking-tight text-text-on-dark">
        {SITE.shortName}
      </span>
    </span>
  );
}
