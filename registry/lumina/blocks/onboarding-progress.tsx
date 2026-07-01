import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface OnboardingSegment {
  pct: number;
  label?: string;
  fill: string;
  trackBg?: string;
  textClass?: string;
}

export interface OnboardingProgressProps {
  title?: string;
  percent: number;
  segments: OnboardingSegment[];
  className?: string;
}

function OnboardingProgress({
  title = "Onboarding",
  percent,
  segments,
  className,
}: OnboardingProgressProps) {
  return (
    <Card variant="elevated" className={cn("flex flex-col gap-4 p-5", className)}>
      <CardHeader
        className="p-0"
        action={<span className="text-2xl font-bold text-neutral-900">{percent}%</span>}
      >
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-3 gap-2 p-0">
        {segments.map((segment, i) => (
          <div key={i} className="flex flex-col gap-2">
            <span
              className={cn(
                "text-xs font-medium",
                segment.pct > 0 ? "text-neutral-900" : "text-neutral-400",
              )}
            >
              {segment.pct}%
            </span>
            <div
              className={cn(
                "relative flex h-12 items-center overflow-hidden rounded-full px-3",
                segment.trackBg ?? "bg-neutral-100",
              )}
            >
              <div
                className={cn("absolute inset-y-0 left-0 transition-all duration-500", segment.fill)}
                style={{ width: `${segment.pct}%` }}
              />
              {segment.label && (
                <span className={cn("relative text-xs font-medium", segment.textClass ?? "text-neutral-900")}>
                  {segment.label}
                </span>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export { OnboardingProgress };
