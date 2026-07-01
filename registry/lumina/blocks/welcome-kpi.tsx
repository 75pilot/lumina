import type { LucideIcon } from "lucide-react";
import { KpiPill } from "@/components/ui/kpi-pill";
import { StatFigure } from "@/components/ui/stat-figure";
import { cn } from "@/lib/utils";

export interface WelcomeKpiItem {
  label: string;
  pct: number;
  variant: "dark" | "yellow" | "striped" | "outline";
}

export interface WelcomeStatItem {
  icon: LucideIcon;
  value: string;
  label: string;
}

export interface WelcomeKpiProps {
  title: string;
  kpis: WelcomeKpiItem[];
  stats: WelcomeStatItem[];
  className?: string;
}

function WelcomeKpi({ title, kpis, stats, className }: WelcomeKpiProps) {
  return (
    <section className={cn("space-y-6 pt-2 sm:pt-4", className)}>
      <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
        {title}
      </h1>

      <div className="flex flex-wrap items-end justify-between gap-8">
        <div className="flex flex-wrap items-end gap-4 sm:gap-6">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="flex flex-col gap-2">
              <span className="text-xs font-medium text-neutral-500">{kpi.label}</span>
              <KpiPill pct={kpi.pct} variant={kpi.variant} />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-end gap-6 sm:gap-8">
          {stats.map((stat) => (
            <StatFigure key={stat.label} icon={stat.icon} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { WelcomeKpi };
