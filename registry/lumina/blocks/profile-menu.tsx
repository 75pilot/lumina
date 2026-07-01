"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ProfileUser {
  name: string;
  role: string;
  email: string;
  avatar?: string;
  fallback?: string;
  status?: string;
  isOnline?: boolean;
  onSetStatus?: () => void;
}

export interface ProfileMenuItem {
  icon: LucideIcon;
  label: string;
  right?: ReactNode;
  danger?: boolean;
  separatorBefore?: boolean;
  onSelect?: () => void;
}

export interface ProfileMenuProps {
  user: ProfileUser;
  menuItems: ProfileMenuItem[];
  className?: string;
}

function ProfileMenuRow({
  icon: Icon,
  label,
  right,
  danger = false,
  onSelect,
}: ProfileMenuItem) {
  const tone = danger
    ? "text-rose-400 hover:bg-rose-500/10 focus:bg-rose-500/10"
    : "text-white/85 hover:bg-white/5 focus:bg-white/5 hover:text-white";

  return (
    <DropdownMenuItem
      onSelect={onSelect}
      className={cn(
        "flex min-h-[40px] cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 transition-colors focus:outline-none",
        tone,
      )}
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
      <span className="flex-1 font-display text-[13px] font-medium">{label}</span>
      {right}
    </DropdownMenuItem>
  );
}

function ProfileMenu({ user, menuItems, className }: ProfileMenuProps) {
  const initials =
    user.fallback ??
    user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="icon"
          size="icon"
          aria-label="Account"
          className={cn("relative overflow-hidden", className)}
        >
          <Avatar className="h-11 w-11">
            {user.avatar ? <AvatarImage src={user.avatar} alt={user.name} /> : null}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          {user.isOnline !== false && (
            <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-[280px] max-w-[92vw] rounded-2xl border border-white/5 bg-brand-ink p-2 text-white shadow-card-dark"
      >
        <div className="flex items-center gap-3 px-2 py-2.5">
          <Avatar className="h-11 w-11 ring-2 ring-white/10">
            {user.avatar ? <AvatarImage src={user.avatar} alt={user.name} /> : null}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm font-semibold text-white">{user.name}</p>
            <p className="truncate text-[12px] font-medium text-white/55">{user.role}</p>
            <p className="truncate text-[12px] font-medium text-white/40">{user.email}</p>
          </div>
        </div>

        {user.status && (
          <div className="mx-2 mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-medium text-white/80">{user.status}</span>
            {user.onSetStatus && (
              <>
                <span className="text-[11px] text-white/30">·</span>
                <button
                  type="button"
                  onClick={user.onSetStatus}
                  className="text-[11px] font-medium text-white/60 transition-colors hover:text-white"
                >
                  Set status
                </button>
              </>
            )}
          </div>
        )}

        {menuItems.map((item) => (
          <div key={item.label}>
            {item.separatorBefore && <DropdownMenuSeparator className="my-1 bg-white/10" />}
            <ProfileMenuRow {...item} />
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { ProfileMenu, ProfileMenuRow };
