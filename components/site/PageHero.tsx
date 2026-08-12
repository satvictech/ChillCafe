import { Reveal, SplitLines } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  lede,
  chips,
  className,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  chips?: string[];
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40",
        className
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 checker opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-20 size-[44rem] -translate-x-1/2 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(255,106,19,0.22) 0%, rgba(255,176,32,0.08) 40%, transparent 68%)",
        }}
      />

      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-amber/50" aria-hidden />
            {eyebrow}
          </p>
        </Reveal>

        <SplitLines
          text={title}
          as="h1"
          delay={0.05}
          className="mt-5 max-w-4xl font-display text-[clamp(2.25rem,6.4vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.035em]"
        />

        {lede && (
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-muted sm:text-lg">
              {lede}
            </p>
          </Reveal>
        )}

        {chips && chips.length > 0 && (
          <Reveal delay={0.22}>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-linen/12 bg-linen/[0.03] px-4 py-2 text-xs font-semibold text-linen/75"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
