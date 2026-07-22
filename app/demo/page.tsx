import type { Metadata } from "next";
import { SITE } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { DemoForm } from "@/components/diwan/DemoForm";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "Request a walkthrough of Diwan against your own listings, Trakheesi permits and commission structure. Pricing on request.",
};

const EXPECTATIONS = [
  {
    title: "A walkthrough, not a slide deck",
    body: "We work through your actual process — how a portal lead reaches an agent, what happens when a permit expires, how a co-broke split settles.",
  },
  {
    title: "Straight answers on the roadmap",
    body: "If something you need isn't built yet, we'll say so on the call rather than after you've signed.",
  },
  {
    title: "Pricing on request",
    body: "Pricing depends on team size and configuration. Ask on the call and you'll get a number.",
  },
];

export default function DemoPage() {
  return (
    <section className="relative px-5 pb-[120px] pt-[88px] sm:px-gutter">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-[120px] h-[460px] w-[460px] animate-blob rounded-full blur-[6px]"
        style={{
          background: "radial-gradient(circle,rgba(221,176,90,.22),transparent 68%)",
        }}
      />
      <Container className="relative grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <Reveal variant="up">
            <Eyebrow>Book a demo</Eyebrow>
          </Reveal>
          <Reveal variant="up" delay={60}>
            <h1 className="mt-[22px] font-display text-[clamp(38px,6vw,56px)] font-semibold leading-[1.03] tracking-[-0.015em] text-ink">
              See it against your own pipeline
            </h1>
          </Reveal>
          <Reveal variant="up" delay={120}>
            <p className="mt-5 text-[18px] leading-[1.6] text-slate">
              Tell us a little about your brokerage and we&rsquo;ll arrange a
              walkthrough with your listings, your permits and your commission
              structure — not a generic demo tenant.
            </p>
          </Reveal>
          <Reveal variant="up" delay={160} className="mt-8 flex flex-col divide-y divide-line">
            {EXPECTATIONS.map((item) => (
              <div key={item.title} className="py-5 first:pt-0 last:pb-0">
                <h2 className="font-display text-[19px] font-semibold text-ink">
                  {item.title}
                </h2>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate">
                  {item.body}
                </p>
              </div>
            ))}
          </Reveal>
          <Reveal variant="up" delay={200}>
            <p className="mt-6 text-[14px] text-slate">
              Prefer email?{" "}
              <a
                href={`mailto:${SITE.contactEmail}`}
                className="font-semibold text-gold-text underline underline-offset-4 hover:text-gold-textHover"
              >
                {SITE.contactEmail}
              </a>
            </p>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={120}>
          <DemoForm />
        </Reveal>
      </Container>
    </section>
  );
}
