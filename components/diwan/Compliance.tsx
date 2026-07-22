"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { BrowserFrame } from "./BrowserFrame";
import { ImageSlot } from "./ImageSlot";
import { cn } from "@/lib/cn";

const BULLETS = [
  "No active permit, no publish — and no route to a portal.",
  "Permits carry issue & expiry dates, status and Madmoun QR.",
  "When a permit expires, the listing delists automatically.",
];

/**
 * Section 7 — interactive Trakheesi permit demo. Local `permit` state drives
 * the badge, permit line, gate note and publish button, exactly as the handoff.
 */
export function Compliance() {
  const [permit, setPermit] = useState<"active" | "none">("active");
  const active = permit === "active";

  return (
    <section id="compliance" className="px-5 py-section sm:px-gutter">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <Reveal variant="up">
            <Eyebrow>Compliance, enforced</Eyebrow>
          </Reveal>
          <Reveal variant="up" delay={60}>
            <h2 className="mt-[22px] font-display text-[clamp(30px,4.6vw,46px)] font-semibold leading-[1.06] tracking-[-0.01em] text-ink">
              A listing cannot go live without an active Trakheesi permit.
            </h2>
          </Reveal>
          <Reveal variant="up" delay={120}>
            <p className="mt-[22px] text-[18px] leading-[1.6] text-slate">
              Not a reminder. Not a checklist item somebody ticks. The permit is
              part of the listing record, and the publish action is gated on it.
            </p>
          </Reveal>
          <Reveal variant="up" delay={160}>
            <ul className="mt-[26px] flex flex-col gap-[14px]">
              {BULLETS.map((b) => (
                <li key={b} className="flex gap-3 text-[15.5px] text-ink">
                  <span className="font-bold text-gold">•</span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Interactive card */}
        <Reveal variant="scale" delay={120}>
          <div className="mb-4 flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
              Try it
            </span>
            <div
              role="group"
              aria-label="Trakheesi permit state"
              className="flex gap-1 rounded-[11px] border border-line bg-tint p-1"
            >
              {[
                { label: "Permit active", value: "active" as const },
                { label: "No permit", value: "none" as const },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPermit(opt.value)}
                  aria-pressed={permit === opt.value}
                  className={cn(
                    "rounded-[9px] px-4 py-[9px] text-[13.5px] font-semibold transition-all duration-200",
                    permit === opt.value
                      ? "bg-navy text-white shadow-[0_6px_16px_-8px_rgba(14,42,71,.7)]"
                      : "bg-transparent text-slate",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <BrowserFrame
            url="app.diwan.ae/listings/DW-04182"
            className="rounded-[20px] shadow-float"
          >
            <div className="relative h-[180px]">
              <ImageSlot slot="complianceListing" sizes="(max-width: 1024px) 100vw, 500px" />
              <span
                className={cn(
                  "absolute right-3 top-3 rounded-lg border px-[11px] py-[5px] text-[11px] font-extrabold tracking-[0.08em] shadow-[0_4px_12px_-6px_rgba(0,0,0,.4)] transition-colors duration-300",
                  active
                    ? "border-green-line bg-green-bg/95 text-green"
                    : "border-danger-line bg-danger-bg/95 text-danger",
                )}
              >
                {active ? "● LIVE" : "● BLOCKED"}
              </span>
            </div>
            <div className="px-5 pb-[22px] pt-[18px]">
              <h3 className="font-display text-[19px] font-semibold text-ink">
                2-BR Apartment · Dubai Marina
              </h3>
              <p className="mt-1.5 text-[12.5px] text-slate">
                Ref DW-04182 · Makani 2648 71453
              </p>
              <p className="mt-[14px] font-display text-[24px] font-semibold text-gold">
                AED 2,450,000
              </p>
              <div className="mt-[14px] flex items-center gap-3 rounded-[12px] border border-gold-soft bg-gradient-to-b from-[#FDFAF2] to-[#FBF6EA] px-[15px] py-[13px]">
                <span className="grid h-[34px] w-[34px] place-items-center rounded-[9px] bg-gold-soft text-base text-gold">
                  🛡
                </span>
                <div className="flex-1">
                  <p className="text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-gold">
                    Trakheesi permit
                  </p>
                  <p className="text-[13.5px] font-semibold text-ink">
                    {active
                      ? "71234567890 · expires 14 Nov 2026"
                      : "No active permit on this listing"}
                  </p>
                </div>
              </div>
              <div className="mt-[14px] flex items-center justify-between gap-3">
                <span className="max-w-[56%] text-[11.5px] text-muted">
                  {active
                    ? "Published to portals · auto-delists on expiry"
                    : "No active permit, no publish — no route to a portal."}
                </span>
                <span
                  className={cn(
                    "rounded-[10px] px-4 py-[9px] text-[13px] font-bold transition-all duration-300",
                    active
                      ? "bg-gradient-to-b from-gold-2 to-gold text-[#3a2a06]"
                      : "cursor-not-allowed bg-[#EEF1F5] text-[#9AA7B5]",
                  )}
                >
                  {active ? "Published" : "Publish blocked"}
                </span>
              </div>
            </div>
          </BrowserFrame>
        </Reveal>
      </Container>
    </section>
  );
}
