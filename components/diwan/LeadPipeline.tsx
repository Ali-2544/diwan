"use client";

import {
  m,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

const STEPS = [
  { title: "SLA clock", body: "Every new lead starts a speed-to-lead timer the moment it lands." },
  { title: "At risk", body: "Approaching the threshold, it's flagged before it's lost." },
  { title: "Auto-drop", body: "Untouched past the limit, it releases from the assigned agent." },
  { title: "Claim pool", body: "It enters a shared queue any agent can claim from." },
  { title: "Claim expiry", body: "Claimed but not worked? It returns to the pool." },
];

/**
 * Animated lead-lifecycle timeline. As the section scrolls into view a gold
 * track draws left→right, a live "lead" chip travels along it, and each stage
 * node ignites as the chip reaches it. Reduced motion renders the finished,
 * fully-drawn state.
 */
export function LeadPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.55"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.5,
    restDelta: 0.001,
  });

  const lineScale = useTransform(p, [0, 1], reduce ? [1, 1] : [0, 1]);
  const chipLeft = useTransform(p, [0.04, 0.96], ["0%", "100%"]);
  // Reduced motion hides the travelling chip entirely.
  const chipOpacity = useTransform(p, [0, 0.05, 0.9, 1], reduce ? [0, 0, 0, 0] : [0, 1, 1, 0.85]);

  return (
    <section className="border-t border-line bg-tint px-5 py-section sm:px-gutter">
      <Container>
        <div className="max-w-prose">
          <Reveal variant="up">
            <Eyebrow>Lead lifecycle engine</Eyebrow>
          </Reveal>
          <Reveal variant="up" delay={60}>
            <h2 className="mt-[22px] font-display text-[clamp(30px,5vw,44px)] font-semibold leading-[1.06] tracking-[-0.01em] text-ink">
              A lead that nobody works doesn&rsquo;t just sit there
            </h2>
          </Reveal>
          <Reveal variant="up" delay={120}>
            <p className="mt-5 text-[18px] leading-[1.6] text-slate">
              The most expensive lead is the one an agent claimed and forgot. The
              lifecycle engine keeps enquiries moving without a manager chasing
              anyone.
            </p>
          </Reveal>
        </div>

        {/* Desktop animated track */}
        <div ref={ref} className="relative mt-24 hidden lg:block">
          {/* Base + gold progress line */}
          <div className="absolute inset-x-0 top-0 h-[3px] rounded-full bg-line" />
          <m.div
            style={{ scaleX: lineScale }}
            className="absolute inset-x-0 top-0 h-[3px] origin-left rounded-full bg-gradient-to-r from-gold to-gold-2"
          />

          {/* Travelling lead chip */}
          <m.div
            style={{ left: chipLeft, opacity: chipOpacity }}
            className="absolute -top-[52px] z-10 -translate-x-1/2"
          >
            <div className="flex items-center gap-2 whitespace-nowrap rounded-pill border border-gold-soft bg-white px-3 py-1.5 shadow-float">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-navy text-[9px] font-bold text-white">
                AR
              </span>
              <span className="text-[12.5px] font-semibold text-ink">A. Rahman</span>
              <span className="rounded-[6px] bg-green-bg px-1.5 py-0.5 text-[11px] font-bold text-green">
                4m
              </span>
            </div>
            <span className="absolute -bottom-[7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-gold-soft bg-white" />
          </m.div>

          {/* Stage nodes */}
          <div className="grid grid-cols-5">
            {STEPS.map((s, i) => (
              <Node
                key={s.title}
                p={p}
                reduce={!!reduce}
                threshold={i / (STEPS.length - 1)}
                step={s}
              />
            ))}
          </div>
        </div>

        {/* Mobile / tablet stacked timeline */}
        <div className="mt-14 flex flex-col gap-0 lg:hidden">
          {STEPS.map((s, i) => (
            <Reveal
              key={s.title}
              variant="up"
              delay={i * 80}
              className="relative flex gap-4 pb-8 last:pb-0"
            >
              <div className="flex flex-col items-center">
                <span className="mt-1 h-3.5 w-3.5 rounded-full border-2 border-gold bg-white" />
                {i < STEPS.length - 1 && <span className="mt-1 w-[2px] flex-1 bg-gold/30" />}
              </div>
              <div>
                <h3 className="font-display text-[19px] font-semibold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-[1.55] text-slate">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Node({
  p,
  reduce,
  threshold,
  step,
}: {
  p: MotionValue<number>;
  reduce: boolean;
  threshold: number;
  step: { title: string; body: string };
}) {
  // Node ignites as the travelling chip passes it.
  const active = useTransform(p, [threshold - 0.04, threshold + 0.02], reduce ? [1, 1] : [0, 1]);
  const dotScale = useTransform(active, [0, 1], [1, 1.25]);
  const ringOpacity = useTransform(active, [0, 1], [0, 0.5]);
  const titleColor = useTransform(active, [0, 1], ["#56697E", "#0E2A47"]);

  return (
    <div className="relative flex flex-col items-center px-3 text-center">
      {/* Dot sits on the line (line is at container top). */}
      <m.span
        style={{ scale: dotScale }}
        className="absolute -top-[7px] grid h-[17px] w-[17px] place-items-center rounded-full border-2 border-gold bg-white"
      >
        <m.span style={{ opacity: ringOpacity }} className="h-1.5 w-1.5 rounded-full bg-gold" />
      </m.span>

      <m.h3
        style={{ color: titleColor }}
        className="mt-9 font-display text-[19px] font-semibold"
      >
        {step.title}
      </m.h3>
      <p className="mt-2 max-w-[13rem] text-[13.5px] leading-[1.5] text-slate">{step.body}</p>
    </div>
  );
}
