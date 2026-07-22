import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

const ITEMS = [
  "Outbound email, SMS & WhatsApp sending",
  "Live portal sync with Property Finder, Bayut & Dubizzle",
  "Full mobile app",
  "AI lead scoring & smart matching",
];

/** Section 13 — the honest roadmap (tint band). */
export function Roadmap() {
  return (
    <section id="roadmap" className="border-t border-line bg-tint px-5 py-section sm:px-gutter">
      <Container size="showcase" className="max-w-[1000px]">
        <div className="mb-12 max-w-prose-sm">
          <Reveal variant="up">
            <Eyebrow>On the roadmap</Eyebrow>
          </Reveal>
          <Reveal variant="up" delay={60}>
            <h2 className="mt-[22px] font-display text-[clamp(28px,4.4vw,40px)] font-semibold leading-[1.08] text-ink">
              The honest version
            </h2>
          </Reveal>
          <Reveal variant="up" delay={120}>
            <p className="mt-4 text-[17px] leading-[1.6] text-slate">
              Most software in this category is sold on a feature list nobody
              checks. These are in progress — and not in the product today.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col">
          {ITEMS.map((item, i) => (
            <Reveal
              key={item}
              variant="up"
              className={cn(
                "flex items-baseline gap-4 border-t border-line py-[22px]",
                i === ITEMS.length - 1 && "border-b",
              )}
            >
              <h4 className="flex-1 font-display text-[22px] font-semibold text-ink">
                {item}
              </h4>
              <span className="rounded-pill border border-gold-soft bg-[#FDFAF2] px-3 py-[5px] text-[11px] font-bold tracking-[0.06em] text-gold">
                COMING SOON
              </span>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
