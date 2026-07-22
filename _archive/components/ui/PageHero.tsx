"use client";

import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useMotionSafe } from "@/components/motion/useMotionSafe";
import { STAGGER } from "@/components/motion/variants";
import { IMAGES, type ImageKey } from "@/content/images";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lede: ReactNode;
  children?: ReactNode;
  /** Backdrop photograph. Defaults to the skyline used on the homepage. */
  image?: ImageKey;
  /** Horizontal focal point of the backdrop crop. */
  objectPosition?: string;
};

/**
 * Shared hero for every page except the homepage, which has its own signature
 * treatment. Word-staggered headline over a scrimmed, parallaxed photograph.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
  image = "heroSkyline",
  objectPosition = "center 60%",
}: PageHeroProps) {
  const { variants, stagger, safe } = useMotionSafe();
  const ref = useRef<HTMLElement>(null);
  const words = title.split(" ");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", safe ? "22%" : "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, safe ? 1.1 : 1]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-ink-950 pb-22 pt-30 lg:pb-26 lg:pt-34"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <m.div style={{ y, scale }} className="absolute inset-0">
          <Image
            src={IMAGES[image].src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition }}
          />
        </m.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/90 via-ink-950/55 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/65 to-ink-950/10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      <Container className="relative">
        <m.div
          initial="hidden"
          animate="visible"
          variants={stagger(STAGGER.word)}
          className="flex max-w-3xl flex-col gap-7"
        >
          <m.div variants={variants.fadeUp}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </m.div>

          <h1 className="text-balance font-display text-display-xl font-medium leading-[1.05] text-text-on-dark">
            {words.map((word, index) => (
              <m.span
                key={`${word}-${index}`}
                variants={variants.heroWord}
                className="inline-block"
              >
                {word}
                {/* Must be a non-breaking space: a plain space is collapsed
                    away at the end of an inline-block, which runs every word
                    in the headline together. */}
                {index < words.length - 1 && <>&nbsp;</>}
              </m.span>
            ))}
          </h1>

          <m.p variants={variants.fadeUp} className="text-body-lg text-text-on-dark-muted">
            {lede}
          </m.p>

          {children && <m.div variants={variants.fadeUp}>{children}</m.div>}
        </m.div>
      </Container>
    </section>
  );
}
