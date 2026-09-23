"use client";

import { motion } from "motion/react";
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
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={cn("block", className)}
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Small uppercase label with an accent dot, used above section titles. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-muted-foreground flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase">
      <span className="bg-primary size-1.5 rounded-full" />
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
