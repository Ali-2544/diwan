import type { Metadata } from "next";
import { Roadmap } from "@/components/diwan/Roadmap";
import { CtaBand } from "@/components/diwan/CtaBand";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "The honest version — outbound sending, live portal sync, a full mobile app and AI lead scoring are in progress, and not in the product today.",
};

export default function RoadmapPage() {
  return (
    <>
      <Roadmap />
      <CtaBand />
    </>
  );
}
