"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, X, Flame, Star, Candy, SlidersHorizontal } from "lucide-react";
import { menu, itemCount } from "@/lib/menu";
import { categoryIcon, VegMark } from "@/components/ui/Icons";
import { AddToTray } from "@/components/cart/AddToTray";
import { rupees, cn } from "@/lib/utils";

type Filter = "all" | "signature" | "spicy" | "sweet";

const filters: { id: Filter; label: string; icon: typeof Star }[] = [
  { id: "all", label: "Everything", icon: SlidersHorizontal },
  { id: "signature", label: "Must try", icon: Star },
  { id: "spicy", label: "Spicy", icon: Flame },
  { id: "sweet", label: "Sweet", icon: Candy },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function MenuBoard() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState(menu[0].id);
  const sections = useRef(new Map<string, HTMLElement>());

  const q = query.trim().toLowerCase();

  const visible = useMemo(() => {
    return menu
      .map((category) => ({
        ...category,
        groups: category.groups
          .map((group) => ({
            ...group,
            items: group.items.filter((item) => {
              if (filter === "signature" && !item.signature) return false;
              if (filter === "spicy" && !item.spicy) return false;
              if (filter === "sweet" && !item.sweet) return false;
              if (!q) return true;
              return (
                item.name.toLowerCase().includes(q) ||
                category.name.toLowerCase().includes(q) ||
                (item.note?.toLowerCase().includes(q) ?? false)
              );
            }),
          }))
          .filter((group) => group.items.length > 0),
      }))
      .filter((category) => category.groups.length > 0);
  }, [q, filter]);

  const shown = visible.reduce(
    (n, c) => n + c.groups.reduce((m, g) => m + g.items.length, 0),
    0
  );
  const isFiltered = Boolean(q) || filter !== "all";

  useEffect(() => {
    if (isFiltered) return;
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top?.target.id) setActive(top.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
    );
    sections.current.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isFiltered]);

  const jump = (id: string) => {
    const el = sections.current.get(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 128;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
      <div className="sticky top-[4.5rem] z-30 -mx-5 mb-12 border-y border-linen/[0.07] bg-ink/85 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8">
        <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative flex-1 lg:max-w-sm">
            <span className="sr-only">Search the menu</span>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-faint"
              strokeWidth={2.2}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pizza, shake, chai…"
              className="w-full rounded-full border border-linen/12 bg-linen/[0.03] py-3 pl-11 pr-10 text-sm text-cream outline-none transition-colors placeholder:text-faint focus:border-amber/45 focus:bg-linen/[0.05]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-faint transition-colors hover:text-cream"
              >
                <X className="size-3.5" strokeWidth={2.6} />
              </button>
            )}
          </label>

          <div className="hide-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-0.5">
            {filters.map(({ id, label, icon: Icon }) => {
              const on = filter === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFilter(id)}
                  aria-pressed={on}
                  className={cn(
                    "relative isolate flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition-colors duration-300",
                    on
                      ? "border-transparent text-ink"
                      : "border-linen/12 text-linen/65 hover:border-amber/40 hover:text-amber"
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="menu-filter"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(100deg,#ffb020,#ff8f28_50%,#ff6a13)]"
                    />
                  )}
                  <Icon className="size-3.5" strokeWidth={2.5} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <p aria-live="polite" className="mt-3 text-[0.6875rem] tracking-wide text-faint">
          {isFiltered
            ? `${shown} of ${itemCount} items`
            : `All ${itemCount} items · every one of them vegetarian`}
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[13rem_1fr] lg:gap-16">
        <nav
          aria-label="Menu sections"
          className="hidden lg:sticky lg:top-56 lg:block lg:h-fit"
        >
          <p className="eyebrow">Sections</p>
          <ul className="mt-5 space-y-0.5">
            {menu.map((c) => {
              const on = !isFiltered && active === c.id;
              const dimmed = isFiltered && !visible.some((v) => v.id === c.id);
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => jump(c.id)}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors duration-300",
                      on ? "text-cream" : "text-muted hover:text-cream",
                      dimmed && "opacity-30"
                    )}
                  >
                    <span
                      aria-hidden
                      className="h-4 w-0.5 shrink-0 rounded-full transition-all duration-300"
                      style={{
                        background: on ? c.accent : "transparent",
                        height: on ? "1.25rem" : "0.75rem",
                      }}
                    />
                    {c.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="min-w-0">
          <AnimatePresence mode="popLayout">
            {visible.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-[1.5rem] surface p-12 text-center"
              >
                <p className="font-display text-xl font-bold text-cream">
                  Nothing matches that.
                </p>
                <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
                  Try &ldquo;pizza&rdquo;, &ldquo;shake&rdquo; or &ldquo;chai&rdquo; — or clear the filters and
                  browse the whole board.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setFilter("all");
                  }}
                  className="mt-6 rounded-full border border-amber/40 px-5 py-2.5 text-xs font-semibold text-amber transition-colors hover:bg-amber/10"
                >
                  Reset
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-16">
            {visible.map((category) => {
              const Icon = categoryIcon[category.id];
              return (
                <section
                  key={category.id}
                  id={category.id}
                  ref={(el) => {
                    if (el) sections.current.set(category.id, el);
                    else sections.current.delete(category.id);
                  }}
                  className="scroll-mt-56"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="flex size-12 shrink-0 items-center justify-center rounded-2xl border"
                      style={{
                        borderColor: `${category.accent}38`,
                        background: `${category.accent}12`,
                        color: category.accent,
                      }}
                    >
                      <Icon className="size-5" strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0">
                      <h2 className="font-display text-[clamp(1.5rem,3.4vw,2rem)] font-bold leading-tight">
                        {category.name}
                      </h2>
                      <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-muted">
                        {category.blurb}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 space-y-8">
                    {category.groups.map((group, gi) => (
                      <div key={group.label ?? gi}>
                        {group.label && (
                          <h3 className="mb-3 font-script text-2xl text-amber">
                            {group.label}
                          </h3>
                        )}
                        <ul>
                          {group.items.map((item, ii) => (
                            <motion.li
                              key={item.name}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-5% 0px" }}
                              transition={{
                                duration: 0.5,
                                delay: Math.min(ii * 0.03, 0.25),
                                ease: EASE,
                              }}
                              className="group border-b border-linen/[0.06] last:border-0"
                            >
                              <div className="flex items-baseline gap-3 py-4 transition-colors">
                                <VegMark className="mt-1 size-3.5 shrink-0" />

                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                                    <span className="font-display text-[1.0625rem] font-semibold text-cream transition-colors group-hover:text-amber">
                                      {item.name}
                                    </span>
                                    {item.signature && (
                                      <span className="rounded-full border border-amber/35 px-2 py-0.5 text-[0.5625rem] font-bold uppercase tracking-[0.14em] text-amber">
                                        Must try
                                      </span>
                                    )}
                                    {item.spicy && (
                                      <Flame
                                        className="size-3.5 text-crimson"
                                        strokeWidth={2.6}
                                        aria-label="Spicy"
                                      />
                                    )}
                                  </div>
                                  {item.note && (
                                    <p className="mt-1 max-w-lg text-[0.8125rem] leading-relaxed text-faint">
                                      {item.note}
                                    </p>
                                  )}
                                </div>

                                <span
                                  aria-hidden
                                  className="mx-1 hidden min-w-8 flex-1 translate-y-[-0.2rem] border-b border-dashed border-linen/15 sm:block"
                                />

                                <span className="shrink-0 font-display text-[1.0625rem] font-bold tabular-nums text-linen/90 transition-colors group-hover:text-amber">
                                  {rupees(item.price)}
                                </span>

                                <AddToTray
                                  item={{
                                    name: item.name,
                                    price: item.price,
                                    category: category.name,
                                    categoryId: category.id,
                                    accent: category.accent,
                                  }}
                                />
                              </div>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
