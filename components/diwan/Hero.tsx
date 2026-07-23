import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { HeroDashboard } from "./HeroDashboard";

const PILLS = [
  "Trakheesi permit gate",
  "RERA Forms A–U",
  "AED with 5% VAT",
  "Bilingual EN / AR",
];

/**
 * Hero — centred editorial layout with the product dashboard presented large
 * beneath the copy (the showcase treatment), rather than a small side card.
 * The headline is the LCP element; the screenshot loads with priority.
 */
export function Hero() {
  return (
    <header
      id="top"
      className="relative overflow-hidden px-5 pb-[104px] pt-[92px] sm:px-gutter"
    >
      {/* Soft drifting background blobs + a wide gold bloom behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-[140px] h-[540px] w-[540px] animate-blob rounded-full blur-[6px]"
        style={{
          background:
            "radial-gradient(circle at 40% 40%,rgba(221,176,90,.26),rgba(221,176,90,0) 68%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[160px] top-[140px] h-[460px] w-[460px] animate-blob-slow rounded-full blur-[4px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%,rgba(14,42,71,.10),rgba(14,42,71,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[40px] h-[520px] w-[980px] max-w-[95vw] -translate-x-1/2 rounded-full blur-[10px]"
        style={{
          background: "radial-gradient(circle,rgba(221,176,90,.16),transparent 70%)",
        }}
      />

      {/* Centred copy */}
      <Container size="showcase" className="relative text-center">
        <Reveal variant="up" className="flex justify-center">
          <Eyebrow centered>Built for Dubai brokerages</Eyebrow>
        </Reveal>

        <Reveal variant="up" delay={60}>
          <h1 className="mx-auto mt-6 max-w-[980px] text-balance font-display text-[clamp(38px,6.2vw,64px)] font-semibold leading-[1.04] tracking-[-0.015em] text-ink">
            From portal lead to{" "}
            <em className="text-gold-gradient not-italic [font-style:italic]">
              Trakheesi-compliant
            </em>{" "}
            listing to commission paid.
          </h1>
        </Reveal>

        <Reveal variant="up" delay={120}>
          <p className="mx-auto mt-6 max-w-[620px] text-[18px] leading-[1.6] text-slate">
            One system whose domain model{" "}
            <em className="font-semibold not-italic text-ink">is</em> the UAE
            property market — permits, title deeds, Makani, Ejari, co-broke
            splits. Not a generic sales tool with property fields bolted on.
          </p>
        </Reveal>

        <Reveal variant="up" delay={180}>
          <div className="mt-9 flex flex-wrap justify-center gap-[14px]">
            <Button href="/demo">Book a demo</Button>
            <Button href="/features" variant="outline">
              See how it works →
            </Button>
          </div>
        </Reveal>

        <Reveal variant="up" delay={240}>
          <div className="mt-8 flex flex-wrap justify-center gap-[10px]">
            {PILLS.map((pill) => (
              <span
                key={pill}
                className="rounded-pill border border-line bg-tint px-[14px] py-2 text-[13px] font-semibold text-navy"
              >
                {pill}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>

      {/* The product, shown large — unfolds from a 3D tilt as you scroll in */}
      <HeroDashboard />
    </header>
  );
}
