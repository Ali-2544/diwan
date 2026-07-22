import { cn } from "@/lib/cn";
import { SITE } from "@/config/site";

/** Gold-on-navy "D" monogram + "Diwan" wordmark (Newsreader). */
export function Logo({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span
        aria-hidden
        className={cn(
          "grid h-[38px] w-[38px] place-items-center rounded-[11px] bg-gradient-to-br from-navy-2 to-navy font-display text-[19px] font-semibold tracking-[0.02em] text-gold-2",
          onDark && "border border-white/[0.14]",
        )}
      >
        D
      </span>
      <span
        className={cn(
          "font-display text-[22px] font-semibold tracking-[0.01em]",
          onDark ? "text-white" : "text-ink",
        )}
      >
        {SITE.name}
      </span>
    </span>
  );
}
