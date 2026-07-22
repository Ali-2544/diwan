const PORTALS = [
  "Property Finder",
  "Bayut",
  "Dubizzle",
  "Dubai Land Department",
  "Trakheesi",
  "Ejari",
  "Makani",
];

/** Section 3 — infinite marquee of the systems the CRM speaks to. */
export function PortalMarquee() {
  return (
    <section className="border-y border-line bg-tint py-[26px]">
      <p className="mb-[18px] text-center text-xs font-bold uppercase tracking-[0.2em] text-muted">
        Speaks the systems your agents already live on
      </p>
      <div className="overflow-hidden marquee-mask">
        <div className="flex w-max animate-marquee gap-16 whitespace-nowrap font-display text-[22px] font-medium text-navy opacity-75">
          {/* Duplicated for a seamless -50% loop. */}
          {[...PORTALS, ...PORTALS].map((p, i) => (
            <span key={i} aria-hidden={i >= PORTALS.length}>
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
