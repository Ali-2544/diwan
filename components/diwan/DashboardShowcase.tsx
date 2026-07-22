import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { BrowserFrame } from "./BrowserFrame";
import { ImageSlot } from "./ImageSlot";
import { SITE } from "@/config/site";

const TILES = [
  { slot: "dash1", delay: 0 },
  { slot: "dash2", delay: 120 },
  { slot: "dash3", delay: 240 },
] as const;

/** Section 5 — big dashboard screenshot (blur-focus reveal + parallax) + tiles. */
export function DashboardShowcase() {
  return (
    <section className="relative overflow-hidden px-5 pb-[108px] pt-8 sm:px-gutter">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[60px] h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-[10px]"
        style={{
          background: "radial-gradient(circle,rgba(221,176,90,.14),transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-showcase text-center">
        <Reveal variant="up" className="flex justify-center">
          <Eyebrow centered>See it in action</Eyebrow>
        </Reveal>
        <Reveal variant="up" delay={60}>
          <h2 className="mx-auto mt-5 max-w-[720px] font-display text-[clamp(32px,5vw,48px)] font-semibold leading-[1.05] tracking-[-0.01em] text-ink">
            Your entire business in one dashboard
          </h2>
        </Reveal>
        <Reveal variant="up" delay={120}>
          <p className="mx-auto mt-[18px] max-w-[560px] text-[18px] leading-[1.6] text-slate">
            From first enquiry to final commission — leads, listings, permits
            and money on one screen your whole office reads the same way.
          </p>
        </Reveal>
      </div>

      <Parallax speed={0.05} className="relative mx-auto mt-[52px] max-w-showcase">
        <Reveal variant="img">
          <BrowserFrame
            url={`${SITE.appDomain}/dashboard`}
            className="rounded-card-lg shadow-showcase"
          >
            <div className="relative h-[clamp(280px,42vw,600px)]">
              <ImageSlot
                slot="dashHero"
                className="object-top"
                sizes="(max-width: 1200px) 100vw, 1120px"
              />
            </div>
          </BrowserFrame>
        </Reveal>
      </Parallax>

      <div className="mx-auto mt-[26px] grid max-w-showcase gap-[22px] md:grid-cols-3">
        {TILES.map((tile) => (
          <Reveal key={tile.slot} variant="img" delay={tile.delay}>
            <div className="overflow-hidden rounded-card border border-line bg-white shadow-tile">
              <div className="relative h-[240px]">
                <ImageSlot
                  slot={tile.slot}
                  className="object-top"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
