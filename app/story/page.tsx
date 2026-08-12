import type { Metadata } from "next";
import { Flame, Leaf, Clock4, PartyPopper } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHead, CheckerRule } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PhotoFrame, DriftPhoto } from "@/components/ui/PhotoFrame";
import { AtmosBand } from "@/components/ui/AtmosBand";
import { FireButton, GhostButton } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { photos, roomPhotos, atmos } from "@/lib/photos";
import { site } from "@/lib/site";
import { itemCount } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Chill Cafe is a 100% vegetarian cafe on Nilothi Mode, Nangloi — one veg kitchen, food cooked when you order it, and a room built to sit in. Good food, good mood.",
  alternates: { canonical: "/story" },
  openGraph: {
    title: `Our Story · ${site.name} Nangloi`,
    description:
      "One entirely vegetarian kitchen on Nilothi Mode. Cooked to order, served in a room built to sit in.",
    url: "/story",
  },
};

const beliefs = [
  {
    icon: Flame,
    title: "Cooked when you order it",
    body: "No trays sitting under a warmer. The oven and the wok start when your order comes in, which is why a pizza takes the time a pizza takes.",
  },
  {
    icon: Leaf,
    title: "One kitchen, entirely veg",
    body: "There is no non-veg section, no separate counter, nothing to keep apart. The whole kitchen is vegetarian, so nothing ever crosses over.",
  },
  {
    icon: Clock4,
    title: "Open every single day",
    body: `${site.hours.range}, seven days a week. Rainy Tuesdays and busy Sundays included.`,
  },
  {
    icon: PartyPopper,
    title: "Big orders welcome",
    body: "Birthdays, small functions, twenty pizzas for a family gathering. Give us a day's notice and the kitchen plans around it.",
  },
];

export default function StoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="The new place on an old road."
        lede="Nilothi Mode has been a landmark in Nangloi for as long as anyone can remember. Chill Cafe is the newer thing on it — a small, entirely vegetarian cafe trying to be worth the walk."
        chips={["100% vegetarian", `${itemCount} items`, `${site.rating}★ locally rated`]}
      />

      <Section className="pt-0">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <DriftPhoto
            photo={photos[0]}
            ratio="aspect-[4/5]"
            sizes="(max-width: 1024px) 92vw, 44vw"
          />

          <div>
            <Reveal>
              <p className="text-[1.125rem] leading-relaxed text-linen/85">
                You&rsquo;ll find us by the red board first. It sits at the mode,
                a minute from the Nilothi bus stand, on the Kunwar Singh Nagar
                side — and it says most of what we do right on it: pure veg,
                pizza, Chinese, shakes, ice cream.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-muted">
                Inside is a small room with a chalkboard wall, red chairs, marble
                tables and a black-and-white checkerboard floor. It was built to
                be sat in — for the hour after college, the evening chai, the
                birthday where nine people push two tables together.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-muted">
                The menu is longer than a place this size has any business
                having: thirteen pizzas, eleven shakes, eight mocktails, kullad
                chai in actual clay. All of it vegetarian, all of it under ₹250.
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-10 flex flex-wrap gap-3">
                <FireButton href={site.order.url} external>
                  Order Online
                </FireButton>
                <GhostButton href="/menu" arrow>
                  See the menu
                </GhostButton>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <CheckerRule />

      <Section id="beliefs">
        <SectionHead
          eyebrow="What we hold to"
          title="Four things, and we don't bend on them."
          align="center"
        />

        <RevealGroup stagger={0.07} className="mt-14 grid gap-4 sm:grid-cols-2">
          {beliefs.map(({ icon: Icon, title, body }) => (
            <RevealItem key={title}>
              <article className="group h-full rounded-[1.5rem] surface p-7 transition-colors duration-500 hover:border-amber/25">
                <span className="flex size-12 items-center justify-center rounded-2xl border border-amber/25 bg-amber/[0.07] text-amber transition-transform duration-500 group-hover:-translate-y-1">
                  <Icon className="size-5" strokeWidth={2} />
                </span>
                <h3 className="mt-6 font-display text-xl font-bold text-cream">
                  {title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                  {body}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section className="relative overflow-hidden">
        <AtmosBand image={atmos.kulladChai} opacity={0.22} position="right" />
        <div className="relative grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="grid gap-4 sm:grid-cols-2">
            <PhotoFrame
              photo={roomPhotos[0]}
              ratio="aspect-[3/4]"
              sizes="(max-width: 640px) 92vw, 26vw"
              className="sm:mt-8"
            />
            <PhotoFrame
              photo={roomPhotos[1]}
              ratio="aspect-[3/4]"
              sizes="(max-width: 640px) 92vw, 26vw"
            />
          </div>

          <div>
            <SectionHead
              eyebrow="The name"
              title="Good food. Good mood."
              lede="It's printed under the logo on the board outside, and it's the shortest version of the whole idea. Food worth coming back for, in a room you don't want to leave in a hurry."
            />
            <Reveal delay={0.2}>
              <div className="mt-12 flex items-center gap-6 rounded-[1.5rem] surface p-7">
                <Wordmark size="sm" />
                <p className="text-sm leading-relaxed text-muted">
                  Nilothi Mode, Nangloi
                  <br />
                  New Delhi 110041
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
