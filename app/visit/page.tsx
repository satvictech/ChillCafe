import type { Metadata } from "next";
import { PageHero } from "@/components/site/PageHero";
import { VisitBlock } from "@/components/site/VisitBlock";
import { OrderFlow } from "@/components/home/OrderFlow";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { photos } from "@/lib/photos";
import { site, fullAddress } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit & Contact",
  description: `Chill Cafe, ${fullAddress}. Open every day ${site.hours.range}. Call ${site.phones[0].display} or ${site.phones[1].display}, or order online for pickup and delivery.`,
  alternates: { canonical: "/visit" },
  openGraph: {
    title: `Visit & Contact · ${site.name} Nangloi`,
    description: `${fullAddress}. Open daily ${site.hours.range}.`,
    url: "/visit",
  },
};

const directions = [
  {
    from: "From Nilothi bus stand",
    detail: "Walk to the mode and look for the red Chill Cafe board. Under two minutes.",
  },
  {
    from: "From Nangloi Metro",
    detail: "Around 3 km via Nangloi–Najafgarh Road. Any auto to Nilothi Mode will know it.",
  },
  {
    from: "From Kunwar Singh Nagar",
    detail: "We're on your side of the mode, on the main road at Shop No. 1.",
  },
];

export default function VisitPage() {
  return (
    <>
      <PageHero
        eyebrow="Visit"
        title="Nilothi Mode, Nangloi."
        lede="Open every day of the week, 11 in the morning to half past ten at night. Walk in, or send the order ahead."
        chips={[site.hours.range, "Open all 7 days", "Pickup & delivery"]}
      />

      <VisitBlock eyebrow="Find us" heading="The address, the hours, the map." />

      <Section className="pt-0">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="font-display text-[clamp(1.5rem,3.6vw,2.25rem)] font-bold leading-tight">
                Getting here
              </h2>
            </Reveal>
            <RevealGroup stagger={0.08} className="mt-8 space-y-3">
              {directions.map((d) => (
                <RevealItem key={d.from}>
                  <div className="rounded-2xl surface p-6">
                    <p className="font-display text-[0.9375rem] font-bold text-amber">
                      {d.from}
                    </p>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                      {d.detail}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal delay={0.1}>
            <PhotoFrame
              photo={photos[0]}
              ratio="aspect-[4/5]"
              sizes="(max-width: 1024px) 92vw, 40vw"
              showCaption
            />
          </Reveal>
        </div>
      </Section>

      <OrderFlow />
    </>
  );
}
