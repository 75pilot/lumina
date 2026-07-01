"use client";

import { useEffect, useState } from "react";
import { AlarmClock, ArrowUpRight, Pause, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DEFAULT_MAX_SECONDS = 60 * 60;

export interface TimeTrackerCardProps {
  title?: string;
  seconds?: number;
  defaultSeconds?: number;
  running?: boolean;
  defaultRunning?: boolean;
  maxSeconds?: number;
  timerLabel?: string;
  onSecondsChange?: (seconds: number) => void;
  onRunningChange?: (running: boolean) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onReset?: () => void;
  onExpand?: () => void;
  className?: string;
}

function TimeTrackerCard({
  title = "Time tracker",
  seconds: controlledSeconds,
  defaultSeconds = 0,
  running: controlledRunning,
  defaultRunning = false,
  maxSeconds = DEFAULT_MAX_SECONDS,
  timerLabel = "Work Time",
  onSecondsChange,
  onRunningChange,
  onPlay,
  onPause,
  onReset,
  onExpand,
  className,
}: TimeTrackerCardProps) {
  const [internalSeconds, setInternalSeconds] = useState(defaultSeconds);
  const [internalRunning, setInternalRunning] = useState(defaultRunning);

  const isControlledSeconds = controlledSeconds !== undefined;
  const isControlledRunning = controlledRunning !== undefined;
  const seconds = isControlledSeconds ? controlledSeconds : internalSeconds;
  const running = isControlledRunning ? controlledRunning : internalRunning;

  const setSeconds = (next: number | ((prev: number) => number)) => {
    const value = typeof next === "function" ? next(seconds) : next;
    if (!isControlledSeconds) setInternalSeconds(value);
    onSecondsChange?.(value);
  };

  const setRunning = (value: boolean) => {
    if (!isControlledRunning) setInternalRunning(value);
    onRunningChange?.(value);
  };

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const r = 70;
  const c = 2 * Math.PI * r;
  const pct = Math.min(seconds / maxSeconds, 1);
  const offset = c - pct * c;
  const mm = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const ss = (seconds % 60).toString().padStart(2, "0");

  const handlePlay = () => {
    setRunning(true);
    onPlay?.();
  };

  const handlePause = () => {
    setRunning(false);
    onPause?.();
  };

  const handleReset = () => {
    setRunning(false);
    setSeconds(0);
    onReset?.();
  };

  return (
    <Card variant="elevated" className={cn("flex h-full flex-col gap-4 p-5", className)}>
      <CardHeader
        className="p-0"
        action={
          <Button
            variant="icon"
            size="icon"
            aria-label="Expand"
            className="h-9 w-9 shadow-card"
            onClick={onExpand}
          >
            <ArrowUpRight strokeWidth={1.75} />
          </Button>
        }
      >
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4 p-0">
        <div className="relative">
          <svg width="180" height="180" viewBox="0 0 180 180" aria-label={`${Math.round(pct * 100)}% complete`}>
            <circle
              cx="90"
              cy="90"
              r={r}
              fill="none"
              stroke="#e8e8e8"
              strokeWidth="6"
              strokeDasharray="2 6"
              strokeLinecap="round"
            />
            <circle
              cx="90"
              cy="90"
              r={r}
              fill="none"
              stroke="#f5c842"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={offset}
              transform="rotate(-90 90 90)"
              style={{ transition: "stroke-dashoffset 700ms ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-3xl font-semibold text-neutral-900">
              {mm}:{ss}
            </span>
            <span className="mt-1 text-xs font-medium text-neutral-500">{timerLabel}</span>
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-3">
          <Button variant="icon" size="icon" aria-label="Play" onClick={handlePlay}>
            <Play strokeWidth={1.75} fill="currentColor" />
          </Button>
          <Button variant="icon" size="icon" aria-label="Pause" onClick={handlePause}>
            <Pause strokeWidth={1.75} fill="currentColor" />
          </Button>
          <div className="flex-1" />
          <Button variant="default" size="icon" aria-label="Reset" onClick={handleReset}>
            <AlarmClock strokeWidth={1.75} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export { TimeTrackerCard };
