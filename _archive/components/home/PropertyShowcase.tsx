import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollImage } from "@/components/ui/ScrollImage";
import { Reveal } from "@/components/motion/Reveal";
import type { ImageKey } from "@/content/images";

/**
 * The three listing types a Dubai brokerage actually carries, shown as
 * photography. Each caption names real structure in the product rather than
 * making a market claim.
 */
const SHOWCASE: { image: ImageKey; label: string; body: string }[] = [
  {
    image: "propertyMarina",
    label: "Ready residential",
    body: "Community, tower, unit and floor — plus Makani and the DLD title deed on the record.",
  },
  {
    image: "propertyOffplan",
    label: "Off-plan",
    body: "Linked to a project carrying developer, handover date, payment plans and milestones.",
  },
  {
    image: "propertyVilla",
    label: "Villas & townhouses",
    body: "Plot size, furnishing and amenities, with EN and AR copy on every listing.",
  },
];

export function PropertyShowcase() {
  return (
    <Section surface="darkest" id="showcase">
      <SectionHeading
        eyebrow="One listing model"
        tone="onDark"
        title="Ready, off-plan and villa stock in the same system"
        lede="Not three different workarounds. One listing record that already knows the difference between them."
      />

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {SHOWCASE.map((item, index) => (
          <div key={item.label} className="flex flex-col gap-5">
            <ScrollImage
              image={item.image}
              ratio="portrait"
              // Alternating drift so the three frames don't move in lockstep.
              parallax={index === 1 ? 16 : 10}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <Reveal delay={0.05 * index} className="flex flex-col gap-2">
              <h3 className="font-display text-title font-medium text-text-on-dark">
                {item.label}
              </h3>
              <p className="text-small leading-relaxed text-text-on-dark-muted">
                {item.body}
              </p>
            </Reveal>
          </div>
        ))}
      </div>
    </Section>
  );
}
