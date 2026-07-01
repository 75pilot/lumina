"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SettingsMenuItem {
  icon: LucideIcon;
  label: string;
  right?: ReactNode;
  onSelect?: () => void;
}

export interface SettingsMenuSection {
  label: string;
  items: SettingsMenuItem[];
}

export interface SettingsMenuProps {
  sections: SettingsMenuSection[];
  triggerLabel?: string;
  className?: string;
}

function MenuRow({
  icon: Icon,
  label,
  right,
  onSelect,
}: SettingsMenuItem) {
  return (
    <DropdownMenuItem
      onSelect={onSelect}
      className="flex min-h-[40px] cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-neutral-700 transition-colors focus:bg-neutral-100 focus:outline-none hover:bg-neutral-100 hover:text-neutral-900"
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
      <span className="flex-1 font-display text-[13px] font-medium">{label}</span>
      {right}
    </DropdownMenuItem>
  );
}

function SettingsMenu({ sections, triggerLabel = "Settings", className }: SettingsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="icon"
          className={cn("hidden h-11 gap-2 px-4 sm:flex", className)}
        >
          <Settings strokeWidth={1.5} />
          <span className="font-display">{triggerLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-[260px] max-w-[92vw] rounded-2xl border border-neutral-200/80 bg-white p-2 shadow-card-md"
      >
        {sections.map((section, sectionIdx) => (
          <div key={section.label}>
            {sectionIdx > 0 && <DropdownMenuSeparator className="my-1.5 bg-neutral-200/70" />}
            <p className="px-2 pb-2 pt-1.5 font-display text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              {section.label}
            </p>
            {section.items.map((item) => (
              <MenuRow key={item.label} {...item} />
            ))}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { SettingsMenu, MenuRow as SettingsMenuRow };
