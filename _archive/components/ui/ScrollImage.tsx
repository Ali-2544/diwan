"use client";

import Image from "next/image";
import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";
import { IMAGES, type ImageKey } from "@/content/images";
import { useMotionSafe } from "@/components/motion/useMotionSafe";

type ScrollImageProps = {
  /** Key into the image registry in content/images.ts. */
  image: ImageKey;
  className?: string;
  /** Aspect ratio of the visible frame. The photo is cropped to fill it. */
  ratio?: "square" | "portrait" | "landscape" | "wide" | "cinema" | "auto";
  /**
   * How far the photo drifts inside its frame as the section scrolls past,
   * in percent of its own height. 0 disables parallax.
   */
  parallax?: number;
  /** Slow zoom-out as the image enters view. */
  zoom?: boolean;
  /** Gold hairline + rounded frame. */
  framed?: boolean;
  /** Warm gradient scrim, for images that sit behind text. */
  scrim?: "none" | "bottom" | "full";
  priority?: boolean;
  sizes?: string;
  /** Optional caption rendered beneath the frame. */
  caption?: string;
};

const RATIOS = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
  cinema: "aspect-[21/9]",
  auto: "",
} as const;

/**
 * The site's standard photograph presentation.
 *
 * Combines the reveal, the parallax drift and the frame so every image on the
 * site behaves identically. Swapping the underlying file never touches this
 * component — see content/images.ts.
 */
export function ScrollImage({
  image,
  className,
  ratio = "landscape",
  parallax = 12,
  zoom = true,
  framed = true,
  scrim = "none",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px",
  caption,
}: ScrollImageProps) {
  const meta = IMAGES[image];
  const ref = useRef<HTMLDivElement>(null);
  const { safe } = useMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const drift = safe && parallax > 0 ? parallax : 0;
  const y = useTransform(scrollYProgress, [0, 1], [`-${drift}%`, `${drift}%`]);
  // Kept shallow on purpose: a heavier zoom crops into the middle of the
  // photograph and loses the composition entirely.
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    safe && zoom ? [1.06, 1.0, 1.04] : [1, 1, 1],
  );

  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      <m.div
        ref={ref}
        initial={safe ? { opacity: 0, y: 28 } : { opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
        transition={{ duration: safe ? 0.7 : 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "relative w-full overflow-hidden bg-ink-900",
          RATIOS[ratio],
          framed && "rounded-lg border border-ink-700 shadow-frame",
        )}
      >
        {/* The image is oversized and drifts within the clipped frame. */}
        <m.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
          <Image
            src={meta.src}
            alt={meta.alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
          />
        </m.div>

        {scrim !== "none" && (
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0",
              scrim === "bottom"
                ? "bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent"
                : "bg-ink-950/55",
            )}
          />
        )}

        {/* Inner top highlight, matching the dark-card treatment. */}
        {framed && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          />
        )}
      </m.div>

      {caption && (
        <figcaption className="text-small text-text-on-dark-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
