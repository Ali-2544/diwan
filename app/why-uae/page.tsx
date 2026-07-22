import type { Metadata } from "next";
import { Compliance } from "@/components/diwan/Compliance";
import { ScreenSection } from "@/components/diwan/ScreenSection";
import { ListingModel } from "@/components/diwan/ListingModel";
import { CtaBand } from "@/components/diwan/CtaBand";

export const metadata: Metadata = {
  title: "Why UAE-native",
  description:
    "A listing cannot go live without an active Trakheesi permit. Ready, off-plan and villa stock in one listing model — permits, title deeds, Makani and Ejari as first-class records.",
};

export default function WhyUaePage() {
  return (
    <>
      <Compliance />
      <ScreenSection
        variant="big"
        center
        surface="tint"
        eyebrow="In the product"
        title="The permit lives on the listing"
        subtitle="Permit number, status, issue and expiry, DLD title deed — beside a portal syndication panel that refuses to publish when the permit isn't active."
        screens={[
          {
            slot: "crmPropertyDetail",
            url: "app.diwan.ae/listings/DW-04182",
            caption:
              "A live listing with its Trakheesi permit block and portal write-guards",
          },
        ]}
      />
      <ListingModel />
      <CtaBand />
    </>
  );
}
