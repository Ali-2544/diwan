import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { DemoCta } from "@/components/home/DemoCta";
import { ROADMAP } from "@/content/roadmap";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "What is in progress and not yet in the product: outbound sending, live portal sync, the full mobile app, ML-based scoring, e-signature, government API sync and mortgage calculators.",
  alternates: { canonical: "/roadmap" },
};

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        image="propertyOffplan"
        eyebrow="Roadmap"
        title="What we haven't built yet."
        lede="Software in this category is usually sold on a feature list nobody verifies until after they've signed. This page is the opposite of that: every item below is something the product does not do today."
      />

      <Section surface="light">
        <SectionHeading
          eyebrow="How to read this"
          tone="onLight"
          title="What exists today, and what doesn't"
          lede="Each item shows the part that is genuinely built and working, then the part that isn't. If a capability isn't listed here, it's in the product now — and if you find a claim on this site that contradicts this page, that claim is the mistake."
        />

        <StaggerGroup className="mt-16 flex flex-col">
          {ROADMAP.map((item) => (
            <StaggerItem
              key={item.title}
              className="border-t border-sand-200 py-10 first:border-t-0 first:pt-0"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-display text-display-md font-medium text-text-on-light">
                  {item.title}
                </h2>
                <Pill tone="comingSoon">Coming soon</Pill>
              </div>

              <div className="mt-6 grid gap-8 lg:grid-cols-2">
                <div className="flex flex-col gap-2.5">
                  <span className="text-eyebrow uppercase text-gold-700">
                    Built today
                  </span>
                  <p className="text-body text-text-on-light-muted">{item.today}</p>
                </div>
                <div className="flex flex-col gap-2.5 border-l-2 border-sand-200 pl-6">
                  <span className="text-eyebrow uppercase text-text-on-light-muted">
                    Not yet
                  </span>
                  <p className="text-body text-text-on-light">{item.notYet}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section surface="dark" padding="tight">
        <Reveal className="flex max-w-2xl flex-col gap-5">
          <h2 className="text-balance font-display text-display-md font-medium text-text-on-dark">
            No dates on this page, deliberately.
          </h2>
          <p className="text-body text-text-on-dark-muted">
            A roadmap with confident quarters attached is a roadmap that will be
            wrong. If a specific item on this list is the one that would decide
            it for your brokerage, raise it on the demo and we&rsquo;ll tell you
            honestly where it stands.
          </p>
        </Reveal>
      </Section>

      <DemoCta />
    </>
  );
}
