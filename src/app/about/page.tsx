"use client";

import Link from "next/link";
import { useTranslations } from "@/contexts/LanguageContext";
import {
  Eyebrow,
  MaskLine,
  PillArrow,
  Reveal,
  pillClass,
} from "@/components/motion";

// TODO: swap in the real names (and photos, if you want them).
const duo = [
  { name: "Ramiro Daneloglu", initials: "RD", role: "copy" },
  { name: "Toto Conde", initials: "TC", role: "art" },
] as const;

const steps = ["listen", "insight", "make", "launch"] as const;

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="px-5 pt-36 md:px-8 md:pt-48">
      {/* Hero */}
      <header>
        <Reveal>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
        </Reveal>
        <h1 className="display mt-6 text-[clamp(3.5rem,13vw,13rem)] leading-[0.85]">
          <MaskLine delay={0.1}>{t("title")}</MaskLine>
          <MaskLine delay={0.2} className="accent-word text-primary">
            {t("accent")}
          </MaskLine>
        </h1>
        <Reveal delay={0.35} className="mt-12 md:ml-[41.666%]">
          <p className="max-w-xl text-xl leading-relaxed md:text-2xl">
            {t("description")}
          </p>
        </Reveal>
      </header>

      {/* Duo */}
      <section className="mt-32 md:mt-48">
        <h2 className="display mb-12 text-5xl md:text-7xl">
          <MaskLine>{t("duoTitle")}</MaskLine>
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {duo.map((m, i) => (
            <Reveal
              key={m.name}
              delay={i * 0.1}
              className={i ? "md:mt-20" : ""}
            >
              <article className="group bg-card relative overflow-hidden rounded-2xl p-8 md:p-10">
                <div className="bg-foreground text-background group-hover:bg-primary grid size-20 place-items-center rounded-[1.4rem] text-2xl font-bold tracking-tight transition-[background-color,border-radius] duration-500 group-hover:rounded-[2.5rem]">
                  {m.initials}
                </div>
                <h3 className="mt-16 text-3xl font-bold md:text-4xl">
                  {m.name}
                </h3>
                <p className="accent-word text-primary mt-1 text-2xl">
                  {t(`roles.${m.role}`)}
                </p>
                <p className="text-muted-foreground mt-6 max-w-sm leading-relaxed">
                  {t(`roles.${m.role}Bio`)}
                </p>
                <span
                  aria-hidden
                  className="text-foreground/5 absolute -right-4 -bottom-10 text-[10rem] leading-none font-bold tracking-tighter transition-transform duration-700 group-hover:-translate-x-4"
                >
                  {i ? "Art" : "Copy"}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mt-32 md:mt-48">
        <h2 className="display mb-12 text-5xl md:text-7xl">
          <MaskLine>{t("processTitle")}</MaskLine>
        </h2>
        <ol>
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s}
              delay={i * 0.06}
              className="group border-border hover:bg-card grid gap-2 border-t py-8 transition-colors duration-300 md:grid-cols-12 md:items-baseline md:px-4"
            >
              <span className="text-muted-foreground text-sm font-medium tabular-nums md:col-span-1">
                0{i + 1}
              </span>
              <h3 className="text-3xl font-bold transition-transform duration-500 group-hover:translate-x-2 md:col-span-5 md:text-4xl">
                {t(`steps.${s}`)}
              </h3>
              <p className="text-muted-foreground text-lg md:col-span-5 md:col-start-8">
                {t(`steps.${s}Body`)}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="border-border mt-32 border-t pt-24 md:mt-48">
        <h2 className="display text-[clamp(3.5rem,11vw,11rem)] leading-[0.85]">
          <MaskLine>{t("ctaTitle")}</MaskLine>
          <MaskLine delay={0.1} className="accent-word text-primary">
            {t("ctaAccent")}
          </MaskLine>
        </h2>
        <Reveal delay={0.2} className="mt-12">
          <Link href="/contact" className={pillClass}>
            {t("ctaButton")}
            <PillArrow />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
