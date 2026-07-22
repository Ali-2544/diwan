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

/** Section 6 — where money leaks (tint band, 2×2 cards). */
export function Problems() {
  return (
    <section className="border-t border-line bg-tint px-5 py-section sm:px-gutter">
      <Container>
        <div className="mb-14 max-w-prose-sm">
          <Reveal variant="up">
            <Eyebrow>Where money leaks</Eyebrow>
          </Reveal>
          <Reveal variant="up" delay={60}>
            <h2 className="mt-[22px] font-display text-[clamp(30px,5vw,44px)] font-semibold leading-[1.08] tracking-[-0.01em] text-ink">
              Small, repeated leaks — and they compound across a month of
              enquiries.
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-[22px] md:grid-cols-2">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} variant="up" delay={i % 2 === 1 ? 80 : 0}>
              <div className="group h-full rounded-card border border-line bg-white px-[30px] pb-7 pt-[30px] shadow-card transition-all duration-300 ease-diwan hover:-translate-y-1 hover:shadow-card-hover">
                <h3 className="font-display text-[23px] font-semibold text-ink">
                  {p.title}
                </h3>
                <p className="mt-[10px] text-[15px] leading-[1.6] text-slate">
                  {p.problem}
                </p>
                <p className="mt-4 border-t border-line pt-4 text-[14.5px] font-semibold text-navy">
                  <span className="text-gold">→ </span>
                  {p.solution}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
