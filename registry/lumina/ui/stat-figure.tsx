import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface StatFigureProps {
  icon: LucideIcon;
  value: string;
  label: string;
  className?: string;
}

function StatFigure({ icon: Icon, value, label, className }: StatFigureProps) {
  return (
    <div className={cn("flex flex-col items-start", className)}>
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300">
          <Icon className="h-4 w-4 text-neutral-600" strokeWidth={1.5} />
        </span>
        <span className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">{value}</span>
      </div>
      <span className="ml-12 text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export { StatFigure };
