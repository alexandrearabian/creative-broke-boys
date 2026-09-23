"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "@/contexts/LanguageContext";
import { Eyebrow, MaskLine, Reveal, ease } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { projects, type Category } from "@/lib/projects";
import { cn } from "@/lib/utils";

const filters = [
  "all",
  "campaign",
  "branding",
  "digital",
  "interactive",
] as const;
type Filter = (typeof filters)[number];

export default function WorkPage() {
  const t = useTranslations("work");
  const [filter, setFilter] = useState<Filter>("all");

  const visible = projects.filter(
    (p) => filter === "all" || p.category === (filter as Category),
  );
  const count = (f: Filter) =>
    f === "all"
      ? projects.length
      : projects.filter((p) => p.category === f).length;

  return (
    <div className="mx-auto max-w-7xl px-5 pt-36 md:px-8 md:pt-48">
      <header className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <Reveal>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
          </Reveal>
          <h1 className="mt-6 text-[clamp(3rem,9vw,8rem)] leading-[0.9] font-bold">
            <MaskLine delay={0.1}>{t("title")}</MaskLine>
            <MaskLine delay={0.2} className="serif-accent text-primary">
              {t("accent")}
            </MaskLine>
          </h1>
        </div>
        <Reveal delay={0.3} className="self-end md:col-span-4 md:col-start-9">
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("description")}
          </p>
        </Reveal>
      </header>

      <Reveal delay={0.4}>
        <div
          role="tablist"
          className="border-border mt-16 flex gap-1 overflow-x-auto border-y py-3 md:mt-24"
        >
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
      </Reveal>

      <motion.div
        layout
        className="mt-16 grid gap-16 md:grid-cols-2 md:gap-x-10 md:gap-y-20 md:[&>*:nth-child(even)]:translate-y-24"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => (
            <motion.div
              key={project.behanceId}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease, delay: i * 0.05 }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="text-muted-foreground py-24 text-center">{t("empty")}</p>
      )}
    </div>
  );
}
