"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Loads only Framer Motion's DOM feature set. Every animated component uses
 * `m.*` (not `motion.*`) so the full bundle is never pulled in. `strict` makes
 * a `motion.*` slip a runtime error rather than a silent regression.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
