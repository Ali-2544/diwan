import Link from "next/link";
import { PILLARS } from "@/content/pillars";

/**
 * Jump links in the features hero. Plain anchors — `scroll-mt` on Section
 * handles the sticky-nav offset, and smooth scrolling is disabled under
 * prefers-reduced-motion in globals.css.
 */
export function PillarNav() {
  return (
    <nav aria-label="Feature pillars" className="mt-2">
      <ul className="flex flex-wrap gap-2.5">
        {PILLARS.map((pillar) => (
          <li key={pillar.id}>
            <Link
              href={`#${pillar.id}`}
              className="inline-flex rounded-sm border border-ink-700 px-3 py-1.5 text-small text-text-on-dark-muted transition-colors duration-200 hover:border-gold-500/60 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
            >
              {pillar.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
