"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { SITE, NAV_LINKS } from "@/config/site";
import { Logo } from "./Logo";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll lock + Escape + focus trap while the mobile sheet is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a[href],button");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 backdrop-blur-[14px] transition-[background-color,box-shadow] duration-300",
        scrolled ? "bg-white/85 shadow-nav" : "bg-white/60",
      )}
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-6 px-5 py-4 sm:px-gutter">
        <Link href="/" aria-label={`${SITE.name} — home`}>
          <Logo />
        </Link>

        {/* Desktop */}
        <nav aria-label="Main" className="hidden items-center gap-[26px] min-[900px]:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-[14.5px] font-medium transition-colors",
                  active ? "text-ink" : "text-slate hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 rounded-btn-sm bg-gradient-to-b from-gold-2 to-gold px-5 py-[11px] text-[14.5px] font-bold text-[#3a2a06] shadow-gold transition-transform duration-200 hover:-translate-y-0.5"
          >
            Book a demo
          </Link>
        </nav>

        {/* Mobile trigger */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="diwan-mobile-nav"
          className="grid h-10 w-10 place-items-center rounded-btn-sm border border-line text-ink transition-colors hover:border-[#CBD5E1] min-[900px]:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="diwan-mobile-nav"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[69px] z-40 flex flex-col bg-white px-6 pb-10 pt-4 min-[900px]:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                  className="border-b border-line"
                >
                  <Link
                    href={link.href}
                    onClick={close}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className="block py-5 font-display text-[28px] font-semibold text-ink"
                  >
                    {link.label}
                  </Link>
                </m.div>
              ))}
            </nav>
            <Link
              href="/demo"
              onClick={close}
              className="mt-8 inline-flex w-full items-center justify-center rounded-btn bg-gradient-to-b from-gold-2 to-gold px-7 py-4 text-base font-bold text-[#3a2a06] shadow-gold-btn"
            >
              Book a demo
            </Link>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
