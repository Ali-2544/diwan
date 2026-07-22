import Link from "next/link";
import { CTA, FOOTER_COLUMNS, FOOTER_NOTE, SITE } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-800 bg-ink-950 text-text-on-dark">
      <Container className="py-16 lg:py-22">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-8">
          <div className="flex flex-col gap-5">
            <Wordmark />
            <p className="max-w-xs text-small leading-relaxed text-text-on-dark-muted">
              {FOOTER_NOTE}
            </p>
            <p className="text-small text-gold-400">{CTA.pricingNote}</p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <h2 className="text-eyebrow uppercase text-text-on-dark-muted">
                {column.title}
              </h2>
              <ul className="flex flex-col gap-3">
                {column.items.map((item) => (
                  <li key={`${column.title}-${item.href}-${item.label}`}>
                    <Link
                      href={item.href}
                      className="text-small text-text-on-dark-muted transition-colors duration-200 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-4 focus-visible:ring-offset-ink-950"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-small text-text-on-dark-muted">
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <a
            href={`mailto:${SITE.contactEmail}`}
            className="text-small text-text-on-dark-muted transition-colors hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-4 focus-visible:ring-offset-ink-950"
          >
            {SITE.contactEmail}
          </a>
        </div>
      </Container>
    </footer>
  );
}
