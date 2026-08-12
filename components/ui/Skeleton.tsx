import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  rounded = "rounded-xl",
}: {
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden bg-linen/[0.045]",
        rounded,
        className
      )}
    >
      <div
        className="absolute inset-0 animate-shimmer bg-[linear-gradient(100deg,transparent_20%,rgba(236,224,209,0.09)_50%,transparent_80%)] bg-[length:200%_100%]"
      />
    </div>
  );
}

export function TextSkeleton({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2.5", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          rounded="rounded-full"
          className={cn("h-3", i === lines - 1 ? "w-2/5" : i % 2 ? "w-11/12" : "w-full")}
        />
      ))}
    </div>
  );
}

export function DishSkeleton({ ratio = "aspect-[4/5]" }: { ratio?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative flex flex-col justify-end overflow-hidden rounded-[1.75rem] surface",
        ratio
      )}
    >
      <Skeleton
        rounded="rounded-full"
        className="absolute left-1/2 top-[42%] aspect-square w-[68%] -translate-x-1/2 -translate-y-1/2"
      />
      <div className="relative space-y-2.5 p-5">
        <Skeleton rounded="rounded-full" className="h-4 w-3/5" />
        <Skeleton rounded="rounded-full" className="h-3 w-4/5" />
      </div>
      <Skeleton rounded="rounded-full" className="absolute right-4 top-4 h-7 w-14" />
    </div>
  );
}

export function MenuRowSkeleton() {
  return (
    <div aria-hidden className="flex items-center gap-4 border-b border-linen/[0.06] py-4">
      <Skeleton rounded="rounded-md" className="size-4 shrink-0" />
      <Skeleton rounded="rounded-full" className="h-3.5 flex-1 max-w-[16rem]" />
      <Skeleton rounded="rounded-full" className="h-3.5 w-12" />
    </div>
  );
}

export function BlockSkeleton({
  className,
  ratio = "aspect-[4/5]",
}: {
  className?: string;
  ratio?: string;
}) {
  return <Skeleton rounded="rounded-[1.75rem]" className={cn(ratio, className)} />;
}
