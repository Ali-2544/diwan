import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollImage } from "@/components/ui/ScrollImage";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { FEATURED_SECURITY } from "@/content/security";

export function SecurityTeaser() {
  return (
    <Section surface="darkest" id="security">
      <SectionHeading
        eyebrow="Security"
        tone="onDark"
        title="Your client list is the business. It's treated that way."
        lede="Contact details, budgets and deal values sit in this system. Here is what protects them — in plain terms, with the technical detail a step below."
      />

      <ScrollImage
        image="securityAbstract"
        ratio="cinema"
        parallax={10}
        scrim="full"
        className="mt-14"
        sizes="100vw"
      />

      <StaggerGroup className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {FEATURED_SECURITY.map((item) => (
          <StaggerItem
            key={item.title}
            className="flex flex-col gap-2 border-t border-ink-800 pt-6"
          >
            <h3 className="font-display text-[1.0625rem] font-medium text-text-on-dark">
              {item.title}
            </h3>
            <p className="text-small leading-relaxed text-text-on-dark-muted">
              {item.plain}
            </p>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal className="mt-12">
        <Button href="/security" variant="ghost" withArrow>
          Read the security overview
        </Button>
      </Reveal>
    </Section>
  );
}
