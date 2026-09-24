"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { useTranslations } from "@/contexts/LanguageContext";
import {
  Eyebrow,
  MaskLine,
  PillArrow,
  Reveal,
  pillClass,
} from "@/components/motion";
import { EMAIL } from "@/lib/projects";

const fieldClass =
  "border-input focus:border-foreground user-invalid:border-destructive placeholder:text-muted-foreground/60 w-full border-b bg-transparent py-3 text-xl transition-colors outline-none md:text-2xl";
const labelClass =
  "text-muted-foreground text-xs font-medium tracking-[0.18em] uppercase";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  // ponytail: no backend yet, so the form hands off to the visitor's mail app. Swap for an API route when there is one.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => (f.get(k) as string | null)?.trim() ?? "";
    const subject = `Project: ${get("name")}${get("company") ? ` (${get("company")})` : ""}`;
    const body = `${get("message")}\n\n${get("name")}\n${get("email")}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="px-5 pt-36 md:px-8 md:pt-48">
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
      </header>

      <div className="mt-20 grid gap-20 md:mt-28 md:grid-cols-12">
        <Reveal delay={0.3} className="md:col-span-7">
          <p className="text-muted-foreground mb-12 max-w-md text-lg leading-relaxed">
            {t("description")}
          </p>
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid gap-10 sm:grid-cols-2">
              <label className="block space-y-1">
                <span className={labelClass}>{t("form.name")}</span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  placeholder={t("form.namePlaceholder")}
                  className={fieldClass}
                />
              </label>
              <label className="block space-y-1">
                <span className={labelClass}>{t("form.email")}</span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={t("form.emailPlaceholder")}
                  className={fieldClass}
                />
              </label>
            </div>
            <label className="block space-y-1">
              <span className={labelClass}>{t("form.company")}</span>
              <input
                name="company"
                autoComplete="organization"
                placeholder={t("form.companyPlaceholder")}
                className={fieldClass}
              />
            </label>
            <label className="block space-y-1">
              <span className={labelClass}>{t("form.message")}</span>
              <textarea
                name="message"
                required
                rows={4}
                placeholder={t("form.messagePlaceholder")}
                className={`${fieldClass} resize-none`}
              />
            </label>
            <button type="submit" className={pillClass}>
              {t("form.send")}
              <PillArrow />
            </button>
            <AnimatePresence>
              {sent && (
                <motion.p
                  role="status"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-muted-foreground max-w-md"
                >
                  {t("form.sent")}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>

        <Reveal delay={0.4} className="space-y-20 md:col-span-4 md:col-start-9">
          <div className="space-y-4">
            <p className={labelClass}>{t("emailLabel")}</p>
            <a
              href={`mailto:${EMAIL}`}
              className="link-draw block text-2xl font-semibold break-all"
            >
              {EMAIL}
            </a>
            <button
              onClick={copyEmail}
              className="border-border hover:border-foreground inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
            >
              {copied ? (
                <Check className="text-primary size-4" />
              ) : (
                <Copy className="size-4" />
              )}
              <span aria-live="polite">{copied ? t("copied") : t("copy")}</span>
            </button>
          </div>

          <div>
            <h2 className="mb-6 text-3xl font-bold">{t("faqTitle")}</h2>
            <dl>
              {([1, 2, 3] as const).map((n) => (
                <div key={n} className="border-border border-t py-5">
                  <dt className="font-semibold">{t(`faq.q${n}`)}</dt>
                  <dd className="text-muted-foreground mt-2 leading-relaxed">
                    {t(`faq.a${n}`)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
