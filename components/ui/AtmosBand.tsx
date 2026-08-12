import Image from "next/image";
import type { Atmos } from "@/lib/photos";
import { blurData } from "@/lib/blur";
import { cn } from "@/lib/utils";

export function AtmosBand({
  image,
  className,
  opacity = 0.4,
  position = "center",
}: {
  image: Atmos;
  className?: string;
  opacity?: number;
  position?: "center" | "right" | "left";
}) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <Image
        src={image.src}
        alt=""
        fill
        loading="lazy"
        sizes="100vw"
        placeholder={blurData[image.src] ? "blur" : "empty"}
        blurDataURL={blurData[image.src]}
        className="object-cover"
        style={{ objectPosition: image.focus ?? "50% 50%", opacity }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            position === "right"
              ? "linear-gradient(to left, rgba(10,8,6,0.42) 0%, rgba(10,8,6,0.88) 46%, var(--color-ink) 78%)"
              : position === "left"
                ? "linear-gradient(to right, rgba(10,8,6,0.42) 0%, rgba(10,8,6,0.88) 46%, var(--color-ink) 78%)"
                : "linear-gradient(to bottom, var(--color-ink) 0%, rgba(10,8,6,0.72) 40%, rgba(10,8,6,0.86) 70%, var(--color-ink) 100%)",
        }}
      />
      <div
        className="absolute inset-0 mix-blend-soft-light opacity-40"
        style={{ background: "linear-gradient(140deg,#ffb020,#ff6a13 50%,#d91e28)" }}
      />
    </div>
  );
}
