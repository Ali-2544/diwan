"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/cn";
import { useMotionSafe } from "@/components/motion/useMotionSafe";
import { BrowserFrame, type MockupProps } from "./BrowserFrame";

type ListingCardProps = MockupProps & {
  /**
   * Drives the publish-gate demonstration.
   * `false` → Draft, publish blocked, no permit on file.
   * `true`  → active Trakheesi permit attached, listing Live.
   */
  published?: boolean;
};

/** Drawn placeholder for the listing's primary photo. */
function PhotoPlaceholder({ dimmed }: { dimmed: boolean }) {
  return (
    <div
      className={cn(
        "relative h-28 overflow-hidden rounded-md border border-ink-700 transition-all duration-500 ease-brand sm:h-32",
        dimmed ? "opacity-50 saturate-0" : "opacity-100",
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 400 140"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="listing-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#241F1A" />
            <stop offset="100%" stopColor="#15120F" />
          </linearGradient>
        </defs>
        <rect width="400" height="140" fill="url(#listing-sky)" />
        {/* Skyline silhouette — suggestive of the product without a stock photo. */}
        <g fill="#0B0A09" opacity="0.85">
          <rect x="20" y="60" width="42" height="80" />
          <rect x="70" y="34" width="30" height="106" />
          <rect x="108" y="72" width="52" height="68" />
          <rect x="168" y="18" width="34" height="122" />
          <rect x="210" y="54" width="44" height="86" />
          <rect x="262" y="80" width="38" height="60" />
          <rect x="308" y="42" width="30" height="98" />
          <rect x="346" y="66" width="40" height="74" />
        </g>
        <g fill="#C9A24B" opacity="0.28">
          {[
            [28, 72], [40, 72], [28, 88], [76, 46], [88, 46], [76, 62], [88, 78],
            [116, 84], [128, 84], [140, 100], [176, 30], [188, 30], [176, 46],
            [188, 62], [218, 66], [230, 66], [242, 82], [270, 92], [282, 92],
            [316, 54], [328, 70], [354, 78], [366, 78], [354, 94],
          ].map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="6" height="8" />
          ))}
        </g>
      </svg>
    </div>
  );
}

/**
 * Listing record with its Trakheesi permit block.
 *
 * The `published` prop exists to demonstrate the publish gate: without an
 * active permit the listing cannot go live or reach a portal. This mirrors real
 * product behaviour — it is enforcement, not a reminder.
 */
export function ListingCard({ className, published = true }: ListingCardProps) {
  const { safe } = useMotionSafe();

  return (
    <BrowserFrame url="app.ddcrm.com/listings/DD-04182" className={className}>
      <div className="flex flex-col gap-4">
        <PhotoPlaceholder dimmed={!published} />

        {/* Title block — bilingual, as listings are in the product. */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-display text-[0.9375rem] font-medium text-text-on-dark">
                2-BR Apartment · Dubai Marina
              </p>
              <p
                dir="rtl"
                lang="ar"
                className="truncate text-[0.8125rem] text-text-on-dark-muted"
              >
                شقة غرفتين · دبي مارينا
              </p>
            </div>
            <StatusPill published={published} />
          </div>

          <div className="tabular flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] text-text-on-dark-muted">
            <span>Ref DD-04182</span>
            <Dot />
            <span>2 bed · 2 bath</span>
            <Dot />
            <span>1,240 sq ft</span>
            <Dot />
            <span>Makani 2648 71453</span>
          </div>
        </div>

        <p className="tabular font-display text-[1.375rem] font-medium text-gold-300">
          AED 2,450,000
        </p>

        {/* Trakheesi permit block — the compliance heart of the record. */}
        <div
          className={cn(
            "rounded-md border p-3 transition-colors duration-500 ease-brand",
            published
              ? "border-gold-500/40 bg-gold-500/[0.07]"
              : "border-dashed border-ink-600 bg-ink-950/40",
          )}
        >
          {published ? (
            <m.div
              key="permit-active"
              initial={safe ? { opacity: 0, y: 6 } : { opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: safe ? 0.45 : 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <ShieldIcon className="h-4 w-4 shrink-0 text-gold-400" />
                <div className="min-w-0">
                  <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-gold-400">
                    Trakheesi permit
                  </p>
                  <p className="tabular truncate text-[0.8125rem] text-text-on-dark">
                    71234567890{" "}
                    <span className="text-text-on-dark-muted">
                      · expires 14 Nov 2026
                    </span>
                  </p>
                </div>
              </div>
              {/* Madmoun QR, drawn rather than generated. */}
              <QrGlyph className="h-9 w-9 shrink-0 text-gold-400/70" />
            </m.div>
          ) : (
            <div className="flex items-center gap-2.5">
              <LockIcon className="h-4 w-4 shrink-0 text-text-on-dark-muted" />
              <div>
                <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-text-on-dark-muted">
                  Trakheesi permit
                </p>
                <p className="text-[0.8125rem] text-text-on-dark-muted">
                  No active permit on file
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Publish control — disabled until the permit exists. */}
        <div className="flex items-center justify-between gap-3 border-t border-ink-800 pt-3">
          <p
            className={cn(
              "text-[0.6875rem] transition-colors duration-500",
              published ? "text-text-on-dark-muted" : "text-status-warn",
            )}
          >
            {published
              ? "Published to portals · auto-delists on permit expiry"
              : "Publishing blocked until a valid permit is attached"}
          </p>
          <span
            className={cn(
              "shrink-0 rounded-sm px-3 py-1.5 text-[0.6875rem] font-semibold transition-all duration-500 ease-brand",
              published
                ? "bg-gold-500 text-ink-950"
                : "cursor-not-allowed bg-ink-800 text-ink-600",
            )}
          >
            {published ? "Published" : "Publish"}
          </span>
        </div>
      </div>
    </BrowserFrame>
  );
}

function StatusPill({ published }: { published: boolean }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-sm border px-2 py-0.5 text-[0.625rem] uppercase tracking-[0.1em] transition-colors duration-500 ease-brand",
        published
          ? "border-status-success/50 bg-status-success/15 text-[#8FBF9F]"
          : "border-ink-600 bg-ink-800 text-text-on-dark-muted",
      )}
    >
      {published ? "Live" : "Draft"}
    </span>
  );
}

function Dot() {
  return (
    <span aria-hidden="true" className="h-0.5 w-0.5 rounded-full bg-ink-600" />
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    >
      <path d="M8 1.5 13 3.5v4.2c0 3-2 5.4-5 6.8-3-1.4-5-3.8-5-6.8V3.5L8 1.5Z" />
      <path d="m5.8 7.9 1.6 1.6 3-3.2" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    >
      <rect x="3.2" y="7" width="9.6" height="7" rx="1.4" />
      <path d="M5.6 7V5a2.4 2.4 0 0 1 4.8 0v2" />
    </svg>
  );
}

function QrGlyph({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M2 2h7v7H2V2Zm2 2v3h3V4H4Zm11-2h7v7h-7V2Zm2 2v3h3V4h-3ZM2 15h7v7H2v-7Zm2 2v3h3v-3H4Z" />
      <path d="M11 11h2v2h-2v-2Zm4 0h2v2h-2v-2Zm4 0h3v2h-3v-2Zm-8 4h2v2h-2v-2Zm4 0h2v2h-2v-2Zm4 0h3v2h-3v-2Zm-8 4h2v3h-2v-3Zm4 0h2v3h-2v-3Zm4 0h3v3h-3v-3ZM11 2v7H9V2h2Z" />
    </svg>
  );
}
