import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

const PROBLEMS = [
  {
    title: "Leads rot overnight",
    problem:
      "A portal lead lands at 9pm, nobody calls, and by morning the buyer has viewed with someone else.",
    solution:
      "Speed-to-lead SLA flags at-risk and breached leads, then auto-rotates to the next agent.",
  },
  {
    title: "Compliance risk",
    problem:
      "A listing goes to a portal without a valid Trakheesi permit — or stays up after it expires.",
    solution:
      "A hard publish gate: no active permit, no publish. Listings auto-delist on expiry.",
  },
  {
    title: "No single source of truth",
    problem:
      "Leads live in WhatsApp, listings in spreadsheets, commissions in someone's Excel file.",
    solution:
      "One system for leads, listings, deals and commissions — with an audit trail underneath.",
  },
  {
    title: "Commission disputes",
    problem:
      "Who gets what on a co-broke deal, before or after VAT — and was it ever invoiced?",
    solution:
      "Structured splits, internal & external co-broke, 5% VAT, and a Pending → Invoiced → Paid lifecycle.",
  },
];

/**
 * Section — where money leaks, as an editorial ledger: a sticky heading beside
 * indexed problem → solution rows, each contrasting the leak (muted) with what
 * the system does about it (a highlighted gold-ruled panel).
 */
export function Problems() {
  return (
    <section className="border-t border-line bg-tint px-5 py-section sm:px-gutter">
      <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Sticky heading */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal variant="up">
            <Eyebrow>Where money leaks</Eyebrow>
          </Reveal>
          <Reveal variant="up" delay={60}>
            <h2 className="mt-[22px] font-display text-[clamp(30px,5vw,44px)] font-semibold leading-[1.08] tracking-[-0.01em] text-ink">
              Small, repeated leaks — and they compound across a month of
              enquiries.
            </h2>
          </Reveal>
          <Reveal variant="up" delay={120}>
            <p className="mt-5 max-w-sm text-[17px] leading-[1.6] text-slate">
              Four places a Dubai brokerage quietly loses money — and what
              closes each one.
            </p>
          </Reveal>
        </div>

        {/* Ledger rows */}
        <div className="flex flex-col">
          {PROBLEMS.map((p, i) => (
            <Reveal
              key={p.title}
              variant="up"
              delay={i * 90}
              className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-4 border-t border-line py-8 first:border-t-0 first:pt-0 sm:gap-x-7"
            >
              <span className="font-display text-[clamp(28px,4vw,40px)] font-semibold leading-none text-gold/45">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                <h3 className="font-display text-[clamp(20px,2.4vw,25px)] font-semibold text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-xl text-[15px] leading-[1.6] text-slate">
                  {p.problem}
                </p>

                <div className="mt-4 flex gap-3 rounded-[14px] border border-line bg-white px-4 py-3.5 shadow-card">
                  <span
                    aria-hidden
                    className="mt-0.5 font-display text-[17px] font-semibold text-gold"
                  >
                    →
                  </span>
                  <p className="text-[14.5px] font-semibold leading-[1.55] text-navy">
                    {p.solution}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
