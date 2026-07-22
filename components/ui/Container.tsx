import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

const widths = {
  content: "max-w-content", // 1200
  showcase: "max-w-showcase", // 1120
  prose: "max-w-prose", // 760
  "prose-sm": "max-w-prose-sm", // 680
} as const;

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: keyof typeof widths;
  as?: ElementType;
};

/** Centered column with the spec's 32px gutters (20px on small screens). */
export function Container({
  children,
  className,
  size = "content",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-5 sm:px-gutter", widths[size], className)}>
      {children}
    </Tag>
  );
}
