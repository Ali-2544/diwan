/**
 * Every brand string, nav item and CTA label on the site.
 *
 * Renaming the product, changing the demo email or reordering the nav should
 * only ever require editing this file — no component hardcodes brand copy.
 */

export const SITE = {
  name: "Dream Design CRM",
  shortName: "DDCRM",
  /** Used in <title> templates and the footer lockup. */
  legalName: "Dream Design CRM",
  tagline:
    "The CRM built for how Dubai brokerages actually work — from portal lead to Trakheesi-compliant listing to commission paid.",
  description:
    "A CRM built specifically for Dubai and UAE real estate brokerages. Trakheesi permit gating, RERA forms, AED commissions with VAT, and a lead lifecycle engine that stops leads going cold.",
  url: "https://ddcrm.example.com",
  contactEmail: "hello@ddcrm.example.com",
} as const;

export const CTA = {
  primary: { label: "Book a demo", href: "/contact" },
  secondary: { label: "See how it works", href: "/#pillars" },
  pricingNote: "Pricing on request",
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Features", href: "/features" },
  { label: "Why UAE-native", href: "/why-uae" },
  { label: "Security", href: "/security" },
  { label: "Roadmap", href: "/roadmap" },
];

export const FOOTER_COLUMNS: { title: string; items: NavItem[] }[] = [
  {
    title: "Product",
    items: [
      { label: "Features", href: "/features" },
      { label: "Why UAE-native", href: "/why-uae" },
      { label: "Security", href: "/security" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    title: "Capabilities",
    items: [
      { label: "Leads", href: "/features#leads" },
      { label: "Listings & compliance", href: "/features#listings" },
      { label: "Deals & commissions", href: "/features#deals" },
      { label: "Campaigns", href: "/features#campaigns" },
      { label: "Team & permissions", href: "/features#team" },
      { label: "Insights", href: "/features#insights" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Book a demo", href: "/contact" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/**
 * Footer note. Deliberately states the bilingual product fact without
 * implying the marketing site itself is translated.
 */
export const FOOTER_NOTE =
  "Bilingual EN/AR product. Built for Dubai, supported across all seven emirates.";
