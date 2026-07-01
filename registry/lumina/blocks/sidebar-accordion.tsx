"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface SidebarAccordionSection {
  id: string;
  title: string;
  content: ReactNode;
  emptyMessage?: string;
}

export interface SidebarAccordionProps {
  sections: SidebarAccordionSection[];
  defaultOpenId?: string | null;
  openId?: string | null;
  onOpenChange?: (id: string | null) => void;
  className?: string;
}

function SidebarAccordion({
  sections,
  defaultOpenId = null,
  openId: controlledOpenId,
  onOpenChange,
  className,
}: SidebarAccordionProps) {
  const [internalOpenId, setInternalOpenId] = useState<string | null>(defaultOpenId);
  const isControlled = controlledOpenId !== undefined;
  const openId = isControlled ? controlledOpenId : internalOpenId;

  const toggle = (id: string) => {
    const next = openId === id ? null : id;
    if (!isControlled) setInternalOpenId(next);
    onOpenChange?.(next);
  };

  return (
    <Card variant="elevated" className={cn("flex flex-1 flex-col gap-3 p-5", className)}>
      {sections.map((section, i) => {
        const isOpen = openId === section.id;
        return (
          <div key={section.id}>
            {i > 0 && <hr className="mb-3 border-dashed border-neutral-200" />}
            <button
              type="button"
              onClick={() => toggle(section.id)}
              aria-expanded={isOpen}
              className="-mx-1 flex min-h-[44px] w-full items-center justify-between rounded-lg px-1 py-1 transition-colors hover:bg-neutral-50"
            >
              <span className="text-sm font-medium text-neutral-900">{section.title}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-neutral-500 transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
                strokeWidth={1.5}
              />
            </button>
            <div
              className="overflow-hidden transition-all duration-200 ease-out"
              style={{ maxHeight: isOpen ? 240 : 0, opacity: isOpen ? 1 : 0 }}
            >
              <div className="pt-3">
                {section.content ?? (
                  <p className="px-1 pb-1 text-xs text-neutral-500">
                    {section.emptyMessage ?? "No items to display."}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </Card>
  );
}

export { SidebarAccordion };
