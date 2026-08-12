/**
 * The full Chill Cafe board, transcribed from the in-store menu.
 * Prices in INR. Everything here is vegetarian — the kitchen is 100% veg.
 */

export type MenuItem = {
  name: string;
  price: number;
  note?: string;
  signature?: boolean;
  spicy?: boolean;
  sweet?: boolean;
};

export type MenuGroup = {
  label?: string;
  items: MenuItem[];
};

export type MenuCategory = {
  id: string;
  name: string;
  blurb: string;
  kind: "food" | "drink" | "dessert";
  accent: string;
  groups: MenuGroup[];
};

export const menu: MenuCategory[] = [
  {
    id: "pizza",
    name: "Pizza",
    blurb: "Hand-stretched base, stretchy cheese pull, straight out of the oven.",
    kind: "food",
    accent: "#FF6A13",
    groups: [
      {
        items: [
          { name: "Margherita Pizza", price: 130, note: "The classic. Cheese, herbs, nothing to hide behind." },
          { name: "Tomato Pizza", price: 140 },
          { name: "Onion Pizza", price: 140 },
          { name: "Sweet Corn Pizza", price: 150, sweet: true },
          { name: "Onion Capsicum Pizza", price: 150 },
          { name: "Cheese Burst Pizza", price: 170, signature: true, note: "Cheese inside the crust and on top. Bring napkins." },
          { name: "Veg. Loaded Pizza", price: 180, note: "Every veg on the board, on one base." },
          { name: "Farm House Pizza", price: 180 },
          { name: "Tandoori Pizza", price: 190, spicy: true, note: "Smoky tandoori masala on a pizza base." },
          { name: "Makhni Pizza", price: 190, note: "Buttery makhni gravy instead of red sauce." },
          { name: "Peri Peri Pizza", price: 190, spicy: true },
          { name: "Momos Pizza", price: 200, note: "Momos. On a pizza. Exactly as good as it sounds." },
          { name: "Spl. Chill Cafe Pizza", price: 250, signature: true, note: "The house flagship — loaded, layered, finished with extra cheese." },
        ],
      },
    ],
  },
  {
    id: "rice",
    name: "Rice",
    blurb: "Wok-tossed on high flame, so every grain stays separate.",
    kind: "food",
    accent: "#F6A82C",
    groups: [
      {
        items: [
          { name: "Veg. Fried Rice", price: 140 },
          { name: "Veg. Butter Fried Rice", price: 150 },
          { name: "Paneer Fried Rice", price: 170, signature: true, note: "Soft paneer cubes, wok-charred edges." },
          { name: "Chilli Garlic Fried Rice", price: 170, spicy: true },
          { name: "Singapuri Fried Rice", price: 180, spicy: true },
          { name: "Veg Hakka Fried Rice", price: 200 },
          { name: "Spl. Mushroom Cheese Fried Rice", price: 220, signature: true, note: "Mushroom and melted cheese folded through. House favourite." },
        ],
      },
    ],
  },
  {
    id: "shakes",
    name: "Shakes",
    blurb: "Thick, cold, blended to order and served tall.",
    kind: "drink",
    accent: "#F2789F",
    groups: [
      {
        items: [
          { name: "Banana Shake", price: 120 },
          { name: "Mango Shake", price: 130 },
          { name: "Oreo Shake", price: 130, signature: true, note: "Crushed cookies through and through." },
          { name: "Kitkat Shake", price: 130 },
          { name: "Chocolate Shake", price: 130 },
          { name: "Vanilla Shake", price: 130 },
          { name: "Strawberry Shake", price: 130 },
          { name: "Butterscotch Shake", price: 130 },
          { name: "Brownie Shake", price: 140, signature: true, note: "Real brownie, blended in. Dessert in a glass." },
          { name: "Banana + Khajur Shake", price: 150, note: "Banana and dates. Naturally sweet, no sugar needed." },
          { name: "Dry Fruit Shake", price: 200, note: "Loaded with dry fruits. The one you order to share." },
        ],
      },
    ],
  },
  {
    id: "cold-coffee",
    name: "Cold Coffee",
    blurb: "Shaken cold, thick foam on top, disappears in a minute.",
    kind: "drink",
    accent: "#B4763F",
    groups: [
      {
        items: [
          { name: "Cold Coffee", price: 120, signature: true },
          { name: "Chocolate Cold Coffee", price: 130 },
          { name: "Hazelnut Cold Coffee", price: 140, note: "Nutty, aromatic, our most-repeated order." },
        ],
      },
    ],
  },
  {
    id: "coffee-tea",
    name: "Coffee & Tea",
    blurb: "Kullad chai the way it should be — brewed, not poured from a flask.",
    kind: "drink",
    accent: "#C9915E",
    groups: [
      {
        items: [
          { name: "Black Tea", price: 60 },
          { name: "Hot Coffee", price: 70 },
          { name: "Black Coffee", price: 70 },
          { name: "Hazelnut Hot Coffee", price: 80 },
          { name: "Hot Mokachino Coffee", price: 80 },
          { name: "Kullad Masala Tea", price: 80, signature: true, note: "Served in clay. Tastes like winter evenings." },
          { name: "Kullad Ginger Tea", price: 80 },
          { name: "Kullad Ilaichi Tea", price: 80 },
          { name: "Hot Chocolate", price: 120, sweet: true },
        ],
      },
    ],
  },
  {
    id: "soup",
    name: "Soup",
    blurb: "Slow-simmered, served steaming, with crispy noodles on the side.",
    kind: "food",
    accent: "#D9541E",
    groups: [
      {
        items: [
          { name: "Manchow Soup", price: 120, spicy: true, signature: true, note: "Peppery, loaded, crunchy noodles on top." },
          { name: "Hot & Sour Soup", price: 120, spicy: true },
          { name: "Veg. Soup", price: 120 },
          { name: "Sweet Corn Soup", price: 140, sweet: true },
        ],
      },
    ],
  },
  {
    id: "waffle-ice-cream",
    name: "Waffle & Ice Cream",
    blurb: "Pressed fresh, crisp outside, soft in the middle.",
    kind: "dessert",
    accent: "#E9A23B",
    groups: [
      {
        label: "Waffles",
        items: [
          { name: "Chocolate Waffle", price: 120, signature: true, note: "Warm waffle, chocolate everywhere." },
          { name: "Vanilla Waffle", price: 120 },
          { name: "Strawberry Waffle", price: 120 },
          { name: "Butterscotch Waffle", price: 120 },
        ],
      },
      {
        label: "Ice Cream",
        items: [
          { name: "Vanilla", price: 90 },
          { name: "Strawberry", price: 90 },
          { name: "Butterscotch", price: 90 },
          { name: "Chocolate", price: 100 },
        ],
      },
    ],
  },
  {
    id: "mocktail",
    name: "Mocktails",
    blurb: "Built over crushed ice. Bright, fizzy, zero alcohol.",
    kind: "drink",
    accent: "#33BFC7",
    groups: [
      {
        items: [
          { name: "Virgin Mojito", price: 120, signature: true, note: "Mint, lime, soda. The reset button." },
          { name: "Kala Katta Mocktail", price: 120, note: "That nostalgic kala khatta tang." },
          { name: "Blue Berry Mocktail", price: 120 },
          { name: "Watermelon Mocktail", price: 120 },
          { name: "Green Apple Mocktail", price: 120 },
          { name: "Cool Mist (Cucumber)", price: 120, note: "Cucumber and mint. Ridiculously refreshing." },
          { name: "Berry Blast", price: 120 },
          { name: "Citra Blast", price: 120 },
        ],
      },
    ],
  },
  {
    id: "cold-tea",
    name: "Cold Tea",
    blurb: "Brewed, chilled, poured over ice with a wedge of citrus.",
    kind: "drink",
    accent: "#E8B33C",
    groups: [
      {
        items: [
          { name: "Ice Tea", price: 100 },
          { name: "Peach Ice Tea", price: 100, signature: true },
          { name: "Lemon Ice Tea", price: 100 },
        ],
      },
    ],
  },
  {
    id: "cold-drink",
    name: "Cold Drink",
    blurb: "Chilled bottles, always stocked.",
    kind: "drink",
    accent: "#5B8DEF",
    groups: [
      {
        items: [{ name: "Cold Drink (250 ml)", price: 20 }],
      },
    ],
  },
];

export const allItems = menu.flatMap((c) =>
  c.groups.flatMap((g) =>
    g.items.map((i) => ({ ...i, category: c.name, categoryId: c.id, accent: c.accent }))
  )
);

export const signatures = allItems.filter((i) => i.signature);

export const itemCount = allItems.length;

export const priceRange = {
  min: Math.min(...allItems.map((i) => i.price)),
  max: Math.max(...allItems.map((i) => i.price)),
};

export const heroPicks = [
  "Spl. Chill Cafe Pizza",
  "Cheese Burst Pizza",
  "Spl. Mushroom Cheese Fried Rice",
  "Brownie Shake",
  "Manchow Soup",
  "Virgin Mojito",
].map((n) => allItems.find((i) => i.name === n)!);
