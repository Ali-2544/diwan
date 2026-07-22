import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { DemoCta } from "@/components/home/DemoCta";
import { SECURITY_ITEMS } from "@/content/security";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Two-factor authentication, Argon2id password hashing, rotating refresh tokens with reuse detection, httpOnly cookies, granular RBAC and an append-only audit log.",
  alternates: { canonical: "/security" },
};

const STACK = [
  "NestJS 11 API",
  "Next.js 15 App Router",
  "PostgreSQL 16",
  "Redis 7",
  "Prisma 6",
  "BullMQ queues",
  "Docker deploy",
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        image="securityAbstract"
        eyebrow="Security"
        title="Your client list is the business."
        lede="Every contact detail, budget and deal value your brokerage owns sits in this system. This page explains what protects it in plain language first, with the technical detail underneath each point for whoever you forward it to."
      />

      <Section surface="light">
        <SectionHeading
          eyebrow="In plain terms"
          tone="onLight"
          title="Nine things that protect your data"
          lede="Read the top line of each. The smaller grey line below it is there for your IT provider."
        />

        <StaggerGroup className="mt-14 flex flex-col">
          {SECURITY_ITEMS.map((item, index) => (
            <StaggerItem
              key={item.title}
              className="grid gap-3 border-t border-sand-200 py-8 first:border-t-0 first:pt-0 lg:grid-cols-[auto_1fr] lg:gap-8"
            >
              <span className="tabular font-display text-small text-gold-700 lg:pt-1">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex flex-col gap-3">
                <h3 className="font-display text-title font-medium text-text-on-light">
                  {item.title}
                </h3>
                <p className="max-w-2xl text-body text-text-on-light-muted">
                  {item.plain}
                </p>
                {/* Technical detail layer */}
                <p className="max-w-2xl border-l-2 border-sand-200 pl-4 text-small leading-relaxed text-text-on-light-muted">
                  <span className="text-eyebrow uppercase text-gold-700">
                    Technical
                  </span>
                  <span className="mt-1.5 block">{item.technical}</span>
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section surface="dark">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            eyebrow="Built on"
            tone="onDark"
            title="Boring, well-understood infrastructure"
            lede="Nothing exotic. The components below are mature, widely deployed and well documented — which is what you want underneath a system holding your client list."
          />

          <Reveal className="flex flex-col gap-6">
            <ul className="flex flex-wrap gap-2.5">
              {STACK.map((item) => (
                <li
                  key={item}
                  className="rounded-sm border border-ink-700 px-3 py-1.5 text-small text-text-on-dark-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="max-w-lg text-small text-text-on-dark-muted">
              Access is scoped by role at the request level and by tenant at the
              database boundary — so what a user can reach is enforced in two
              independent places, not one.
            </p>
          </Reveal>
        </div>
      </Section>

      <DemoCta />
    </>
  );
}
