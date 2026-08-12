"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Flame } from "lucide-react";
import { categoryIcon } from "./Icons";
import { dishPhotos } from "@/lib/photos";
import { AddToTray } from "@/components/cart/AddToTray";
import { blurData } from "@/lib/blur";
import { cn, rupees } from "@/lib/utils";

const COLD = ["shakes", "cold-coffee", "mocktail", "cold-tea", "cold-drink"];

type DishProps = {
  name: string;
  price: number;
  note?: string;
  accent: string;
  categoryId: string;
  signature?: boolean;
  spicy?: boolean;
  className?: string;
  ratio?: string;
  compact?: boolean;
  priority?: boolean;
  sizes?: string;
  category?: string;
};

export function DishPlate({
  name,
  price,
  note,
  accent,
  categoryId,
  signature,
  spicy,
  className,
  ratio = "aspect-[4/5]",
  compact = false,
  priority = false,
  sizes = "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw",
  category,
}: DishProps) {
  const photo = dishPhotos[name];

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      className={cn(
        "group relative isolate flex flex-col justify-end overflow-hidden rounded-[1.75rem] surface",
        ratio,
        className
      )}
    >
      {photo ? (
        <>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes={sizes}
            placeholder={blurData[photo.src] ? "blur" : "empty"}
            blurDataURL={blurData[photo.src]}
            className="-z-10 object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
            style={{ objectPosition: photo.focus ?? "50% 50%" }}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 mix-blend-soft-light opacity-45"
            style={{ background: `linear-gradient(150deg, ${accent}, #d91e28)` }}
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(to top, var(--color-ink) 4%, rgba(10,8,6,0.72) 38%, rgba(10,8,6,0.12) 72%, rgba(10,8,6,0.45) 100%)",
            }}
          />
        </>
      ) : (
        <DrawnPlate accent={accent} categoryId={categoryId} />
      )}

      <div className="absolute left-4 top-4 flex gap-2">
        {signature && (
          <span className="rounded-full border border-amber/40 bg-ink/70 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-amber backdrop-blur-sm">
            Must try
          </span>
        )}
        {spicy && (
          <span className="flex items-center gap-1 rounded-full border border-crimson/40 bg-ink/70 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-crimson backdrop-blur-sm">
            <Flame className="size-2.5" strokeWidth={3} />
            Spicy
          </span>
        )}
      </div>

      <span className="absolute right-4 top-4 rounded-full border border-linen/15 bg-ink/75 px-3 py-1.5 font-display text-sm font-bold text-cream backdrop-blur-sm">
        {rupees(price)}
      </span>

      <div className="relative flex items-end justify-between gap-3 p-5 pt-14">
        <div className="min-w-0">
        <h3
          className={cn(
            "font-display font-semibold leading-[1.15] text-cream",
            compact ? "text-base" : "text-lg"
          )}
        >
          {name}
        </h3>
        {note && !compact && (
          <p className="mt-1.5 text-[0.8125rem] leading-snug text-linen/70">{note}</p>
        )}
        </div>
        <AddToTray
          variant="card"
          item={{
            name,
            price,
            category: category ?? "",
            categoryId,
            accent,
          }}
        />
      </div>
    </motion.article>
  );
}

function DrawnPlate({ accent, categoryId }: { accent: string; categoryId: string }) {
  const Glyph = categoryIcon[categoryId] ?? categoryIcon.pizza;
  const cold = COLD.includes(categoryId);

  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-75 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(130% 82% at 50% 6%, ${accent}4d 0%, ${accent}1a 34%, transparent 66%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-[42%] -z-10 aspect-square w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-linen/10 transition-transform duration-700 ease-out group-hover:scale-105"
        style={{
          boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.09), inset 0 0 70px -10px ${accent}40, 0 40px 90px -40px ${accent}99`,
          background: `radial-gradient(85% 85% at 34% 24%, ${accent}26, transparent 70%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-[42%] -z-10 aspect-square w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-linen/[0.07]"
      />
      <Glyph
        aria-hidden
        strokeWidth={0.9}
        className="absolute left-1/2 top-[42%] -z-10 size-[30%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-out group-hover:-translate-y-[54%] group-hover:rotate-[6deg]"
        style={{ color: accent, opacity: 0.78 }}
      />

      {!cold ? (
        <div aria-hidden className="absolute left-1/2 top-[14%] -z-10 flex -translate-x-1/2 gap-2.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-10 w-px rounded-full"
              style={{
                background: `linear-gradient(to top, ${accent}00, ${accent}88, ${accent}00)`,
              }}
              animate={{ opacity: [0.15, 0.65, 0.15], y: [4, -8, 4] }}
              transition={{
                duration: 3.4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.35,
              }}
            />
          ))}
        </div>
      ) : (
        <div aria-hidden className="absolute inset-x-[22%] top-[12%] -z-10 flex justify-between">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="block size-1 rounded-full"
              style={{ background: accent }}
              animate={{ opacity: [0.12, 0.7, 0.12], scale: [0.7, 1.15, 0.7] }}
              transition={{
                duration: 2.6 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      )}

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--color-ink)_10%,transparent_55%)]"
      />
    </>
  );
}
