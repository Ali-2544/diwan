/** Diwan brand strings, nav and footer. Edit here to rename or reorder. */

export const SITE = {
  name: "Diwan",
  legalName: "Diwan CRM",
  description:
    "Diwan is a UAE-native real-estate brokerage system of record — Trakheesi-compliant publishing, co-broke commissions, permissions and insights. Built for Dubai, supported across all seven emirates.",
  url: "https://diwan.ae",
  contactEmail: "hello@diwan.ae",
  appDomain: "app.diwan.ae",
} as const;

export const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Why UAE-native", href: "/why-uae" },
  { label: "Security", href: "/security" },
  { label: "Roadmap", href: "/roadmap" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Why UAE-native", href: "/why-uae" },
      { label: "Security", href: "/security" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    title: "Capabilities",
    links: [
      { label: "Leads", href: "/features" },
      { label: "Listings & compliance", href: "/why-uae" },
      { label: "Deals & commissions", href: "/features" },
      { label: "Insights", href: "/features" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Book a demo", href: "/demo" },
      { label: "Contact", href: "/demo" },
    ],
  },
] as const;
