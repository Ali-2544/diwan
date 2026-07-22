import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

const PILLARS = [
  {
    title: "Leads",
    body: "Capture, qualify and route every enquiry — with a clock on how fast it gets worked.",
    features: [
      "Speed-to-lead SLA with breach tracking",
      "Auto-drop to a shared claim pool",
      "Round-robin, rules-based and manual assignment",
    ],
  },
  {
    title: "Listings & compliance",
    body: "A UAE listing record with the Trakheesi permit built into it — and a publish gate that enforces it.",
    features: [
      "Hard publish gate on an active permit",
      "Auto-delist when a permit expires",
      "Bilingual EN/AR titles and descriptions",
    ],
  },
  {
    title: "Deals & commissions",
    body: "Pipeline, RERA paperwork and the money — including co-broke and VAT — in one record.",
    features: [
      "Kanban stages with probability",
      "Internal & external co-broke with BRN",
      "Pending → Invoiced → Paid, with 5% VAT",
    ],
  },
  {
    title: "Campaigns",
    body: "Track spend against real leads, and rotate incoming enquiries fairly across an agent pool.",
    features: [
      "Agent pool with round-robin rotation",
      "Hosted capture forms with reCAPTCHA",
      "UTM attribution and aggregated KPIs",
    ],
  },
  {
    title: "Team & permissions",
    body: "Office → team → agent hierarchy, with permissions granular enough to hide a phone number.",
    features: [
      "60+ resource:action permission keys",
      "Read scoping by branch and team",
      "Contact-privacy guard and BRN gate",
    ],
  },
  {
    title: "Insights",
    body: "Where the pipeline actually stands, which sources pay for themselves, and who did what.",
    features: [
      "Dashboard KPIs and lead-source ROI",
      "Per-agent and per-team performance",
      "Append-only audit log with before/after",
    ],
  },
];

/** Section 9 — six pillars (#features). */
export function Pillars() {
  return (
    <section id="features" className="border-t border-line px-5 py-section sm:px-gutter">
      <Container>
        <div className="mb-[52px] max-w-prose-sm">
          <Reveal variant="up">
            <Eyebrow>What&rsquo;s inside</Eyebrow>
          </Reveal>
          <Reveal variant="up" delay={60}>
            <h2 className="mt-[22px] font-display text-[clamp(30px,5vw,44px)] font-semibold leading-[1.08] text-ink">
              Six pillars, one system
            </h2>
          </Reveal>
          <Reveal variant="up" delay={120}>
            <p className="mt-[18px] text-[18px] leading-[1.6] text-slate">
              Leads, listings, deals, campaigns, permissions and reporting —
              sharing one set of records, so the numbers can&rsquo;t disagree
              with each other.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-[22px] md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} variant="up" delay={(i % 3) * 60}>
              <div className="h-full rounded-card border border-line bg-tint p-7 transition-all duration-300 ease-diwan hover:-translate-y-1 hover:border-[#D6DEE8]">
                <h3 className="font-display text-[21px] font-semibold text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-[10px] text-sm leading-[1.55] text-slate">
                  {pillar.body}
                </p>
                <ul className="mt-4 flex flex-col gap-[9px] text-[13.5px] text-navy">
                  {pillar.features.map((f) => (
                    <li key={f}>· {f}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
