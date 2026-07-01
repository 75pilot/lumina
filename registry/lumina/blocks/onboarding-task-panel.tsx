"use client";

import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface OnboardingTask {
  id: string;
  icon: LucideIcon;
  label: string;
  date: string;
  done: boolean;
}

export interface OnboardingTaskPanelProps {
  title?: string;
  tasks: OnboardingTask[];
  total: number;
  onToggle: (id: string) => void;
  className?: string;
}

function OnboardingTaskPanel({
  title = "Onboarding Task",
  tasks,
  total,
  onToggle,
  className,
}: OnboardingTaskPanelProps) {
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <Card variant="dark" className={cn("flex flex-1 flex-col gap-4 p-5", className)}>
      <CardHeader
        className="p-0"
        action={
          <span className="text-sm font-semibold text-white/80">
            {doneCount}/{total}
          </span>
        }
      >
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <ul className="space-y-3">
          {tasks.map(({ id, icon: Icon, label, date, done }) => (
            <li
              key={id}
              className="-mx-1 flex items-center gap-3 rounded-2xl p-1 transition-colors hover:bg-white/5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Icon className="h-4 w-4 text-white/80" strokeWidth={1.5} />
              </span>
              <div className="min-w-0 flex-1">
                <p className={cn("text-sm font-medium", done ? "text-white/60 line-through" : "text-white")}>
                  {label}
                </p>
                <p className="text-xs text-white/50">{date}</p>
              </div>
              <button
                type="button"
                onClick={() => onToggle(id)}
                aria-label={done ? "Mark incomplete" : "Mark complete"}
                aria-pressed={done}
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors",
                  done ? "bg-brand-yellow" : "border border-white/30 hover:border-white/60",
                )}
              >
                {done && <Check className="h-3 w-3 text-neutral-900" strokeWidth={3} />}
              </button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export { OnboardingTaskPanel };
