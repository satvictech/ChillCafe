import { allItems } from "./menu";

export type Craving = {
  id: string;
  label: string;
  line: string;
  icon: "hungry" | "sweet" | "chai" | "cold" | "group";
  picks: { name: string; qty: number }[];
};

export const cravings: Craving[] = [
  {
    id: "hungry",
    label: "Properly hungry",
    line: "The full sit-down. Pizza, rice and something cold to wash it down.",
    icon: "hungry",
    picks: [
      { name: "Chill Cafe Special Pizza", qty: 1 },
      { name: "Mushroom Cheese Fried Rice", qty: 1 },
      { name: "Cold Coffee", qty: 1 },
    ],
  },
  {
    id: "sweet",
    label: "Sweet tooth",
    line: "Three ways to end up with chocolate on your face.",
    icon: "sweet",
    picks: [
      { name: "Brownie Shake", qty: 1 },
      { name: "Chocolate Waffle", qty: 1 },
      { name: "Chocolate", qty: 1 },
    ],
  },
  {
    id: "chai",
    label: "Chai & a bite",
    line: "Clay cups, hot soup, one pizza between you. Evening sorted.",
    icon: "chai",
    picks: [
      { name: "Kullad Masala Tea", qty: 2 },
      { name: "Manchow Soup", qty: 1 },
      { name: "Margherita Pizza", qty: 1 },
    ],
  },
  {
    id: "cold",
    label: "Beat the heat",
    line: "For the walk back from Nilothi Mode in May.",
    icon: "cold",
    picks: [
      { name: "Virgin Mojito", qty: 1 },
      { name: "Cool Mist (Cucumber)", qty: 1 },
      { name: "Butterscotch", qty: 1 },
    ],
  },
  {
    id: "group",
    label: "Table of four",
    line: "Two pizzas, a big rice, shakes all round.",
    icon: "group",
    picks: [
      { name: "Cheese Burst Pizza", qty: 2 },
      { name: "Veg Hakka Fried Rice", qty: 1 },
      { name: "Oreo Shake", qty: 4 },
    ],
  },
];

export type ResolvedPick = {
  name: string;
  qty: number;
  price: number;
  category: string;
  accent: string;
  categoryId: string;
};

export function resolve(craving: Craving): ResolvedPick[] {
  return craving.picks.flatMap(({ name, qty }) => {
    const item = allItems.find((i) => i.name === name);
    if (!item) return [];
    return [
      {
        name: item.name,
        qty,
        price: item.price,
        category: item.category,
        accent: item.accent,
        categoryId: item.categoryId,
      },
    ];
  });
}
