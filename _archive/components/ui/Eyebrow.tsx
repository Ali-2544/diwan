import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  /** Dims the leading rule on light surfaces. */
  tone?: "onDark" | "onLight";
};

/**
 * The recurring section label: a short gold rule followed by uppercase text.
 * Every major section on the site opens with one — it carries most of the
 * page's vertical rhythm on its own.
 */
export function Eyebrow({ children, className, tone = "onDark" }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-eyebrow uppercase",
        tone === "onDark" ? "text-gold-400" : "text-gold-700",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-6 shrink-0",
          tone === "onDark" ? "bg-gold-500/70" : "bg-gold-600/50",
        )}
      />
      {children}
    </p>
  );
}
