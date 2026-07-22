import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { BrowserFrame } from "./BrowserFrame";

const POINTS = [
  {
    title: "Co-broke without the argument",
    body: "Internal splits and external co-brokers, each captured with their BRN, on the deal record itself.",
  },
  {
    title: "VAT handled, not remembered",
    body: "Rules carry rate and VAT percentages — 2% on sale, 5% on rent — configurable per brokerage.",
  },
  {
    title: "A lifecycle, not a status field",
    body: "Every commission moves Pending → Invoiced → Paid, so finance and sales read the same record.",
  },
];

/** Section 11 — commission breakdown card + copy. */
export function Commissions() {
  return (
    <section className="border-t border-line px-5 py-section sm:px-gutter">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        {/* Breakdown card */}
        <Reveal variant="left">
          <BrowserFrame
            url="app.diwan.ae/deals/DW-1187/commissions"
            className="rounded-card shadow-float"
            small
          >
            <div className="p-[22px]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.1em] text-muted">
                    SALE · PALM JUMEIRAH
                  </p>
                  <p className="font-display text-[24px] font-semibold text-ink">
                    AED 4,900,000
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold tracking-[0.1em] text-muted">
                    COMMISSION @ 2%
                  </p>
                  <p className="font-display text-[24px] font-semibold text-gold">
                    AED 98,000
                  </p>
                </div>
              </div>

              <div className="mt-[18px] flex flex-col gap-[10px]">
                <SplitRow
                  side="LISTING SIDE"
                  party="F. Mansour"
                  meta="Internal · BRN 41822"
                  status="PAID"
                  statusClass="bg-green-bg text-green"
                />
                <SplitRow
                  side="SELLING SIDE"
                  party="Horizon Realty"
                  meta="External co-broke · BRN 33914"
                  status="INVOICED"
                  statusClass="bg-amber-bg text-amber"
                />
              </div>

              <div className="mt-[14px] flex flex-col gap-2 border-t border-dashed border-line pt-[14px] text-[13px]">
                <Line label="Net commission" value="AED 49,980" />
                <Line label="VAT @ 5%" value="AED 2,499" />
                <div className="flex justify-between font-display text-[18px] font-semibold text-gold">
                  <span>Total</span>
                  <span>AED 52,479</span>
                </div>
              </div>
            </div>
          </BrowserFrame>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal variant="up">
            <Eyebrow>Deals &amp; commissions</Eyebrow>
          </Reveal>
          <Reveal variant="up" delay={60}>
            <h2 className="mt-[22px] font-display text-[clamp(30px,5vw,44px)] font-semibold leading-[1.06] text-ink">
              The part people actually argue about
            </h2>
          </Reveal>
          <Reveal variant="up" delay={120}>
            <p className="mt-5 text-[17px] leading-[1.6] text-slate">
              Commission is structured data on the deal — not a formula in a
              spreadsheet only one person understands.
            </p>
          </Reveal>
          <Reveal variant="up" delay={160}>
            <div className="mt-7 flex flex-col gap-5">
              {POINTS.map((p) => (
                <div key={p.title} className="border-t border-line pt-[18px]">
                  <h4 className="font-display text-[19px] font-semibold text-ink">
                    {p.title}
                  </h4>
                  <p className="mt-1.5 text-[14.5px] leading-[1.55] text-slate">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function SplitRow({
  side,
  party,
  meta,
  status,
  statusClass,
}: {
  side: string;
  party: string;
  meta: string;
  status: string;
  statusClass: string;
}) {
  return (
    <div className="rounded-[12px] border border-line p-[14px]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10.5px] font-bold tracking-[0.08em] text-muted">{side}</p>
          <p className="text-[14px] font-semibold text-ink">{party}</p>
          <p className="text-[12px] text-slate">{meta}</p>
        </div>
        <span className={`rounded-[7px] px-[10px] py-1 text-[11.5px] font-bold ${statusClass}`}>
          {status}
        </span>
      </div>
      <div className="mt-[10px] flex justify-between text-[12.5px] text-slate">
        <span>Gross AED 49,000 · Split 50%</span>
        <span className="font-bold text-ink">Net AED 24,500</span>
      </div>
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-slate">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
