"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { BrowserFrame } from "./BrowserFrame";
import { ImageSlot } from "./ImageSlot";
import { cn } from "@/lib/cn";
import type { SlotKey } from "@/content/images";

const TABS: { key: string; label: string; slot: SlotKey; path: string }[] = [
  { key: "leads", label: "Leads", slot: "dash1", path: "leads" },
  { key: "listings", label: "Listings", slot: "dash2", path: "properties" },
  { key: "deals", label: "Deals", slot: "dash3", path: "deals" },
  { key: "calendar", label: "Calendar", slot: "crmCalendar", path: "calendar" },
  { key: "tasks", label: "Tasks", slot: "crmTasks", path: "tasks" },
];

/**
 * Section — an interactive tabbed viewer. Pick a module and the framed
 * screenshot crossfades to it. Complements the fanned deck (overview) with a
 * pick-and-look-closer interaction.
 */
export function DashboardShowcase() {
  const [active, setActive] = useState(TABS[0].key);
  const reduce = useReducedMotion();
  const tab = TABS.find((t) => t.key === active) ?? TABS[0];

  return (
    <section className="relative overflow-hidden px-5 py-section sm:px-gutter">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[60px] h-[480px] w-[880px] max-w-[92vw] -translate-x-1/2 rounded-full blur-[10px]"
        style={{
          background: "radial-gradient(circle,rgba(221,176,90,.12),transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-showcase text-center">
        <Reveal variant="up" className="flex justify-center">
          <Eyebrow centered>See it in action</Eyebrow>
        </Reveal>
        <Reveal variant="up" delay={60}>
          <h2 className="mx-auto mt-5 max-w-[720px] font-display text-[clamp(32px,5vw,48px)] font-semibold leading-[1.05] tracking-[-0.01em] text-ink">
            Pick a module. See the real screen.
          </h2>
        </Reveal>
        <Reveal variant="up" delay={120}>
          <p className="mx-auto mt-[18px] max-w-[560px] text-[18px] leading-[1.6] text-slate">
            The same records, read the same way across every part of the
            business — from first enquiry to final commission.
          </p>
        </Reveal>

        {/* Tabs */}
        <Reveal variant="up" delay={160} className="mt-9 flex justify-center">
          <div
            role="tablist"
            aria-label="Product modules"
            className="flex flex-wrap justify-center gap-1.5 rounded-pill border border-line bg-tint p-1.5"
          >
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={active === t.key}
                onClick={() => setActive(t.key)}
                className={cn(
                  "rounded-pill px-4 py-2 text-[14px] font-semibold transition-all duration-200",
                  active === t.key
                    ? "bg-navy text-white shadow-[0_8px_18px_-10px_rgba(14,42,71,.7)]"
                    : "text-slate hover:text-ink",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Screen */}
      <Reveal variant="img" className="relative mx-auto mt-12 max-w-showcase">
        <BrowserFrame
          url={`app.diwan.ae/${tab.path}`}
          className="rounded-card-lg shadow-showcase"
        >
          <div className="relative h-[clamp(260px,42vw,600px)]">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={tab.key}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                transition={{ duration: reduce ? 0.15 : 0.4, ease: [0.16, 0.8, 0.24, 1] }}
                className="absolute inset-0"
              >
                <ImageSlot
                  slot={tab.slot}
                  className="object-top"
                  sizes="(max-width: 1200px) 100vw, 1120px"
                />
              </m.div>
            </AnimatePresence>
          </div>
        </BrowserFrame>
      </Reveal>
    </section>
  );
}
