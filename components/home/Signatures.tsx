import { heroPicks, itemCount } from "@/lib/menu";
import { DishPlate } from "@/components/ui/Dish";
import { Section, SectionHead } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { GhostButton } from "@/components/ui/Button";

export function Signatures() {
  return (
    <Section id="signatures">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHead
          eyebrow="First-timer? Start here"
          title="The six that made us the local spot."
          lede="If you only order once, order one of these."
        />
        <GhostButton href="/menu" arrow className="shrink-0">
          All {itemCount} items
        </GhostButton>
      </div>

      <RevealGroup
        stagger={0.06}
        className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {heroPicks.map((item) => (
          <RevealItem key={item.name}>
            <DishPlate
              name={item.name}
              price={item.price}
              note={item.note}
              accent={item.accent}
              categoryId={item.categoryId}
              category={item.category}
              signature={item.signature}
              spicy={item.spicy}
            />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
