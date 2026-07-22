import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollImage } from "@/components/ui/ScrollImage";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { DemoCta } from "@/components/home/DemoCta";
import { PermitLifecycle } from "@/components/uae/PermitLifecycle";
import { CONTRASTS, RERA_FORMS, VOCABULARY } from "@/content/uae";

export const metadata: Metadata = {
  title: "Why UAE-native",
  description:
    "Trakheesi permit gating, RERA forms, DLD title deeds, Makani, Ejari, BRN and AED with 5% VAT — why a UAE brokerage needs a CRM whose domain model is the local market.",
  alternates: { canonical: "/why-uae" },
};

export default function WhyUaePage() {
  return (
    <>
      <PageHero
        image="compliancePermit"
        eyebrow="Why UAE-native"
        title="Compliance isn't a field. It's the shape of the record."
        lede="Generic CRMs can be bent to fit a Dubai brokerage. The bending is the problem — it puts compliance in a text box and hopes somebody fills it in correctly."
      />

      {/* 1 — The argument */}
      <Section surface="light">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="The difference"
              tone="onLight"
              title="What 'configurable' actually costs you"
              lede="Any CRM can add a custom field. What it can't do is refuse to publish a listing because the value in that field expired last Tuesday."
            />
          </div>

          <StaggerGroup className="flex flex-col">
            {CONTRASTS.map((row) => (
              <StaggerItem
                key={row.generic}
                className="grid gap-4 border-t border-sand-200 py-6 first:border-t-0 first:pt-0 sm:grid-cols-2 sm:gap-8"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-eyebrow uppercase text-text-on-light-muted">
                    Generic CRM
                  </span>
                  <p className="text-small text-text-on-light-muted line-through decoration-sand-400 decoration-1">
                    {row.generic}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-eyebrow uppercase text-gold-700">
                    Built for the UAE
                  </span>
                  <p className="text-small text-text-on-light">{row.native}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Section>

      {/* 2 — The permit lifecycle, the centrepiece */}
      <PermitLifecycle />

      {/* 3 — RERA forms */}
      <Section surface="light" id="rera">
        <SectionHeading
          eyebrow="RERA paperwork"
          tone="onLight"
          title="Six forms, tracked as records"
          lede="Each form carries its status, reference number, signed date and expiry on the deal it belongs to — so 'has the B been signed?' is a lookup, not a phone call."
        />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RERA_FORMS.map((item) => (
            <StaggerItem key={item.form}>
              <Card interactive className="flex h-full flex-col gap-3">
                <h3 className="font-display text-title font-medium text-text-on-light">
                  {item.form}
                </h3>
                <p className="text-small text-text-on-light-muted">{item.use}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-10">
          <p className="max-w-2xl text-small text-text-on-light-muted">
            Signing itself still happens outside the system — e-signature is on
            the roadmap, not in the product.
          </p>
        </Reveal>
      </Section>

      {/* 4 — Money */}
      <Section surface="dark" id="money">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            eyebrow="AED and VAT"
            tone="onDark"
            title="Money that behaves like money"
            lede="Commission maths done in floating point drifts. Over a quarter of co-broke splits, that drift becomes a conversation with finance nobody enjoys."
          />

          <StaggerGroup className="flex flex-col">
            {[
              {
                title: "Fixed-point AED",
                body: "Amounts are stored as Decimal(12,2) rather than floats, so a split of a split still reconciles to the fil.",
              },
              {
                title: "5% VAT as structure",
                body: "VAT sits on the commission record with its own percentage and computed value — not folded into a single total.",
              },
              {
                title: "Rules per deal type",
                body: "Commission rules carry rate and VAT percentages separately for sale and rent, defaulting to 2% and 5% and configurable per brokerage.",
              },
              {
                title: "Co-broke as first-class",
                body: "The external side of a deal is a real party with a name and BRN, carrying its own gross, split and net — not a deduction in a note.",
              },
            ].map((item) => (
              <StaggerItem
                key={item.title}
                className="border-t border-ink-800 py-6 first:border-t-0 first:pt-0"
              >
                <h3 className="font-display text-title font-medium text-text-on-dark">
                  {item.title}
                </h3>
                <p className="mt-2 text-body text-text-on-dark-muted">{item.body}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Section>

      {/* 5 — Vocabulary, opening on a full-width plate */}
      <Section
        surface="sand"
        id="vocabulary"
        containerWidth="wide"
        padding="none"
        className="pt-20 lg:pt-30"
      >
        <ScrollImage image="interiorLobby" ratio="cinema" parallax={16} sizes="100vw" />
      </Section>

      <Section surface="sand">
        <SectionHeading
          eyebrow="The vocabulary"
          tone="onLight"
          title="Terms your team already uses, as real structure"
          lede="If a CRM needs these explained to it, your agents end up translating their job into someone else's data model every day."
        />

        <StaggerGroup className="mt-14 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {VOCABULARY.map((item) => (
            <StaggerItem
              key={item.term}
              className="flex flex-col gap-2 border-t border-sand-200 pt-6"
            >
              <h3 className="font-display text-title font-medium text-text-on-light">
                {item.term}
              </h3>
              <p className="text-small leading-relaxed text-text-on-light-muted">
                {item.meaning}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* 6 — Scope */}
      <Section surface="light" padding="tight">
        <Reveal className="flex flex-col items-start gap-6">
          <Pill tone="goldLight">Coverage</Pill>
          <p className="max-w-3xl text-balance font-display text-display-md font-medium text-text-on-light">
            Dubai-first, and supported across all seven emirates — with a
            bilingual EN/AR product for the teams using it.
          </p>
          <p className="max-w-2xl text-body text-text-on-light-muted">
            Emirate is a field on the lead and the listing, not an assumption
            baked into the schema. The data model already carries a country split
            beyond the UAE.
          </p>
        </Reveal>
      </Section>

      <DemoCta />
    </>
  );
}
