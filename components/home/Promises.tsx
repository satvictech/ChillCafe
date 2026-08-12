import { Heart, Sprout, Leaf, ShieldCheck } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import { Section, SectionHead } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const pillars = [
  {
    icon: Heart,
    title: "Freshness & love",
    body: "Nothing sits waiting under a lamp. Your order starts cooking when you do.",
    accent: "#d91e28",
  },
  {
    icon: Sprout,
    title: "Clean ingredients",
    body: "Short ingredient lists, real dairy, no shortcuts hiding behind the sauce.",
    accent: "#4ade80",
  },
  {
    icon: Leaf,
    title: "Farm fresh",
    body: "Vegetables bought fresh and chopped the same day they're served.",
    accent: "#ffb020",
  },
  {
    icon: ShieldCheck,
    title: "100% vegetarian",
    body: "One entirely veg kitchen. No shared surfaces, no exceptions, ever.",
    accent: "#ff6a13",
  },
];

export function PromiseTicker() {
  return (
    <div className="relative border-y border-linen/[0.07] bg-char/60 py-5">
      <Marquee slow>
        {site.promises.map((p) => (
          <span key={p} className="flex items-center">
            <span className="whitespace-nowrap px-7 font-display text-sm font-bold uppercase tracking-[0.2em] text-linen/55">
              {p}
            </span>
            <span aria-hidden className="text-ember">
              ✳
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

export function Promises() {
  return (
    <Section id="why">
      <SectionHead
        eyebrow="Why people come back"
        title="Four things we don't compromise on."
        lede="It's written on the board inside the cafe, so it may as well be written here too."
      />

      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map(({ icon: Icon, title, body, accent }) => (
          <RevealItem key={title}>
            <article className="group relative h-full overflow-hidden rounded-[1.5rem] surface p-7 transition-colors duration-500 hover:border-linen/20">
              <div
                aria-hidden
                className="absolute -right-10 -top-10 size-32 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle, ${accent}33, transparent 70%)`,
                }}
              />
              <span
                className="relative flex size-12 items-center justify-center rounded-2xl border transition-transform duration-500 group-hover:-translate-y-1"
                style={{
                  borderColor: `${accent}40`,
                  background: `${accent}14`,
                  color: accent,
                }}
              >
                <Icon className="size-5" strokeWidth={2.1} />
              </span>
              <h3 className="relative mt-6 font-display text-lg font-bold text-cream">
                {title}
              </h3>
              <p className="relative mt-2.5 text-[0.875rem] leading-relaxed text-muted">
                {body}
              </p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
