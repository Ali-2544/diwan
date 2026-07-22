import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BrowserFrameProps = {
  children: ReactNode;
  /** Fake address-bar path, e.g. "app.diwan.ae/dashboard". */
  url: string;
  className?: string;
  /** Chrome dot size — 11px default, 10px on the smaller mockups. */
  small?: boolean;
};

/** Shared browser chrome (traffic lights + centered URL) used by every mockup. */
export function BrowserFrame({ children, url, className, small }: BrowserFrameProps) {
  const dot = small ? "h-2.5 w-2.5" : "h-[11px] w-[11px]";
  return (
    <div
      className={cn(
        "overflow-hidden border border-line bg-white",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 border-b border-line bg-tint",
          small ? "px-4 py-3" : "px-4 py-[13px]",
        )}
      >
        <span aria-hidden className={cn("rounded-full bg-dot-red", dot)} />
        <span aria-hidden className={cn("rounded-full bg-dot-amber", dot)} />
        <span aria-hidden className={cn("rounded-full bg-dot-green", dot)} />
        <span className="ml-3 flex-1 truncate text-center text-[12.5px] font-medium text-muted">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}
