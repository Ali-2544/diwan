"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMotionSafe } from "@/components/motion/useMotionSafe";
import { ListingCard } from "@/components/mockups/ListingCard";

/** Milliseconds after mount before the permit attaches and the listing goes live. */
const PERMIT_SEQUENCE_DELAY = 1900;

/**
 * The hero's client island.
 *
 * Kept separate from Hero so the headline stays server-rendered. The listing
 * starts as a blocked Draft, then an active Trakheesi permit attaches and it
 * flips to Live — demonstrating the publish gate before the visitor has read
 * a word of body copy.
 */
export function HeroMockup() {
  const { safe } = useMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const [published, setPublished] = useState(!safe);

  useEffect(() => {
    if (!safe) {
      setPublished(true);
      return;
    }
    const timer = window.setTimeout(() => setPublished(true), PERMIT_SEQUENCE_DELAY);
    return () => window.clearTimeout(timer);
  }, [safe]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, safe ? -60 : 0]);

  return (
    <m.div
      ref={ref}
      style={{ y }}
      initial={safe ? { opacity: 0, y: 30 } : { opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: safe ? 0.45 : 0,
        duration: safe ? 0.8 : 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative"
    >
      {/* Gold bloom behind the frame, so it reads as lit rather than pasted on. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(201,162,75,0.16),transparent_65%)]"
      />

      <div
        className={
          safe
            ? "relative transform-gpu transition-transform duration-700 ease-brand lg:rotate-[-2.5deg] lg:hover:rotate-0"
            : "relative"
        }
      >
        <ListingCard published={published} />
      </div>

      {/* Caption tying the animation to the claim it demonstrates. */}
      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: safe ? 2.6 : 0, duration: 0.5 }}
        className="relative mt-5 flex items-center justify-center gap-2 text-center text-small text-text-on-dark-muted"
      >
        <span aria-hidden="true" className="h-px w-6 bg-gold-500/60" />
        No active permit, no publish
        <span aria-hidden="true" className="h-px w-6 bg-gold-500/60" />
      </m.p>
    </m.div>
  );
}
