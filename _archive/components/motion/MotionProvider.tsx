"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Loads only Framer Motion's DOM animation feature set (~25kb lighter than the
 * full `motion` bundle). Because of this, every animated component on the site
 * must use `m.div` / `m.section` etc. — NOT `motion.div`, which would pull the
 * full bundle back in and defeat the point.
 *
 * `strict` makes that a runtime error instead of a silent regression.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
