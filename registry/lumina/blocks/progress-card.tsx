import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ProgressBarItem {
  day: string;
  hours: number;
  height: number;
  fill: string;
  active?: boolean;
  badge?: string;
}

export interface ProgressCardProps {
  title?: string;
  totalHours: string;
  label: string;
  sublabel?: string;
  bars: ProgressBarItem[];
  onExpand?: () => void;
  className?: string;
}

function formatHours(h: number) {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  return `${hh}h ${mm.toString().padStart(2, "0")}m`;
}

function ProgressCard({
  title = "Progress",
  totalHours,
  label,
  sublabel,
  bars,
  onExpand,
  className,
}: ProgressCardProps) {
  return (
    <Card variant="elevated" className={cn("flex h-full flex-col gap-5 p-5", className)}>
      <CardHeader
        className="p-0"
        action={
          <Button
            variant="icon"
            size="icon"
            aria-label="Expand"
            className="h-9 w-9 shadow-card"
            onClick={onExpand}
          >
            <ArrowUpRight strokeWidth={1.75} />
          </Button>
        }
      >
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-5 p-0">
        <div className="flex items-end gap-3">
          <span className="text-4xl font-bold text-neutral-900">{totalHours}</span>
          <div className="pb-1">
            <p className="text-sm font-medium leading-tight text-neutral-900">{label}</p>
            {sublabel && (
              <p className="text-xs leading-tight text-neutral-500">{sublabel}</p>
            )}
          </div>
        </div>

        <div className="relative mt-auto flex h-32 items-end justify-between gap-2">
          {bars.map((bar, i) => (
            <div key={`${bar.day}-${i}`} className="group relative flex flex-1 flex-col items-center gap-2">
              {bar.active && bar.badge && (
                <span className="absolute -top-7 whitespace-nowrap rounded-full bg-brand-yellow px-2.5 py-1 text-xs font-semibold text-neutral-900">
                  {bar.badge}
                </span>
              )}
              <span className="absolute -top-7 z-10 hidden whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-[10px] font-semibold text-white group-hover:block">
                {formatHours(bar.hours)}
              </span>
              <div
                className={cn("w-3 animate-bar-rise rounded-full", bar.fill)}
                style={{ height: `${bar.height}px`, animationDelay: `${i * 60}ms` }}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between px-1">
          {bars.map((bar, i) => (
            <span key={`label-${bar.day}-${i}`} className="flex-1 text-center text-xs font-medium text-neutral-400">
              {bar.day}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { ProgressCard };
