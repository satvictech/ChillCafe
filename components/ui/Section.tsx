import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal, SplitLines } from "./Reveal";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative px-5 py-24 sm:px-8 md:py-32", className)}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Reveal>
        <p className="eyebrow flex items-center gap-3">
          {align === "left" && (
            <span className="inline-block h-px w-8 bg-amber/50" aria-hidden />
          )}
          {eyebrow}
        </p>
      </Reveal>
      <SplitLines
        text={title}
        as="h2"
        delay={0.05}
        className="mt-4 font-display text-[clamp(2rem,5.2vw,3.75rem)] font-bold leading-[1.02]"
      />
      {lede && (
        <Reveal delay={0.14}>
          <p
            className={cn(
              "mt-5 text-[1.0625rem] leading-relaxed text-muted",
              align === "center" && "mx-auto max-w-2xl"
            )}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function CheckerRule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("checker-band h-4 w-full mask-fade-x opacity-60", className)}
    />
  );
}
