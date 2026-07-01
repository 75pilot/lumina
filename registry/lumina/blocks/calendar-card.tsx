"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { cn } from "@/lib/utils";

export interface CalendarDay {
  label: string;
  date: string;
}

export interface CalendarEvent {
  id: string;
  day: number;
  row: number;
  title: string;
  subtitle: string;
  dark?: boolean;
  avatars?: Array<{ src?: string; alt: string; fallback: string }>;
}

export interface CalendarCardProps {
  monthLabel: string;
  prevLabel: string;
  nextLabel: string;
  days: CalendarDay[];
  times: string[];
  events: CalendarEvent[];
  todayIndex?: number;
  weekOffset?: number;
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
  onCreateEvent?: (day: number, row: number, title: string, start: string, end: string) => void;
  onDeleteEvent?: (id: string) => void;
  className?: string;
}

function CalendarCell({
  hasEvent,
  event,
  onCreate,
  onDelete,
}: {
  hasEvent: boolean;
  event?: CalendarEvent;
  onCreate?: (title: string, start: string, end: string) => void;
  onDelete?: (id: string) => void;
}) {
  const [createOpen, setCreateOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("10:00");

  return (
    <div className="relative min-h-[56px] border-t border-dashed border-neutral-200">
      {hasEvent && event ? (
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn(
                "absolute left-1 right-1 top-2 z-10 flex items-center justify-between gap-2 rounded-2xl px-3 py-2 text-left transition-shadow hover:shadow-card-md lg:right-[-180px]",
                event.dark ? "bg-neutral-900 text-white" : "bg-white shadow-card",
              )}
            >
              <div className="min-w-0">
                <p
                  className={cn(
                    "truncate text-xs font-semibold sm:text-sm",
                    event.dark ? "text-white" : "text-neutral-900",
                  )}
                >
                  {event.title}
                </p>
                <p
                  className={cn(
                    "truncate text-[10px] sm:text-xs",
                    event.dark ? "text-white/60" : "text-neutral-500",
                  )}
                >
                  {event.subtitle}
                </p>
              </div>
              {event.avatars && event.avatars.length > 0 && (
                <div className="hidden sm:block">
                  <AvatarStack avatars={event.avatars} />
                </div>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-neutral-900">{event.title}</p>
              <p className="text-xs text-neutral-500">{event.subtitle}</p>
              <Button
                size="sm"
                variant="destructive"
                className="w-full"
                onClick={() => onDelete?.(event.id)}
              >
                <Trash2 className="mr-1 h-3 w-3" /> Delete
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              aria-label="Add event"
              className="absolute inset-0 m-1 flex items-center justify-center rounded-xl opacity-0 transition-opacity hover:bg-neutral-100/50 hover:opacity-100"
            >
              <Plus className="h-4 w-4 text-neutral-400" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New event</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label htmlFor="ev-title">Event name</Label>
                <Input
                  id="ev-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Event name"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="ev-start">Start</Label>
                  <Input
                    id="ev-start"
                    type="time"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="ev-end">End</Label>
                  <Input id="ev-end" type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  if (!title.trim()) return;
                  onCreate?.(title.trim(), start, end);
                  setTitle("");
                  setCreateOpen(false);
                }}
              >
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function CalendarCard({
  monthLabel,
  prevLabel,
  nextLabel,
  days,
  times,
  events,
  todayIndex,
  weekOffset = 0,
  onPrevWeek,
  onNextWeek,
  onCreateEvent,
  onDeleteEvent,
  className,
}: CalendarCardProps) {
  return (
    <Card variant="glass" className={cn("flex h-full flex-col gap-4 p-5", className)}>
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onPrevWeek}
          className="min-h-[36px] rounded-full bg-white px-4 py-2 text-xs font-medium text-neutral-500 shadow-card transition-colors hover:bg-neutral-50"
        >
          {prevLabel}
        </button>
        <h3 className="text-base font-semibold text-neutral-900 sm:text-lg">{monthLabel}</h3>
        <button
          type="button"
          onClick={onNextWeek}
          className="min-h-[36px] rounded-full bg-white px-4 py-2 text-xs font-medium text-neutral-500 shadow-card transition-colors hover:bg-neutral-50"
        >
          {nextLabel}
        </button>
      </div>

      <div className="grid grid-cols-[48px_repeat(6,1fr)] gap-x-1 overflow-x-auto sm:grid-cols-[64px_repeat(6,1fr)] sm:gap-x-2">
        <div />
        {days.map((day, i) => {
          const isToday = weekOffset === 0 && todayIndex === i;
          return (
            <div
              key={`${day.label}-${day.date}`}
              className={cn("flex flex-col items-center rounded-xl py-2", isToday && "bg-neutral-900/5")}
            >
              <span className={cn("text-xs font-medium", isToday ? "text-neutral-900" : "text-neutral-500")}>
                {day.label}
              </span>
              <span className="text-sm font-semibold text-neutral-900">{day.date}</span>
            </div>
          );
        })}

        {times.map((time, rowIdx) => (
          <div key={time} className="contents">
            <div className="border-t border-dashed border-neutral-200 py-4 pr-2 text-[10px] font-medium text-neutral-500 sm:text-xs">
              {time}
            </div>
            {days.map((day, colIdx) => {
              const ev = events.find((e) => e.day === colIdx && e.row === rowIdx);
              return (
                <CalendarCell
                  key={`${day.label}-${time}`}
                  hasEvent={!!ev}
                  event={ev}
                  onCreate={(title, start, end) => onCreateEvent?.(colIdx, rowIdx, title, start, end)}
                  onDelete={onDeleteEvent}
                />
              );
            })}
          </div>
        ))}
      </div>
    </Card>
  );
}

export { CalendarCard };
