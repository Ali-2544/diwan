"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { CTA, NAV_ITEMS } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileNav } from "./MobileNav";
import { Wordmark } from "./Wordmark";

/**
 * Sticky nav. Transparent while sitting over the hero, then gains an
 * ink-950 backdrop + hairline once scrolled past 24px.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-brand",
        // Solid rather than backdrop-blur: backdrop-filter is composited on
        // every scroll frame and was measurably expensive on mobile. Against a
        // near-black site the visual difference is negligible.
        scrolled
          ? "border-b border-ink-700/70 bg-ink-950/95"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-6">
        <Link
          href="/"
          // No aria-label here: the accessible name comes from the visible
          // "DDCRM" text inside Wordmark. An aria-label naming the full product
          // would not match the visible label, which fails WCAG 2.5.3.
          className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-4 focus-visible:ring-offset-ink-950"
        >
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-small transition-colors duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-4 focus-visible:ring-offset-ink-950",
                      active
                        ? "text-gold-300"
                        : "text-text-on-dark-muted hover:text-text-on-dark",
                    )}
                  >
                    {item.label}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-0.5 left-0 h-px w-full bg-gold-500/70"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button href={CTA.primary.href} size="sm" className="hidden sm:inline-flex">
            {CTA.primary.label}
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
