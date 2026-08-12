"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { openStatus } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function OpenNow({ className }: { className?: string }) {
  const [state, setState] = useState<{ isOpen: boolean; detail: string } | null>(
    null
  );

  useEffect(() => {
    const tick = () => setState(openStatus(site.hours.opens, site.hours.closes));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const open = state?.isOpen ?? true;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md transition-colors",
        open
          ? "border-emerald-400/30 bg-emerald-400/[0.07] text-emerald-300"
          : "border-crimson/35 bg-crimson/[0.08] text-crimson",
        className
      )}
    >
      <span className="relative flex size-2">
        <span
          className={cn(
            "absolute inline-flex size-full rounded-full opacity-70",
            open ? "animate-ping bg-emerald-400" : "bg-crimson"
          )}
        />
        <span
          className={cn(
            "relative inline-flex size-2 rounded-full",
            open ? "bg-emerald-400" : "bg-crimson"
          )}
        />
      </span>
      <span suppressHydrationWarning>
        {state ? (state.isOpen ? "Open now" : "Closed") : "Open daily"}
        <span className="mx-1.5 text-linen/25">•</span>
        <span className="font-medium text-linen/65" suppressHydrationWarning>
          {state ? state.detail : site.hours.range}
        </span>
      </span>
    </div>
  );
}
