import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

const widths = {
  narrow: "max-w-narrow", // 760px — prose
  default: "max-w-container", // 1200px
  wide: "max-w-wide", // 1400px
} as const;

type ContainerProps = {
  children: ReactNode;
  className?: string;
  width?: keyof typeof widths;
  as?: ElementType;
};

/** Horizontal gutter + max-width. The only place page padding is defined. */
export function Container({
  children,
  className,
  width = "default",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-5 sm:px-8 lg:px-10", widths[width], className)}>
      {children}
    </Tag>
  );
}
