/**
 * The 8 image slots from the handoff. Every product image flows through here.
 *
 * Current files are placeholders (property photos generated in the Diwan
 * palette; dashboard slots are styled stand-ins). To use real assets, drop a
 * file into /public/diwan with the SAME name — no component changes.
 *
 * `crm: true` marks the four dashboard slots that should become real CRM
 * screenshots (captured from app.diwan.ae once the CRM is running).
 */

export type SlotKey =
  | "heroListing"
  | "complianceListing"
  | "lmReady"
  | "lmOffplan"
  | "lmVilla"
  | "dashHero"
  | "dash1"
  | "dash2"
  | "dash3"
  | "crmCalendar"
  | "crmTasks"
  | "crmPropertyDetail"
  | "crmContacts"
  | "crmReports"
  | "crmCommissions"
  | "crmCampaigns"
  | "crmUsers"
  | "crmActivity";

export const IMAGES: Record<SlotKey, { src: string; alt: string; crm?: boolean }> = {
  heroListing: {
    src: "/diwan/hero-listing.jpg",
    alt: "Two-bedroom apartment overlooking Dubai Marina",
  },
  complianceListing: {
    src: "/diwan/compliance-listing.jpg",
    alt: "Dubai Marina apartment exterior",
  },
  lmReady: {
    src: "/diwan/lm-ready.jpg",
    alt: "Ready residential apartment tower",
  },
  lmOffplan: {
    src: "/diwan/lm-offplan.jpg",
    alt: "Off-plan development under construction",
  },
  lmVilla: {
    src: "/diwan/lm-villa.jpg",
    alt: "Villa and townhouse community",
  },
  dashHero: {
    src: "/diwan/dash-hero.png",
    alt: "Diwan dashboard — the brokerage overview screen",
    crm: true,
  },
  dash1: {
    src: "/diwan/dash-1.png",
    alt: "Diwan leads pipeline with speed-to-lead tracking",
    crm: true,
  },
  dash2: {
    src: "/diwan/dash-2.png",
    alt: "Diwan listings and Trakheesi compliance view",
    crm: true,
  },
  dash3: {
    src: "/diwan/dash-3.png",
    alt: "Diwan reports and KPI dashboard",
    crm: true,
  },
  crmCalendar: {
    src: "/diwan/crm-calendar.png",
    alt: "Diwan calendar of viewings and meetings",
    crm: true,
  },
  crmTasks: {
    src: "/diwan/crm-tasks.png",
    alt: "Diwan tasks and follow-ups with overdue tracking",
    crm: true,
  },
  crmPropertyDetail: {
    src: "/diwan/crm-property-detail.png",
    alt: "A Diwan listing showing its Trakheesi permit block and portal syndication",
    crm: true,
  },
  crmContacts: {
    src: "/diwan/crm-contacts.png",
    alt: "Diwan contacts directory",
    crm: true,
  },
  crmReports: {
    src: "/diwan/crm-reports.png",
    alt: "Diwan reports and lead-source ROI",
    crm: true,
  },
  crmCommissions: {
    src: "/diwan/crm-commissions.png",
    alt: "Diwan commissions with splits, co-broke and VAT",
    crm: true,
  },
  crmCampaigns: {
    src: "/diwan/crm-campaigns.png",
    alt: "Diwan campaign performance and agent rotation",
    crm: true,
  },
  crmUsers: {
    src: "/diwan/crm-users.png",
    alt: "Diwan users, roles and permissions",
    crm: true,
  },
  crmActivity: {
    src: "/diwan/crm-activity.png",
    alt: "Diwan append-only activity and audit log",
    crm: true,
  },
};
