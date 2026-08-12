import type { Metadata } from "next";
import { MenuBoard } from "@/components/menu/MenuBoard";
import { PageHero } from "@/components/site/PageHero";
import { OrderFlow } from "@/components/home/OrderFlow";
import { itemCount, priceRange } from "@/lib/menu";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Menu & Prices",
  description: `The full Chill Cafe menu — ${itemCount} vegetarian items from ₹${priceRange.min} to ₹${priceRange.max}. Pizzas, fried rice, shakes, soups, kullad chai, waffles and mocktails in Nangloi, Delhi.`,
  alternates: { canonical: "/menu" },
  openGraph: {
    title: `Menu & Prices · ${site.name} Nangloi`,
    description: `${itemCount} vegetarian items, ₹${priceRange.min}–₹${priceRange.max}. Pizzas, shakes, fried rice and kullad chai.`,
    url: "/menu",
  },
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="The menu"
        title="Everything on the board."
        lede="Straight off the wall inside the cafe — every section, every price, nothing hidden. All of it vegetarian."
        chips={[
          `${itemCount} items`,
          `₹${priceRange.min}–₹${priceRange.max}`,
          "100% vegetarian",
        ]}
      />
      <MenuBoard />
      <OrderFlow />
    </>
  );
}
