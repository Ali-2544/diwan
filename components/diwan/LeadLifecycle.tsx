import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { BrowserFrame } from "./BrowserFrame";
import { cn } from "@/lib/cn";

const STEPS = [
  { title: "SLA clock", body: "Every new lead starts a speed-to-lead timer the moment it lands." },
  { title: "At risk", body: "Approaching the threshold, it's flagged before it's lost." },
  { title: "Auto-drop", body: "Untouched past the limit, it releases from the assigned agent." },
  { title: "Claim pool", body: "It enters a shared queue any agent can claim from." },
  { title: "Claim expiry", body: "Claimed but not worked? It returns to the pool." },
];

const STATS = [
  { label: "NEW", value: "12", highlight: true },
  { label: "CONTACTED", value: "8" },
  { label: "QUALIFIED", value: "5" },
  { label: "VIEWING", value: "3" },
];

type Chip = "green" | "amber" | "danger" | "gold";
const ROWS: { name: string; source: string; budget: string; sla: string; chip: Chip }[] = [
  { name: "A. Rahman", source: "Property Finder", budget: "AED 1.8M", sla: "4m", chip: "green" },
  { name: "S. Iyer", source: "Bayut", budget: "AED 3.2M", sla: "11m", chip: "green" },
  { name: "M. Al Suwaidi", source: "Website form", budget: "AED 6.5M", sla: "26m", chip: "amber" },
  { name: "L. Novak", source: "Dubizzle", budget: "AED 950K", sla: "1h 12m", chip: "danger" },
  { name: "K. Haddad", source: "Referral", budget: "AED 2.1M", sla: "Claimable", chip: "gold" },
];

const CHIP: Record<Chip, string> = {
  green: "bg-green-bg text-green",
  amber: "bg-amber-bg text-amber",
  danger: "bg-danger-bg text-danger",
  gold: "bg-gold-soft text-gold",
};

const COLS = "grid-cols-[1.4fr_1.2fr_1fr_0.9fr]";

/** Section 10 — lead lifecycle timeline + leads table mockup (tint band). */
export function LeadLifecycle() {
  return (
    <section className="border-t border-line bg-tint px-5 py-section sm:px-gutter">
      <Container>
        <div className="mb-12 max-w-prose">
          <Reveal variant="up">
            <Eyebrow>Lead lifecycle engine</Eyebrow>
          </Reveal>
          <Reveal variant="up" delay={60}>
            <h2 className="mt-[22px] font-display text-[clamp(30px,5vw,44px)] font-semibold leading-[1.06] text-ink">
              A lead that nobody works doesn&rsquo;t just sit there
            </h2>
          </Reveal>
          <Reveal variant="up" delay={120}>
            <p className="mt-[18px] text-[18px] leading-[1.6] text-slate">
              The most expensive lead is the one an agent claimed and forgot. The
              lifecycle engine keeps enquiries moving without a manager chasing
              anyone.
            </p>
          </Reveal>
        </div>

        <Reveal
          variant="up"
          delay={120}
          className="mb-[52px] grid gap-5 border-t border-line pt-7 sm:grid-cols-2 lg:grid-cols-5"
        >
          {STEPS.map((s) => (
            <div key={s.title}>
              <div className="mb-[14px] h-[11px] w-[11px] rounded-full bg-gold" />
              <h4 className="font-display text-[18px] font-semibold text-ink">
                {s.title}
              </h4>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-slate">{s.body}</p>
            </div>
          ))}
        </Reveal>

        {/* Leads table mockup */}
        <Reveal variant="scale" className="mx-auto max-w-[820px]">
          <BrowserFrame url="app.diwan.ae/leads" className="rounded-card shadow-float" small>
            <div className="grid grid-cols-4 gap-[10px] p-[18px]">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className={cn(
                    "rounded-[12px] border px-[14px] py-3",
                    s.highlight ? "border-gold-soft bg-[#FDFAF2]" : "border-line",
                  )}
                >
                  <p className="text-[10.5px] font-bold tracking-[0.1em] text-muted">
                    {s.label}
                  </p>
                  <p className="font-display text-[26px] font-semibold text-ink">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="px-[18px] pb-[18px]">
              <div
                className={cn(
                  "grid gap-[10px] border-b border-line px-3 py-[10px] text-[11px] font-bold tracking-[0.08em] text-muted",
                  COLS,
                )}
              >
                <span>LEAD</span>
                <span>SOURCE</span>
                <span>BUDGET</span>
                <span className="text-right">SPEED TO LEAD</span>
              </div>
              {ROWS.map((r, i) => (
                <div
                  key={r.name}
                  className={cn(
                    "grid items-center gap-[10px] p-3 text-[13.5px] text-ink",
                    COLS,
                    i < ROWS.length - 1 && "border-b border-line",
                  )}
                >
                  <span className="font-semibold">{r.name}</span>
                  <span className="text-slate">{r.source}</span>
                  <span className="text-slate">{r.budget}</span>
                  <span className="text-right">
                    <span
                      className={cn(
                        "rounded-[7px] px-[9px] py-1 text-[12px] font-bold",
                        CHIP[r.chip],
                      )}
                    >
                      {r.sla}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </BrowserFrame>
        </Reveal>
      </Container>
    </section>
  );
}
