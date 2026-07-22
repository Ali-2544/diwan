import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

/**
 * Deliberately not a social-proof band: no logos, no customer counts, no
 * "trusted by N brokerages". Every figure below is a neutral, verifiable fact
 * about what the product supports.
 */
const FACTS: { value: number; suffix?: string; label: string }[] = [
  { value: 7, label: "Emirates supported" },
  { value: 60, suffix: "+", label: "Permission keys" },
  { value: 6, label: "RERA form types" },
  { value: 2, label: "Listing languages, EN and AR" },
];

export function PositioningStrip() {
  return (
    <section className="border-t border-ink-800 bg-ink-950 py-16 lg:py-22">
      <Container>
        <Reveal>
          <p className="max-w-3xl text-balance font-display text-display-md font-medium text-text-on-dark">
            Not a generic CRM with property fields bolted on.
          </p>
          <p className="mt-4 max-w-2xl text-body text-text-on-dark-muted">
            The domain model is the UAE property market: permits, title deeds,
            Makani coordinates, Ejari, AED with VAT, and the portals your agents
            already live on.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink-800 pt-10 lg:grid-cols-4">
          {FACTS.map((fact) => (
            <StaggerItem key={fact.label} className="flex flex-col gap-2">
              <span className="font-display text-display-lg font-medium text-gold-400">
                <Counter value={fact.value} suffix={fact.suffix} />
              </span>
              <span className="text-small text-text-on-dark-muted">
                {fact.label}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
