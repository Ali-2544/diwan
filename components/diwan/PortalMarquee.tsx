const PORTALS = [
  "Property Finder",
  "Bayut",
  "Dubizzle",
  "Dubai Land Department",
  "Trakheesi",
  "Ejari",
  "Makani",
  "DLD Title Deed",
];

function Pill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-pill border border-line bg-white px-5 py-2.5 font-display text-[clamp(15px,1.6vw,18px)] font-medium text-navy shadow-card">
      <span aria-hidden className="h-2 w-2 rounded-full bg-gold" />
      {label}
    </span>
  );
}

/**
 * Section 3 — two rows of portal pills drifting in opposite directions.
 * Reversing the second row (and giving it a different duration) reads with more
 * texture than a single line. Content is duplicated for a seamless -50% loop.
 */
export function PortalMarquee() {
  const rowA = [...PORTALS, ...PORTALS];
  const rowB = [...PORTALS.slice().reverse(), ...PORTALS.slice().reverse()];

  return (
    <section className="border-y border-line bg-tint py-14">
      <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.2em] text-muted">
        Speaks the systems your agents already live on
      </p>

      <div className="marquee-mask flex flex-col gap-4 overflow-hidden">
        <div className="flex w-max animate-marquee gap-4 motion-reduce:animate-none">
          {rowA.map((p, i) => (
            <Pill key={`a-${i}`} label={p} />
          ))}
        </div>
        <div className="flex w-max animate-marquee gap-4 [animation-direction:reverse] [animation-duration:34s] motion-reduce:animate-none">
          {rowB.map((p, i) => (
            <Pill key={`b-${i}`} label={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
