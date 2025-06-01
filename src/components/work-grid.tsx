"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "REACCIONES 2024",
    subtitle: "Shitty Hosts | Bronce Young Lions 2024",
    year: "2024",
    category: "Campaign",
    behanceEmbed: "https://www.behance.net/embed/project/216438429?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/216438429/REACCIONES-2024",
  },
  {
    id: 2,
    title: "Ese orgullo de tener una pyme",
    subtitle: "Small Business Pride Campaign",
    year: "2024",
    category: "Digital",
    behanceEmbed: "https://www.behance.net/embed/project/204022181?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/204022181",
  },
  {
    id: 3,
    title: "Paga el que tiene la del Santander",
    subtitle: "Santander Banking Campaign",
    year: "2024",
    category: "Advertising",
    behanceEmbed: "https://www.behance.net/embed/project/202438163?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/202438163",
  },
  {
    id: 4,
    title: "Trash Your Playlist",
    subtitle: "Future Lions 2024",
    year: "2024",
    category: "Interactive",
    behanceEmbed: "https://www.behance.net/embed/project/196556307?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/196556307",
  },
  {
    id: 5,
    title: "William Lawson's Say Yes to the Zest",
    subtitle: "Brand Campaign",
    year: "2023",
    category: "Campaign",
    behanceEmbed: "https://www.behance.net/embed/project/156726755?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/156726755",
  },
  {
    id: 6,
    title: "Creative Project",
    subtitle: "Innovative Design Solution",
    year: "2023",
    category: "Design",
    behanceEmbed: "https://www.behance.net/embed/project/168859783?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/168859783",
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="border-border/40 hover:border-border bg-background/50 rounded-xl border p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-black/5">
        {/* Project Info Header */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-muted-foreground bg-accent/30 rounded-full px-2 py-1 text-sm font-medium">
                {project.year}
              </span>
              <span className="text-muted-foreground bg-accent/30 rounded-full px-2 py-1 text-sm font-medium">
                {project.category}
              </span>
            </div>
            <h3 className="group-hover:text-primary mb-2 text-xl font-bold transition-colors md:text-2xl">
              {project.title}
            </h3>
            <p className="text-muted-foreground">{project.subtitle}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            onClick={() => window.open(project.behanceUrl, "_blank")}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>

        {/* Behance Embed */}
        <div className="bg-muted/30 relative w-full overflow-hidden rounded-lg">
          <div className="aspect-[404/316] w-full">
            {!isLoaded && (
              <div className="bg-muted/50 absolute inset-0 flex items-center justify-center">
                <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
              </div>
            )}
            <iframe
              src={project.behanceEmbed}
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              frameBorder="0"
              allow="clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
              className={`h-full w-full transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setIsLoaded(true)}
            />
          </div>
        </div>

        {/* View on Behance Link */}
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            className="group/btn"
            onClick={() => window.open(project.behanceUrl, "_blank")}
          >
            View on Behance
            <ArrowUpRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default function WorkGrid() {
  return (
    <div className="px-4 py-24">
      <div className="container mx-auto max-w-screen-xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
            <span className="from-primary via-foreground/80 to-foreground/60 bg-gradient-to-r bg-clip-text text-transparent">
              Work
            </span>
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            A collection of creative projects that showcase our passion for
            innovative design and compelling storytelling.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Back to Top */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Button
            variant="outline"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm"
          >
            ↑ Back to Top
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
