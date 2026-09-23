"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "@/contexts/LanguageContext";
import {
  Eyebrow,
  MaskLine,
  PillArrow,
  Reveal,
  ease,
  pillClass,
} from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { clients, projects } from "@/lib/projects";

// Asymmetric placement for the three featured projects on a 12-col grid.
const featuredLayout = [
  "md:col-span-7",
  "md:col-span-5 md:col-start-8 md:mt-40",
  "md:col-span-6 md:col-start-3",
];

function Stamp() {
  const text = "Creative duo · Copy × Art · Est. broke · ";
  return (
    <div className="relative hidden size-36 lg:block" aria-hidden>
      <svg
        viewBox="0 0 100 100"
        className="size-full animate-[spin_24s_linear_infinite] motion-reduce:animate-none"
      >
        <defs>
          <path
            id="stamp"
            d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"
          />
        </defs>
        <text className="fill-current text-[8px] font-medium uppercase">
          <textPath href="#stamp" textLength="250" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="serif-accent text-primary absolute inset-0 grid place-items-center text-4xl">
        ×
      </span>
    </div>
  );
}

export default function HomePage() {
  const t = useTranslations("home");
  const tAll = useTranslations();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-end px-5 pt-32 pb-14 md:px-8 md:pb-20"
      >
        <motion.div style={{ y: headlineY, opacity: heroFade }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8 flex flex-wrap items-center justify-between gap-4"
          >
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <p className="text-muted-foreground flex items-center gap-2 text-sm">
              <span className="relative flex size-2">
                <span className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-60" />
                <span className="bg-primary relative inline-flex size-2 rounded-full" />
              </span>
              {tAll("navbar.available")}
            </p>
          </motion.div>

          <h1 className="text-[clamp(3.25rem,11vw,10rem)] leading-[0.88] font-bold tracking-[-0.055em]">
            <MaskLine delay={0.15}>{t("heroLine1")}</MaskLine>
            <MaskLine delay={0.25}>{t("heroLine2")}</MaskLine>
            <MaskLine delay={0.35} className="serif-accent text-primary">
              {t("heroAccent")}
            </MaskLine>
          </h1>

          <div className="mt-12 grid items-end gap-10 md:mt-16 md:grid-cols-[1fr_auto_auto] md:gap-12">
            <Reveal delay={0.55}>
              <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
                {t("heroDescription")}
              </p>
            </Reveal>
            <Reveal delay={0.65} className="flex items-center gap-6">
              <Link href="/work" className={pillClass}>
                {t("cta")}
                <PillArrow />
              </Link>
              <Link href="/contact" className="link-draw font-medium">
                {t("ctaSecondary")}
              </Link>
            </Reveal>
            <Reveal delay={0.75}>
              <Stamp />
            </Reveal>
          </div>
        </motion.div>
      </section>

      {/* Client marquee */}
      <section
        aria-label="Clients and awards"
        className="border-border overflow-hidden border-y py-6"
      >
        <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center"
            >
              {[...clients, ...clients].map((c, i) => (
                <li
                  key={i}
                  className="flex items-center text-2xl font-semibold tracking-tight md:text-4xl"
                >
                  <span className="px-8 md:px-12">{c}</span>
                  <span className="text-primary serif-accent text-3xl md:text-5xl">
                    ✳
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* Selected work */}
      <section className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
        <div className="mb-16 flex items-end justify-between gap-6 md:mb-24">
          <h2 className="text-5xl font-bold md:text-7xl">
            <MaskLine>
              {t("selectedTitle")}{" "}
              <sup className="text-muted-foreground align-super text-base font-medium tracking-normal tabular-nums">
                (03)
              </sup>
            </MaskLine>
          </h2>
          <Link
            href="/work"
            className="link-draw hidden shrink-0 pb-2 font-medium sm:block"
          >
            {t("viewAll")} →
          </Link>
        </div>

        <div className="grid gap-16 md:grid-cols-12 md:gap-x-8 md:gap-y-24">
          {projects.slice(0, 3).map((project, i) => (
            <Reveal key={project.behanceId} className={featuredLayout[i]}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>

        <Link
          href="/work"
          className="link-draw mt-16 inline-block font-medium sm:hidden"
        >
          {t("viewAll")} →
        </Link>
      </section>

      {/* The duo */}
      <section className="bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 py-28 md:grid-cols-12 md:px-8 md:py-40">
          <div className="md:col-span-7">
            <p className="text-background/60 mb-8 text-xs font-medium tracking-[0.18em] uppercase">
              {t("duoEyebrow")}
            </p>
            <h2 className="text-5xl leading-[0.95] font-bold md:text-7xl">
              <MaskLine>{t("duoTitle")}</MaskLine>
              <MaskLine delay={0.1} className="serif-accent text-primary">
                {t("duoAccent")}
              </MaskLine>
            </h2>
          </div>
          <Reveal
            delay={0.2}
            className="flex flex-col justify-end gap-8 md:col-span-4 md:col-start-9"
          >
            <p className="text-background/75 text-lg leading-relaxed">
              {t("duoBody")}
            </p>
            <div className="flex items-center gap-4 text-6xl font-bold tracking-tighter">
              <span>Copy</span>
              <motion.span
                className="serif-accent text-primary inline-block"
                whileInView={{ rotate: [0, 180] }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease, delay: 0.4 }}
              >
                ×
              </motion.span>
              <span>Art</span>
            </div>
            <Link href="/about" className="link-draw self-start font-medium">
              {t("duoLink")} →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pt-28 md:px-8 md:pt-40">
        <h2 className="text-[clamp(3rem,9vw,8rem)] leading-[0.9] font-bold">
          <MaskLine>{t("ctaTitle")}</MaskLine>
          <MaskLine delay={0.1} className="serif-accent text-primary">
            {t("ctaAccent")}
          </MaskLine>
        </h2>
        <Reveal delay={0.2} className="mt-12 flex flex-wrap items-center gap-8">
          <Link href="/contact" className={pillClass}>
            {t("ctaButton")}
            <PillArrow />
          </Link>
          <p className="text-muted-foreground max-w-xs">{t("ctaBody")}</p>
        </Reveal>
      </section>
    </>
  );
}
