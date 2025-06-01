"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Filter, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/contexts/LanguageContext";
import WorkGrid from "@/components/work-grid";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.25, 0.25, 1] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function WorkPage() {
  const [filter, setFilter] = useState("all");
  const t = useTranslations("work");

  const projects = [
    {
      id: 1,
      title: "Grafica",
      description:
        "Visual identity and branding project showcasing modern design principles",
      category: "branding",
      iframe:
        '<iframe src="https://www.behance.net/embed/project/211154803?ilo0=1" height="316" width="404" allowfullscreen lazyload frameborder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>',
    },
    {
      id: 2,
      title: "Re-connect",
      description:
        "Digital campaign focusing on human connection in the modern age",
      category: "digital",
      iframe:
        '<iframe src="https://www.behance.net/embed/project/202737175?ilo0=1" height="316" width="404" allowfullscreen lazyload frameborder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>',
    },
    {
      id: 3,
      title: "Podcast",
      description:
        "Audio branding and visual identity for emerging podcast series",
      category: "branding",
      iframe:
        '<iframe src="https://www.behance.net/embed/project/208011533?ilo0=1" height="316" width="404" allowfullscreen lazyload frameborder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>',
    },
    {
      id: 4,
      title: "REACCIONES 2024",
      description:
        "Creative campaign for Shitty Hosts | Bronce Young Lions 2024",
      category: "campaign",
      iframe:
        '<iframe src="https://www.behance.net/embed/project/216438429?ilo0=1" height="316" width="404" allowfullscreen lazyload frameborder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>',
    },
    {
      id: 5,
      title: "Trash Your Playlist",
      description: "Future Lions 2024 submission focusing on music discovery",
      category: "campaign",
      iframe:
        '<iframe src="https://www.behance.net/embed/project/196556307?ilo0=1" height="316" width="404" allowfullscreen lazyload frameborder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>',
    },
    {
      id: 6,
      title: "ENTEL",
      description: "Corporate branding and digital transformation project",
      category: "branding",
      iframe:
        '<iframe src="https://www.behance.net/embed/project/210503893?ilo0=1" height="316" width="404" allowfullscreen lazyload frameborder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>',
    },
  ];

  const categories = [
    { id: "all", label: "All Work" },
    { id: "branding", label: "Branding" },
    { id: "digital", label: "Digital" },
    { id: "campaign", label: "Campaigns" },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <div className="min-h-screen px-6 py-20 md:py-32">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial="initial"
          animate="animate"
          className="mb-16 space-y-6 text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-display text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
              {t("title")}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed md:text-xl"
          >
            {t("description")}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <WorkGrid />
        </motion.div>
      </div>
    </div>
  );
}
