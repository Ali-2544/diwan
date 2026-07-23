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

/**
 * Section 4 — domain-model statement + stats, on a dark navy band so it lands
 * as a deliberate contrast beat between the light sections. Numbers count up
 * in gold serif when scrolled into view.
 */
export function StatementStats() {
  return (
    <section className="relative overflow-hidden bg-navy px-5 py-section text-white sm:px-gutter">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[120px] -top-[140px] h-[520px] w-[520px] animate-blob rounded-full"
        style={{
          background: "radial-gradient(circle,rgba(221,176,90,.16),transparent 66%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[160px] left-[-100px] h-[420px] w-[420px] rounded-full"
        style={{
          background: "radial-gradient(circle,rgba(221,176,90,.08),transparent 70%)",
        }}
      />

      <Container className="relative">
        <div className="max-w-prose">
          <Reveal variant="up">
            <Eyebrow tone="gold2">The domain model</Eyebrow>
          </Reveal>
          <Reveal variant="up" delay={60}>
            <h2 className="mt-[22px] font-display text-[clamp(30px,5vw,44px)] font-semibold leading-[1.08] tracking-[-0.01em] text-white">
              Not a generic CRM with property fields bolted on.
            </h2>
          </Reveal>
          <Reveal variant="up" delay={120}>
            <p className="mt-5 text-[18px] leading-[1.6] text-white/70">
              Permits, title deeds, Makani coordinates, Ejari, AED with VAT, and
              the portals your agents already work — modelled as first-class
              records, not custom fields.
            </p>
          </Reveal>
        </div>

        <Reveal
          variant="up"
          delay={120}
          className="mt-16 grid grid-cols-2 gap-y-12 border-t border-white/15 pt-12 md:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={
                i > 0 ? "md:border-l md:border-white/15 md:pl-8" : "md:pr-8"
              }
            >
              <p className="font-display text-[clamp(46px,7vw,68px)] font-semibold leading-none text-gold-2">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-[14.5px] leading-snug text-white/60">
                {s.label}
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
