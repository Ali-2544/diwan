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

// Dashboard sits in the middle so it's the prominent apex card. The strongest
// screens flank it; the rest fan out to the wings.
const CARDS: { slot: SlotKey; label: string }[] = [
  { slot: "crmActivity", label: "Activity" },
  { slot: "crmContacts", label: "Contacts" },
  { slot: "crmReports", label: "Reports" },
  { slot: "crmCalendar", label: "Calendar" },
  { slot: "dash2", label: "Listings" },
  { slot: "dashHero", label: "Dashboard" },
  { slot: "dash3", label: "Deals" },
  { slot: "crmCommissions", label: "Commissions" },
  { slot: "dash1", label: "Leads" },
  { slot: "crmCampaigns", label: "Campaigns" },
  { slot: "crmTasks", label: "Tasks" },
];

/**
 * A very large radius with a pivot far below flattens the arc into the wide,
 * shallow rainbow the reference shows — the cards' tops trace a gentle line
 * rather than a tight circle.
 */
const RADIUS = "clamp(860px, 100vw, 1440px)";
const PIVOT_X = 50;
const PIVOT_Y = 250;
/** Cards keep only a little of their arc angle as tilt, so they stay upright. */
const TILT_RATIO = 0.2;

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

  // The fan swings right → left as you scroll (the shallow sweep).
  const swing = useTransform(p, [0, 1], reduce ? [0, 0] : [30, -30]);
  // Cards spread a little more as the arc opens. Smaller step for more cards.
  const step = useTransform(p, [0, 1], reduce ? [5.5, 5.5] : [4, 6]);

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
      // `hover:!z-[60]` (important) beats the inline z-index so the hovered
      // card jumps in front of the whole fan.
      className="group absolute cursor-pointer hover:!z-[60]"
      style={{
        left: `${PIVOT_X}%`,
        top: `${PIVOT_Y}%`,
        transform,
        // Centre card on top, ends behind.
        zIndex: 20 - Math.round(Math.abs(offset) * 2),
      }}
    >
      {/* Inner wrapper carries the hover lift, independent of the arc transform. */}
      <div className="transition-transform duration-300 ease-diwan will-change-transform group-hover:-translate-y-5 group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:transform-none">
        <figure className="w-[clamp(180px,19vw,272px)] overflow-hidden rounded-[20px] border border-line bg-white shadow-float transition-[box-shadow,border-color] duration-300 group-hover:border-gold/50 group-hover:shadow-[0_50px_90px_-40px_rgba(14,42,71,0.55)]">
          <div className="relative aspect-[4/3]">
            <ImageSlot
              slot={slot}
              className="object-[64%_14%]"
              sizes="(max-width: 768px) 58vw, 300px"
            />
          </div>
          <figcaption className="border-t border-line px-4 py-2.5 text-[12.5px] font-semibold text-navy transition-colors duration-300 group-hover:text-gold-text">
            {label}
          </figcaption>
        </figure>
      </div>
    </m.div>
  );
}
