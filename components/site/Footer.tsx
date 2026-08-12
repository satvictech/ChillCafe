import Link from "next/link";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { site, nav, fullAddress, mapsDirections } from "@/lib/site";
import { menu } from "@/lib/menu";
import { Wordmark } from "@/components/ui/Wordmark";
import { InstagramIcon } from "@/components/ui/Icons";
import { OpenNow } from "@/components/ui/OpenNow";
import { CheckerRule } from "@/components/ui/Section";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-linen/[0.07] bg-char">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-80 opacity-40"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(255,106,19,0.28), transparent 70%)",
        }}
      />

      <CheckerRule className="absolute inset-x-0 top-0" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-10 pt-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr_1fr_1.1fr]">
          <div>
            <Wordmark size="md" className="items-start" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              A 100% vegetarian cafe on Nilothi Mode — pizzas from the oven,
              shakes from the blender, kullad chai in actual clay.
            </p>
            <div className="mt-6">
              <OpenNow />
            </div>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-linen/12 px-4 py-2.5 text-sm font-medium text-linen/80 transition-colors hover:border-amber/40 hover:text-amber"
            >
              <InstagramIcon className="size-4" />@{site.instagram.handle}
            </a>
          </div>

          <nav aria-label="Footer pages">
            <h3 className="eyebrow">Explore</h3>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.order.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-amber transition-colors hover:text-flame"
                >
                  Order Online ↗
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Menu categories">
            <h3 className="eyebrow">On the board</h3>
            <ul className="mt-5 grid grid-cols-1 gap-3">
              {menu.slice(0, 8).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/menu#${c.id}`}
                    className="text-sm text-muted transition-colors hover:text-cream"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="eyebrow">Find us</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-amber/70" strokeWidth={2} />
                <span className="leading-relaxed text-muted">{fullAddress}</span>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-amber/70" strokeWidth={2} />
                <span className="text-muted">
                  {site.hours.label}
                  <br />
                  {site.hours.range}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-amber/70" strokeWidth={2} />
                <span className="flex flex-col gap-1">
                  {site.phones.map((p) => (
                    <a
                      key={p.tel}
                      href={`tel:${p.tel}`}
                      className="text-muted transition-colors hover:text-cream"
                    >
                      {p.display}
                    </a>
                  ))}
                </span>
              </li>
              <li>
                <a
                  href={mapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-amber transition-colors hover:text-flame"
                >
                  <Navigation className="size-4" strokeWidth={2.2} />
                  Get directions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div aria-hidden className="pointer-events-none mt-20 select-none overflow-hidden">
          <p className="mask-fade-x whitespace-nowrap text-center font-display text-[clamp(2rem,11vw,8rem)] font-extrabold leading-none tracking-tighter text-linen/[0.04]">
            GOOD FOOD · GOOD MOOD
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-linen/[0.07] pt-8 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}, Nangloi. Pure vegetarian
            kitchen.
          </p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>
              Online ordering by{" "}
              <a
                href={site.order.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-muted transition-colors hover:text-amber"
              >
                LocSeva
              </a>
            </span>
            <span className="text-faint/50">·</span>
            <span>
              Built by{" "}
              <a
                href="https://satvictech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-muted transition-colors hover:text-amber"
              >
                Satvic Tech
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
