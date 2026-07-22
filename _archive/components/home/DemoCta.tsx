import Image from "next/image";
import { CTA } from "@/config/site";
import { IMAGES } from "@/content/images";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Site-wide closing CTA, reused on every page so the primary action is
 * identical everywhere. There is no pricing page by design — pricing is on
 * request, and that is stated here rather than hidden.
 */
export function DemoCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-ink-800 bg-ink-950 py-26 lg:py-34">
      {/* Panoramic skyline, heavily scrimmed so it reads as atmosphere. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={IMAGES.ctaPanorama.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/85 to-ink-950/95" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_50%_100%_at_50%_100%,rgba(201,162,75,0.18),transparent_70%)]" />
      </div>

      <Container className="relative">
        <Reveal className="flex flex-col items-center gap-7 text-center">
          <Eyebrow>Book a demo</Eyebrow>

          <h2 className="max-w-3xl text-balance font-display text-display-lg font-medium text-text-on-dark">
            See it against your own pipeline
          </h2>

          <p className="max-w-xl text-body-lg text-text-on-dark-muted">
            A walkthrough with your listings, your permits and your commission
            structure — not a generic demo tenant.
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <Button href={CTA.primary.href} size="lg">
              {CTA.primary.label}
            </Button>
            <Button href="/features" size="lg" variant="ghost" withArrow>
              Browse the features
            </Button>
          </div>

          <p className="text-small text-text-on-dark-muted">
            {CTA.pricingNote} · Built for Dubai, supported across all seven
            emirates
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
