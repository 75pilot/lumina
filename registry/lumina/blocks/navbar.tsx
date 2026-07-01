"use client";

import type { ReactNode } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface NavbarProps {
  items: string[];
  activeItem: string;
  onNavigate: (item: string) => void;
  logo?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

function NavButton({
  item,
  active,
  onNavigate,
  className,
}: {
  item: string;
  active: boolean;
  onNavigate: (item: string) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onNavigate(item)}
      className={cn(
        "rounded-full text-sm font-medium transition-colors",
        active
          ? "bg-neutral-900 px-5 py-2 text-white"
          : "px-4 py-2 text-neutral-600 hover:bg-neutral-100",
        className,
      )}
    >
      {item}
    </button>
  );
}

function Navbar({ items, activeItem, onNavigate, logo, actions, className }: NavbarProps) {
  return (
    <header
      className={cn("grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-4", className)}
    >
      <div className="shrink-0 rounded-full border border-neutral-300 bg-transparent px-5 py-2.5">
        {logo}
      </div>

      <nav className="hidden items-center justify-self-center gap-1 rounded-full bg-white/60 px-2 py-1.5 shadow-card backdrop-blur lg:flex">
        {items.map((item) => (
          <NavButton key={item} item={item} active={item === activeItem} onNavigate={onNavigate} />
        ))}
      </nav>
      <div className="lg:hidden" />

      <div className="flex items-center justify-self-end gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="icon"
              size="icon"
              aria-label="Open menu"
              className="lg:hidden"
            >
              <Menu strokeWidth={1.5} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              {items.map((item) => (
                <NavButton
                  key={item}
                  item={item}
                  active={item === activeItem}
                  onNavigate={onNavigate}
                  className="px-5 py-3 text-left"
                />
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {actions}
      </div>
    </header>
  );
}

export { Navbar };
