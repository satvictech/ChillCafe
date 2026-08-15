export const site = {
  name: "Chill Cafe",
  /** Set NEXT_PUBLIC_SITE_URL at deploy time to the real domain. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://chillcafe.satvictech.com",
  tagline: "Good Food • Good Mood",
  headline: "Freshly made, just for you.",
  locality: "Nangloi",
  city: "New Delhi",

  rating: 4.6,
  ratingCount: 35,
  costForTwo: 350,

  address: {
    line1: "Shop No. 1, Nilothi Mode",
    line2: "Near Nilothi Bus Stand, Kunwar Singh Nagar",
    locality: "Nangloi, New Delhi",
    postalCode: "110041",
    country: "IN",
  },

  geo: { lat: 28.6743, lng: 77.0574 },

  hours: {
    label: "Open every day",
    range: "11:00 AM – 10:30 PM",
    opens: "11:00",
    closes: "22:30",
  },

  phones: [
    { display: "+91 93104 08902", tel: "+919310408902", raw: "9310408902" },
    { display: "+91 98181 34849", tel: "+919818134849", raw: "9818134849" },
  ],

  // Satvic Tech's number while the cafe is on trial — order handoffs come to
  // us, not the kitchen, until they're paying. Swap to 919818134849 on signup.
  whatsapp: "917827160996",

  instagram: {
    handle: "chill_cafe000",
    url: "https://www.instagram.com/chill_cafe000/",
  },

  listings: [
    {
      name: "Justdial",
      rating: 4.6,
      count: 35,
      url: "https://www.justdial.com/Delhi/Chill-Cafe-Nilothi/011PXX11-XX11-250115191330-R5Q4_BZDET",
    },
    {
      name: "Magicpin",
      rating: 4.5,
      count: 25,
      url: "https://magicpin.in/New-Delhi/Nilothi/Restaurant/Chill-Cafe/store/1743286",
    },
    {
      name: "Zomato",
      rating: null,
      count: null,
      url: "https://www.zomato.com/ncr/chill-cafe-nilothi-new-delhi",
    },
    {
      name: "Swiggy Dineout",
      rating: null,
      count: null,
      url: "https://www.swiggy.com/restaurants/chill-cafe-nangloi-delhi-1327792/dineout",
    },
  ],

  order: {
    url: "https://locseva.satvictech.com/r/chill-cafe",
    label: "Order Online",
    poweredBy: "LocSeva",
  },

  // Same page — it opens on the table booking tab by default.
  booking: {
    url: "https://locseva.satvictech.com/r/chill-cafe",
    label: "Book a Table",
    tables: 4,
  },

  promises: [
    "Every bite packed with freshness & love",
    "Clean ingredients",
    "Farm fresh",
    "100% Vegetarian",
    "Party orders & events",
  ],
} as const;

export const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  "Chill Cafe, Nilothi Mode, Nangloi, New Delhi 110041"
)}`;

export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  "Chill Cafe, Nilothi Mode, Nangloi, New Delhi 110041"
)}&z=16&output=embed`;

export const whatsapp = (message = "Hi Chill Cafe! I'd like to place an order.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const orderUrl = (items?: { name: string; qty: number }[]) => {
  if (!items?.length) return site.order.url;
  const list = items.map((i) => `${i.name} x${i.qty}`).join(", ");
  return `${site.order.url}?items=${encodeURIComponent(list)}`;
};

export const fullAddress = [
  site.address.line1,
  site.address.line2,
  `${site.address.locality} ${site.address.postalCode}`,
].join(", ");

export const nav = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/room", label: "3D Room" },
  { href: "/gallery", label: "Gallery" },
  { href: "/story", label: "Story" },
  { href: "/visit", label: "Visit" },
] as const;
