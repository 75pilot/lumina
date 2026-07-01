import { Users, UserCheck, CalendarDays } from "lucide-react";
import { OpenInV0Button } from "@/components/open-in-v0-button";
import { NavbarDemo } from "@/components/navbar-demo";
import { ProgressCard } from "@/registry/lumina/blocks/progress-card";
import { WelcomeKpi } from "@/registry/lumina/blocks/welcome-kpi";

const progressBars = [
  { day: "Mon", hours: 7.5, height: 72, fill: "bg-brand-yellow" },
  { day: "Tue", hours: 8.2, height: 80, fill: "bg-brand-yellow", active: true, badge: "8h 12m" },
  { day: "Wed", hours: 6.8, height: 65, fill: "bg-neutral-200" },
  { day: "Thu", hours: 7.0, height: 68, fill: "bg-neutral-200" },
  { day: "Fri", hours: 5.5, height: 55, fill: "bg-neutral-200" },
];

export default function Home() {
  return (
    <div className="mx-auto flex min-h-svh max-w-5xl flex-col gap-8 bg-shell-warm px-4 py-8">
      <header className="flex flex-col gap-1">
        <h1 className="font-display text-3xl font-bold tracking-tight">Lumina Registry</h1>
        <p className="text-muted-foreground">
          Crextio-themed shadcn/ui components and dashboard blocks.
        </p>
      </header>

      <main className="flex flex-1 flex-col gap-8">
        <section className="relative flex min-h-[220px] flex-col gap-4 rounded-3xl border bg-card p-4 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">Navbar block</h2>
            <OpenInV0Button name="navbar" className="w-fit" />
          </div>
          <NavbarDemo />
        </section>

        <section className="relative flex min-h-[320px] flex-col gap-4 rounded-3xl border bg-card p-4 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">Welcome KPI block</h2>
            <OpenInV0Button name="welcome-kpi" className="w-fit" />
          </div>
          <WelcomeKpi
            title="Good morning, Sarah"
            kpis={[
              { label: "Attendance", pct: 92, variant: "dark" },
              { label: "Tasks done", pct: 78, variant: "yellow" },
              { label: "On track", pct: 65, variant: "outline" },
            ]}
            stats={[
              { icon: Users, value: "128", label: "Team members" },
              { icon: UserCheck, value: "94%", label: "Present today" },
              { icon: CalendarDays, value: "12", label: "On leave" },
            ]}
          />
        </section>

        <section className="relative flex min-h-[360px] flex-col gap-4 rounded-3xl border bg-card p-4 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">Progress card block</h2>
            <OpenInV0Button name="progress-card" className="w-fit" />
          </div>
          <ProgressCard
            totalHours="34h 20m"
            label="This week"
            sublabel="5 days tracked"
            bars={progressBars}
          />
        </section>
      </main>
    </div>
  );
}
