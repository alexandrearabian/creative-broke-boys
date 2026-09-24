"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease, delay }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Headline line that slides up from behind a mask. */
export function MaskLine({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    // Observe the wrapper: the clipped inner line never counts as in view.
    <motion.span
      className="block overflow-hidden pb-[0.08em]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <motion.span
        className={cn("block", className)}
        variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
        transition={{ duration: 1, ease, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/** Word whose letters rise one by one from behind a mask. */
export function Letters({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span
      aria-label={text}
      className={cn("inline-flex overflow-hidden", className)}
    >
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ y: "105%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease, delay: delay + i * 0.035 }}
        >
          {ch === " " ? "\u00a0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

/** Pulls its child toward the pointer while hovered, springs back on leave. */
export function Magnetic({
  children,
  strength = 0.35,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/** Small uppercase label, used sparingly above page titles. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase">
      {children}
    </p>
  );
}

/** Primary call-to-action: ink pill that turns signal red, arrow swings on hover. */
export const pillClass =
  "group bg-foreground text-background hover:bg-primary hover:text-primary-foreground inline-flex h-14 items-center gap-4 rounded-full pr-2 pl-7 text-base font-medium transition-[background-color,color,transform] duration-300 active:scale-[0.97] disabled:opacity-60";

export function PillArrow() {
  return (
    <span className="bg-background text-foreground grid size-10 place-items-center rounded-full transition-transform duration-500 group-hover:-rotate-45">
      <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
        <path
          d="M2 8h12m0 0L9 3m5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
