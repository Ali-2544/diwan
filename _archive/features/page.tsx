import type { Metadata } from "next";
import { PILLARS } from "@/content/pillars";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { DemoCta } from "@/components/home/DemoCta";
import { LeadsPipeline } from "@/components/mockups/LeadsPipeline";
import { ListingCard } from "@/components/mockups/ListingCard";
import { CommissionSummary } from "@/components/mockups/CommissionSummary";
import { PillarNav } from "@/components/features/PillarNav";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Leads, listings and compliance, deals and commissions, campaigns, team permissions and insights — the six pillars of a CRM built for UAE brokerages.",
  alternates: { canonical: "/features" },
};

/** Mockups are attached to the three pillars they genuinely illustrate. */
const PILLAR_MOCKUPS: Record<string, React.ReactNode> = {
  leads: <LeadsPipeline />,
  listings: <ListingCard published />,
  deals: <CommissionSummary />,
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        image="propertyMarina"
        eyebrow="Features"
        title="Everything a UAE brokerage runs on, in one system."
        lede="Six pillars sharing one set of records. Every capability below is in the product today — what isn't yet is on the roadmap, clearly marked."
      >
        <PillarNav />
      </PageHero>

      {PILLARS.map((pillar, index) => {
        const isDark = index % 2 === 1;
        const mockup = PILLAR_MOCKUPS[pillar.id];

        return (
          <Section
            key={pillar.id}
            id={pillar.id}
            surface={isDark ? "dark" : "light"}
          >
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              {/* Heading column */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Reveal className="flex flex-col gap-5">
                  <span
                    className={cn(
                      "tabular font-display text-small",
                      isDark ? "text-gold-400" : "text-gold-700",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2
                    className={cn(
                      "text-balance font-display text-display-lg font-medium",
                      isDark ? "text-text-on-dark" : "text-text-on-light",
                    )}
                  >
                    {pillar.title}
                  </h2>
                  <p
                    className={cn(
                      "text-body-lg",
                      isDark ? "text-text-on-dark-muted" : "text-text-on-light-muted",
                    )}
                  >
                    {pillar.body}
                  </p>
                </Reveal>

                {mockup && (
                  <Reveal variant="fadeIn" className="mt-10 hidden lg:block">
                    {mockup}
                  </Reveal>
                )}
              </div>

              {/* Capability list */}
              <StaggerGroup as="ul" className="flex flex-col">
                {pillar.detail.map((line) => (
                  <StaggerItem
                    as="li"
                    key={line}
                    className={cn(
                      "flex gap-4 border-t py-5 first:border-t-0 first:pt-0",
                      isDark ? "border-ink-800" : "border-sand-200",
                    )}
                  >
                    <CheckGlyph isDark={isDark} />
                    <span
                      className={cn(
                        "text-body",
                        isDark ? "text-text-on-dark-muted" : "text-text-on-light-muted",
                      )}
                    >
                      {line}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerGroup>

              {mockup && (
                <Reveal variant="fadeIn" className="lg:hidden">
                  {mockup}
                </Reveal>
              )}
            </div>
          </Section>
        );
      })}

      <DemoCta />
    </>
  );
}

function CheckGlyph({ isDark }: { isDark: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={cn(
        "mt-[0.3rem] h-4 w-4 shrink-0",
        isDark ? "text-gold-500" : "text-gold-600",
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 8.5 3.2 3.2L13 4.8" />
    </svg>
  );
}
