import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const kpiPillVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold min-w-[88px]",
  {
    variants: {
      variant: {
        dark: "bg-neutral-200 text-white",
        yellow: "bg-brand-yellow-lt text-neutral-900",
        striped: "min-w-[280px] border border-neutral-300 bg-white text-neutral-600",
        outline: "border border-neutral-300 bg-transparent text-neutral-600",
      },
    },
    defaultVariants: {
      variant: "dark",
    },
  },
);

export interface KpiPillProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof kpiPillVariants> {
  pct: number;
}

function KpiPill({ className, variant, pct, ...props }: KpiPillProps) {
  const label = `${pct}%`;

  if (variant === "striped") {
    return (
      <span
        className={cn(kpiPillVariants({ variant }), className)}
        aria-label={`${pct}% — Project time`}
        {...props}
      >
        <span
          className="absolute inset-y-0 left-0 animate-kpi-fill"
          style={{
            width: `${pct}%`,
            backgroundImage: "repeating-linear-gradient(135deg, #fff 0 8px, #e8e8e8 8px 10px)",
          }}
        />
        <span className="relative">{label}</span>
      </span>
    );
  }

  const fillBg =
    variant === "dark"
      ? "bg-neutral-900"
      : variant === "yellow"
        ? "bg-primary"
        : "bg-neutral-200";

  return (
    <span className={cn(kpiPillVariants({ variant }), className)} aria-label={label} {...props}>
      <span
        className={cn("absolute inset-y-0 left-0 animate-kpi-fill", fillBg)}
        style={{ width: `${pct}%` }}
      />
      <span className="relative">{label}</span>
    </span>
  );
}

export { KpiPill, kpiPillVariants };
