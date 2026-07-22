import { cn } from "@/lib/cn";
import { BrowserFrame, type MockupProps } from "./BrowserFrame";

/**
 * Commission breakdown for a single deal: sides, co-broke, VAT, lifecycle.
 * Sample data only — illustrative of the record shape, not a real figure.
 */

type Lifecycle = "paid" | "invoiced" | "pending";

const SPLITS: {
  side: string;
  party: string;
  meta: string;
  gross: string;
  split: string;
  net: string;
  state: Lifecycle;
}[] = [
  {
    side: "Listing side",
    party: "F. Mansour",
    meta: "Internal · BRN 41822",
    gross: "49,000.00",
    split: "50%",
    net: "24,500.00",
    state: "paid",
  },
  {
    side: "Selling side",
    party: "Horizon Realty",
    meta: "External co-broke · BRN 33914",
    gross: "49,000.00",
    split: "50%",
    net: "24,500.00",
    state: "invoiced",
  },
  {
    side: "Referral",
    party: "R. Kapoor",
    meta: "Internal · BRN 40257",
    gross: "9,800.00",
    split: "10%",
    net: "980.00",
    state: "pending",
  },
];

const LIFECYCLE_STYLES: Record<Lifecycle, string> = {
  paid: "border-status-success/40 bg-status-success/10 text-[#8FBF9F]",
  invoiced: "border-gold-500/40 bg-gold-500/10 text-gold-300",
  pending: "border-ink-600 bg-ink-800 text-text-on-dark-muted",
};

const LIFECYCLE_LABELS: Record<Lifecycle, string> = {
  paid: "Paid",
  invoiced: "Invoiced",
  pending: "Pending",
};

export function CommissionSummary({ className }: MockupProps) {
  return (
    <BrowserFrame url="app.ddcrm.com/deals/DD-1187/commissions" className={className}>
      <div className="flex flex-col gap-4">
        {/* Deal header */}
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink-800 pb-3">
          <div>
            <p className="text-[0.625rem] uppercase tracking-[0.12em] text-text-on-dark-muted">
              Sale · Palm Jumeirah
            </p>
            <p className="tabular font-display text-[1.375rem] font-medium text-text-on-dark">
              AED 4,900,000
            </p>
          </div>
          <div className="text-right">
            <p className="text-[0.625rem] uppercase tracking-[0.12em] text-text-on-dark-muted">
              Commission @ 2%
            </p>
            <p className="tabular font-display text-[1.375rem] font-medium text-gold-300">
              AED 98,000
            </p>
          </div>
        </div>

        {/* Split rows */}
        <div className="flex flex-col gap-2">
          {SPLITS.map((row) => (
            <div
              key={row.side}
              className="rounded-md border border-ink-700 bg-ink-950/40 p-3 transition-colors duration-200 hover:border-ink-600"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[0.625rem] uppercase tracking-[0.1em] text-text-on-dark-muted">
                    {row.side}
                  </p>
                  <p className="truncate text-[0.8125rem] text-text-on-dark">
                    {row.party}
                  </p>
                  <p className="tabular truncate text-[0.6875rem] text-text-on-dark-muted">
                    {row.meta}
                  </p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-sm border px-2 py-0.5 text-[0.625rem] uppercase tracking-[0.08em]",
                    LIFECYCLE_STYLES[row.state],
                  )}
                >
                  {LIFECYCLE_LABELS[row.state]}
                </span>
              </div>

              <div className="tabular mt-2.5 flex items-center justify-between gap-2 border-t border-ink-800 pt-2 text-[0.6875rem] text-text-on-dark-muted">
                <span>Gross AED {row.gross}</span>
                <span>Split {row.split}</span>
                <span className="text-text-on-dark">Net AED {row.net}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Totals with VAT */}
        <div className="tabular flex flex-col gap-1.5 rounded-md border border-gold-500/30 bg-gold-500/[0.06] p-3 text-[0.75rem]">
          <div className="flex justify-between text-text-on-dark-muted">
            <span>Net commission</span>
            <span>AED 49,980.00</span>
          </div>
          <div className="flex justify-between text-text-on-dark-muted">
            <span>VAT @ 5%</span>
            <span>AED 2,499.00</span>
          </div>
          <div className="flex justify-between border-t border-gold-500/20 pt-1.5 text-[0.875rem] text-gold-300">
            <span>Total</span>
            <span>AED 52,479.00</span>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
