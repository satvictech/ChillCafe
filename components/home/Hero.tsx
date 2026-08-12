"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Star, Clock, ArrowDown } from "lucide-react";
import { site } from "@/lib/site";
import { itemCount, priceRange } from "@/lib/menu";
import { heroPhoto } from "@/lib/photos";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { FireButton, GhostButton } from "@/components/ui/Button";
import { OpenNow } from "@/components/ui/OpenNow";
import { VegMark } from "@/components/ui/Icons";

const EASE = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: `${site.rating}★`, label: `${site.ratingCount}+ ratings` },
  { value: `${itemCount}`, label: "items on the board" },
  { value: `₹${priceRange.min}`, label: "starting price" },
  { value: "100%", label: "vegetarian" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:pb-28 lg:pt-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 checker opacity-[0.45]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-[-18%] -z-20 size-[46rem] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(255,106,19,0.24) 0%, rgba(217,30,40,0.10) 42%, transparent 68%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-[-22%] -z-20 size-[40rem] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(255,176,32,0.20) 0%, transparent 65%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.06fr_0.94fr] lg:gap-16">
        <motion.div style={{ y: copyY }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-wrap items-center gap-3"
          >
            <OpenNow />
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.06] px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
              <VegMark className="size-3.5" />
              Pure Veg
            </span>
          </motion.div>

          <h1 className="mt-7 font-display text-[clamp(2.75rem,7.4vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.06, ease: EASE }}
              className="block text-cream"
            >
              Freshly made,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.16, ease: EASE }}
              className="script-gradient mt-1 block text-[1.12em] font-normal tracking-normal"
            >
              just for you
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
            className="mt-7 max-w-lg text-[1.0625rem] leading-relaxed text-muted sm:text-lg"
          >
            A pure-veg cafe on Nilothi Mode, Nangloi. Pizzas straight out of the
            oven, shakes straight out of the blender, and kullad chai in actual
            clay.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <FireButton href={site.order.url} external className="w-full sm:w-auto">
              Order Online
            </FireButton>
            <GhostButton href="/menu" className="w-full sm:w-auto">
              See the full menu
            </GhostButton>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-6 border-t border-linen/[0.08] pt-8 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl font-bold text-cream">
                  {s.value}
                </dt>
                <dd className="mt-1 text-[0.75rem] leading-tight text-faint">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[2.5rem] opacity-70 blur-2xl"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 40%, rgba(255,106,19,0.35), transparent 70%)",
            }}
          />

          <PhotoFrame
            photo={heroPhoto}
            priority
            ratio="aspect-[4/5]"
            sizes="(max-width: 1024px) 92vw, 46vw"
            wash={0.2}
            className="rotate-[1.4deg]"
          />

          <motion.div
            initial={{ opacity: 0, x: -24, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            className="absolute -left-3 top-8 flex items-center gap-3 rounded-2xl border border-linen/12 bg-ink/85 px-4 py-3 backdrop-blur-xl sm:-left-6"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-amber/12 text-amber">
              <Star className="size-4 fill-amber" strokeWidth={0} />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-bold text-cream">
                {site.rating}
              </span>
              <span className="block text-[0.6875rem] text-faint">
                {site.ratingCount}+ ratings
              </span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.82, ease: EASE }}
            className="absolute -right-3 bottom-10 flex items-center gap-3 rounded-2xl border border-linen/12 bg-ink/85 px-4 py-3 backdrop-blur-xl sm:-right-6"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-ember/12 text-ember">
              <Clock className="size-4" strokeWidth={2.4} />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-sm font-bold text-cream">
                {site.hours.range}
              </span>
              <span className="block text-[0.6875rem] text-faint">
                Open all 7 days
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-faint">
          Scroll
        </span>
        <ArrowDown className="size-4 animate-bounce text-amber/60" strokeWidth={2} />
      </motion.div>
    </section>
  );
}
