"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Box, Play, Maximize2, X, MousePointer2 } from "lucide-react";
import { roomPhotos } from "@/lib/photos";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { blurData } from "@/lib/blur";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

const CafeRoom = dynamic(() => import("./CafeRoom"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <Skeleton rounded="rounded-none" className="absolute inset-0" />
      <span className="relative flex flex-col items-center gap-3">
        <Box className="size-6 animate-pulse text-amber/70" strokeWidth={1.8} />
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-faint">
          Building the room
        </span>
      </span>
    </div>
  ),
});

const poster = roomPhotos[1] ?? roomPhotos[0];

export function RoomViewer({
  className,
  autoStart = false,
  bare = false,
}: {
  className?: string;
  autoStart?: boolean;
  /** Full-bleed: no frame, no badges — the page supplies its own chrome. */
  bare?: boolean;
}) {
  const [live, setLive] = useState(autoStart);
  const [full, setFull] = useState(false);
  const calm = usePrefersReducedMotion();

  useEffect(() => {
    document.body.style.overflow = full ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [full]);

  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFull(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [full]);

  return (
    <>
      <div
        className={cn(
          "relative overflow-hidden bg-char",
          !bare && "rounded-[1.75rem] border border-linen/10",
          className
        )}
      >
        {live ? (
          <CafeRoom autoRotate={!calm} />
        ) : (
          <button
            type="button"
            onClick={() => setLive(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label="Load the interactive 3D room"
          >
            <Image
              src={poster.src}
              alt=""
              fill
              sizes="(max-width: 1024px) 92vw, 60vw"
              placeholder={blurData[poster.src] ? "blur" : "empty"}
              blurDataURL={blurData[poster.src]}
              className="object-cover opacity-45 blur-[2px] transition-transform duration-[1400ms] group-hover:scale-105"
              style={{ objectPosition: poster.focus ?? "50% 50%" }}
            />
            <span className="absolute inset-0 bg-ink/55" />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
              <span className="flex size-16 items-center justify-center rounded-full border border-amber/40 bg-ink/70 text-amber backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
                <Play className="size-5 translate-x-0.5 fill-amber" strokeWidth={0} />
              </span>
              <span className="font-display text-xl font-bold text-cream">
                Walk around the room in 3D
              </span>
              <span className="max-w-xs text-[0.8125rem] leading-relaxed text-muted">
                Drag to look around, scroll to move closer. Loads only when you
                ask for it.
              </span>
            </span>
          </button>
        )}

        {live && !bare && (
          <>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-[linear-gradient(to_top,rgba(10,8,6,0.9),transparent)] p-4">
              <span className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-linen/60">
                <MousePointer2 className="size-3.5" strokeWidth={2.4} />
                Drag to look · scroll to zoom
              </span>
            </div>
            <button
              type="button"
              onClick={() => setFull(true)}
              aria-label="Open the 3D room fullscreen"
              className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-linen/15 bg-ink/70 text-cream backdrop-blur-md transition-colors hover:border-amber/50 hover:text-amber"
            >
              <Maximize2 className="size-4" strokeWidth={2.2} />
            </button>
          </>
        )}

        {!bare && (
          <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-linen/15 bg-ink/65 px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-linen/80 backdrop-blur-md">
            3D · stylised
          </span>
        )}
      </div>

      <AnimatePresence>
        {full && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-ink"
          >
            <CafeRoom autoRotate={!calm} />
            <button
              type="button"
              onClick={() => setFull(false)}
              aria-label="Close fullscreen"
              className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full border border-linen/15 bg-ink/70 text-cream backdrop-blur-md hover:border-amber/50 hover:text-amber"
            >
              <X className="size-5" strokeWidth={2.2} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
