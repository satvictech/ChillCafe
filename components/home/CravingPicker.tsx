"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Flame,
  IceCreamCone,
  Coffee,
  Snowflake,
  Users,
  Plus,
  Minus,
  RotateCcw,
  MessageCircle,
} from "lucide-react";
import { cravings, resolve } from "@/lib/cravings";
import { site, whatsapp, orderUrl } from "@/lib/site";
import { rupees, cn } from "@/lib/utils";
import { FireButton } from "@/components/ui/Button";
import { AddComboToTray } from "@/components/cart/AddToTray";
import { Section, SectionHead } from "@/components/ui/Section";
import { AtmosBand } from "@/components/ui/AtmosBand";
import { atmos } from "@/lib/photos";

const EASE = [0.16, 1, 0.3, 1] as const;

const icons = {
  hungry: Flame,
  sweet: IceCreamCone,
  chai: Coffee,
  cold: Snowflake,
  group: Users,
} as const;

export function CravingPicker() {
  const [activeId, setActiveId] = useState(cravings[0].id);
  const [qty, setQty] = useState<Record<string, number>>({});

  const craving = cravings.find((c) => c.id === activeId)!;
  const base = useMemo(() => resolve(craving), [craving]);

  const lines = base.map((p) => ({
    ...p,
    qty: qty[`${activeId}:${p.name}`] ?? p.qty,
  }));

  const kept = lines.filter((l) => l.qty > 0);
  const total = kept.reduce((sum, l) => sum + l.price * l.qty, 0);

  const bump = (name: string, by: number) =>
    setQty((q) => {
      const key = `${activeId}:${name}`;
      const current = q[key] ?? base.find((b) => b.name === name)?.qty ?? 1;
      return { ...q, [key]: Math.max(0, Math.min(20, current + by)) };
    });

  const pick = (id: string) => {
    setActiveId(id);
    setQty({});
  };

  const orderText = kept.length
    ? `Hi Chill Cafe! I'd like to order:\n${kept
        .map((l) => `• ${l.qty} × ${l.name} — ${rupees(l.price * l.qty)}`)
        .join("\n")}\n\nTotal: ${rupees(total)}`
    : "Hi Chill Cafe! I'd like to place an order.";

  return (
    <Section id="craving" className="relative overflow-hidden">
      <AtmosBand image={atmos.shake} opacity={0.16} position="right" />

      <div className="relative">
        <SectionHead
          eyebrow="Can't decide?"
          title="Tell us the mood. We'll build the order."
          lede="Five combinations the regulars actually order. Tap one, tweak the counts, send it across."
        />

        <div className="mt-11 flex flex-wrap gap-2.5" role="tablist" aria-label="Pick a mood">
          {cravings.map((c) => {
            const Icon = icons[c.icon];
            const active = c.id === activeId;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => pick(c.id)}
                className={cn(
                  "group relative isolate flex items-center gap-2.5 rounded-full border px-5 py-3 text-sm font-semibold transition-colors duration-300",
                  active
                    ? "border-transparent text-ink"
                    : "border-linen/12 text-linen/70 hover:border-amber/40 hover:text-amber"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="craving-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(100deg,#ffb020,#ff8f28_45%,#ff6a13)]"
                  />
                )}
                <Icon className="size-4" strokeWidth={2.4} />
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
          <div className="surface relative overflow-hidden rounded-[1.75rem] p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <p className="max-w-md text-[0.9375rem] leading-relaxed text-muted">
                  {craving.line}
                </p>

                <ul className="mt-7 divide-y divide-linen/[0.07]">
                  {lines.map((line, i) => (
                    <motion.li
                      key={line.name}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
                      className={cn(
                        "flex items-center gap-4 py-4 transition-opacity",
                        line.qty === 0 && "opacity-35"
                      )}
                    >
                      <span
                        aria-hidden
                        className="size-2 shrink-0 rounded-full"
                        style={{ background: line.accent }}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-[0.9375rem] font-semibold text-cream">
                          {line.name}
                        </span>
                        <span className="mt-0.5 block text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                          {line.category} · {rupees(line.price)} each
                        </span>
                      </span>

                      <span className="flex items-center gap-1 rounded-full border border-linen/12 p-1">
                        <button
                          type="button"
                          onClick={() => bump(line.name, -1)}
                          aria-label={`One less ${line.name}`}
                          className="flex size-7 items-center justify-center rounded-full text-linen/60 transition-colors hover:bg-linen/[0.07] hover:text-cream"
                        >
                          <Minus className="size-3.5" strokeWidth={2.6} />
                        </button>
                        <span className="w-6 text-center font-display text-sm font-bold tabular-nums text-cream">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => bump(line.name, 1)}
                          aria-label={`One more ${line.name}`}
                          className="flex size-7 items-center justify-center rounded-full text-linen/60 transition-colors hover:bg-linen/[0.07] hover:text-cream"
                        >
                          <Plus className="size-3.5" strokeWidth={2.6} />
                        </button>
                      </span>

                      <span className="w-16 shrink-0 text-right font-display text-sm font-bold tabular-nums text-amber">
                        {rupees(line.price * line.qty)}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {Object.keys(qty).length > 0 && (
                  <button
                    type="button"
                    onClick={() => setQty({})}
                    className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-faint transition-colors hover:text-amber"
                  >
                    <RotateCcw className="size-3.5" strokeWidth={2.4} />
                    Reset to the original combo
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="surface relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] p-6 sm:p-8">
            <div
              aria-hidden
              className="absolute -right-16 -top-16 size-56 rounded-full opacity-60"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,106,19,0.3), transparent 68%)",
              }}
            />
            <div className="relative">
              <p className="eyebrow">Your table</p>
              <p className="mt-4 flex items-baseline gap-1.5">
                <motion.span
                  key={total}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="font-display text-[clamp(2.75rem,7vw,3.75rem)] font-extrabold leading-none tabular-nums text-ember-gradient"
                >
                  {rupees(total)}
                </motion.span>
              </p>
              <p className="mt-3 text-sm text-muted">
                {kept.reduce((n, l) => n + l.qty, 0)} item
                {kept.reduce((n, l) => n + l.qty, 0) === 1 ? "" : "s"} · taxes as
                applicable
              </p>
            </div>

            <div className="relative mt-8 space-y-3">
              <FireButton href={orderUrl(kept)} external className="w-full">
                Order on {site.order.poweredBy}
              </FireButton>
              <AddComboToTray
                items={kept.map((l) => ({
                  name: l.name,
                  price: l.price,
                  qty: l.qty,
                  category: l.category,
                  categoryId: l.categoryId,
                  accent: l.accent,
                }))}
              />
              <a
                href={whatsapp(orderText)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2.5 rounded-full border border-linen/15 py-4 text-[0.9375rem] font-semibold text-cream transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
              >
                <MessageCircle className="size-4" strokeWidth={2.3} />
                Send this on WhatsApp
              </a>
              <p className="pt-1 text-center text-[0.6875rem] leading-relaxed text-faint">
                Both open with this exact list already filled in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
