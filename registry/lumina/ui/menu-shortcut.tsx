import * as React from "react";

import { cn } from "@/lib/utils";

export interface MenuShortcutProps extends React.HTMLAttributes<HTMLElement> {
  dark?: boolean;
}

function MenuShortcut({ className, dark = false, children, ...props }: MenuShortcutProps) {
  return (
    <kbd
      className={cn(
        "font-mono text-[10px] font-semibold rounded-md px-1.5 py-0.5",
        dark
          ? "bg-white/10 text-white/70 border border-white/10"
          : "bg-neutral-100 text-neutral-500 border border-neutral-200",
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}

export { MenuShortcut };
