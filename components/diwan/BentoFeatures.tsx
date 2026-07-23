import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type Cell = {
  title: string;
  body: string;
  span: string;
  icon: ReactNode;
  visual?: ReactNode;
};

/* ---- small decorative visuals (SVG, gold accents) ------------------ */

function MiniBars() {
  const h = [40, 68, 30, 82, 54, 74];
  return (
    <div className="mt-6 flex items-end gap-2">
      {h.map((v, i) => (
        <span
          key={i}
          className={cn(
            "w-3 rounded-t-[3px]",
            i % 3 === 0 ? "bg-gold" : "bg-navy/20",
            "transition-all duration-500 ease-diwan group-hover:opacity-100",
          )}
          style={{ height: `${v}px` }}
        />
      ))}
    </div>
  );
}

function MiniPermit() {
  return (
    <div className="mt-6 flex items-center gap-3 rounded-[12px] border border-gold-soft bg-gradient-to-b from-[#FDFAF2] to-[#FBF6EA] px-3 py-3">
      <span className="grid h-8 w-8 place-items-center rounded-[8px] bg-gold-soft text-gold">
        🛡
      </span>
      <div>
        <p className="text-[9px] font-extrabold uppercase tracking-[0.12em] text-gold">
          Trakheesi permit
        </p>
        <p className="text-[12px] font-semibold text-ink">Active · 14 Nov 2026</p>
      </div>
      <span className="ml-auto rounded-[6px] bg-green-bg px-2 py-1 text-[10px] font-bold text-green">
        LIVE
      </span>
    </div>
  );
}

function MiniSplit() {
  return (
    <div className="mt-6 flex flex-col gap-1.5 text-[11.5px]">
      {[
        ["Listing side", "PAID", "text-green bg-green-bg"],
        ["Selling side", "INVOICED", "text-amber bg-amber-bg"],
      ].map(([a, b, c]) => (
        <div key={a} className="flex items-center justify-between rounded-[8px] border border-line px-2.5 py-1.5">
          <span className="font-semibold text-ink">{a}</span>
          <span className={cn("rounded-[5px] px-1.5 py-0.5 font-bold", c)}>{b}</span>
        </div>
      ))}
    </div>
  );
}

function Ic({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const CELLS: Cell[] = [
  {
    title: "Leads",
    body: "Capture, qualify and route every enquiry — with a clock on how fast it gets worked.",
    span: "md:col-span-2",
    icon: <Ic d="M4 20c0-3.3 3.6-5 8-5s8 1.7 8 5M12 12a4 4 0 100-8 4 4 0 000 8Z" />,
    visual: <MiniBars />,
  },
  {
    title: "Listings & compliance",
    body: "A UAE listing record with the Trakheesi permit built into it — and a publish gate that enforces it.",
    span: "md:col-span-2 md:row-span-2",
    icon: <Ic d="M4 10 12 4l8 6v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9Z" />,
    visual: <MiniPermit />,
  },
  {
    title: "Deals & commissions",
    body: "Pipeline, RERA paperwork and the money — co-broke and VAT — in one record.",
    span: "md:col-span-2",
    icon: <Ic d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
    visual: <MiniSplit />,
  },
  {
    title: "Campaigns",
    body: "Track spend against real leads, and rotate incoming enquiries fairly across an agent pool.",
    span: "md:col-span-2",
    icon: <Ic d="M3 11 21 4l-4 16-5-5-4 2v-4Z" />,
  },
  {
    title: "Team & permissions",
    body: "Office → team → agent hierarchy, with permissions granular enough to hide a phone number.",
    span: "md:col-span-2",
    icon: <Ic d="M9 11a4 4 0 100-8 4 4 0 000 8Zm7 9v-1a4 4 0 0 0-3-3.9M17 11a4 4 0 0 0 0-8M3 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" />,
  },
  {
    title: "Insights",
    body: "Where the pipeline stands, which sources pay for themselves, and who did what.",
    span: "md:col-span-2",
    icon: <Ic d="M3 3v18h18M7 15l3-4 3 2 4-6" />,
  },
];

/**
 * Section — the six capability pillars in an asymmetric bento grid. Each cell
 * reveals on a stagger and lifts with a gold hairline on hover; the larger
 * cells carry a small live-looking visual.
 */
export function BentoFeatures() {
  return (
    <section className="border-t border-line bg-cream px-5 py-section sm:px-gutter">
      <Container>
        <div className="mb-14 max-w-prose">
          <Reveal variant="up">
            <Eyebrow>What&rsquo;s inside</Eyebrow>
          </Reveal>
          <Reveal variant="up" delay={60}>
            <h2 className="mt-[22px] font-display text-[clamp(30px,5vw,44px)] font-semibold leading-[1.08] tracking-[-0.01em] text-ink">
              Six pillars, one system
            </h2>
          </Reveal>
          <Reveal variant="up" delay={120}>
            <p className="mt-5 text-[18px] leading-[1.6] text-slate">
              Leads, listings, deals, campaigns, permissions and reporting —
              sharing one set of records, so the numbers can&rsquo;t disagree
              with each other.
            </p>
          </Reveal>
        </div>

        <div className="grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 md:grid-cols-4">
          {CELLS.map((cell, i) => (
            <Reveal
              key={cell.title}
              variant="up"
              delay={(i % 2) * 70 + Math.floor(i / 2) * 40}
              className={cn("min-h-[220px]", cell.span)}
            >
              <div className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-white p-7 shadow-card transition-all duration-300 ease-diwan hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-card-hover">
                {/* Gold hairline that draws across the top on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-2 transition-transform duration-500 ease-diwan group-hover:scale-x-100 motion-reduce:transition-none"
                />
                <span className="grid h-11 w-11 place-items-center rounded-[12px] border border-line bg-tint text-navy transition-colors duration-300 group-hover:border-gold/40 group-hover:text-gold">
                  {cell.icon}
                </span>
                <h3 className="mt-5 font-display text-[clamp(19px,2.2vw,23px)] font-semibold text-ink">
                  {cell.title}
                </h3>
                <p className="mt-2 max-w-sm text-[14.5px] leading-[1.55] text-slate">
                  {cell.body}
                </p>
                {cell.visual}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
