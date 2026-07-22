import { CTA } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroBackground } from "./HeroBackground";
import { HeroMockup } from "./HeroMockup";

/**
 * Flowing headline rather than forced line breaks — at this size a fixed
 * three-line structure fragments badly inside the copy column.
 * The accent word is highlighted in gold.
 */
const HEADLINE = "From portal lead to Trakheesi-compliant listing to commission paid.";
const ACCENT_WORD = "Trakheesi-compliant";

const COMPLIANCE_CHIPS = [
  "Trakheesi permit gate",
  "RERA Forms A–U",
  "AED with 5% VAT",
  "Bilingual EN/AR",
];

/**
 * Hero — a server component on purpose.
 *
 * The entrance is a pure CSS animation running from first paint, so the
 * headline never waits on hydration. Only the parallax background and the
 * permit-gate mockup are client islands.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950 pb-20 pt-30 lg:pb-26 lg:pt-34">
      <HeroBackground />

      <Container className="relative w-full">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Copy column */}
          <div className="flex flex-col gap-8">
            <div
              className="animate-rise-delayed"
              style={{ "--rise-delay": "0ms" } as React.CSSProperties}
            >
              <Eyebrow>Built for Dubai brokerages</Eyebrow>
            </div>

            <h1 className="max-w-[16ch] text-balance font-display text-display-xl font-medium text-text-on-dark">
              {HEADLINE.split(" ").map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  className={
                    word === ACCENT_WORD
                      ? "animate-rise-delayed inline-block text-gold-300"
                      : "animate-rise-delayed inline-block"
                  }
                  style={{ "--rise-delay": `${80 + index * 45}ms` } as React.CSSProperties}
                >
                  {word}
                  &nbsp;
                </span>
              ))}
            </h1>

            <p
              className="animate-rise-delayed max-w-lg text-body-lg text-text-on-dark-muted"
              style={{ "--rise-delay": "620ms" } as React.CSSProperties}
            >
              A CRM whose domain model{" "}
              <em className="not-italic text-text-on-dark">is</em> the UAE property
              market — permits, title deeds, Makani, Ejari, co-broke splits — not a
              generic sales tool with property fields bolted on.
            </p>

            <div
              className="animate-rise-delayed flex flex-wrap items-center gap-4"
              style={{ "--rise-delay": "700ms" } as React.CSSProperties}
            >
              <Button href={CTA.primary.href} size="lg">
                {CTA.primary.label}
              </Button>
              <Button href={CTA.secondary.href} size="lg" variant="ghost" withArrow>
                {CTA.secondary.label}
              </Button>
            </div>

            <div
              className="animate-rise-delayed flex flex-col gap-5 pt-2"
              style={{ "--rise-delay": "780ms" } as React.CSSProperties}
            >
              <span
                aria-hidden="true"
                className="h-px w-full max-w-sm bg-gradient-to-r from-gold-500/60 to-transparent"
              />
              <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
                {COMPLIANCE_CHIPS.map((chip) => (
                  <li
                    key={chip}
                    className="flex items-center gap-2 text-small text-text-on-dark-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-gold-500"
                    />
                    {chip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <HeroMockup />
        </div>
      </Container>

      <ScrollCue />
    </section>
  );
}

/** Quiet affordance that there is more below the fold. */
function ScrollCue() {
  return (
    <div
      aria-hidden="true"
      className="animate-rise-delayed absolute inset-x-0 bottom-7 hidden justify-center lg:flex"
      style={{ "--rise-delay": "1100ms" } as React.CSSProperties}
    >
      <span className="flex flex-col items-center gap-2.5">
        <span className="text-[0.625rem] uppercase tracking-[0.2em] text-text-on-dark-muted">
          Scroll
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-ink-700">
          <span className="animate-scroll-cue absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-gold-500 to-transparent" />
        </span>
      </span>
    </div>
  );
}
