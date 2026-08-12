import { Star, ExternalLink } from "lucide-react";
import { site } from "@/lib/site";
import { atmos } from "@/lib/photos";
import { AtmosBand } from "@/components/ui/AtmosBand";
import { Section } from "@/components/ui/Section";
import { Reveal, SplitLines } from "@/components/ui/Reveal";

const knownFor = ["Cheese pizzas", "Fried rice", "Thick shakes", "Kullad chai"];

export function Verdict() {
  return (
    <Section id="verdict" className="relative overflow-hidden">
      <AtmosBand image={atmos.coffeeBeans} opacity={0.13} position="left" />

      <div className="relative grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-amber/50" aria-hidden />
              The verdict
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mt-6 flex items-end gap-4">
              <span className="font-display text-[clamp(4.5rem,13vw,7rem)] font-extrabold leading-none text-ember-gradient">
                {site.rating}
              </span>
              <span className="pb-3">
                <span className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber text-amber"
                      strokeWidth={0}
                    />
                  ))}
                </span>
                <span className="mt-2 block text-sm text-muted">
                  {site.ratingCount}+ ratings
                </span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-muted">
              Not our own claim — that&rsquo;s what people have left on the public
              listings. Magicpin&rsquo;s own summary singles out the cheese pizzas.
            </p>
          </Reveal>
        </div>

        <div>
          <SplitLines
            text="Rated by the neighbourhood, not by us."
            as="h2"
            className="font-display text-[clamp(1.75rem,4.2vw,2.75rem)] font-bold leading-[1.05]"
          />

          <Reveal delay={0.12}>
            <ul className="mt-9 grid gap-3 sm:grid-cols-2">
              {site.listings.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-2xl surface px-5 py-4 transition-colors duration-300 hover:border-amber/30"
                  >
                    <span>
                      <span className="block font-display text-sm font-bold text-cream">
                        {l.name}
                      </span>
                      <span className="mt-0.5 block text-[0.6875rem] text-faint">
                        {l.rating
                          ? `${l.rating}★ · ${l.count} ratings`
                          : "Listed & taking orders"}
                      </span>
                    </span>
                    <ExternalLink
                      className="size-4 shrink-0 text-faint transition-colors group-hover:text-amber"
                      strokeWidth={2.2}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-faint">
                Known for
              </span>
              {knownFor.map((k) => (
                <span
                  key={k}
                  className="rounded-full border border-linen/12 px-3.5 py-1.5 text-xs font-medium text-linen/75"
                >
                  {k}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
