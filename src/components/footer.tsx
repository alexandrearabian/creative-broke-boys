"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "@/contexts/LanguageContext";
import { EMAIL } from "@/lib/projects";

export function Footer() {
  const t = useTranslations();
  return (
    <footer className="border-border mt-32 border-t">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-8 md:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-sm space-y-4">
            <p className="text-muted-foreground">{t("footer.tagline")}</p>
            <a
              href={`mailto:${EMAIL}`}
              className="link-draw text-xl font-semibold md:text-2xl"
            >
              {EMAIL}
            </a>
          </div>
          <ul className="flex gap-6 text-sm font-medium">
            {(["work", "about", "contact"] as const).map((k) => (
              <li key={k}>
                <Link href={`/${k}`} className="link-draw">
                  {t(`navbar.${k}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p
          aria-hidden
          className="text-foreground/[0.06] mt-16 text-[15.5vw] leading-[0.8] font-bold tracking-tighter whitespace-nowrap select-none md:text-[13.2vw] xl:text-[11.5rem]"
        >
          Broke Boys
        </p>

        <div className="text-muted-foreground mt-8 flex items-center justify-between text-xs">
          <p>
            © {new Date().getFullYear()} Creative Broke Boys.{" "}
            {t("footer.rights")}
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0 })}
            className="hover:text-foreground group flex items-center gap-1.5 transition-colors"
          >
            {t("footer.backToTop")}
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
