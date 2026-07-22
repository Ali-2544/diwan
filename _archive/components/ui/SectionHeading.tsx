import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  tone?: "onDark" | "onLight";
  /** Heading level. Defaults to h2 — only the hero should use h1. */
  as?: "h1" | "h2" | "h3";
  className?: string;
};

/** Eyebrow + serif headline + optional lede, revealed as one unit on scroll. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "onLight",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}

      <Tag
        className={cn(
          "font-display font-medium text-balance",
          Tag === "h3" ? "text-display-md" : "text-display-lg",
          tone === "onDark" ? "text-text-on-dark" : "text-text-on-light",
        )}
      >
        {title}
      </Tag>

      {lede && (
        <p
          className={cn(
            "max-w-2xl text-body-lg",
            tone === "onDark" ? "text-text-on-dark-muted" : "text-text-on-light-muted",
          )}
        >
          {lede}
        </p>
      )}
    </Reveal>
  );
}
