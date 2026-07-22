"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { CTA, NAV_ITEMS } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { useMotionSafe } from "@/components/motion/useMotionSafe";

/**
 * Full-screen mobile menu.
 *
 * Hand-rolled rather than pulled from a dialog library: it's the only modal on
 * the site, and a second styling system would fight the design tokens.
 * Accessibility handled explicitly — focus trap, Escape, scroll lock,
 * `aria-expanded`, and focus restored to the trigger on close.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { safe } = useMotionSafe();

  const close = useCallback(() => setOpen(false), []);

  // Close on route change.
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Escape to close, Tab cycles within the panel.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    }, 60);
    return () => window.clearTimeout(timer);
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        className="grid h-10 w-10 place-items-center rounded-md border border-ink-600 text-text-on-dark transition-colors duration-200 hover:border-gold-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 lg:hidden"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          {open ? (
            <path d="M5 5l10 10M15 5L5 15" />
          ) : (
            <path d="M3 6h14M3 10h14M3 14h14" />
          )}
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-nav-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: safe ? 0.25 : 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-ink-950 px-5 pb-10 pt-18 lg:hidden"
          >
            <nav aria-label="Mobile" className="mt-8 flex-1">
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item, index) => {
                  const active = pathname === item.href;
                  return (
                    <m.li
                      key={item.href}
                      initial={safe ? { opacity: 0, y: 12 } : { opacity: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: safe ? 0.06 + index * 0.05 : 0,
                        duration: safe ? 0.4 : 0.15,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="border-b border-ink-800"
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block py-5 font-display text-display-md transition-colors",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500",
                          active
                            ? "text-gold-300"
                            : "text-text-on-dark hover:text-gold-300",
                        )}
                      >
                        {item.label}
                      </Link>
                    </m.li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex flex-col gap-3">
              <Button href={CTA.primary.href} size="lg" className="w-full">
                {CTA.primary.label}
              </Button>
              <p className="text-center text-small text-text-on-dark-muted">
                {CTA.pricingNote}
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
