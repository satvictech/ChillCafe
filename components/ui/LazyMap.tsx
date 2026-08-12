"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { mapsEmbed, site } from "@/lib/site";
import { Skeleton } from "./Skeleton";
import { cn } from "@/lib/utils";

export function LazyMap({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMount(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border border-linen/10 bg-char",
        className
      )}
    >
      {mount && (
        <iframe
          title={`Map showing ${site.name} on Nilothi Mode, Nangloi`}
          src={mapsEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
          className={cn(
            "absolute inset-0 size-full border-0 grayscale-[0.35] invert-[0.92] hue-rotate-[188deg] transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}

      {!loaded && (
        <div className="absolute inset-0 grid place-items-center">
          <Skeleton rounded="rounded-none" className="absolute inset-0" />
          <span className="relative flex flex-col items-center gap-3 text-center">
            <MapPin className="size-6 text-amber/70" strokeWidth={2} />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-faint">
              Loading map
            </span>
          </span>
        </div>
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-linen/[0.08]"
      />
    </div>
  );
}
