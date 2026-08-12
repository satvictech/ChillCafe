import type { Metadata } from "next";
import {
  Grid2x2,
  Armchair,
  Lamp,
  PanelsTopLeft,
  Clock,
  Sparkles,
  MousePointer2,
} from "lucide-react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { RoomViewer } from "@/components/three/RoomViewer";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { FireButton, GhostButton } from "@/components/ui/Button";
import { roomPhotos } from "@/lib/photos";
import { site, mapsDirections } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Room in 3D",
  description:
    "Walk around Chill Cafe in 3D — the black-and-white checkerboard floor, red shell chairs, marble tables, red pendant lamps and the chalkboard wall, modelled from our own photos.",
  alternates: { canonical: "/room" },
  openGraph: {
    title: `The Room in 3D · ${site.name} Nangloi`,
    description:
      "An interactive 3D model of the cafe — drag to look around before you visit.",
    url: "/room",
  },
};

const details = [
  {
    icon: Grid2x2,
    label: "Checkerboard floor",
    detail: "Black and white tiles, corner to corner.",
  },
  {
    icon: Armchair,
    label: "Red shell chairs",
    detail: "Eight of them, on slim black legs.",
  },
  {
    icon: Lamp,
    label: "Red pendant lamps",
    detail: "Five domes down the middle of the room.",
  },
  {
    icon: PanelsTopLeft,
    label: "Chalkboard wall",
    detail: "Café, coffee, all day — written over and over.",
  },
  {
    icon: Clock,
    label: "The brass clock",
    detail: "Above the booth, where it actually hangs.",
  },
  {
    icon: Sparkles,
    label: "Marble tables",
    detail: "Four, with the ketchup already out.",
  },
];

export default function RoomPage() {
  return (
    <>
      <section className="relative h-[100svh] min-h-[36rem] w-full overflow-hidden">
        <RoomViewer autoStart bare className="absolute inset-0 size-full" />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[linear-gradient(to_bottom,rgba(10,8,6,0.92),rgba(10,8,6,0.55)_45%,transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(to_top,var(--color-ink),rgba(10,8,6,0.6)_45%,transparent)]"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 px-5 pt-28 sm:px-8 sm:pt-32">
          <div className="mx-auto w-full max-w-7xl">
            <p className="eyebrow flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-amber/50" aria-hidden />
              Interactive
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-[clamp(2rem,5.6vw,3.75rem)] font-extrabold leading-[0.98] tracking-[-0.035em] drop-shadow-[0_4px_24px_rgba(10,8,6,0.9)]">
              Step inside without stepping in.
            </h1>
            <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-linen/80 drop-shadow-[0_2px_12px_rgba(10,8,6,0.9)]">
              Drag to look around. Scroll to move closer.
            </p>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 px-5 pb-7 sm:px-8">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-end justify-between gap-4">
            <span className="pointer-events-none flex items-center gap-2 rounded-full border border-linen/12 bg-ink/60 px-3.5 py-2 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-linen/70 backdrop-blur-md">
              <MousePointer2 className="size-3.5" strokeWidth={2.4} />
              Stylised 3D · drag & scroll
            </span>
            <div className="flex flex-wrap gap-3">
              <GhostButton href="/gallery" arrow className="px-5 py-3 text-sm">
                See real photos
              </GhostButton>
              <FireButton href={mapsDirections} external className="px-5 py-3 text-sm">
                Get directions
              </FireButton>
            </div>
          </div>
        </div>
      </section>

      <Section id="details" className="checker">
        <SectionHead
          eyebrow="What's modelled"
          title="Everything in there is actually in there."
          lede="Six details taken straight off the photographs, so the room you're spinning around is the room you'll walk into."
        />

        <RevealGroup stagger={0.05} className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {details.map(({ icon: Icon, label, detail }) => (
            <RevealItem key={label}>
              <div className="flex h-full items-start gap-4 rounded-2xl surface p-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-amber/25 bg-amber/[0.07] text-amber">
                  <Icon className="size-5" strokeWidth={2} />
                </span>
                <span>
                  <span className="block font-display text-[0.9375rem] font-bold text-cream">
                    {label}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">
                    {detail}
                  </span>
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Side by side"
          title="The room it was built from."
          align="center"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {roomPhotos.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 0.1}>
              <PhotoFrame
                photo={photo}
                ratio="aspect-[4/3]"
                sizes="(max-width: 640px) 92vw, 46vw"
                showCaption
              />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
