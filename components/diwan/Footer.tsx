import Link from "next/link";
import { SITE, FOOTER_COLUMNS } from "@/config/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-navy-deep px-5 pb-10 pt-16 text-white sm:px-gutter">
      <div className="mx-auto max-w-content">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/">
              <Logo onDark />
            </Link>
            <p className="mt-4 max-w-[280px] text-sm leading-relaxed text-white/60">
              Bilingual EN/AR brokerage system of record. Built for Dubai,
              supported across all seven emirates.
            </p>
            <p className="mt-4 text-sm font-semibold text-gold-2">Pricing on request</p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">
                {col.title}
              </p>
              <ul className="flex flex-col gap-[11px] text-sm">
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-11 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-[13px] text-white/50">
          <span>© 2026 {SITE.legalName}. All rights reserved.</span>
          <a
            href={`mailto:${SITE.contactEmail}`}
            className="text-white/50 transition-colors hover:text-white"
          >
            {SITE.contactEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}
