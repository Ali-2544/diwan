import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { BrowserFrame } from "./BrowserFrame";
import { ImageSlot } from "./ImageSlot";
import { cn } from "@/lib/cn";
import type { SlotKey } from "@/content/images";

export type Screen = { slot: SlotKey; url: string; caption?: string };

const surfaces = {
  white: "",
  tint: "bg-tint border-t border-line",
  cream: "bg-cream border-t border-line",
} as const;

type ScreenSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  screens: Screen[];
  /** `grid` = row of framed tiles; `big` = one large framed screenshot. */
  variant?: "grid" | "big";
  surface?: keyof typeof surfaces;
  center?: boolean;
};

/**
 * A section that showcases real product screenshots inside browser frames,
 * with the blur-focus image reveal (and parallax on the big variant). Reused
 * across pages to add product imagery. Screens come from the image registry.
 */
export function ScreenSection({
  id,
  eyebrow,
  title,
  subtitle,
  screens,
  variant = "grid",
  surface = "white",
  center = false,
}: ScreenSectionProps) {
  const cols =
    screens.length >= 3 ? "md:grid-cols-3" : screens.length === 2 ? "md:grid-cols-2" : "";

  return (
    <section id={id} className={cn("px-5 py-section sm:px-gutter", surfaces[surface])}>
      <Container size={variant === "big" ? "showcase" : "content"}>
        <div className={cn("max-w-prose", center && "mx-auto text-center")}>
          <Reveal variant="up" className={cn(center && "flex justify-center")}>
            <Eyebrow centered={center}>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal variant="up" delay={60}>
            <h2 className="mt-[22px] font-display text-[clamp(30px,5vw,44px)] font-semibold leading-[1.08] tracking-[-0.01em] text-ink">
              {title}
            </h2>
          </Reveal>
          {subtitle && (
            <Reveal variant="up" delay={120}>
              <p className="mt-[18px] text-[18px] leading-[1.6] text-slate">{subtitle}</p>
            </Reveal>
          )}
        </div>

        {variant === "big" ? (
          <Parallax speed={0.05} className="mt-12">
            <Reveal variant="img">
              <BrowserFrame
                url={screens[0].url}
                className="rounded-card-lg shadow-showcase"
              >
                <div className="relative h-[clamp(300px,46vw,660px)]">
                  <ImageSlot
                    slot={screens[0].slot}
                    className="object-top"
                    sizes="(max-width: 1200px) 100vw, 1120px"
                  />
                </div>
              </BrowserFrame>
            </Reveal>
            {screens[0].caption && (
              <Reveal variant="up" className="mt-5">
                <p className="text-center text-[14.5px] text-muted">
                  {screens[0].caption}
                </p>
              </Reveal>
            )}
          </Parallax>
        ) : (
          <div className={cn("mt-14 grid gap-[22px]", cols)}>
            {screens.map((s, i) => (
              <Reveal key={s.slot} variant="img" delay={i * 120}>
                <figure className="flex flex-col gap-3">
                  <BrowserFrame url={s.url} className="rounded-card shadow-tile" small>
                    <div className="relative h-[260px]">
                      <ImageSlot
                        slot={s.slot}
                        className="object-top"
                        sizes="(max-width: 768px) 100vw, 380px"
                      />
                    </div>
                  </BrowserFrame>
                  {s.caption && (
                    <figcaption className="text-[14px] text-slate">{s.caption}</figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
