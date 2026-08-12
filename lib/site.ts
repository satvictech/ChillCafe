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

  instagram: {
    handle: "chill_cafe000",
    url: "https://www.instagram.com/chill_cafe000/",
  },

  order: {
    url: "https://locseva.satvictech.com/r/chill-cafe",
    label: "Order Online",
    poweredBy: "LocSeva",
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
  `https://wa.me/${site.phones[0].raw.replace(/\D/g, "").padStart(12, "91")}?text=${encodeURIComponent(
    message
  )}`;

export const fullAddress = [
  site.address.line1,
  site.address.line2,
  `${site.address.locality} ${site.address.postalCode}`,
].join(", ");

export const nav = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/story", label: "Our Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/visit", label: "Visit" },
] as const;
