import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";

const STATS = [
  { value: 7, suffix: "", label: "Emirates supported" },
  { value: 60, suffix: "+", label: "Permission keys" },
  { value: 6, suffix: "", label: "RERA form types" },
  { value: 2, suffix: "", label: "Listing languages, EN & AR" },
];

/** Section 4 — domain-model statement + count-up stats. */
export function StatementStats() {
  return (
    <section className="px-5 py-section sm:px-gutter">
      <Container>
        <div className="max-w-prose">
          <Reveal variant="up">
            <Eyebrow>The domain model</Eyebrow>
          </Reveal>
          <Reveal variant="up" delay={60}>
            <h2 className="mt-[22px] font-display text-[clamp(30px,5vw,44px)] font-semibold leading-[1.08] tracking-[-0.01em] text-ink">
              Not a generic CRM with property fields bolted on.
            </h2>
          </Reveal>
          <Reveal variant="up" delay={120}>
            <p className="mt-5 text-[18px] leading-[1.6] text-slate">
              Permits, title deeds, Makani coordinates, Ejari, AED with VAT, and
              the portals your agents already work — modelled as first-class
              records, not custom fields.
            </p>
          </Reveal>
        </div>

        <Reveal
          variant="up"
          delay={120}
          className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-10 md:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-[clamp(40px,6vw,56px)] font-semibold leading-none text-gold">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-[10px] text-[14.5px] text-slate">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
