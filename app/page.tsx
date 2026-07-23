import { Hero } from "@/components/diwan/Hero";
import { PortalMarquee } from "@/components/diwan/PortalMarquee";
import { StatementStats } from "@/components/diwan/StatementStats";
import { ModuleDeck } from "@/components/diwan/ModuleDeck";
import { DashboardShowcase } from "@/components/diwan/DashboardShowcase";
import { Compliance } from "@/components/diwan/Compliance";
import { LeadPipeline } from "@/components/diwan/LeadPipeline";
import { Problems } from "@/components/diwan/Problems";
import { BentoFeatures } from "@/components/diwan/BentoFeatures";
import { CtaBand } from "@/components/diwan/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PortalMarquee />
      <StatementStats />
      <ModuleDeck />
      <DashboardShowcase />
      <Compliance />
      <LeadPipeline />
      <Problems />
      <BentoFeatures />
      <CtaBand />
    </>
  );
}
