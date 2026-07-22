import { cn } from "@/lib/cn";
import { BrowserFrame, type MockupProps } from "./BrowserFrame";

/**
 * Leads pipeline with speed-to-lead SLA state per row.
 *
 * Every value here is illustrative sample data inside a product mockup — it is
 * never presented as an aggregate statistic about real customers.
 */

type SlaState = "ok" | "atRisk" | "breached" | "pool";

const LEADS: {
  name: string;
  source: string;
  budget: string;
  stage: string;
  sla: SlaState;
  slaLabel: string;
}[] = [
  {
    name: "A. Rahman",
    source: "Property Finder",
    budget: "AED 1.8M",
    stage: "Contacted",
    sla: "ok",
    slaLabel: "4m",
  },
  {
    name: "S. Iyer",
    source: "Bayut",
    budget: "AED 3.2M",
    stage: "Qualified",
    sla: "ok",
    slaLabel: "11m",
  },
  {
    name: "M. Al Suwaidi",
    source: "Website form",
    budget: "AED 6.5M",
    stage: "New",
    sla: "atRisk",
    slaLabel: "26m",
  },
  {
    name: "L. Novak",
    source: "Dubizzle",
    budget: "AED 950K",
    stage: "New",
    sla: "breached",
    slaLabel: "1h 12m",
  },
  {
    name: "K. Haddad",
    source: "Referral",
    budget: "AED 2.1M",
    stage: "Drop pool",
    sla: "pool",
    slaLabel: "Claimable",
  },
];

const SLA_STYLES: Record<SlaState, string> = {
  ok: "border-status-success/40 bg-status-success/10 text-[#8FBF9F]",
  atRisk: "border-status-warn/40 bg-status-warn/10 text-[#D9AE63]",
  breached: "border-status-danger/45 bg-status-danger/10 text-[#C98679]",
  pool: "border-gold-500/40 bg-gold-500/10 text-gold-300",
};

const COLUMNS = [
  { label: "New", count: 12 },
  { label: "Contacted", count: 8 },
  { label: "Qualified", count: 5 },
  { label: "Viewing", count: 3 },
];

export function LeadsPipeline({ className }: MockupProps) {
  return (
    <BrowserFrame url="app.ddcrm.com/leads" className={className}>
      <div className="flex flex-col gap-4">
        {/* Stage summary strip */}
        <div className="grid grid-cols-4 gap-2">
          {COLUMNS.map((column, index) => (
            <div
              key={column.label}
              className={cn(
                "rounded-md border px-2.5 py-2",
                index === 0
                  ? "border-gold-500/35 bg-gold-500/[0.07]"
                  : "border-ink-700 bg-ink-950/40",
              )}
            >
              <p className="truncate text-[0.625rem] uppercase tracking-[0.1em] text-text-on-dark-muted">
                {column.label}
              </p>
              <p className="tabular font-display text-[1.0625rem] font-medium text-text-on-dark">
                {column.count}
              </p>
            </div>
          ))}
        </div>

        {/* Lead rows */}
        <div className="flex flex-col divide-y divide-ink-800 overflow-hidden rounded-md border border-ink-700">
          <div className="hidden bg-ink-950/50 px-3 py-2 text-[0.625rem] uppercase tracking-[0.1em] text-text-on-dark-muted sm:grid sm:grid-cols-[1.4fr_1fr_0.9fr_1fr]">
            <span>Lead</span>
            <span>Source</span>
            <span>Budget</span>
            <span className="text-right">Speed to lead</span>
          </div>

          {LEADS.map((lead) => (
            <div
              key={lead.name}
              className="grid grid-cols-[1fr_auto] items-center gap-2 px-3 py-2.5 transition-colors duration-200 hover:bg-ink-800/60 sm:grid-cols-[1.4fr_1fr_0.9fr_1fr]"
            >
              <div className="min-w-0">
                <p className="truncate text-[0.8125rem] text-text-on-dark">
                  {lead.name}
                </p>
                <p className="truncate text-[0.6875rem] text-text-on-dark-muted sm:hidden">
                  {lead.source} · {lead.budget}
                </p>
              </div>
              <p className="hidden truncate text-[0.75rem] text-text-on-dark-muted sm:block">
                {lead.source}
              </p>
              <p className="tabular hidden text-[0.75rem] text-text-on-dark-muted sm:block">
                {lead.budget}
              </p>
              <div className="flex justify-end">
                <span
                  className={cn(
                    "tabular shrink-0 rounded-sm border px-2 py-0.5 text-[0.625rem]",
                    SLA_STYLES[lead.sla],
                  )}
                >
                  {lead.slaLabel}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[0.6875rem] text-text-on-dark-muted">
          Stale leads auto-release to the shared claim pool. Claims expire if not
          acted on.
        </p>
      </div>
    </BrowserFrame>
  );
}
