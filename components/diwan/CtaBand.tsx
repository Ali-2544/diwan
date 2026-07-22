import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

/** Section 14 — navy gradient CTA band. */
export function CtaBand() {
  return (
    <section
      id="demo"
      className="relative overflow-hidden bg-gradient-to-br from-navy-2 to-navy px-5 py-[120px] text-white sm:px-gutter"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[160px] left-1/2 h-[640px] w-[640px] -translate-x-1/2 animate-blob rounded-full"
        style={{
          background: "radial-gradient(circle,rgba(221,176,90,.22),transparent 66%)",
        }}
      />
      <div className="relative mx-auto max-w-prose text-center">
        <Reveal variant="up" className="flex justify-center">
          <Eyebrow tone="gold2" centered>
            Book a demo
          </Eyebrow>
        </Reveal>
        <Reveal variant="up" delay={60}>
          <h2 className="mt-[22px] font-display text-[clamp(34px,5.4vw,54px)] font-semibold leading-[1.04] text-white">
            See it against your own pipeline
          </h2>
        </Reveal>
        <Reveal variant="up" delay={120}>
          <p className="mt-5 text-[18px] leading-[1.6] text-white/75">
            A walkthrough with your listings, your permits and your commission
            structure — not a generic demo tenant.
          </p>
        </Reveal>
        <Reveal variant="up" delay={180}>
          <div className="mt-[34px] flex flex-wrap justify-center gap-[14px]">
            <Button href="/demo">Book a demo</Button>
            <Button href="/features" variant="outlineDark">
              Browse the features →
            </Button>
          </div>
        </Reveal>
        <Reveal variant="up" delay={240}>
          <p className="mt-[26px] text-[13.5px] text-white/55">
            Pricing on request · Built for Dubai, supported across all seven
            emirates
          </p>
        </Reveal>
      </div>
    </section>
  );
}
