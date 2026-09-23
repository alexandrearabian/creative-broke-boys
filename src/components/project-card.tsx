"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "@/contexts/LanguageContext";
import { behanceEmbed, behanceUrl, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const t = useTranslations("work");

  return (
    <article className="group">
      <div className="bg-card relative aspect-[404/316] overflow-hidden rounded-lg transition-[border-radius,transform] duration-500 group-hover:rounded-2xl">
        {!loaded && (
          <div className="from-card via-muted to-card absolute inset-0 animate-pulse bg-gradient-to-br" />
        )}
        <iframe
          src={behanceEmbed(project.behanceId)}
          title={project.title}
          loading="lazy"
          allow="clipboard-write"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setLoaded(true)}
          className={cn(
            "size-full transition-opacity duration-700",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      </div>

      <div className="border-border mt-4 flex items-start justify-between gap-4 border-t pt-4">
        <div className="flex gap-4">
          <span className="text-muted-foreground pt-1 text-xs font-medium tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="group-hover:text-primary text-xl font-semibold tracking-tight transition-colors md:text-2xl">
              {project.title}
            </h3>
            <p className="text-muted-foreground mt-1 text-sm">
              {project.client} · {t(`categories.${project.category}`)} ·{" "}
              {project.year}
            </p>
          </div>
        </div>
        <a
          href={behanceUrl(project.behanceId)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t("viewOnBehance")}: ${project.title}`}
          className="border-border hover:bg-primary hover:text-primary-foreground hover:border-primary grid size-10 shrink-0 place-items-center rounded-full border transition-colors duration-300"
        >
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
        </a>
      </div>
    </article>
  );
}
