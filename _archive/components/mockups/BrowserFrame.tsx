import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type MockupProps = {
  className?: string;
};

type BrowserFrameProps = {
  children: ReactNode;
  /** Fake address-bar path, e.g. "app.ddcrm.com/leads". */
  url: string;
  className?: string;
  /** Inner padding around the drawn content. Set to false when swapping in a
   *  real screenshot so the image bleeds to the frame edges. */
  padded?: boolean;
};

/**
 * Shared browser chrome for every product mockup.
 *
 * All frame concerns — corner radius, shadow, chrome bar, min-height — live
 * here, so a mockup's internals can be replaced by an <Image> without touching
 * any call site. See README, "Swapping mock dashboards for real screenshots".
 */
export function BrowserFrame({
  children,
  url,
  className,
  padded = true,
}: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-ink-700 bg-ink-900 shadow-frame",
        className,
      )}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-3 border-b border-ink-700 bg-ink-800 px-4 py-3">
        <div aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <span className="max-w-full truncate rounded-sm bg-ink-900 px-3 py-1 text-[0.6875rem] text-text-on-dark-muted">
            {url}
          </span>
        </div>
        {/* Balances the traffic-light dots so the URL stays optically centred. */}
        <div aria-hidden="true" className="w-[42px]" />
      </div>

      <div className={cn("min-h-[260px]", padded && "p-4 sm:p-5")}>{children}</div>
    </div>
  );
}
