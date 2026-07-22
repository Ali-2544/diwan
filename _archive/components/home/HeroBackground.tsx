"use client";

import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IMAGES } from "@/content/images";
import { useMotionSafe } from "@/components/motion/useMotionSafe";

/**
 * Hero backdrop: a full-bleed skyline photograph under layered scrims.
 *
 * The photo drifts and settles as you scroll, and holds a slow Ken Burns
 * push-in on load. Everything above it is pure CSS so the type stays crisp.
 */
export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { safe } = useMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", safe ? "18%" : "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, safe ? 1.12 : 1]);

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <m.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={IMAGES.heroSkyline.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className={
            safe
              ? "animate-hero-push object-cover object-[center_42%]"
              : "object-cover object-[center_42%]"
          }
        />
      </m.div>

      {/* Layered scrims. Kept deliberately light on the right so the skyline
          actually reads — heavier gradients made the photo invisible. The copy
          column stays dark enough for AA contrast via the horizontal pass. */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/25 to-ink-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/55 to-transparent" />

      {/* Gold horizon bloom. */}
      <div className="absolute inset-x-0 bottom-[18%] h-64 bg-[radial-gradient(ellipse_60%_100%_at_70%_100%,rgba(201,162,75,0.20),transparent_70%)]" />

      {/* Fine warm grid, fading out downward. */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #C9A24B 1px, transparent 1px), linear-gradient(to bottom, #C9A24B 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "linear-gradient(to bottom, black 10%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 10%, transparent 80%)",
        }}
      />

      {/* Hard fade into the section below, so the seam is invisible. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
    </div>
  );
}
