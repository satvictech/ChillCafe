import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { Gallery } from "@/components/gallery/Lightbox";
import { RoomViewer } from "@/components/three/RoomViewer";
import { Reveal } from "@/components/ui/Reveal";
import { GhostButton, FireButton } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery & 3D Room",
  description:
    "See inside Chill Cafe, Nangloi — the storefront on Nilothi Mode, the checkerboard floors, the booth under the brass clock, plus an interactive 3D walkthrough of the room.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: `Gallery & 3D Room · ${site.name} Nangloi`,
    description:
      "The storefront, the booths, the checkerboard floors — and a 3D walkthrough of the room.",
    url: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="See it before you sit in it."
        lede="The red board on the street, the booth under the brass clock, and the checkerboard floor everyone photographs."
        chips={["Storefront", "Interiors", "Interactive 3D"]}
      />

      <Section className="pt-0">
        <Gallery />
      </Section>

      <Section id="three-d" className="checker">
        <SectionHead
          eyebrow="Interactive"
          title="Take a look around the room."
          lede="A stylised 3D model of the cafe — built from our own photos, so the floor, chairs, lamps and chalkboard wall are all where you'll find them. Drag to look around."
        />
        <Reveal delay={0.12}>
          <RoomViewer className="mt-12 h-[30rem] sm:h-[36rem]" />
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-5 max-w-2xl text-[0.8125rem] leading-relaxed text-faint">
            It&rsquo;s a stylised model, not a photograph — the layout and colours
            are ours, the detail is simplified so it loads fast on a phone.
          </p>
        </Reveal>
      </Section>

      <Section>
        <div className="relative overflow-hidden rounded-[2rem] border border-linen/10 bg-char px-6 py-14 text-center sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-24 h-64 opacity-60"
            style={{
              background:
                "radial-gradient(50% 100% at 50% 100%, rgba(255,106,19,0.26), transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <Reveal>
              <p className="eyebrow">More on Instagram</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 font-display text-[clamp(1.75rem,4.4vw,2.75rem)] font-bold leading-tight">
                New plates go up on the grid first.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mx-auto mt-5 max-w-md text-[1rem] leading-relaxed text-muted">
                Reels of the pizzas coming out of the oven, the shakes being
                poured, and whatever the kitchen is trying that week.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <GhostButton
                  href={site.instagram.url}
                  external
                  icon={<InstagramIcon className="size-4" />}
                >
                  @{site.instagram.handle}
                </GhostButton>
                <FireButton href={site.order.url} external>
                  Order Online
                </FireButton>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
