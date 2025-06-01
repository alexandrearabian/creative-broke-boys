"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Star, Users, Trophy, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/contexts/LanguageContext";

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

export default function HomePage() {
  const t = useTranslations("home");

  const featuredProjects = [
    {
      title: "Grafica",
      iframe:
        '<iframe src="https://www.behance.net/embed/project/211154803?ilo0=1" height="316" width="404" allowfullscreen lazyload frameborder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>',
    },
    {
      title: "Re-connect",
      iframe:
        '<iframe src="https://www.behance.net/embed/project/202737175?ilo0=1" height="316" width="404" allowfullscreen lazyload frameborder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>',
    },
    {
      title: "Podcast",
      iframe:
        '<iframe src="https://www.behance.net/embed/project/208011533?ilo0=1" height="316" width="404" allowfullscreen lazyload frameborder="0" allow="clipboard-write" refererPolicy="strict-origin-when-cross-origin"></iframe>',
    },
  ];

  const stats = [
    { icon: Users, value: "50+", label: t("stats.clients") },
    { icon: Trophy, value: "100+", label: t("stats.projects") },
    { icon: Star, value: "5.0", label: t("stats.rating") },
    { icon: Heart, value: "∞", label: t("stats.ideas") },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 lg:py-40">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-8 text-center"
          >
            <motion.div variants={fadeInUp} className="space-y-4">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 mx-auto px-4 py-2 text-sm font-medium"
              >
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {t("badge")}
                </motion.span>
              </Badge>

              <motion.h1
                className="font-display text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <span className="from-foreground via-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
                  {t("heroTitle1")}
                </span>
                <br />
                <span className="from-primary via-secondary to-primary bg-gradient-to-r bg-clip-text text-transparent">
                  {t("heroTitle2")}
                </span>
              </motion.h1>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed md:text-xl"
            >
              {t("heroDescription")}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="elegant-shadow rounded-full px-8 py-6 text-lg font-medium"
                >
                  <Link href="/work">
                    {t("exploreWork")}
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="elegant-shadow rounded-full px-8 py-6 text-lg font-medium"
                >
                  <Link href="/about">{t("learnAbout")}</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="bg-primary/10 absolute top-20 left-10 h-16 w-16 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="bg-secondary/10 absolute right-10 bottom-20 h-24 w-24 rounded-full blur-xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-morphism elegant-shadow space-y-3 rounded-2xl p-6 text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="bg-primary/10 mx-auto flex h-12 w-12 items-center justify-center rounded-full"
                >
                  <stat.icon className="text-primary h-6 w-6" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1 + 0.3,
                    type: "spring",
                  }}
                  className="font-display text-primary text-2xl font-bold md:text-3xl"
                >
                  {stat.value}
                </motion.div>
                <p className="text-muted-foreground text-sm font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <motion.h2
              className="font-display mb-6 text-3xl font-bold tracking-tight md:text-5xl"
              whileHover={{ scale: 1.02 }}
            >
              <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
                {t("featuredTitle")}
              </span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {t("featuredDescription")}
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.03, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="group glass-morphism elegant-shadow-lg relative overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[404/316] overflow-hidden">
                  <div
                    dangerouslySetInnerHTML={{ __html: project.iframe }}
                    className="h-full w-full"
                  />
                  <motion.div
                    className="from-background/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </div>

                <motion.div
                  className="p-6"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="font-display text-foreground mb-2 text-xl font-bold">
                    {project.title}
                  </h3>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                    >
                      {t("viewProject")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="elegant-shadow rounded-full px-8 py-6"
              >
                <Link href="/work">
                  {t("viewAllProjects")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="glass-morphism elegant-shadow-lg relative overflow-hidden rounded-3xl p-8 text-center md:p-12"
          >
            <motion.div
              className="bg-primary/10 absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.h2
              className="font-display mb-6 text-3xl font-bold md:text-4xl"
              whileHover={{ scale: 1.02 }}
            >
              <span className="from-primary via-secondary to-primary bg-gradient-to-r bg-clip-text text-transparent">
                {t("ctaTitle")}
              </span>
            </motion.h2>

            <motion.p
              className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("ctaDescription")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col justify-center gap-4 sm:flex-row"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="elegant-shadow rounded-full px-8 py-6 text-lg"
                >
                  <Link href="/contact">
                    {t("startProject")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="elegant-shadow rounded-full px-8 py-6 text-lg"
                >
                  <Link href="/about">{t("learnMore")}</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
