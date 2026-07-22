import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { BrowserFrame } from "./BrowserFrame";
import { ImageSlot } from "./ImageSlot";

const PILLS = [
  "Trakheesi permit gate",
  "RERA Forms A–U",
  "AED with 5% VAT",
  "Bilingual EN / AR",
];

export function Hero() {
  return (
    <header id="top" className="relative px-5 pb-10 pt-[88px] sm:px-gutter">
      {/* Soft drifting background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-[120px] h-[520px] w-[520px] animate-blob rounded-full blur-[6px]"
        style={{
          background:
            "radial-gradient(circle at 40% 40%,rgba(221,176,90,.28),rgba(221,176,90,0) 68%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[140px] top-[120px] h-[460px] w-[460px] animate-blob-slow rounded-full blur-[4px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%,rgba(14,42,71,.10),rgba(14,42,71,0) 70%)",
        }}
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* Copy */}
        <div>
          <Reveal variant="up">
            <Eyebrow>Built for Dubai brokerages</Eyebrow>
          </Reveal>
          <Reveal variant="up" delay={60}>
            <h1 className="mt-[26px] font-display text-[clamp(40px,7vw,66px)] font-semibold leading-[1.02] tracking-[-0.015em] text-ink">
              From portal lead to{" "}
              <em className="text-gold-gradient not-italic [font-style:italic]">
                Trakheesi-compliant
              </em>{" "}
              listing to commission paid.
            </h1>
          </Reveal>
          <Reveal variant="up" delay={120}>
            <p className="mt-[26px] max-w-[520px] text-[19px] leading-[1.6] text-slate">
              One system whose domain model{" "}
              <em className="font-semibold not-italic text-ink">is</em> the UAE
              property market — permits, title deeds, Makani, Ejari, co-broke
              splits. Not a generic sales tool with property fields bolted on.
            </p>
          </Reveal>
          <Reveal variant="up" delay={180}>
            <div className="mt-[34px] flex flex-wrap gap-[14px]">
              <Button href="/demo">Book a demo</Button>
              <Button href="/features" variant="outline">
                See how it works →
              </Button>
            </div>
          </Reveal>
          <Reveal variant="up" delay={240}>
            <div className="mt-[34px] flex flex-wrap gap-[10px]">
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
        </div>

        {/* Floating listing card */}
        <Reveal variant="scale" delay={120} className="relative">
          <div className="animate-floaty">
            <div
              aria-hidden
              className="absolute inset-[14px] translate-y-[22px] rounded-card-lg blur-[28px]"
              style={{
                background:
                  "linear-gradient(160deg,rgba(221,176,90,.25),rgba(14,42,71,.08))",
              }}
            />
            <BrowserFrame
              url="app.diwan.ae/listings/DW-04182"
              className="relative rounded-[20px] shadow-hero"
            >
              <div className="relative h-[190px]">
                <ImageSlot
                  slot="heroListing"
                  priority
                  sizes="(max-width: 1024px) 100vw, 460px"
                />
                <span className="absolute right-3 top-3 rounded-lg bg-white/[0.92] px-[11px] py-[5px] text-[11px] font-extrabold tracking-[0.08em] text-green shadow-[0_4px_12px_-6px_rgba(0,0,0,.4)]">
                  ● LIVE
                </span>
              </div>
              <div className="px-5 pb-[22px] pt-[18px]">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-[20px] font-semibold text-ink">
                    2-BR Apartment · Dubai Marina
                  </h3>
                  <span dir="rtl" className="text-[13px] text-muted">
                    شقة غرفتين · دبي مارينا
                  </span>
                </div>
                <div className="mt-[10px] flex flex-wrap gap-[14px] text-[12.5px] text-slate">
                  <span>Ref DW-04182</span>
                  <span>· 2 bed · 2 bath</span>
                  <span>· 1,240 sq ft</span>
                  <span>· Makani 2648 71453</span>
                </div>
                <p className="mt-4 font-display text-[26px] font-semibold text-gold">
                  AED 2,450,000
                </p>
                <div className="mt-4 flex items-center gap-3 rounded-[12px] border border-gold-soft bg-gradient-to-b from-[#FDFAF2] to-[#FBF6EA] px-[15px] py-[13px]">
                  <span className="grid h-[34px] w-[34px] place-items-center rounded-[9px] bg-gold-soft text-base text-gold">
                    🛡
                  </span>
                  <div className="flex-1">
                    <p className="text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-gold">
                      Trakheesi permit
                    </p>
                    <p className="text-[13.5px] font-semibold text-ink">
                      71234567890 · expires 14 Nov 2026
                    </p>
                  </div>
                  <QrGlyph />
                </div>
                <div className="mt-[14px] flex items-center justify-between gap-3">
                  <span className="text-[12px] text-muted">
                    Published to portals · auto-delists on expiry
                  </span>
                  <span className="rounded-[10px] bg-gradient-to-b from-gold-2 to-gold px-[18px] py-[9px] text-[13px] font-bold text-[#3a2a06]">
                    Published
                  </span>
                </div>
              </div>
            </BrowserFrame>
          </div>
        </Reveal>
      </Container>
    </header>
  );
}

/** Tiny 3×3 QR glyph from the reference. */
function QrGlyph() {
  const on = "h-1 w-1 bg-navy";
  const off = "h-1 w-1 bg-transparent";
  const pattern = [1, 1, 0, 0, 1, 1, 1, 0, 1];
  return (
    <div aria-hidden className="grid grid-cols-3 gap-[3px] opacity-60">
      {pattern.map((v, i) => (
        <span key={i} className={v ? on : off} />
      ))}
    </div>
  );
}
