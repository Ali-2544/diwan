import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/config/site";
import { IMAGES } from "@/content/images";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { DemoForm } from "@/components/contact/DemoForm";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "Request a walkthrough of the CRM against your own listings, Trakheesi permits and commission structure. Pricing on request.",
  alternates: { canonical: "/contact" },
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
    body: "There's no pricing page because pricing depends on team size and configuration. Ask on the call and you'll get a number.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-950 pb-26 pt-30 lg:pb-30 lg:pt-34">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src={IMAGES.interiorLobby.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/95 via-ink-950/90 to-ink-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/40" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-15%] top-[-25%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.09),transparent_65%)]"
        />

        <Container className="relative">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Copy column */}
            <div className="flex flex-col gap-8">
              <Reveal className="flex flex-col gap-6">
                <Eyebrow>Book a demo</Eyebrow>
                <h1 className="text-balance font-display text-display-xl font-medium text-text-on-dark">
                  See it against your own pipeline
                </h1>
                <p className="text-body-lg text-text-on-dark-muted">
                  Tell us a little about your brokerage and we&rsquo;ll arrange a
                  walkthrough with your listings, your permits and your
                  commission structure — not a generic demo tenant.
                </p>
              </Reveal>

              <Reveal delay={0.1} className="flex flex-col divide-y divide-ink-800">
                {EXPECTATIONS.map((item) => (
                  <div key={item.title} className="py-5 first:pt-0 last:pb-0">
                    <h2 className="font-display text-[1.0625rem] font-medium text-text-on-dark">
                      {item.title}
                    </h2>
                    <p className="mt-1.5 text-small leading-relaxed text-text-on-dark-muted">
                      {item.body}
                    </p>
                  </div>
                ))}
              </Reveal>

              <Reveal delay={0.15}>
                <p className="text-small text-text-on-dark-muted">
                  Prefer email?{" "}
                  <a
                    href={`mailto:${SITE.contactEmail}`}
                    className="text-gold-400 underline underline-offset-4 transition-colors hover:text-gold-300"
                  >
                    {SITE.contactEmail}
                  </a>
                </p>
              </Reveal>
            </div>

            {/* Form column */}
            <Reveal variant="fadeIn" delay={0.1}>
              <DemoForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
