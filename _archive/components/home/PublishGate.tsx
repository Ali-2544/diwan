"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ListingCard } from "@/components/mockups/ListingCard";
import { cn } from "@/lib/cn";

/**
 * The strongest single argument on the homepage, so it gets an interactive
 * demonstration rather than a description: toggle the permit off and watch the
 * publish control become unavailable.
 */
export function PublishGate() {
  const [published, setPublished] = useState(true);

  return (
    <Section surface="dark" id="publish-gate">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Compliance, enforced"
            tone="onDark"
            title="A listing cannot go live without an active Trakheesi permit."
            lede="Not a reminder. Not a checklist item somebody ticks. The permit is part of the listing record, and the publish action is gated on it."
          />

          <Reveal className="flex flex-col gap-5">
            <ul className="flex flex-col gap-4">
              {[
                "No active permit, no publish — and no route to a portal.",
                "Permits carry issue and expiry dates, status and Madmoun QR.",
                "When a permit expires, the listing delists automatically.",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-body text-text-on-dark-muted">
                  <span
                    aria-hidden="true"
                    className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-gold-500"
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-4">
              <Button href="/why-uae" variant="ghost" withArrow>
                The UAE compliance story
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal variant="fadeIn" className="flex flex-col gap-4">
          {/* Interactive control — the point is to let people break it. */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-eyebrow uppercase text-text-on-dark-muted">
              Try it
            </span>
            <div
              role="group"
              aria-label="Trakheesi permit state"
              className="flex gap-1 rounded-md border border-ink-700 bg-ink-950 p-1"
            >
              {[
                { label: "Permit active", value: true },
                { label: "No permit", value: false },
              ].map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setPublished(option.value)}
                  aria-pressed={published === option.value}
                  className={cn(
                    "rounded-sm px-3 py-1.5 text-small transition-colors duration-200",
                    published === option.value
                      ? "bg-gold-500 font-semibold text-ink-950"
                      : "text-text-on-dark-muted hover:text-text-on-dark",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <ListingCard published={published} />
        </Reveal>
      </div>
    </Section>
  );
}
