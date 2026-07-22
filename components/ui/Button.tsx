import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  /** Gold gradient — the primary "Book a demo" CTA. */
  primary:
    "bg-gradient-to-b from-gold-2 to-gold text-[#3a2a06] font-bold shadow-gold-btn " +
    "hover:-translate-y-0.5 hover:shadow-gold-btn-hover",
  /** White outline on light surfaces. */
  outline:
    "bg-white border border-line text-ink font-semibold hover:-translate-y-0.5 hover:border-[#CBD5E1]",
  /** Translucent outline on dark navy surfaces. */
  outlineDark:
    "bg-white/[0.08] border border-white/20 text-white font-semibold hover:bg-white/[0.14]",
} as const;

const sizes = {
  sm: "px-5 py-[11px] text-[14.5px] rounded-btn-sm gap-2",
  md: "px-7 py-4 text-base rounded-btn gap-[9px]",
} as const;

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

type AsLink = CommonProps & { href: string };
type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

const base =
  "inline-flex items-center justify-center rounded-btn transition-all duration-200 ease-diwan " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 " +
  "disabled:opacity-60 disabled:pointer-events-none";

export function Button(props: AsLink | AsButton) {
  const { children, className, variant = "primary", size = "md", ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (typeof rest.href === "string") {
    return (
      <Link href={rest.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = rest as ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
