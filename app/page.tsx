import { Hero } from "@/components/diwan/Hero";
import { PortalMarquee } from "@/components/diwan/PortalMarquee";
import { StatementStats } from "@/components/diwan/StatementStats";
import { DashboardShowcase } from "@/components/diwan/DashboardShowcase";
import { Problems } from "@/components/diwan/Problems";
import { ModuleDeck } from "@/components/diwan/ModuleDeck";
import { CtaBand } from "@/components/diwan/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PortalMarquee />
      <StatementStats />
      <ModuleDeck />
      <DashboardShowcase />
      <Problems />
      <CtaBand />
    </>
  );
}
