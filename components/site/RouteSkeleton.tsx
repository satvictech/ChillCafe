import {
  Skeleton,
  TextSkeleton,
  DishSkeleton,
  MenuRowSkeleton,
  BlockSkeleton,
} from "@/components/ui/Skeleton";

type Variant = "cards" | "menu" | "visit" | "gallery";

export function RouteSkeleton({ variant = "cards" }: { variant?: Variant }) {
  return (
    <div aria-busy="true" aria-label="Loading page">
      <section className="px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
        <div className="mx-auto w-full max-w-7xl">
          <Skeleton rounded="rounded-full" className="h-2.5 w-32" />
          <div className="mt-6 space-y-4">
            <Skeleton rounded="rounded-2xl" className="h-12 w-4/5 sm:h-16" />
            <Skeleton rounded="rounded-2xl" className="h-12 w-2/5 sm:h-16" />
          </div>
          <TextSkeleton lines={2} className="mt-8 max-w-2xl" />
          <div className="mt-8 flex gap-2.5">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} rounded="rounded-full" className="h-9 w-28" />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto w-full max-w-7xl">
          {variant === "menu" && (
            <div className="grid gap-12 lg:grid-cols-[13rem_1fr] lg:gap-16">
              <div className="hidden space-y-3 lg:block">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} rounded="rounded-full" className="h-3.5 w-32" />
                ))}
              </div>
              <div className="space-y-10">
                {Array.from({ length: 2 }).map((_, s) => (
                  <div key={s}>
                    <div className="flex items-center gap-4">
                      <Skeleton rounded="rounded-2xl" className="size-12 shrink-0" />
                      <div className="flex-1 space-y-2.5">
                        <Skeleton rounded="rounded-full" className="h-5 w-40" />
                        <Skeleton rounded="rounded-full" className="h-3 w-64" />
                      </div>
                    </div>
                    <div className="mt-6">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <MenuRowSkeleton key={i} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {variant === "cards" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <DishSkeleton key={i} />
              ))}
            </div>
          )}

          {variant === "gallery" && (
            <div className="grid gap-4 sm:grid-cols-3">
              <BlockSkeleton className="sm:col-span-2 sm:row-span-2" />
              <BlockSkeleton ratio="aspect-[4/3]" />
              <BlockSkeleton ratio="aspect-[4/3]" />
            </div>
          )}

          {variant === "visit" && (
            <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr]">
              <div className="space-y-5 rounded-[1.5rem] surface p-6">
                <Skeleton rounded="rounded-full" className="h-8 w-40" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton rounded="rounded-xl" className="size-10 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton rounded="rounded-full" className="h-2.5 w-20" />
                      <Skeleton rounded="rounded-full" className="h-3.5 w-full" />
                    </div>
                  </div>
                ))}
                <Skeleton rounded="rounded-full" className="h-14 w-full" />
              </div>
              <BlockSkeleton ratio="aspect-square" className="lg:aspect-auto lg:h-full lg:min-h-[26rem]" />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
