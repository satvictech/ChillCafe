"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Photo } from "@/lib/photos";
import { blurData } from "@/lib/blur";
import { cn } from "@/lib/utils";

export function PhotoFrame({
  photo,
  className,
  ratio = "aspect-[4/5]",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  showCaption = false,
  wash = 0.28,
  rounded = "rounded-[1.75rem]",
}: {
  photo: Photo;
  className?: string;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
  showCaption?: boolean;
  wash?: number;
  rounded?: string;
}) {
  return (
    <figure className={cn("group relative", className)}>
      <div
        className={cn(
          "relative overflow-hidden border border-linen/10 bg-char",
          rounded,
          ratio
        )}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          sizes={sizes}
          placeholder={blurData[photo.src] ? "blur" : "empty"}
          blurDataURL={blurData[photo.src]}
          className="photo-grade object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          style={{ objectPosition: photo.focus ?? "50% 50%" }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{
            opacity: wash,
            background:
              "linear-gradient(150deg,#ffb020 0%,#ff6a13 46%,#d91e28 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 30%, transparent 40%, rgba(10,8,6,0.55) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--color-ink)_2%,transparent_45%)]"
        />

        <span className="absolute left-4 top-4 rounded-full border border-linen/15 bg-ink/65 px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-linen/80 backdrop-blur-md">
          {photo.tag}
        </span>
      </div>

      {showCaption && (
        <figcaption className="mt-3.5 max-w-md text-[0.8125rem] leading-relaxed text-muted">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}

export function DriftPhoto({
  photo,
  className,
  ratio,
  priority,
  sizes,
  delay = 0,
}: {
  photo: Photo;
  className?: string;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <PhotoFrame photo={photo} ratio={ratio} priority={priority} sizes={sizes} />
    </motion.div>
  );
}
