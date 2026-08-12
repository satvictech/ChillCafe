/**
 * Every real photo of the cafe lives here.
 *
 * TO ADD MORE PHOTOS
 *   1. drop the file into /public  (jpg | webp | avif — any size)
 *   2. add an entry below with a real `alt` and `caption`
 *   3. that's it — hero, gallery, story and visit all read from this list
 *
 * `focus` is a CSS object-position: it decides what stays in frame when a
 * photo gets cropped into a tall or wide slot.
 */

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Shown under the photo in the gallery. */
  caption: string;
  /** Small label chip. */
  tag: "Storefront" | "Inside" | "Food" | "Moments";
  focus?: string;
  /** Orientation hint used for gallery layout. */
  shape: "portrait" | "landscape" | "square";
};

export const photos: Photo[] = [
  {
    src: "/chillcafe1.avif",
    alt: "The Chill Cafe storefront in Nangloi — red signboard with white lettering, pure veg, glass frontage",
    width: 1200,
    height: 1600,
    caption: "The red board on Nilothi Mode. You'll spot it before you find the address.",
    tag: "Storefront",
    focus: "50% 28%",
    shape: "portrait",
  },
  {
    src: "/chillcafe2.webp",
    alt: "Inside Chill Cafe — chalkboard cafe wall, brass clock, red chairs and marble-top tables",
    width: 600,
    height: 468,
    caption: "The corner booth, under the brass clock. The one everyone asks for.",
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

export const photoBySrc = (src: string) => photos.find((p) => p.src === src)!;

/** The photo that carries the brand — used in the hero. */
export const heroPhoto = photos[0];
export const roomPhotos = photos.filter((p) => p.tag === "Inside");
