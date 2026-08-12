export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  tag: "Storefront" | "Inside" | "Kitchen" | "Moments";
  focus?: string;
  shape: "portrait" | "landscape";
};

export const photos: Photo[] = [
  {
    src: "/chillcafe1.avif",
    alt: "Chill Cafe storefront in Nangloi — red signboard with white lettering, pure veg, glass frontage",
    width: 1200,
    height: 1600,
    caption: "The red board on Nilothi Mode. You'll spot it before you find the address.",
    tag: "Storefront",
    focus: "50% 30%",
    shape: "portrait",
  },
  {
    src: "/chillcafe2.webp",
    alt: "Inside Chill Cafe — chalkboard cafe wall, brass clock, red chairs and marble-top tables",
    width: 600,
    height: 468,
    caption: "The corner booth under the brass clock — the one everyone asks for.",
    tag: "Inside",
    focus: "50% 45%",
    shape: "landscape",
  },
  {
    src: "/chillcafe3.avif",
    alt: "Chill Cafe seating area — black and white checkerboard floor, red pendant lamps, brick and stone walls",
    width: 750,
    height: 500,
    caption: "Checkerboard floors, red lamps, room enough for the whole group.",
    tag: "Inside",
    focus: "50% 55%",
    shape: "landscape",
  },
];

// Stock mood photography, not Chill Cafe's own plates. See README to swap.
export type Atmos = {
  src: string;
  alt: string;
  focus?: string;
  credit: string;
};

export const atmos = {
  pizzaOven: {
    src: "/atmos-pizza-oven.jpg",
    alt: "A pizza baking in a wood-fired oven, flame curling over the crust",
    focus: "50% 55%",
    credit: "unsplash.com/photos/photo-1705079895550",
  },
  shake: {
    src: "/atmos-shake.jpg",
    alt: "A tall chocolate shake topped with cream, lit against a dark background",
    focus: "50% 40%",
    credit: "unsplash.com/photos/photo-1653122025865",
  },
  kulladChai: {
    src: "/atmos-kullad-chai.jpg",
    alt: "Steam rising from a clay kulhad of masala chai beside green cardamom",
    focus: "50% 45%",
    credit: "unsplash.com/photos/photo-1778603000144",
  },
  coffeeBeans: {
    src: "/atmos-coffee-beans.jpg",
    alt: "Roasted coffee beans filling the frame",
    focus: "50% 50%",
    credit: "unsplash.com/photos/photo-1606486544554",
  },
} satisfies Record<string, Atmos>;

// Keyed by exact menu item name. Missing key -> DishPlate draws a plate instead.
export const dishPhotos: Record<string, { src: string; alt: string; focus?: string }> = {
  "Spl. Chill Cafe Pizza": {
    src: "/atmos-pizza-oven.jpg",
    alt: "A pizza finishing in a wood-fired oven, flame licking over the crust",
    focus: "50% 58%",
  },
  "Cheese Burst Pizza": {
    src: "/dish-pizza-cheese.jpg",
    alt: "A margherita pizza on a wooden board, blistered crust and melted mozzarella",
    focus: "52% 48%",
  },
  "Spl. Mushroom Cheese Fried Rice": {
    src: "/dish-fried-rice.jpg",
    alt: "Fried rice tossed with corn, carrot and spring onion in a black pan",
    focus: "50% 50%",
  },
  "Brownie Shake": {
    src: "/atmos-shake.jpg",
    alt: "A tall chocolate shake with cream on top, lit against a dark background",
    focus: "50% 42%",
  },
  "Manchow Soup": {
    src: "/dish-soup.jpg",
    alt: "A dark bowl of spiced soup topped with herbs, shot from above",
    focus: "50% 50%",
  },
  "Virgin Mojito": {
    src: "/dish-mojito.jpg",
    alt: "A tall mojito packed with crushed ice and mint on a dark bar counter",
    focus: "50% 45%",
  },
  "Chocolate Waffle": {
    src: "/dish-waffle.jpg",
    alt: "Warm waffles dusted with sugar and topped with a scoop of ice cream",
    focus: "50% 52%",
  },
  "Kullad Masala Tea": {
    src: "/atmos-kullad-chai.jpg",
    alt: "Steam rising from a clay kulhad of masala chai beside green cardamom",
    focus: "50% 48%",
  },
};

export const heroPhoto = photos[0];
export const roomPhotos = photos.filter((p) => p.tag === "Inside");
