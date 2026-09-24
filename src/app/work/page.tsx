"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "@/contexts/LanguageContext";
import { Letters, ease } from "@/components/motion";
import { Cover, ProjectCard } from "@/components/project-card";
import {
  behanceUrl,
  projects,
  type Category,
  type Project,
} from "@/lib/projects";
import { cn } from "@/lib/utils";

const filters = [
  "all",
  "campaign",
  "branding",
  "digital",
  "interactive",
] as const;
type Filter = (typeof filters)[number];
const views = ["grid", "index"] as const;

/** Text rows; the hovered project's cover trails the pointer. */
function IndexList({ items }: { items: Project[] }) {
  const t = useTranslations("work");
  const [hovered, setHovered] = useState<Project | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 28 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 28 });

  return (
    <div
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setHovered(null)}
    >
      <ul className="border-t">
        {items.map((p, i) => (
          <motion.li
            key={p.behanceId}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: i * 0.04 }}
            className="border-b"
          >
            <a
              href={behanceUrl(p.behanceId)}
              target="_blank"
              rel="noopener noreferrer"
              onPointerEnter={() => setHovered(p)}
              className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-5 md:grid-cols-[4rem_1fr_12rem_4rem] md:py-7"
            >
              <span className="text-muted-foreground text-sm tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="display group-hover:text-primary text-3xl tracking-[-0.04em] transition-[color,transform] duration-500 group-hover:translate-x-3 md:text-6xl">
                {p.title}
              </span>
              <span className="text-muted-foreground hidden text-sm md:block">
                {t(`categories.${p.category}`)}
              </span>
              <span className="text-muted-foreground flex items-center justify-end gap-2 text-sm tabular-nums">
                {p.year}
                <ArrowUpRight className="text-primary size-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </span>
            </a>
          </motion.li>
        ))}
      </ul>

      {/* Pointer-only preview; touch users get the plain list. */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-30 hidden [@media(hover:hover)]:block"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.behanceId}
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.4, ease }}
              className="absolute -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg"
            >
              <Cover project={hovered} sizes="360px" className="h-60 w-80" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function WorkPage() {
  const t = useTranslations("work");
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<(typeof views)[number]>("grid");

  const visible = projects.filter(
    (p) => filter === "all" || p.category === (filter as Category),
  );
  const count = (f: Filter) =>
    f === "all"
      ? projects.length
      : projects.filter((p) => p.category === f).length;

  return (
    <div className="px-5 pt-32 md:px-8 md:pt-40">
      <h1 className="display text-[clamp(4rem,22vw,22rem)] leading-[0.8] tracking-[-0.06em]">
        <Letters text={t("title")} delay={0.05} />
        <sup className="text-primary ml-2 align-super text-2xl font-medium tracking-normal tabular-nums md:text-5xl">
          {projects.length}
        </sup>
      </h1>

      <div className="bg-background/70 sticky top-0 z-20 -mx-5 mt-10 flex items-center justify-between gap-4 px-5 py-3 backdrop-blur-xl md:-mx-8 md:mt-16 md:px-8">
        <div role="tablist" className="flex gap-1 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                filter === f
                  ? "text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {filter === f && (
                <motion.span
                  layoutId="filter-pill"
                  className="bg-foreground absolute inset-0 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">
                {f === "all" ? t("all") : t(`categories.${f}`)}
                <sup className="ml-1 tabular-nums opacity-60">{count(f)}</sup>
              </span>
            </button>
          ))}
        </div>
        <div className="hidden shrink-0 gap-1 sm:flex">
          {views.map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors",
                view === v
                  ? "border-foreground"
                  : "text-muted-foreground hover:text-foreground border-transparent",
              )}
            >
              {t(`views.${v}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 md:mt-16">
        {view === "index" ? (
          <IndexList key={filter} items={visible} />
        ) : (
          <div
            key={filter}
            className="grid gap-14 md:grid-cols-2 md:gap-x-8 md:gap-y-24 md:[&>*:nth-child(even)]:mt-40"
          >
            {visible.map((p) => (
              <ProjectCard key={p.behanceId} project={p} />
            ))}
          </div>
        )}
      </div>

      {visible.length === 0 && (
        <p className="text-muted-foreground py-24 text-center">{t("empty")}</p>
      )}
    </div>
  );
}
