import { MapPin, Clock, Phone, Navigation, Bus, CalendarCheck } from "lucide-react";
import { site, fullAddress, mapsDirections } from "@/lib/site";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LazyMap } from "@/components/ui/LazyMap";
import { OpenNow } from "@/components/ui/OpenNow";
import { FireButton } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/Icons";

export function VisitBlock({
  heading = "Come find us on Nilothi Mode.",
  eyebrow = "Visit",
}: {
  heading?: string;
  eyebrow?: string;
}) {
  return (
    <Section id="visit">
      <SectionHead
        eyebrow={eyebrow}
        title={heading}
        lede="Two minutes from the Nilothi bus stand, on the Kunwar Singh Nagar side of the mode."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <div className="flex h-full flex-col gap-4">
            <div className="surface rounded-[1.5rem] p-6">
              <OpenNow />

              <ul className="mt-6 space-y-5">
                <li className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-amber/25 bg-amber/[0.07] text-amber">
                    <MapPin className="size-[18px]" strokeWidth={2.1} />
                  </span>
                  <span>
                    <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-faint">
                      Address
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-linen/85">
                      {fullAddress}
                    </span>
                  </span>
                </li>

                <li className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-amber/25 bg-amber/[0.07] text-amber">
                    <Bus className="size-[18px]" strokeWidth={2.1} />
                  </span>
                  <span>
                    <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-faint">
                      Landmark
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-linen/85">
                      Right by the Nilothi bus stand, at the mode
                    </span>
                  </span>
                </li>

                <li className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-amber/25 bg-amber/[0.07] text-amber">
                    <Clock className="size-[18px]" strokeWidth={2.1} />
                  </span>
                  <span>
                    <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-faint">
                      Hours
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-linen/85">
                      {site.hours.label} · {site.hours.range}
                    </span>
                  </span>
                </li>

                <li className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-amber/25 bg-amber/[0.07] text-amber">
                    <Phone className="size-[18px]" strokeWidth={2.1} />
                  </span>
                  <span>
                    <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-faint">
                      Call to order
                    </span>
                    <span className="mt-1 flex flex-col gap-0.5">
                      {site.phones.map((p) => (
                        <a
                          key={p.tel}
                          href={`tel:${p.tel}`}
                          className="text-sm text-linen/85 transition-colors hover:text-amber"
                        >
                          {p.display}
                        </a>
                      ))}
                    </span>
                  </span>
                </li>
              </ul>

              <div className="mt-7 flex flex-col gap-3">
                <FireButton href={mapsDirections} external icon={<Navigation className="size-4" strokeWidth={2.4} />}>
                  Get directions
                </FireButton>
                <a
                  href={site.booking.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 rounded-full border border-amber/35 bg-amber/[0.06] py-3.5 text-sm font-semibold text-amber transition-colors hover:bg-amber/[0.12]"
                >
                  <CalendarCheck className="size-4" strokeWidth={2.2} />
                  Book a table
                </a>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 rounded-full border border-linen/15 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-amber/40 hover:text-amber"
                >
                  <InstagramIcon className="size-4" />@{site.instagram.handle}
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <LazyMap className="h-full min-h-[26rem]" />
        </Reveal>
      </div>
    </Section>
  );
}
