"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Common = {
  children: ReactNode;
  href: string;
  className?: string;
  external?: boolean;
  icon?: ReactNode;
  arrow?: boolean;
  onClick?: () => void;
};

function useMagnet(strength = 0.22) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18 });
  const y = useSpring(my, { stiffness: 260, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };
  return { x, y, onMove, reset };
}

export function FireButton({
  children,
  href,
  className,
  external,
  arrow = true,
  icon,
  onClick,
}: Common) {
  const { x, y, onMove, reset } = useMagnet();
  const Comp = external ? motion.a : motion(Link);

  return (
    <Comp
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full",
        "px-7 py-4 text-[0.9375rem] font-semibold tracking-tight text-ink",
        "shadow-[0_10px_40px_-10px_rgba(255,106,19,0.65)]",
        "transition-shadow duration-500 hover:shadow-[0_16px_60px_-8px_rgba(255,106,19,0.85)]",
        className
      )}
    >
      <span className="absolute inset-0 bg-[linear-gradient(100deg,#ffb020_0%,#ff8f28_38%,#ff6a13_72%,#e8371f_100%)]" />
      <span className="absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.42),transparent)]" />
      <span className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.55),transparent)] transition-transform duration-[900ms] ease-out group-hover:translate-x-[120%]" />
      <span className="relative flex items-center gap-2">
        {icon}
        {children}
        {arrow && (
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2.5}
          />
        )}
      </span>
    </Comp>
  );
}

export function GhostButton({
  children,
  href,
  className,
  external,
  icon,
  arrow = false,
}: Common) {
  const Comp = external ? motion.a : motion(Link);
  return (
    <Comp
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={cn(
        "group inline-flex items-center justify-center gap-2.5 rounded-full border border-linen/15 bg-linen/[0.03]",
        "px-7 py-4 text-[0.9375rem] font-semibold tracking-tight text-cream backdrop-blur-sm",
        "transition-colors duration-300 hover:border-amber/45 hover:bg-amber/[0.07] hover:text-amber",
        className
      )}
    >
      {icon}
      {children}
      {arrow && (
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2.5}
        />
      )}
    </Comp>
  );
}

export function PillLink({
  children,
  href,
  className,
  external,
  icon,
}: Common) {
  const Comp = external ? "a" : Link;
  return (
    <Comp
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/[0.06] px-4 py-2",
        "text-xs font-semibold tracking-wide text-amber transition-all duration-300",
        "hover:border-amber/60 hover:bg-amber/[0.12]",
        className
      )}
    >
      {icon}
      {children}
    </Comp>
  );
}

export function Magnetic({
  children,
  strength = 0.12,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const { x, y, onMove, reset } = useMagnet(strength);
  const rotate = useTransform(x, [-40, 40], [-1.5, 1.5]);
  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y, rotate }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
