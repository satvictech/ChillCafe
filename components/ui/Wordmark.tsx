import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  size = "md",
  withTagline = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
}) {
  const s = {
    sm: { chill: "text-[1.75rem]", cafe: "text-[0.6875rem] tracking-[0.42em]" },
    md: { chill: "text-[2.5rem]", cafe: "text-[0.8125rem] tracking-[0.46em]" },
    lg: { chill: "text-[clamp(3.5rem,9vw,6rem)]", cafe: "text-[clamp(0.9rem,2vw,1.15rem)] tracking-[0.5em]" },
  }[size];

  return (
    <span className={cn("inline-flex flex-col items-center leading-none", className)}>
      <span
        className={cn(
          "font-script text-cream drop-shadow-[0_2px_14px_rgba(255,106,19,0.35)]",
          s.chill
        )}
      >
        Chill
      </span>
      <span
        className={cn(
          "-mt-1 font-display font-extrabold uppercase text-ember-gradient",
          s.cafe
        )}
      >
        Cafe
      </span>
      {withTagline && (
        <span className="mt-3 font-display text-[0.625rem] font-semibold uppercase tracking-[0.32em] text-muted">
          Good Food · Good Mood
        </span>
      )}
    </span>
  );
}
