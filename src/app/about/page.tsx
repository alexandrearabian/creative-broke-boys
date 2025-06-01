"use client";

import { motion } from "motion/react";
import {
  Users,
  Target,
  Lightbulb,
  Heart,
  Zap,
  Palette,
  Coffee,
  Star,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

export default function AboutPage() {
  const t = useTranslations("about");

  const values = [
    {
      icon: Lightbulb,
      title: t("values.creativity"),
      description: "We push creative boundaries to deliver unique solutions",
    },
    {
      icon: Target,
      title: t("values.innovation"),
      description:
        "Innovation drives everything we do, from concept to execution",
    },
    {
      icon: Users,
      title: t("values.collaboration"),
      description: "We believe the best results come from working together",
    },
    {
      icon: Award,
      title: t("values.excellence"),
      description:
        "We never settle for good enough - excellence is our standard",
    },
  ];

  const team = [
    {
      name: "Alex Rodriguez",
      role: "Creative Director",
      bio: "Visionary leader with 8+ years crafting memorable brand experiences",
      avatar: "🎨",
      skills: ["Strategy", "Branding", "Leadership"],
    },
    {
      name: "Jamie Chen",
      role: "Lead Designer",
      bio: "Digital artist passionate about creating stunning visual narratives",
      avatar: "✨",
      skills: ["UI/UX", "Visual Design", "Motion"],
    },
    {
      name: "Morgan Taylor",
      role: "Creative Strategist",
      bio: "Strategic thinker who transforms insights into compelling campaigns",
      avatar: "🚀",
      skills: ["Strategy", "Campaigns", "Analytics"],
    },
  ];

  const stats = [
    { icon: Star, value: "150+", label: "Projects Delivered" },
    { icon: Users, value: "50+", label: "Happy Clients" },
    { icon: Coffee, value: "1000+", label: "Cups of Coffee" },
    { icon: Zap, value: "5", label: "Years Experience" },
  ];

  return (
    <div className="min-h-screen pt-8">
      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24">
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
                  👋 Meet the Team
                </motion.span>
              </Badge>

              <motion.h1
                className="font-display text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <span className="from-foreground via-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
                  We Are Creative
                </span>
                <br />
                <span className="from-primary via-secondary to-primary bg-gradient-to-r bg-clip-text text-transparent">
                  Broke Boys
                </span>
              </motion.h1>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed md:text-xl"
            >
              {t("description")}
            </motion.p>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="bg-primary/10 absolute top-32 left-16 h-20 w-20 rounded-full blur-xl"
          animate={{
            y: [0, -25, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="bg-secondary/10 absolute right-16 bottom-32 h-32 w-32 rounded-full blur-xl"
          animate={{
            y: [0, 25, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
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

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 space-y-4 text-center"
          >
            <motion.h2
              className="font-display text-3xl font-bold tracking-tight md:text-5xl"
              whileHover={{ scale: 1.02 }}
            >
              <span className="from-primary via-secondary to-primary bg-gradient-to-r bg-clip-text text-transparent">
                Our Story
              </span>
            </motion.h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Born from the belief that creativity should never be limited by
              budget
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-morphism elegant-shadow-lg rounded-3xl p-8 md:p-12"
          >
            <div className="text-muted-foreground space-y-6 text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Creative Broke Boys was founded on a simple yet revolutionary
                idea: that the most innovative and impactful creative work often
                comes from constraints, not unlimited resources. We embrace the
                challenge of creating extraordinary results with creative
                resourcefulness.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Our journey began when a group of passionate creatives realized
                that the best ideas don&apos;t come from the biggest budgets -
                they come from the biggest hearts, the sharpest minds, and the
                willingness to push creative boundaries regardless of financial
                constraints.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Today, we work with brands and individuals who share our belief
                that creativity, strategy, and authentic storytelling can
                achieve more than any budget ever could. We&apos;re not just
                broke - we&apos;re breaking the rules of what&apos;s possible.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 space-y-4 text-center"
          >
            <motion.h2
              className="font-display text-3xl font-bold tracking-tight md:text-5xl"
              whileHover={{ scale: 1.02 }}
            >
              <span className="from-primary via-secondary to-primary bg-gradient-to-r bg-clip-text text-transparent">
                Our Values
              </span>
            </motion.h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              The principles that guide everything we create
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-8 md:grid-cols-2"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="glass-morphism elegant-shadow-lg space-y-4 rounded-2xl p-8"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-2xl"
                >
                  <value.icon className="text-primary h-8 w-8" />
                </motion.div>

                <motion.h3
                  className="font-display text-foreground text-xl font-bold"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {value.title}
                </motion.h3>

                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 space-y-4 text-center"
          >
            <motion.h2
              className="font-display text-3xl font-bold tracking-tight md:text-5xl"
              whileHover={{ scale: 1.02 }}
            >
              <span className="from-primary via-secondary to-primary bg-gradient-to-r bg-clip-text text-transparent">
                Meet the Team
              </span>
            </motion.h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              The creative minds behind the magic
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-8 md:grid-cols-3"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.03, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="glass-morphism elegant-shadow-lg space-y-6 rounded-2xl p-8 text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="from-primary/20 to-secondary/20 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br text-3xl"
                >
                  {member.avatar}
                </motion.div>

                <div className="space-y-2">
                  <motion.h3
                    className="font-display text-foreground text-xl font-bold"
                    whileHover={{ scale: 1.05 }}
                  >
                    {member.name}
                  </motion.h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {member.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20 text-xs"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl">
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
                Ready to Join Our Journey?
              </span>
            </motion.h2>

            <motion.p
              className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Whether you&apos;re looking to collaborate, join our team, or
              simply want to chat about creative possibilities, we&apos;d love
              to hear from you.
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
                  size="lg"
                  className="elegant-shadow rounded-full px-8 py-6 text-lg"
                >
                  Get in Touch
                  <Palette className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="elegant-shadow rounded-full px-8 py-6 text-lg"
                >
                  View Our Work
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
