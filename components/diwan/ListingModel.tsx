import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { ImageSlot } from "./ImageSlot";
import type { SlotKey } from "@/content/images";

const CARDS: { slot: SlotKey; title: string; body: string; delay: number }[] = [
  {
    slot: "lmReady",
    title: "Ready residential",
    body: "Community, tower, unit and floor — plus the DLD title deed on the record.",
    delay: 0,
  },
  {
    slot: "lmOffplan",
    title: "Off-plan",
    body: "Linked to a project carrying developer, handover date, payment plans and milestones.",
    delay: 80,
  },
  {
    slot: "lmVilla",
    title: "Villas & townhouses",
    body: "Plot size, furnishing and amenities, with EN and AR copy on every listing.",
    delay: 160,
  },
];

/** Section 8 — one listing model (cream band, 3 image-topped cards). */
export function ListingModel() {
  return (
    <section className="border-t border-line bg-cream px-5 py-section sm:px-gutter">
      <Container>
        <div className="mb-[52px] max-w-prose-sm">
          <Reveal variant="up">
            <Eyebrow>One listing model</Eyebrow>
          </Reveal>
          <Reveal variant="up" delay={60}>
            <h2 className="mt-[22px] font-display text-[clamp(30px,5vw,44px)] font-semibold leading-[1.08] text-ink">
              Ready, off-plan and villa stock in the same system
            </h2>
          </Reveal>
          <Reveal variant="up" delay={120}>
            <p className="mt-[18px] text-[18px] leading-[1.6] text-slate">
              Not three different workarounds. One listing record that already
              knows the difference between them.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {CARDS.map((card) => (
            <Reveal key={card.slot} variant="up" delay={card.delay}>
              <div className="overflow-hidden rounded-card border border-line bg-white shadow-card transition-transform duration-300 ease-diwan hover:-translate-y-[5px]">
                <div className="relative h-[200px]">
                  <ImageSlot slot={card.slot} sizes="(max-width: 768px) 100vw, 380px" />
                </div>
                <div className="px-6 pb-[26px] pt-[22px]">
                  <h3 className="font-display text-[22px] font-semibold text-ink">
                    {card.title}
                  </h3>
                  <p className="mt-[10px] text-[14.5px] leading-[1.6] text-slate">
                    {card.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
