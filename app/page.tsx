import { Hero } from "@/components/diwan/Hero";
import { PortalMarquee } from "@/components/diwan/PortalMarquee";
import { StatementStats } from "@/components/diwan/StatementStats";
import { DashboardShowcase } from "@/components/diwan/DashboardShowcase";
import { Problems } from "@/components/diwan/Problems";
import { ScreenSection } from "@/components/diwan/ScreenSection";
import { CtaBand } from "@/components/diwan/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PortalMarquee />
      <StatementStats />
      <DashboardShowcase />
      <Problems />
      <ScreenSection
        surface="tint"
        eyebrow="Day to day"
        title="Viewings, tasks and follow-ups in one place"
        subtitle="The small things that lose deals — a viewing nobody confirmed, a permit renewal nobody chased — sit on one screen your whole office reads."
        screens={[
          {
            slot: "crmCalendar",
            url: "app.diwan.ae/calendar",
            caption: "Calendar — viewings and meetings, today and the week ahead",
          },
          {
            slot: "crmTasks",
            url: "app.diwan.ae/tasks",
            caption: "Tasks — overdue first, with the lifecycle one click away",
          },
        ]}
      />
      <CtaBand />
    </>
  );
}
