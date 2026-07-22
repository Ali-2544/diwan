"use client";

import { m } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { useMotionSafe } from "@/components/motion/useMotionSafe";
import { LeadsPipeline } from "@/components/mockups/LeadsPipeline";

const STEPS = [
  {
    label: "SLA clock",
    detail: "Every new lead starts a speed-to-lead timer the moment it lands.",
  },
  {
    label: "At risk",
    detail: "Approaching the threshold, it's flagged before it's lost.",
  },
  {
    label: "Auto-drop",
    detail: "Untouched past the limit, it releases from the assigned agent.",
  },
  {
    label: "Claim pool",
    detail: "It enters a shared queue any agent can claim from.",
  },
  {
    label: "Claim expiry",
    detail: "Claimed but not worked? It returns to the pool.",
  },
];

export function LifecycleEngine() {
  const { safe, variants } = useMotionSafe();

  return (
    <Section surface="sand" id="lifecycle">
      <SectionHeading
        eyebrow="Lead lifecycle engine"
        tone="onLight"
        title="A lead that nobody works doesn't just sit there"
        lede="The most expensive lead is the one an agent claimed and forgot. The lifecycle engine keeps enquiries moving without a manager chasing anyone."
      />

      {/* Stepper — the gold line draws left to right, nodes light in sequence. */}
      <div className="relative mt-16">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={variants.drawLine}
          aria-hidden="true"
          className="absolute left-0 right-0 top-[0.4375rem] hidden h-px origin-left bg-gradient-to-r from-gold-600 via-gold-500 to-gold-500/20 lg:block"
        />

        <ol className="grid gap-8 lg:grid-cols-5 lg:gap-6">
          {STEPS.map((step, index) => (
            <m.li
              key={step.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={variants.fadeUp}
              transition={safe ? { delay: 0.15 + index * 0.12 } : undefined}
              className="relative flex flex-col gap-3 pl-6 lg:pl-0"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-1 h-2.5 w-2.5 rounded-full border border-gold-600 bg-sand-100 lg:relative lg:left-auto lg:top-auto"
              />
              {/* Mobile connector */}
              <span
                aria-hidden="true"
                className="absolute left-[0.3125rem] top-4 h-[calc(100%+1rem)] w-px bg-gold-600/25 last:hidden lg:hidden"
              />
              <h3 className="font-display text-[1.0625rem] font-medium text-text-on-light">
                {step.label}
              </h3>
              <p className="text-small text-text-on-light-muted">{step.detail}</p>
            </m.li>
          ))}
        </ol>
      </div>

      <Reveal variant="fadeIn" className="mx-auto mt-16 max-w-3xl">
        <LeadsPipeline />
      </Reveal>
    </Section>
  );
}
