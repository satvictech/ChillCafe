"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X, Phone, ShoppingBag, CalendarCheck } from "lucide-react";
import { nav, site } from "@/lib/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { FireButton } from "@/components/ui/Button";
import { OpenNow } from "@/components/ui/OpenNow";
import { cn } from "@/lib/utils";
import { trayPanel, useTray } from "@/lib/tray";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const { count } = useTray();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <motion.div
          initial={false}
          animate={{
            backgroundColor: scrolled ? "rgba(10,8,6,0.72)" : "rgba(10,8,6,0)",
            borderColor: scrolled ? "rgba(236,224,209,0.10)" : "rgba(236,224,209,0)",
            paddingTop: scrolled ? 8 : 14,
            paddingBottom: scrolled ? 8 : 14,
          }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 rounded-full border px-4 backdrop-blur-xl sm:px-6"
        >
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="shrink-0 transition-transform duration-300 hover:scale-[1.03]"
          >
            <Wordmark size="sm" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative isolate rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                    active ? "text-cream" : "text-muted hover:text-cream"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-amber/25 bg-amber/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            {count > 0 && (
              <button
                type="button"
                onClick={() => trayPanel.set(true)}
                aria-label={`Open your tray, ${count} item${count === 1 ? "" : "s"}`}
                className="relative flex size-10 items-center justify-center rounded-full border border-amber/40 bg-amber/[0.08] text-amber transition-colors hover:bg-amber/15"
              >
                <ShoppingBag className="size-4" strokeWidth={2.3} />
                <span className="absolute -right-1 -top-1 flex min-w-[1.125rem] items-center justify-center rounded-full border border-ink bg-crimson px-1 font-display text-[0.625rem] font-bold text-cream">
                  {count}
                </span>
              </button>
            )}

            <a
              href={`tel:${site.phones[0].tel}`}
              aria-label="Call Chill Cafe"
              className="hidden size-10 items-center justify-center rounded-full border border-linen/12 text-linen/70 transition-colors hover:border-amber/40 hover:text-amber sm:flex"
            >
              <Phone className="size-4" strokeWidth={2.2} />
            </a>

            <FireButton
              href={site.order.url}
              external
              arrow={false}
              className="hidden px-5 py-2.5 text-sm sm:inline-flex"
            >
              Order Online
            </FireButton>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex size-10 items-center justify-center rounded-full border border-linen/12 text-cream transition-colors hover:border-amber/40 hover:text-amber lg:hidden"
            >
              <Menu className="size-[18px]" strokeWidth={2.2} />
            </button>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] lg:hidden"
          >
            <div className="absolute inset-0 bg-ink/95 backdrop-blur-2xl" />
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-[42vh] opacity-60"
              style={{
                background:
                  "radial-gradient(90% 70% at 50% 0%, rgba(255,106,19,0.22), transparent 70%)",
              }}
            />

            <motion.div
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative flex h-full flex-col px-6 pb-10 pt-6"
            >
              <div className="flex items-center justify-between">
                <Wordmark size="sm" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex size-10 items-center justify-center rounded-full border border-linen/12 text-cream"
                >
                  <X className="size-[18px]" strokeWidth={2.2} />
                </button>
              </div>

              <nav className="mt-14 flex flex-col" aria-label="Mobile">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 border-b border-linen/[0.07] py-5"
                    >
                      <span className="font-display text-xs font-semibold text-amber/60">
                        0{i + 1}
                      </span>
                      <span className="font-display text-[2rem] font-bold leading-none text-cream transition-colors group-hover:text-amber">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-5 pt-10">
                <OpenNow />
                <FireButton href={site.order.url} external className="w-full">
                  Order Online
                </FireButton>
                <a
                  href={site.booking.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2.5 rounded-full border border-amber/35 bg-amber/[0.06] py-3.5 text-sm font-semibold text-amber"
                >
                  <CalendarCheck className="size-4" strokeWidth={2.2} />
                  Book a table
                </a>
                <div className="flex gap-3">
                  {site.phones.map((p) => (
                    <a
                      key={p.tel}
                      href={`tel:${p.tel}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border border-linen/12 py-3.5 text-sm font-semibold text-cream"
                    >
                      <Phone className="size-4" strokeWidth={2.2} />
                      {p.raw}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
