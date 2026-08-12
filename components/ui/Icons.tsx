import {
  Pizza,
  CookingPot,
  CupSoda,
  GlassWater,
  Coffee,
  Soup,
  IceCreamCone,
  Martini,
  Citrus,
  Snowflake,
  type LucideIcon,
} from "lucide-react";

export const categoryIcon: Record<string, LucideIcon> = {
  pizza: Pizza,
  rice: CookingPot,
  shakes: CupSoda,
  "cold-coffee": GlassWater,
  "coffee-tea": Coffee,
  soup: Soup,
  "waffle-ice-cream": IceCreamCone,
  mocktail: Martini,
  "cold-tea": Citrus,
  "cold-drink": Snowflake,
};

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function VegMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden>
      <rect
        x="1.4"
        y="1.4"
        width="17.2"
        height="17.2"
        rx="2.6"
        fill="none"
        stroke="#4ade80"
        strokeWidth="1.6"
      />
      <circle cx="10" cy="10" r="4.2" fill="#4ade80" />
    </svg>
  );
}
