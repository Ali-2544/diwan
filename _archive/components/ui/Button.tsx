import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  /** Solid gold. The "Book a demo" CTA everywhere. */
  primary:
    "bg-gold-500 text-ink-950 hover:bg-gold-400 hover:shadow-gold-glow font-semibold",
  /** Outline for use on dark surfaces. */
  ghost:
    "border border-ink-600 text-text-on-dark hover:border-gold-500 hover:text-gold-300",
  /** Outline for use on light surfaces. */
  ghostLight:
    "border border-sand-200 text-text-on-light hover:border-gold-500 hover:text-gold-700 bg-white/40",
} as const;

const sizes = {
  sm: "h-9 px-4 text-small",
  md: "h-11 px-5 text-body",
  lg: "h-13 px-7 text-body-lg",
} as const;

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Renders a chevron that nudges right on hover. */
  withArrow?: boolean;
};

type ButtonAsLink = CommonProps & { href: string };
type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

const base =
  "group inline-flex items-center justify-center gap-2 rounded-md " +
  "transition-all duration-200 ease-brand " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-transparent " +
  "disabled:opacity-50 disabled:pointer-events-none";

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4 transition-transform duration-200 ease-brand group-hover:translate-x-[3px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
    </svg>
  );
}

/**
 * Polymorphic button. Pass `href` to render a Next `<Link>`, omit it for a
 * real `<button>`. There is no third state — never render a div.
 */
export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    children,
    className,
    variant = "primary",
    size = "md",
    withArrow = false,
    ...rest
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {withArrow && <Arrow />}
    </>
  );

  if (typeof rest.href === "string") {
    return (
      <Link href={rest.href} className={classes}>
        {content}
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = rest as ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

  return (
    <button className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
