import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, Great_Vibes } from "next/font/google";
import "./globals.css";

import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { OrderBar } from "@/components/site/OrderBar";
import { Spotlight } from "@/components/ui/Spotlight";
import { site, fullAddress } from "@/lib/site";
import { menu } from "@/lib/menu";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Pure Veg Cafe in Nangloi, Delhi | Pizza, Shakes & Kullad Chai`,
    template: `%s · ${site.name} Nangloi`,
  },
  description:
    "Chill Cafe on Nilothi Mode, Nangloi — 100% vegetarian. Oven-fresh pizzas, thick shakes, wok-tossed fried rice, kullad chai and waffles. Open daily 11 AM–10:30 PM. Order online for pickup or delivery.",
  keywords: [
    "Chill Cafe Nangloi",
    "cafe in Nangloi",
    "pure veg cafe Delhi",
    "pizza Nangloi",
    "Nilothi Mode cafe",
    "Kunwar Singh Nagar cafe",
    "shakes Nangloi",
    "kullad chai Delhi",
    "best cafe near Nilothi bus stand",
    "party orders Nangloi",
  ],
  applicationName: site.name,
  authors: [{ name: "Satvic Tech", url: "https://satvictech.com" }],
  creator: "Satvic Tech",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Good Food, Good Mood · Nangloi, Delhi`,
    description:
      "100% vegetarian cafe on Nilothi Mode. Oven-fresh pizzas, thick shakes, kullad chai. Open daily 11 AM–10:30 PM.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Pure Veg Cafe, Nangloi`,
    description:
      "Oven-fresh pizzas, thick shakes and kullad chai on Nilothi Mode. Open daily 11 AM–10:30 PM.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "restaurant",
};

export const viewport: Viewport = {
  themeColor: "#0a0806",
  colorScheme: "dark",
};

// No aggregateRating: self-declared review stars break Google's guidelines.
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": `${site.url}/#cafe`,
    name: site.name,
    description:
      "100% vegetarian cafe in Nangloi, New Delhi serving oven-fresh pizzas, thick shakes, wok-tossed fried rice, soups, kullad chai, waffles and mocktails.",
    url: site.url,
    telephone: site.phones.map((p) => p.tel),
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    servesCuisine: ["Pizza", "Chinese", "Fast Food", "Beverages", "Desserts"],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: "Nangloi, New Delhi",
      addressRegion: "Delhi",
      postalCode: site.address.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    sameAs: [site.instagram.url],
    hasMenu: {
      "@type": "Menu",
      name: `${site.name} Menu`,
      url: `${site.url}/menu`,
      hasMenuSection: menu.map((c) => ({
        "@type": "MenuSection",
        name: c.name,
        description: c.blurb,
        hasMenuItem: c.groups.flatMap((g) =>
          g.items.map((i) => ({
            "@type": "MenuItem",
            name: i.name,
            ...(i.note ? { description: i.note } : {}),
            offers: {
              "@type": "Offer",
              price: i.price,
              priceCurrency: "INR",
            },
            suitableForDiet: "https://schema.org/VegetarianDiet",
          }))
        ),
      })),
    },
    potentialAction: {
      "@type": "OrderAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: site.order.url,
        inLanguage: "en-IN",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      deliveryMethod: [
        "http://purl.org/goodrelations/v1#DeliveryModePickUp",
        "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${sans.variable} ${script.variable} antialiased`}
    >
      <body className="relative min-h-screen bg-ink">
        <StructuredData />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-amber focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-ink"
        >
          Skip to content
        </a>

        <Spotlight />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <OrderBar />

        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
