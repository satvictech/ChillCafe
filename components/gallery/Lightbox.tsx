"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { photos } from "@/lib/photos";
import { blurData } from "@/lib/blur";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const layout = [
  "sm:col-span-2 sm:row-span-2 aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-[4/3]",
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const move = useCallback(
    (step: number) =>
      setOpen((i) => (i === null ? null : (i + step + photos.length) % photos.length)),
    []
  );

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, move]);

  const active = open === null ? null : photos[open];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        {photos.map((photo, i) => (
          <motion.button
            key={photo.src}
            type="button"
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
            className={cn(
              "group relative overflow-hidden rounded-[1.5rem] border border-linen/10 bg-char",
              layout[i] ?? "aspect-[4/3]"
            )}
            aria-label={`Open photo: ${photo.caption}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 42vw"
              placeholder={blurData[photo.src] ? "blur" : "empty"}
              blurDataURL={blurData[photo.src]}
              className="photo-grade object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
              style={{ objectPosition: photo.focus ?? "50% 50%" }}
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,8,6,0.92)_2%,rgba(10,8,6,0.1)_55%)]"
            />
            <span className="absolute left-4 top-4 rounded-full border border-linen/15 bg-ink/65 px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-linen/80 backdrop-blur-md">
              {photo.tag}
            </span>
            <span className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-linen/15 bg-ink/65 text-cream opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
              <Expand className="size-4" strokeWidth={2.2} />
            </span>
            <span className="absolute inset-x-5 bottom-5 text-left">
              <span className="block text-[0.875rem] font-medium leading-snug text-linen/90">
                {photo.caption}
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] flex flex-col bg-ink/96 backdrop-blur-xl"
            onClick={() => setOpen(null)}
          >
            <div className="flex items-center justify-between p-5">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-faint">
                {(open ?? 0) + 1} / {photos.length}
              </span>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="flex size-11 items-center justify-center rounded-full border border-linen/15 text-cream transition-colors hover:border-amber/50 hover:text-amber"
              >
                <X className="size-5" strokeWidth={2.2} />
              </button>
            </div>

            <div
              className="relative flex-1 px-4 pb-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={active.src}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="relative mx-auto h-full w-full max-w-4xl"
              >
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  sizes="100vw"
                  placeholder={blurData[active.src] ? "blur" : "empty"}
                  blurDataURL={blurData[active.src]}
                  className="rounded-2xl object-contain"
                />
              </motion.div>
            </div>

            <div
              className="flex items-center justify-between gap-4 p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Previous photo"
                className="flex size-11 shrink-0 items-center justify-center rounded-full border border-linen/15 text-cream transition-colors hover:border-amber/50 hover:text-amber"
              >
                <ChevronLeft className="size-5" strokeWidth={2.2} />
              </button>
              <p className="max-w-lg text-center text-sm leading-relaxed text-muted">
                {active.caption}
              </p>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Next photo"
                className="flex size-11 shrink-0 items-center justify-center rounded-full border border-linen/15 text-cream transition-colors hover:border-amber/50 hover:text-amber"
              >
                <ChevronRight className="size-5" strokeWidth={2.2} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
