"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { tray, trayPanel, useTray, useTrayPanel } from "@/lib/tray";
import { site, orderUrl, whatsapp } from "@/lib/site";
import { rupees } from "@/lib/utils";
import { FireButton } from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

export function TrayPanel() {
  const { items, count, total } = useTray();
  const open = useTrayPanel();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && trayPanel.set(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const message = items.length
    ? `Hi Chill Cafe! I'd like to order:\n${items
        .map((l) => `• ${l.qty} × ${l.name} — ${rupees(l.price * l.qty)}`)
        .join("\n")}\n\nTotal: ${rupees(total)}`
    : undefined;

  return (
    <>
      <AnimatePresence>
        {count > 0 && !open && (
          <motion.button
            type="button"
            onClick={() => trayPanel.set(true)}
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="group fixed bottom-6 right-6 z-40 hidden items-center gap-3 rounded-full border border-amber/35 bg-ink/85 py-3 pl-4 pr-5 shadow-[0_18px_60px_-18px_rgba(255,106,19,0.7)] backdrop-blur-xl transition-colors hover:border-amber/60 lg:flex"
          >
            <span className="relative flex size-10 items-center justify-center rounded-full bg-[linear-gradient(100deg,#ffb020,#ff6a13)] text-ink">
              <ShoppingBag className="size-[18px]" strokeWidth={2.3} />
              <span className="absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full border border-ink bg-crimson px-1 font-display text-[0.625rem] font-bold text-cream">
                {count}
              </span>
            </span>
            <span className="text-left leading-tight">
              <span className="block font-display text-sm font-bold text-cream">
                Your tray
              </span>
              <span className="block text-[0.6875rem] tabular-nums text-muted">
                {rupees(total)}
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[80]"
          >
            <button
              type="button"
              aria-label="Close tray"
              onClick={() => trayPanel.set(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-ink/70 backdrop-blur-sm"
            />

            <motion.aside
              role="dialog"
              aria-label="Your tray"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.42, ease: EASE }}
              className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-linen/10 bg-char"
            >
              <header className="flex items-center justify-between border-b border-linen/[0.07] p-5">
                <div>
                  <p className="eyebrow">Your tray</p>
                  <p className="mt-1.5 font-display text-xl font-bold text-cream">
                    {count} item{count === 1 ? "" : "s"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => trayPanel.set(false)}
                  aria-label="Close tray"
                  className="flex size-10 items-center justify-center rounded-full border border-linen/15 text-cream transition-colors hover:border-amber/50 hover:text-amber"
                >
                  <X className="size-[18px]" strokeWidth={2.2} />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto px-5">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
                    <ShoppingBag className="size-8 text-faint" strokeWidth={1.6} />
                    <p className="font-display text-lg font-bold text-cream">
                      Nothing in here yet.
                    </p>
                    <p className="max-w-xs text-sm leading-relaxed text-muted">
                      Tap the + beside anything on the menu and it lands here.
                    </p>
                    <Link
                      href="/menu"
                      onClick={() => trayPanel.set(false)}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-amber/40 px-5 py-2.5 text-xs font-semibold text-amber transition-colors hover:bg-amber/10"
                    >
                      Open the menu
                      <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
                    </Link>
                  </div>
                ) : (
                  <ul className="divide-y divide-linen/[0.07]">
                    <AnimatePresence initial={false}>
                      {items.map((line) => (
                        <motion.li
                          key={line.name}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="flex items-center gap-3.5 py-4">
                            <span
                              aria-hidden
                              className="size-2 shrink-0 rounded-full"
                              style={{ background: line.accent }}
                            />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate font-display text-[0.9375rem] font-semibold text-cream">
                                {line.name}
                              </span>
                              <span className="mt-0.5 block text-[0.6875rem] uppercase tracking-[0.12em] text-faint">
                                {line.category} · {rupees(line.price)}
                              </span>
                            </span>

                            <span className="flex items-center gap-0.5 rounded-full border border-linen/12 p-0.5">
                              <button
                                type="button"
                                onClick={() => tray.setQty(line.name, line.qty - 1)}
                                aria-label={`One less ${line.name}`}
                                className="flex size-7 items-center justify-center rounded-full text-linen/60 transition-colors hover:bg-linen/[0.07] hover:text-cream"
                              >
                                {line.qty === 1 ? (
                                  <Trash2 className="size-3.5" strokeWidth={2.2} />
                                ) : (
                                  <Minus className="size-3.5" strokeWidth={2.6} />
                                )}
                              </button>
                              <span className="w-5 text-center font-display text-[0.8125rem] font-bold tabular-nums text-cream">
                                {line.qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => tray.setQty(line.name, line.qty + 1)}
                                aria-label={`One more ${line.name}`}
                                className="flex size-7 items-center justify-center rounded-full text-linen/60 transition-colors hover:bg-linen/[0.07] hover:text-cream"
                              >
                                <Plus className="size-3.5" strokeWidth={2.6} />
                              </button>
                            </span>

                            <span className="w-16 shrink-0 text-right font-display text-sm font-bold tabular-nums text-amber">
                              {rupees(line.price * line.qty)}
                            </span>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )}
              </div>

              {items.length > 0 && (
                <footer className="border-t border-linen/[0.07] p-5">
                  <div className="flex items-end justify-between">
                    <span className="text-sm text-muted">Total</span>
                    <motion.span
                      key={total}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="font-display text-3xl font-extrabold tabular-nums text-ember-gradient"
                    >
                      {rupees(total)}
                    </motion.span>
                  </div>
                  <p className="mt-1.5 text-[0.6875rem] text-faint">
                    Taxes as applicable. Pay on {site.order.poweredBy} or at pickup.
                  </p>

                  <div className="mt-5 space-y-2.5">
                    <FireButton href={orderUrl(items)} external className="w-full">
                      Order on {site.order.poweredBy}
                    </FireButton>
                    <a
                      href={whatsapp(message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2.5 rounded-full border border-linen/15 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
                    >
                      <MessageCircle className="size-4" strokeWidth={2.3} />
                      Send on WhatsApp instead
                    </a>
                    <button
                      type="button"
                      onClick={() => tray.clear()}
                      className="w-full pt-1 text-center text-xs font-semibold text-faint transition-colors hover:text-crimson"
                    >
                      Empty the tray
                    </button>
                  </div>
                </footer>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
