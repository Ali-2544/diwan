import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollImage } from "@/components/ui/ScrollImage";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { PAIN_POINTS } from "@/content/pain-points";

export function PainPoints() {
  return (
    <Section surface="light" id="problems">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Sticky heading column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="The daily leak"
            tone="onLight"
            title="Where brokerages lose money without noticing"
            lede="None of these are dramatic failures. They are small, repeated leaks — and they compound across a month of enquiries."
          />

          <ScrollImage
            image="teamOffice"
            ratio="landscape"
            parallax={14}
            className="mt-10 hidden lg:block"
            sizes="(max-width: 1024px) 100vw, 420px"
          />
        </div>

        <StaggerGroup className="flex flex-col">
          {PAIN_POINTS.map((point) => (
            <StaggerItem
              key={point.problem}
              className="border-t border-sand-200 py-7 first:border-t-0 first:pt-0"
            >
              <h3 className="font-display text-title font-medium text-text-on-light">
                {point.problem}
              </h3>
              <p className="mt-2 max-w-xl text-body text-text-on-light-muted">
                {point.detail}
              </p>
              <p className="mt-3 flex gap-3 text-body text-text-on-light">
                <ArrowGlyph />
                <span className="max-w-xl">{point.answer}</span>
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}

function ArrowGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="mt-[0.4rem] h-4 w-4 shrink-0 text-gold-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
    </svg>
  );
}
