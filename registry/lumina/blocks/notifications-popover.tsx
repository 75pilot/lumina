"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowRight, Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface NotificationItem {
  id: string;
  icon: LucideIcon;
  tint: string;
  title: string;
  meta: string;
  unread: boolean;
}

export interface NotificationsPopoverProps {
  items: NotificationItem[];
  onMarkRead?: (id: string) => void;
  onMarkAllRead?: () => void;
  onViewAll?: () => void;
  viewAllLabel?: string;
  className?: string;
}

function NotificationsPopover({
  items,
  onMarkRead,
  onMarkAllRead,
  onViewAll,
  viewAllLabel = "View all notifications",
  className,
}: NotificationsPopoverProps) {
  const unread = items.filter((n) => n.unread).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="icon" size="icon" aria-label="Notifications" className={cn("relative", className)}>
          <Bell strokeWidth={1.5} />
          {unread > 0 && (
            <Badge
              variant="yellow"
              className="absolute -right-0.5 -top-0.5 h-[18px] min-w-[18px] px-1 text-[10px] ring-2 ring-white"
            >
              {unread}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        variant="dark"
        align="end"
        sideOffset={10}
        className="w-[360px] max-w-[92vw]"
      >
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <h4 className="font-display text-sm font-semibold text-white">Notifications</h4>
            {unread > 0 && (
              <Badge variant="yellow" className="px-2 py-0.5 text-[10px]">
                {unread} new
              </Badge>
            )}
          </div>
          <button
            type="button"
            onClick={onMarkAllRead}
            disabled={unread === 0}
            className="text-xs font-medium text-white/70 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Mark all read
          </button>
        </div>
        <Separator className="bg-white/10" />
        <ScrollArea className="max-h-[360px]">
          <ul className="p-1.5">
            {items.map((n) => {
              const Icon = n.icon;
              return (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => onMarkRead?.(n.id)}
                    className="flex min-h-[56px] w-full items-start gap-3 rounded-xl px-2.5 py-2.5 text-left transition-colors hover:bg-white/5"
                  >
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5">
                      <Icon className={cn("h-4 w-4", n.tint)} strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-[13px] font-semibold leading-snug text-white">
                        {n.title}
                      </span>
                      <span className="mt-0.5 block text-[12px] font-medium text-white/55">{n.meta}</span>
                    </span>
                    {n.unread && (
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-yellow" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </ScrollArea>
        <Separator className="bg-white/10" />
        <button
          type="button"
          onClick={onViewAll}
          className="flex w-full items-center justify-center gap-1.5 rounded-b-2xl px-4 py-3 text-xs font-semibold text-white/80 transition-colors hover:bg-white/5 hover:text-white"
        >
          {viewAllLabel}
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </PopoverContent>
    </Popover>
  );
}

export { NotificationsPopover };
