# Chill Cafe — Nangloi

Marketing site for Chill Cafe, Nilothi Mode, Nangloi, New Delhi. Built to pitch
the cafe on a website plus LocSeva online ordering.

The message to send them is in [OUTREACH.md](./OUTREACH.md).

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Language | TypeScript, strict |
| Styling | Tailwind CSS v4 (`@theme` tokens in `app/globals.css`) |
| Animation | `motion` (Framer Motion v13) |
| 3D | `three` + `@react-three/fiber` + `@react-three/drei`, lazy-loaded |
| Icons | `lucide-react` |
| Fonts | Bricolage Grotesque, Plus Jakarta Sans, Great Vibes via `next/font` |

Every route is statically prerendered. No database, no API, no runtime data.

## Commands

```bash
npm run dev          # dev server
npm run build        # production build
npm run start        # serve the build
npm run lint         # eslint
npm run type-check   # tsc --noEmit
npm run blur         # regenerate image placeholders
```

## Routes

| Route | What it is |
|---|---|
| `/` | Hero, promise ticker, signature dishes, craving picker, menu overview, the room, ratings, order flow, visit |
| `/menu` | All 67 items with live search, filters, sticky section rail, add-to-tray |
| `/room` | Full-screen interactive 3D model of the cafe |
| `/gallery` | Real photos with lightbox, plus the 3D room |
| `/story` | What the cafe is about |
| `/visit` | Address, hours, phones, lazy-loaded map, directions |

## Where to change things

**Business facts** — `lib/site.ts`. Name, address, geo, hours, phone numbers,
WhatsApp number, Instagram, LocSeva order URL, review listings, nav. Change it
here and it updates everywhere including the SEO structured data.

**The menu** — `lib/menu.ts`. Categories, items, prices, notes, `signature` /
`spicy` / `sweet` flags, and each category's accent colour. `itemCount` and
`priceRange` are derived, so nothing else needs touching when items change.

**Craving combos** — `lib/cravings.ts`. The five mood combos on the home page.
Item names must match `lib/menu.ts` exactly.

**Colours and type** — `app/globals.css`, in the `@theme` block. The palette is
taken from the real cafe: crimson from the signboard and chairs, ink from the
chalkboard wall, amber from the brass clock and pendants, ember from the orange
chalk prices, plus the `checker` utility from the floor tiles.

## Photos

All images are registered in `lib/photos.ts`.

```
public/chillcafe1.avif   storefront   (real)
public/chillcafe2.webp   interior     (real)
public/chillcafe3.avif   interior     (real)
public/atmos-*.jpg       mood         (stock)
public/dish-*.jpg        dish cards   (stock)
```

**The `atmos-*` and `dish-*` files are licence-free stock (Unsplash), not Chill
Cafe's own food.** They're placeholders so the site doesn't look empty. Replace
them as real photos come in — that is the single biggest upgrade available here.

### Adding or replacing a photo

1. Drop the file in `public/`
2. Register it in `lib/photos.ts`:
   - real photos of the cafe → the `photos` array
   - section backdrops → the `atmos` object
   - a specific dish → the `dishPhotos` map, keyed by the **exact** menu item name
3. Run `npm run blur` to regenerate the inline placeholders
4. Delete the stock file you replaced

Any menu item without a `dishPhotos` entry automatically falls back to a drawn
plate (gradient, category glyph, steam or frost), so partial photo sets look
intentional rather than broken.

`focus` is a CSS `object-position` — it controls what stays in frame when an
image is cropped into a tall or wide slot.

## The tray

`lib/tray.ts` is a small `useSyncExternalStore` store, persisted to
localStorage. Add controls appear on every menu row and dish card. The tray
hands off to LocSeva with the list on the query string:

```
https://locseva.satvictech.com/r/chill-cafe?items=Cheese%20Burst%20Pizza%20x2%2C%20Oreo%20Shake%20x4
```

Built by `orderUrl()` in `lib/site.ts`.

### What LocSeva reads today (verified Aug 2026)

| Param | Effect |
|---|---|
| none | lands on **Reserve your table** (dine-in, step 1 of 2) |
| `?items=…` | switches to the **takeaway** step, but does **not** fill a cart |
| `?mode=takeaway` / `?mode=dinein` | ignored — accepted without error |

So `items` currently only picks a tab; the customer still adds each dish by
hand, and the WhatsApp handoff is the only route that actually carries the order
across (as plain text).

`mode` is sent on every link so ordering and booking stop sharing one landing
step the moment LocSeva reads it. Order CTAs send `mode=takeaway`, booking CTAs
send `mode=dinein`. Rename it in `lib/site.ts` if LocSeva settles on something
else.

## Performance notes

- All routes static; no client data fetching
- Fonts self-hosted and preloaded by `next/font`
- Inline base64 LQIP behind every image (~6 KB total for 12 images)
- `optimizePackageImports` for `lucide-react`, `motion` and `drei`
- The 3D scene is a separate chunk, `ssr: false`, and only mounts on `/room` or
  when clicked on `/gallery`. Its textures are generated on a `<canvas>` at
  runtime, so there are no texture files to download.
- The Google Maps iframe mounts only when scrolled near
- `prefers-reduced-motion` is respected throughout

## Deploying

Live at **https://chill-cafe.vercel.app** (Vercel project `chillcafe`, deploys on
push to `main`). `NEXT_PUBLIC_SITE_URL` is already set for production, preview
and development.

Set `NEXT_PUBLIC_SITE_URL` to the real domain when one is attached. It feeds `metadataBase`, the
canonicals, `sitemap.xml`, `robots.txt` and the JSON-LD. Without it, those fall
back to `https://chillcafe.satvictech.com`.

## One deliberate omission

There is no `aggregateRating` in the structured data, and no testimonial
quotes anywhere. Self-declared review stars on your own site are against
Google's guidelines and can earn a manual action. The real 4.6 is shown on the
page instead, with links to Justdial, Magicpin, Zomato and Swiggy so visitors
can verify it themselves. If you want testimonials, use real quotes with
permission.
