import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { FEATURED_ROADMAP } from "@/content/roadmap";

/**
 * Placed deliberately before the demo CTA. Saying plainly what isn't built is
 * what earns the rest of the page its credibility — and it is why this site
 * needs no testimonials or customer logos.
 */
export function RoadmapTeaser() {
  return (
    <Section surface="light" id="roadmap">
      <SectionHeading
        eyebrow="Coming soon"
        tone="onLight"
        title="What we haven't built yet"
        lede="Most software in this category is sold on a feature list nobody checks. Here is the honest version — these are in progress, and they are not in the product today."
      />

      <StaggerGroup className="mt-14 flex flex-col">
        {FEATURED_ROADMAP.map((item) => (
          <StaggerItem
            key={item.title}
            className="border-t border-sand-200 py-7 first:border-t-0 first:pt-0"
          >
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-display text-title font-medium text-text-on-light">
                {item.title}
              </h3>
              <Pill tone="comingSoon">Coming soon</Pill>
            </div>
            <p className="mt-3 max-w-2xl text-body text-text-on-light-muted">
              {item.notYet}
            </p>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal className="mt-12">
        <Button href="/roadmap" variant="ghostLight" withArrow>
          See the full roadmap
        </Button>
      </Reveal>
    </Section>
  );
}
