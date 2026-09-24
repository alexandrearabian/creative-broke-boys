"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
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

/** Index of the hero cover on show; advances on a timer unless motion is reduced. */
function useCoverCycle() {
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

  return i;
}

/** Stacked covers that slide up to the next one whenever `index` changes. */
function CoverFlip({ index, sizes }: { index: number; sizes: string }) {
  return (
    <AnimatePresence initial={false}>
      <motion.span
        key={index}
        className="absolute inset-0"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.6, ease }}
      >
        <Cover
          project={withCovers[index]!}
          sizes={sizes}
          priority={index === 0}
          className="size-full"
        />
      </motion.span>
    </AnimatePresence>
  );
}

function Hero() {
  const t = useTranslations("home");
  const ref = useRef<HTMLElement>(null);
  const cover = useCoverCycle();
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
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden px-5 pt-20 pb-8 md:px-8 md:pt-24 md:pb-12"
    >
      {/* Phones: the covers fill the space above the headline instead of the inline pill. */}
      <motion.div
        aria-hidden
        initial={{ clipPath: "inset(100% 0% 0% 0% round 0.5rem)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 0.5rem)" }}
        transition={{ duration: 1.1, ease, delay: 0.3 }}
        className="relative mb-6 min-h-40 flex-1 overflow-hidden md:hidden"
      >
        <CoverFlip index={cover} sizes="100vw" />
      </motion.div>

      <h1 className="display text-[21vw] leading-[0.82] tracking-[-0.06em] md:text-[min(17.5vw,17rem)]">
        <motion.span style={{ x: left }} className="block">
          <Letters text="Creative" delay={0.1} />
        </motion.span>
        <motion.span
          style={{ x: right }}
          className="flex items-center justify-end"
        >
          <motion.span
            aria-hidden
            initial={{ clipPath: "inset(0% 50% 0% 50% round 999px)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0% round 999px)" }}
            transition={{ duration: 1.1, ease, delay: 0.5 }}
            className="relative mx-[0.08em] hidden h-[0.72em] w-[1.5em] shrink-0 overflow-hidden rounded-full md:inline-block"
          >
            <CoverFlip index={cover} sizes="240px" />
          </motion.span>
          <Letters text="Broke" delay={0.25} />
        </motion.span>
        <motion.span style={{ x: left }} className="block">
          <Letters text="Boys" delay={0.4} />
          <Letters text="*" delay={0.55} className="text-primary" />
        </motion.span>
      </h1>

      <Reveal
        delay={0.9}
        className="mt-6 flex flex-wrap items-end justify-between gap-6 md:mt-14 md:gap-8"
      >
        <p className="text-muted-foreground max-w-xs text-base leading-snug md:text-lg">
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

const instant = (top: number) => window.scrollTo({ top, behavior: "instant" });

/**
 * Lets sideways gestures drive the pan too: a horizontal trackpad or
 * shift-wheel scroll, or a sideways touch swipe, is turned into page scroll,
 * which the pan already maps 1:1 to horizontal movement.
 */
function useSideScroll(
  section: React.RefObject<HTMLElement | null>,
  el: React.RefObject<HTMLDivElement | null>,
  distance: number,
) {
  useEffect(() => {
    const node = el.current;
    if (!distance || !node) return;
    // Keep gestures inside the pan's scroll range.
    const clamp = (y: number) => {
      const start =
        (section.current?.getBoundingClientRect().top ?? 0) + window.scrollY;
      return Math.min(start + distance, Math.max(start, y));
    };

    let dragging = false;
    let moved = false;
    let startX = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0;
    let glide: ReturnType<typeof animate> | undefined;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault(); // also stops the browser's back/forward swipe
      instant(clamp(window.scrollY + e.deltaX));
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      glide?.stop();
      dragging = true;
      moved = false;
      startX = lastX = e.clientX;
      lastT = e.timeStamp;
      velocity = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      if (Math.abs(e.clientX - startX) > 8) moved = true;
      instant(clamp(window.scrollY - dx));
      velocity = dx / Math.max(1, e.timeStamp - lastT);
      lastX = e.clientX;
      lastT = e.timeStamp;
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      // Carry the swipe's momentum a little further, like a native fling.
      glide = animate(window.scrollY, clamp(window.scrollY - velocity * 350), {
        duration: 0.8,
        ease,
        onUpdate: instant,
      });
    };
    const onCancel = () => (dragging = false);
    // A swipe that started on a card shouldn't open it.
    const onClick = (e: MouseEvent) => {
      if (!moved) return;
      e.preventDefault();
      e.stopPropagation();
      moved = false;
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    node.addEventListener("pointerdown", onDown);
    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerup", onUp);
    node.addEventListener("pointercancel", onCancel);
    node.addEventListener("click", onClick, true);
    return () => {
      glide?.stop();
      node.removeEventListener("wheel", onWheel);
      node.removeEventListener("pointerdown", onDown);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerup", onUp);
      node.removeEventListener("pointercancel", onCancel);
      node.removeEventListener("click", onClick, true);
    };
  }, [section, el, distance]);
}

/**
 * Vertical scroll drives a horizontal pan through every project; sideways
 * swipes and trackpad scrolls move it as well. Reduced motion gets a native
 * swipe carousel that snaps card to card.
 */
function Gallery() {
  const t = useTranslations("home");
  const tw = useTranslations("work");
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () =>
      setDistance(
        reduce
          ? 0
          : Math.max(0, (track.current?.scrollWidth ?? 0) - window.innerWidth),
      );
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reduce]);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, (p) => -p * distance);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const pan = distance > 0;
  useSideScroll(section, stage, distance);
  const title = (
    <>
      {t("selectedTitle")}
      <sup className="text-primary ml-2 align-super text-lg font-medium tracking-normal tabular-nums md:text-2xl">
        {projects.length}
      </sup>
    </>
  );

  return (
    <section
      ref={section}
      aria-label={t("selectedTitle")}
      style={pan ? { height: `calc(100dvh + ${distance}px)` } : undefined}
      className="relative"
    >
      <div
        ref={stage}
        className={
          pan
            ? "sticky top-0 flex h-[100dvh] touch-pan-y flex-col justify-center overflow-hidden"
            : "snap-x snap-mandatory scroll-px-5 overflow-x-auto overscroll-x-contain py-16 [scrollbar-width:none] md:scroll-px-8 md:py-24"
        }
      >
        <h2 className="display mb-8 px-5 text-6xl leading-[0.85] md:hidden">
          {title}
        </h2>
        <motion.div
          ref={track}
          style={{ x }}
          className="flex w-max items-end gap-4 px-5 md:gap-10 md:px-8"
        >
          <h2 className="display hidden text-[clamp(3rem,9vw,8rem)] leading-[0.85] md:block md:pr-10">
            {title}
          </h2>

          {projects.map((p, i) => (
            <a
              key={p.behanceId}
              href={behanceUrl(p.behanceId)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${tw("viewOnBehance")}: ${p.title}`}
              className={`group block shrink-0 snap-start transition-transform duration-300 active:scale-[0.98] ${i % 2 ? "md:mb-16" : ""}`}
            >
              <div className="overflow-hidden rounded-lg">
                <Cover
                  project={p}
                  sizes="(min-width: 768px) 60vw, 82vw"
                  className="aspect-[4/3] w-[82vw] transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] md:h-[60dvh] md:w-auto"
                />
              </div>
              <div className="mt-3 flex items-baseline gap-3 md:mt-4">
                <span className="text-muted-foreground text-sm tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="max-w-[70vw] truncate text-lg font-semibold tracking-tight md:max-w-none md:text-3xl">
                  {p.title}
                </h3>
                <ArrowUpRight className="text-primary size-5 shrink-0 self-center opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </a>
          ))}

          <Link
            href="/work"
            className="group text-foreground hover:bg-primary hover:text-primary-foreground active:bg-primary active:text-primary-foreground mb-10 grid h-[61.5vw] w-[50vw] shrink-0 snap-start place-items-center rounded-lg border transition-colors duration-500 md:mb-0 md:h-[60dvh] md:w-[28vw]"
          >
            <span className="flex items-center gap-2 text-xl font-semibold tracking-tight md:gap-3 md:text-4xl">
              {t("viewAll")}
              <ArrowUpRight className="size-6 transition-transform duration-500 group-hover:rotate-45 md:size-8" />
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
