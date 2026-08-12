import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { FireButton, GhostButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-5 py-32 sm:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 checker opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-20 size-[40rem] -translate-x-1/2 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(255,106,19,0.22), transparent 68%)",
        }}
      />

      <div className="mx-auto w-full max-w-xl text-center">
        <Wordmark size="sm" />

        <p className="mt-12 font-display text-[clamp(4.5rem,18vw,9rem)] font-extrabold leading-none text-ember-gradient">
          404
        </p>

        <h1 className="mt-4 font-display text-[clamp(1.5rem,4.5vw,2.25rem)] font-bold leading-tight">
          Not on the board.
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-muted">
          That page doesn&rsquo;t exist — but the pizzas do. Try the menu, or come
          straight to Nilothi Mode.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <FireButton href="/menu" arrow={false}>
            See the menu
          </FireButton>
          <GhostButton href={site.order.url} external arrow>
            Order Online
          </GhostButton>
        </div>

        <nav className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Pages">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-faint transition-colors hover:text-amber"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
