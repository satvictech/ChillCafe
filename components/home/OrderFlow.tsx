import { Smartphone, HandPlatter, ChefHat, CalendarCheck } from "lucide-react";
import { site } from "@/lib/site";
import { Section } from "@/components/ui/Section";
import { Reveal, SplitLines } from "@/components/ui/Reveal";
import { FireButton, GhostButton } from "@/components/ui/Button";

const steps = [
  {
    icon: Smartphone,
    title: "Pick from the board",
    body: "The full menu, live prices, no app to install.",
  },
  {
    icon: HandPlatter,
    title: "Pickup or delivery",
    body: "Add your number, choose how you want it, done.",
  },
  {
    icon: ChefHat,
    title: "We start cooking",
    body: "Your order lands in the kitchen the moment you confirm.",
  },
];

export function OrderFlow() {
  return (
    <Section id="order">
      <div className="relative overflow-hidden rounded-[2rem] border border-ember/20 bg-char px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 size-[30rem] rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(255,106,19,0.28) 0%, rgba(217,30,40,0.12) 45%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-20 size-[26rem] rounded-full opacity-60"
          style={{
            background: "radial-gradient(circle, rgba(255,176,32,0.22), transparent 68%)",
          }}
        />
        <div aria-hidden className="checker-band absolute inset-x-0 top-0 h-3 opacity-50" />

        <div className="relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow">Ordering, minus the queue</p>
            </Reveal>
            <SplitLines
              text="Order ahead. Walk in. Pick it up."
              as="h2"
              delay={0.05}
              className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.02]"
            />
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-muted">
                Friday evenings get busy. Send the order through before you leave
                the house and it&rsquo;s ready when you reach Nilothi Mode.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="mt-9 flex flex-wrap gap-3">
                <FireButton href={site.order.url} external>
                  Start an order
                </FireButton>
                <GhostButton
                  href={site.booking.url}
                  external
                  icon={<CalendarCheck className="size-4" strokeWidth={2.2} />}
                >
                  Book a table
                </GhostButton>
                <GhostButton href="/menu" arrow>
                  Look at the menu first
                </GhostButton>
              </div>
            </Reveal>
          </div>

          <ol className="relative space-y-3">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={0.1 + i * 0.09}>
                <li className="group flex items-start gap-5 rounded-2xl border border-linen/[0.08] bg-ink/40 p-5 transition-colors duration-500 hover:border-amber/25">
                  <span className="relative flex size-12 shrink-0 items-center justify-center rounded-xl border border-amber/25 bg-amber/[0.07] text-amber">
                    <Icon className="size-5" strokeWidth={2} />
                    <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-ember text-[0.625rem] font-bold text-ink">
                      {i + 1}
                    </span>
                  </span>
                  <span className="pt-0.5">
                    <span className="block font-display text-[0.9375rem] font-bold text-cream">
                      {title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">
                      {body}
                    </span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
