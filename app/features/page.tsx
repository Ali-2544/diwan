import type { Metadata } from "next";
import { Pillars } from "@/components/diwan/Pillars";
import { ScreenSection } from "@/components/diwan/ScreenSection";
import { LeadLifecycle } from "@/components/diwan/LeadLifecycle";
import { Commissions } from "@/components/diwan/Commissions";
import { CtaBand } from "@/components/diwan/CtaBand";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Six pillars — leads, listings & compliance, deals & commissions, campaigns, team & permissions, insights — plus the lead lifecycle engine and structured commissions.",
};

export default function FeaturesPage() {
  return (
    <>
      <Pillars />
      <ScreenSection
        surface="tint"
        eyebrow="In the product"
        title="The pillars, live in the app"
        subtitle="Not a prototype — the leads pipeline, the listing portfolio and the deals board your team works in every day."
        screens={[
          {
            slot: "dash1",
            url: "app.diwan.ae/leads",
            caption: "Leads — speed-to-lead, scoring and rotation",
          },
          {
            slot: "dash2",
            url: "app.diwan.ae/properties",
            caption: "Listings — portfolio, status mix and permits",
          },
          {
            slot: "dash3",
            url: "app.diwan.ae/deals",
            caption: "Deals — performance, parties and close dates",
          },
        ]}
      />
      <LeadLifecycle />
      <Commissions />
      <CtaBand />
    </>
  );
}
