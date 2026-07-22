"use client";

import { m } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollImage } from "@/components/ui/ScrollImage";
import { useMotionSafe } from "@/components/motion/useMotionSafe";
import { ListingCard } from "@/components/mockups/ListingCard";
import { PERMIT_LIFECYCLE } from "@/content/uae";

/**
 * The centrepiece of /why-uae: the permit lifecycle as a vertical timeline,
 * with the gold rule drawing downward as it scrolls into view.
 */
export function PermitLifecycle() {
  const { safe, variants } = useMotionSafe();

  return (
    <Section surface="darkest" id="publish-gate">
      <SectionHeading
        eyebrow="The publish gate"
        tone="onDark"
        title="A listing physically cannot go live without an active permit"
        lede="This is the single most important thing the product does differently. Compliance is enforced by the system, not delegated to whoever is paying attention that week."
      />

      <div className="mt-16 grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Timeline */}
        <ol className="relative flex flex-col">
          {/* The rule that draws downward. */}
          <m.span
            aria-hidden="true"
            initial={safe ? { scaleY: 0 } : { scaleY: 1, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: safe ? 1 : 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-[0.3125rem] top-2 h-[calc(100%-2rem)] w-px origin-top bg-gradient-to-b from-gold-500 via-gold-600 to-gold-600/20"
          />

          {PERMIT_LIFECYCLE.map((step, index) => (
            <m.li
              key={step.stage}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              variants={variants.fadeUp}
              transition={safe ? { delay: index * 0.1 } : undefined}
              className="relative flex flex-col gap-2 pb-10 pl-8 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full border border-gold-500 bg-ink-950"
              />
              <h3 className="font-display text-title font-medium text-text-on-dark">
                {step.stage}
              </h3>
              <p className="max-w-lg text-body text-text-on-dark-muted">
                {step.detail}
              </p>
            </m.li>
          ))}
        </ol>

        <Reveal variant="fadeIn" className="lg:sticky lg:top-28 lg:self-start">
          <ScrollImage
            image="compliancePermit"
            ratio="landscape"
            parallax={12}
            className="mb-8"
            sizes="(max-width: 1024px) 100vw, 520px"
          />
          <ListingCard published />
          <p className="mt-4 text-small text-text-on-dark-muted">
            Permit data is entered and managed in-app. It is not synced from a
            government API — live DLD and Trakheesi integration is on the
            roadmap.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
