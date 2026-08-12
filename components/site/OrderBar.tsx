"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Phone, Navigation } from "lucide-react";
import { site, mapsDirections } from "@/lib/site";

export function OrderBar() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setShow(y > 620);
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 lg:hidden"
        >
          <div className="flex items-center gap-2 rounded-2xl border border-linen/12 bg-ink/85 p-2 shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl">
            <a
              href={site.order.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex flex-1 items-center justify-center overflow-hidden rounded-xl py-3.5 text-sm font-bold text-ink"
            >
              <span className="absolute inset-0 bg-[linear-gradient(100deg,#ffb020,#ff8f28_40%,#ff6a13_75%,#e8371f)]" />
              <span className="absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.4),transparent)]" />
              <span className="relative">Order Online</span>
            </a>
            <a
              href={`tel:${site.phones[0].tel}`}
              aria-label="Call Chill Cafe"
              className="flex size-12 items-center justify-center rounded-xl border border-linen/12 text-cream active:scale-95"
            >
              <Phone className="size-[18px]" strokeWidth={2.2} />
            </a>
            <a
              href={mapsDirections}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get directions to Chill Cafe"
              className="flex size-12 items-center justify-center rounded-xl border border-linen/12 text-cream active:scale-95"
            >
              <Navigation className="size-[18px]" strokeWidth={2.2} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
