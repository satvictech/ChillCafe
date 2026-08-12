import { PartyPopper, Armchair, Wind } from "lucide-react";
import { roomPhotos } from "@/lib/photos";
import { site } from "@/lib/site";
import { DriftPhoto } from "@/components/ui/PhotoFrame";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GhostButton } from "@/components/ui/Button";

const features = [
  { icon: Armchair, label: "Booth seating", detail: "Corner booth under the brass clock" },
  { icon: Wind, label: "Fully air-conditioned", detail: "Cool through the Delhi summer" },
  { icon: PartyPopper, label: "Parties & events", detail: "Birthdays and small functions" },
];

export function TheRoom() {
  return (
    <Section id="room" className="checker">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHead
            eyebrow="The room"
            title="Checkerboard floors, red chairs, warm lamps."
            lede="It's a small place built to sit in — not a counter you rush away from. Come for one chai, stay for three."
          />

          <Reveal delay={0.15}>
            <ul className="mt-10 space-y-5">
              {features.map(({ icon: Icon, label, detail }) => (
                <li key={label} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-amber/25 bg-amber/[0.07] text-amber">
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <span>
                    <span className="block font-display text-[0.9375rem] font-bold text-cream">
                      {label}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">{detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 rounded-2xl surface p-6">
              <p className="font-display text-base font-bold text-cream">
                Planning something?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                We take party orders and events — birthdays, small functions,
                bulk pizza and shake orders. Call a day ahead and we&rsquo;ll keep the
                kitchen ready.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <GhostButton href={`tel:${site.phones[0].tel}`} external className="px-5 py-3 text-sm">
                  Call {site.phones[0].display}
                </GhostButton>
                <GhostButton href="/room" arrow className="px-5 py-3 text-sm">
                  Look around in 3D
                </GhostButton>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          <DriftPhoto
            photo={roomPhotos[0]}
            ratio="aspect-[4/5]"
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 28vw"
            className="sm:mt-10"
          />
          <DriftPhoto
            photo={roomPhotos[1]}
            ratio="aspect-[4/5]"
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 28vw"
            delay={0.12}
          />
        </div>
      </div>
    </Section>
  );
}
