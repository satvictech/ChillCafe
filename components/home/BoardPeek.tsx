import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { menu } from "@/lib/menu";
import { atmos } from "@/lib/photos";
import { categoryIcon } from "@/components/ui/Icons";
import { AtmosBand } from "@/components/ui/AtmosBand";
import { Section, SectionHead } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { rupees } from "@/lib/utils";

export function BoardPeek() {
  return (
    <Section id="board" className="relative overflow-hidden">
      <AtmosBand image={atmos.pizzaOven} opacity={0.2} />

      <div className="relative">
        <SectionHead
          eyebrow="The whole board"
          title="Ten sections. Nothing over ₹250."
          lede="Pizzas and rice from the kitchen, shakes and mocktails from the counter, waffles and kullad chai for after."
          align="center"
        />

        <RevealGroup
          stagger={0.04}
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        >
          {menu.map((c) => {
            const Icon = categoryIcon[c.id];
            const count = c.groups.reduce((n, g) => n + g.items.length, 0);
            const from = Math.min(...c.groups.flatMap((g) => g.items.map((i) => i.price)));

            return (
              <RevealItem key={c.id}>
                <Link
                  href={`/menu#${c.id}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.25rem] surface p-5 transition-colors duration-500 hover:border-linen/20"
                >
                  <div
                    aria-hidden
                    className="absolute -right-8 -top-8 size-24 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle, ${c.accent}40, transparent 70%)`,
                    }}
                  />
                  <div className="relative flex items-start justify-between">
                    <Icon
                      className="size-6 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:rotate-6"
                      strokeWidth={1.6}
                      style={{ color: c.accent }}
                    />
                    <ArrowUpRight
                      className="size-4 text-faint opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-amber"
                      strokeWidth={2.4}
                    />
                  </div>
                  <div className="relative mt-8">
                    <h3 className="font-display text-base font-bold leading-tight text-cream">
                      {c.name}
                    </h3>
                    <p className="mt-1.5 text-[0.6875rem] uppercase tracking-[0.12em] text-faint">
                      {count} items · from {rupees(from)}
                    </p>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
