"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "@/contexts/LanguageContext";
import { behanceUrl, coverUrl, type Project } from "@/lib/projects";
import { ease } from "@/components/motion";
import { cn } from "@/lib/utils";

/** Project cover, or a type-only tile when Behance has no public cover. */
export function Cover({
  project,
  sizes,
  priority,
  className,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("bg-card relative overflow-hidden", className)}>
      {project.cover ? (
        <Image
          src={coverUrl(project.cover)}
          alt={project.title}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div className="grid size-full place-items-center p-6">
          <span className="display text-center text-4xl leading-[0.9] md:text-6xl">
            {project.title}
            <span className="text-primary">*</span>
          </span>
        </div>
      )}
    </div>
  );
}

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const t = useTranslations("work");

  return (
    <a
      href={behanceUrl(project.behanceId)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t("viewOnBehance")}: ${project.title}`}
      className={cn("group block", className)}
    >
      <motion.div
        initial={{ clipPath: "inset(18% 8% 18% 8%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.1, ease }}
        className="overflow-hidden rounded-lg"
      >
        <Cover
          project={project}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="aspect-[4/3] transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
      </motion.div>

      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
          <span className="link-draw group-hover:bg-[length:100%_1px]">
            {project.title}
          </span>
        </h3>
        <ArrowUpRight className="text-primary size-5 shrink-0 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
      </div>
      <p className="text-muted-foreground mt-1 text-sm">
        {t(`categories.${project.category}`)}, {project.year}
      </p>
    </a>
  );
}
