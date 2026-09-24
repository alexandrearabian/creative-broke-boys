"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "@/contexts/LanguageContext";
import {
  Letters,
  Magnetic,
  MaskLine,
  PillArrow,
  Reveal,
  ease,
  pillClass,
} from "@/components/motion";
import { Cover } from "@/components/project-card";
import { behanceUrl, clients, projects } from "@/lib/projects";

const withCovers = projects.filter((p) => p.cover);

/** Pill-shaped window in the headline that flips through project covers. */
function CoverPill() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setI((n) => (n + 1) % withCovers.length),
      1100,
    );
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <motion.span
      initial={{ clipPath: "inset(0% 50% 0% 50% round 999px)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0% round 999px)" }}
      transition={{ duration: 1.1, ease, delay: 0.5 }}
      className="relative mx-[0.08em] inline-block h-[0.72em] w-[1em] shrink-0 overflow-hidden rounded-full align-[0.02em] md:w-[1.5em]"
      aria-hidden
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={i}
          className="absolute inset-0"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease }}
        >
          <Cover
            project={withCovers[i]!}
            sizes="240px"
            priority={i === 0}
            className="size-full"
          />
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}

function Hero() {
  const t = useTranslations("home");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Lines drift apart as you leave the hero.
  const left = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const right = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden px-5 pt-24 pb-10 md:px-8 md:pb-12"
    >
      <h1 className="display text-[21vw] leading-[0.82] tracking-[-0.06em] md:text-[min(17.5vw,17rem)]">
        <motion.span style={{ x: left }} className="block">
          <Letters text="Creative" delay={0.1} />
        </motion.span>
        <motion.span
          style={{ x: right }}
          className="flex items-center justify-end"
        >
          <CoverPill />
          <Letters text="Broke" delay={0.25} />
        </motion.span>
        <motion.span style={{ x: left }} className="block">
          <Letters text="Boys" delay={0.4} />
          <Letters text="*" delay={0.55} className="text-primary" />
        </motion.span>
      </h1>

      <Reveal
        delay={0.9}
        className="mt-10 flex flex-wrap items-end justify-between gap-8 md:mt-14"
      >
        <p className="text-muted-foreground max-w-xs text-lg leading-snug">
          {t("heroDescription")}
        </p>
        <Magnetic>
          <Link href="/work" className={pillClass}>
            {t("cta")}
            <PillArrow />
          </Link>
        </Magnetic>
      </Reveal>
    </section>
  );
}

/** Vertical scroll drives a horizontal pan through every project. */
function Gallery() {
  const t = useTranslations("home");
  const tw = useTranslations("work");
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () =>
      setDistance(
        Math.max(0, (track.current?.scrollWidth ?? 0) - window.innerWidth),
      );
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, (p) => -p * distance);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const pan = !reduce;

  return (
    <section
      ref={section}
      aria-label={t("selectedTitle")}
      style={pan ? { height: `calc(100dvh + ${distance}px)` } : undefined}
      className="relative"
    >
      <div
        className={
          pan
            ? "sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden"
            : "overflow-x-auto py-24"
        }
      >
        <motion.div
          ref={track}
          style={pan ? { x } : undefined}
          className="flex w-max items-end gap-6 px-5 md:gap-10 md:px-8"
        >
          <h2 className="display text-[clamp(3rem,9vw,8rem)] leading-[0.85] md:pr-10">
            {t("selectedTitle")}
            <sup className="text-primary ml-2 align-super text-lg font-medium tracking-normal tabular-nums md:text-2xl">
              {projects.length}
            </sup>
          </h2>

          {projects.map((p, i) => (
            <a
              key={p.behanceId}
              href={behanceUrl(p.behanceId)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${tw("viewOnBehance")}: ${p.title}`}
              className={`group block shrink-0 ${i % 2 ? "md:mb-16" : ""}`}
            >
              <div className="overflow-hidden rounded-lg">
                <Cover
                  project={p}
                  sizes="(min-width: 768px) 60vw, 85vw"
                  className="h-[52dvh] w-[85vw] transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] md:aspect-[4/3] md:h-[60dvh] md:w-auto"
                />
              </div>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-muted-foreground text-sm tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-semibold tracking-tight md:text-3xl">
                  {p.title}
                </h3>
                <ArrowUpRight className="text-primary size-5 shrink-0 self-center opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </a>
          ))}

          <Link
            href="/work"
            className="group text-foreground hover:bg-primary hover:text-primary-foreground grid h-[52dvh] w-[60vw] shrink-0 place-items-center rounded-lg border transition-colors duration-500 md:h-[60dvh] md:w-[28vw]"
          >
            <span className="flex items-center gap-3 text-2xl font-semibold tracking-tight md:text-4xl">
              {t("viewAll")}
              <ArrowUpRight className="size-8 transition-transform duration-500 group-hover:rotate-45" />
            </span>
          </Link>
        </motion.div>

        {pan && (
          <motion.div
            style={{ scaleX: progress }}
            className="bg-primary absolute inset-x-5 bottom-8 h-px origin-left md:inset-x-8"
          />
        )}
      </div>
    </section>
  );
}

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <>
      <Hero />
      <Gallery />

      {/* Clients */}
      <section
        aria-label="Clients and awards"
        className="overflow-hidden border-y py-8 md:py-10"
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
                  className="display flex items-center text-4xl md:text-7xl"
                >
                  <span className="px-8 md:px-14">{c}</span>
                  <span className="text-primary animate-spin-slow inline-block text-3xl md:text-5xl">
                    ✳
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pt-32 md:px-8 md:pt-48">
        <h2 className="display text-[clamp(3.5rem,14vw,14rem)] leading-[0.85]">
          <MaskLine>{t("ctaTitle")}</MaskLine>
          <MaskLine delay={0.1} className="accent-word text-right">
            {t("ctaAccent")}
          </MaskLine>
        </h2>
        <Reveal delay={0.2} className="mt-12 md:mt-16">
          <Magnetic>
            <Link href="/contact" className={pillClass}>
              {t("ctaButton")}
              <PillArrow />
            </Link>
          </Magnetic>
        </Reveal>
      </section>
    </>
  );
}
