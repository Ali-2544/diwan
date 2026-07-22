import { Hero } from "@/components/home/Hero";
import { PositioningStrip } from "@/components/home/PositioningStrip";
import { PainPoints } from "@/components/home/PainPoints";
import { PublishGate } from "@/components/home/PublishGate";
import { PropertyShowcase } from "@/components/home/PropertyShowcase";
import { Pillars } from "@/components/home/Pillars";
import { LifecycleEngine } from "@/components/home/LifecycleEngine";
import { MoneySection } from "@/components/home/MoneySection";
import { SecurityTeaser } from "@/components/home/SecurityTeaser";
import { RoadmapTeaser } from "@/components/home/RoadmapTeaser";
import { DemoCta } from "@/components/home/DemoCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PositioningStrip />
      <PainPoints />
      <PublishGate />
      <PropertyShowcase />
      <Pillars />
      <LifecycleEngine />
      <MoneySection />
      <SecurityTeaser />
      <RoadmapTeaser />
      <DemoCta />
    </>
  );
}
