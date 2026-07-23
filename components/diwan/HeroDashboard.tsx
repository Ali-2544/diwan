"use client";

import { m, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { BrowserFrame } from "./BrowserFrame";
import { ImageSlot } from "./ImageSlot";
import { SITE } from "@/config/site";

/**
 * Scroll-driven 3D "unfold" for the hero dashboard.
 *
 * The screenshot starts tilted back in perspective (and slightly dimmed), then
 * straightens to flat, scales up and comes into focus as the section enters the
 * viewport — so the product reveals itself as you scroll toward it.
 *
 * Reduced motion renders it flat and fully visible from the start.
 */
export function HeroDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Progress runs from "top of the frame reaches the lower viewport" to
  // "the frame is comfortably in view", so the unfold completes as you arrive.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "center 0.62"],
  });

  // Spring so the unfold feels weighted rather than glued to the scrollbar.
  const p = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.45,
    restDelta: 0.001,
  });

  const rotateX = useTransform(p, [0, 1], reduce ? [0, 0] : [26, 0]);
  const scale = useTransform(p, [0, 1], reduce ? [1, 1] : [0.92, 1]);
  const y = useTransform(p, [0, 1], reduce ? [0, 0] : [48, 0]);
  const opacity = useTransform(p, [0, 0.4], reduce ? [1, 1] : [0.5, 1]);
  const blur = useTransform(p, [0, 0.6], reduce ? [0, 0] : [10, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  // Shadow blooms in as it stands up.
  const shadowOpacity = useTransform(p, [0, 1], reduce ? [0.5, 0.5] : [0, 0.5]);

  return (
    <div
      ref={ref}
      className="relative mx-auto mt-14 max-w-showcase"
      style={{ perspective: "1400px" }}
    >
      {/* Grounding glow that strengthens as the panel flattens */}
      <m.div
        aria-hidden
        style={{ opacity: shadowOpacity }}
        className="pointer-events-none absolute inset-x-[8%] bottom-[-6%] h-[18%] rounded-[50%] blur-[38px]"
      >
        <div className="h-full w-full bg-navy/40" />
      </m.div>

      <m.div
        style={{
          rotateX,
          scale,
          y,
          opacity,
          filter,
          transformStyle: "preserve-3d",
          transformOrigin: "50% 100%",
          willChange: "transform, opacity, filter",
        }}
      >
        <BrowserFrame
          url={`${SITE.appDomain}/dashboard`}
          className="rounded-card-lg shadow-showcase"
        >
          <div className="relative h-[clamp(280px,44vw,620px)]">
            <ImageSlot
              slot="dashHero"
              priority
              className="object-top"
              sizes="(max-width: 1200px) 100vw, 1120px"
            />
          </div>
        </BrowserFrame>
      </m.div>
    </div>
  );
}
