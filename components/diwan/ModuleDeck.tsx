"use client";

import {
  m,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageSlot } from "./ImageSlot";
import type { SlotKey } from "@/content/images";

// Dashboard sits in the middle so it's the prominent top-of-arc card.
const CARDS: { slot: SlotKey; label: string }[] = [
  { slot: "dash1", label: "Leads" },
  { slot: "dash2", label: "Listings" },
  { slot: "crmCalendar", label: "Calendar" },
  { slot: "dashHero", label: "Dashboard" },
  { slot: "crmPropertyDetail", label: "Listing & permit" },
  { slot: "dash3", label: "Deals" },
  { slot: "crmTasks", label: "Tasks" },
];

/** Radius of the arc the cards ride. Large + a low pivot = a shallow rainbow. */
const RADIUS = "clamp(540px, 70vw, 960px)";
/**
 * Pivot well below the section (> radius) so the arc's apex sits *below* the
 * heading rather than colliding with it, and the cards arc overhead.
 */
const PIVOT_X = 50;
const PIVOT_Y = 212;
/** Cards keep only a little of their arc angle as tilt, so they stay upright. */
const TILT_RATIO = 0.26;

/**
 * Scroll-driven module deck — a rainbow arc.
 *
 * The cards ride a large circle whose pivot sits far below the section. As you
 * scroll, the whole fan swings from leaning right to leaning left, so the deck
 * travels a half-circle: entering bottom-right, arcing up over the top, and
 * exiting bottom-left. Card tilt is mostly cancelled so the screens stay
 * readable the whole way.
 *
 * Reduced motion pins the fan symmetric across the top.
 */
export function ModuleDeck() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.5,
    restDelta: 0.001,
  });

  // The fan swings right → left as you scroll (the half-circle sweep).
  const swing = useTransform(p, [0, 1], reduce ? [0, 0] : [46, -46]);
  // Cards spread a little more as the arc opens.
  const step = useTransform(p, [0, 1], reduce ? [8, 8] : [6.5, 9]);

  return (
    <section
      ref={ref}
      className="relative h-[300vh] border-t border-line bg-tint"
      aria-label="Product modules"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Heading */}
        <div className="relative z-30 px-5 pt-[80px] text-center sm:px-gutter">
          <div className="flex justify-center">
            <Eyebrow centered>Every module</Eyebrow>
          </div>
          <h2 className="mx-auto mt-5 max-w-[760px] font-display text-[clamp(30px,5vw,48px)] font-semibold leading-[1.06] tracking-[-0.01em] text-ink">
            Everything a Dubai brokerage runs on
          </h2>
          <p className="mx-auto mt-4 max-w-[540px] text-[17px] leading-[1.6] text-slate">
            Leads, listings and permits, deals and commissions, viewings and
            tasks — one system, one set of records.
          </p>
        </div>

        {/* Rainbow-arc deck */}
        <div className="relative flex-1">
          <m.div
            className="absolute inset-0"
            style={{
              rotate: swing,
              transformOrigin: `${PIVOT_X}% ${PIVOT_Y}%`,
            }}
          >
            {CARDS.map((card, i) => (
              <FanCard
                key={card.slot}
                offset={i - (CARDS.length - 1) / 2}
                swing={swing}
                step={step}
                slot={card.slot}
                label={card.label}
              />
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}

function FanCard({
  offset,
  swing,
  step,
  slot,
  label,
}: {
  offset: number;
  swing: MotionValue<number>;
  step: MotionValue<number>;
  slot: SlotKey;
  label: string;
}) {
  // Card's own angle on the arc, symmetric around the top.
  const angle = useTransform(step, (s) => offset * s);
  // Net tilt of a card = swing + angle. Cancel most of it so it stays readable.
  const counter = useTransform([swing, angle], ([sw, a]: number[]) => -(sw + a) * (1 - TILT_RATIO));
  const transform = useMotionTemplate`rotate(${angle}deg) translateY(calc(-1 * ${RADIUS})) rotate(${counter}deg) translate(-50%, -50%)`;

  return (
    <m.div
      className="absolute"
      style={{
        left: `${PIVOT_X}%`,
        top: `${PIVOT_Y}%`,
        transform,
        // Centre card on top, ends behind.
        zIndex: 20 - Math.round(Math.abs(offset) * 2),
      }}
    >
      <figure className="w-[clamp(200px,22vw,300px)] overflow-hidden rounded-[20px] border border-line bg-white shadow-float">
        <div className="relative aspect-[4/3]">
          <ImageSlot
            slot={slot}
            className="object-[64%_14%]"
            sizes="(max-width: 768px) 58vw, 300px"
          />
        </div>
        <figcaption className="border-t border-line px-4 py-2.5 text-[12.5px] font-semibold text-navy">
          {label}
        </figcaption>
      </figure>
    </m.div>
  );
}
