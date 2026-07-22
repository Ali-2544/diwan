import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { PILLARS } from "@/content/pillars";

export function Pillars() {
  return (
    <Section surface="light" id="pillars">
      <SectionHeading
        eyebrow="What's inside"
        tone="onLight"
        title="Six pillars, one system"
        lede="Leads, listings, deals, campaigns, permissions and reporting — sharing one set of records, so the numbers can't disagree with each other."
      />

      <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((pillar, index) => (
          <StaggerItem key={pillar.id}>
            <Card
              interactive
              // Alternating blue/gold top bars, echoing the app's KPI cards.
              accent={index % 2 === 0 ? "blue" : "gold"}
              className="flex h-full flex-col gap-4"
            >
              <h3 className="font-display text-title font-medium text-text-on-light">
                {pillar.title}
              </h3>
              <p className="text-body text-text-on-light-muted">{pillar.summary}</p>

              <ul className="flex flex-col gap-2.5 border-t border-sand-200 pt-4">
                {pillar.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2.5 text-small text-text-on-light-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-gold-600"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/features#${pillar.id}`}
                className="mt-auto inline-flex items-center gap-1.5 pt-2 text-small font-medium text-gold-700 transition-colors hover:text-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
              >
                Explore {pillar.title.toLowerCase()}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-[3px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
                </svg>
              </Link>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
