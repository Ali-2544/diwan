import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { CommissionSummary } from "@/components/mockups/CommissionSummary";

const POINTS = [
  {
    title: "Co-broke without the argument",
    body: "Internal splits and external co-brokers, each captured with their BRN, on the deal record itself.",
  },
  {
    title: "VAT handled, not remembered",
    body: "Commission rules carry rate and VAT percentages, with defaults of 2% on sale and 5% on rent — configurable per brokerage.",
  },
  {
    title: "A lifecycle, not a status field",
    body: "Every commission moves Pending → Invoiced → Paid, so finance and sales are reading the same record.",
  },
  {
    title: "AED stored precisely",
    body: "Amounts are held as fixed-point decimals, so splits and VAT don't drift by a fil over a quarter.",
  },
];

export function MoneySection() {
  return (
    <Section surface="dark" id="commissions">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal variant="fadeIn" className="order-2 lg:order-1">
          <CommissionSummary />
        </Reveal>

        <div className="order-1 flex flex-col gap-10 lg:order-2">
          <SectionHeading
            eyebrow="Deals & commissions"
            tone="onDark"
            title="The part people actually argue about"
            lede="Commission is structured data on the deal, not a formula in a spreadsheet that only one person understands."
          />

          <Reveal>
            <dl className="flex flex-col divide-y divide-ink-800">
              {POINTS.map((point) => (
                <div key={point.title} className="py-5 first:pt-0 last:pb-0">
                  <dt className="font-display text-[1.0625rem] font-medium text-text-on-dark">
                    {point.title}
                  </dt>
                  <dd className="mt-1.5 text-body text-text-on-dark-muted">
                    {point.body}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
