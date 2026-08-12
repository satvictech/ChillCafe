"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus, Minus, Check } from "lucide-react";
import { tray, useTray, useTrayQty, type TrayItem } from "@/lib/tray";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function AddToTray({
  item,
  variant = "row",
  className,
}: {
  item: TrayItem;
  variant?: "row" | "card";
  className?: string;
}) {
  const qty = useTrayQty(item.name);
  const inTray = qty > 0;

  const step = (by: number) => {
    if (by > 0 && qty === 0) tray.add(item);
    else tray.setQty(item.name, qty + by);
  };

  return (
    <div className={cn("relative shrink-0", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        {inTray ? (
          <motion.div
            key="stepper"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.24, ease: EASE }}
            className={cn(
              "flex items-center gap-0.5 rounded-full border p-0.5",
              variant === "card"
                ? "border-amber/45 bg-ink/80 backdrop-blur-sm"
                : "border-amber/40 bg-amber/[0.08]"
            )}
          >
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={`Remove one ${item.name}`}
              className="flex size-7 items-center justify-center rounded-full text-amber transition-colors hover:bg-amber/15"
            >
              <Minus className="size-3.5" strokeWidth={2.8} />
            </button>
            <span
              className="w-5 text-center font-display text-[0.8125rem] font-bold tabular-nums text-cream"
              aria-live="polite"
            >
              {qty}
            </span>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={`Add another ${item.name}`}
              className="flex size-7 items-center justify-center rounded-full text-amber transition-colors hover:bg-amber/15"
            >
              <Plus className="size-3.5" strokeWidth={2.8} />
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="add"
            type="button"
            onClick={() => step(1)}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.24, ease: EASE }}
            whileTap={{ scale: 0.92 }}
            aria-label={`Add ${item.name} to your tray`}
            className={cn(
              "group/add flex items-center gap-1.5 rounded-full border font-semibold transition-colors duration-300",
              variant === "card"
                ? "border-linen/20 bg-ink/75 px-3.5 py-2 text-xs text-cream backdrop-blur-sm hover:border-amber/60 hover:text-amber"
                : "size-8 justify-center border-linen/15 text-linen/55 hover:border-amber/55 hover:bg-amber/[0.08] hover:text-amber"
            )}
          >
            <Plus className="size-3.5" strokeWidth={2.8} />
            {variant === "card" && "Add"}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AddComboToTray({
  items,
  className,
}: {
  items: (TrayItem & { qty: number })[];
  className?: string;
}) {
  const { items: inTray } = useTray();
  const added =
    items.length > 0 &&
    items.every((i) => (inTray.find((l) => l.name === i.name)?.qty ?? 0) >= i.qty);

  return (
    <button
      type="button"
      onClick={() => tray.addMany(items)}
      disabled={items.length === 0}
      className={cn(
        "flex w-full items-center justify-center gap-2.5 rounded-full border py-4 text-[0.9375rem] font-semibold transition-colors duration-300 disabled:opacity-40",
        added
          ? "border-emerald-400/40 text-emerald-300"
          : "border-linen/15 text-cream hover:border-amber/45 hover:text-amber",
        className
      )}
    >
      {added ? (
        <>
          <Check className="size-4" strokeWidth={2.6} />
          In your tray
        </>
      ) : (
        <>
          <Plus className="size-4" strokeWidth={2.6} />
          Add all to tray
        </>
      )}
    </button>
  );
}
