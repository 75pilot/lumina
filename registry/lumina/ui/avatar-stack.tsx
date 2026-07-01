import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface AvatarStackProps {
  avatars: Array<{ src?: string; alt: string; fallback: string }>;
  className?: string;
  size?: "sm" | "md";
}

function AvatarStack({ avatars, className, size = "sm" }: AvatarStackProps) {
  const sizeClass = size === "sm" ? "h-6 w-6" : "h-8 w-8";
  return (
    <div className={cn("flex -space-x-2 shrink-0", className)}>
      {avatars.map((a, i) => (
        <Avatar key={i} className={cn(sizeClass, "border-2 border-white")}>
          {a.src ? <AvatarImage src={a.src} alt={a.alt} /> : null}
          <AvatarFallback className="text-[10px]">{a.fallback}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}

export { AvatarStack };
