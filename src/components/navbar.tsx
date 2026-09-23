"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useLanguage, useTranslations } from "@/contexts/LanguageContext";
import { ease } from "@/components/motion";
import { cn } from "@/lib/utils";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("navbar");
  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={t("toggleTheme")}
      className="hover:bg-foreground/5 relative grid size-9 place-items-center rounded-full transition-colors"
    >
      <Sun className="size-4 transition-transform duration-500 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-4 scale-0 rotate-90 transition-transform duration-500 dark:scale-100 dark:rotate-0" />
    </button>
  );
}

function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();
  return (
    <button
      onClick={() => setLocale(locale === "en" ? "es" : "en")}
      aria-label={t("navbar.toggleLanguage")}
      className="hover:bg-foreground/5 flex h-9 items-center gap-1 rounded-full px-3 text-xs font-semibold tracking-wider transition-colors"
    >
      {(["en", "es"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-muted-foreground/50">/</span>}
          <span
            className={cn(
              "uppercase transition-colors",
              locale === l ? "text-foreground" : "text-muted-foreground/60",
            )}
          >
            {l}
          </span>
        </span>
      ))}
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const t = useTranslations("navbar");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Hide while scrolling down, reveal on any upward scroll.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 160);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const navItems = [
    { href: "/work", label: t("work") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-100%" : 0 }}
        transition={{ duration: 0.4, ease }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled &&
            !open &&
            "bg-background/75 border-border backdrop-blur-xl backdrop-saturate-150",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group flex items-baseline gap-1.5 text-lg font-bold tracking-tight"
          >
            <span>Creative Broke Boys</span>
            <span className="bg-primary size-2 rounded-full transition-transform duration-300 group-hover:scale-150" />
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            <ul className="mr-4 flex items-center gap-1">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative block px-4 py-2 text-sm font-medium transition-colors",
                        active
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item.label}
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className="bg-primary absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <LanguageToggle />
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="ml-1 h-9 rounded-full px-3 text-sm font-medium"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "menu"}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {open ? t("close") : t("menu")}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="bg-background fixed inset-0 z-40 flex flex-col justify-between px-5 pt-28 pb-10 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
          >
            <ul className="space-y-2">
              {navItems.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.07 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-baseline gap-4 text-6xl font-bold tracking-tighter",
                        pathname === item.href && "text-primary",
                      )}
                    >
                      <span className="text-muted-foreground text-sm font-medium tracking-normal tabular-nums">
                        0{i + 1}
                      </span>
                      {item.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between"
            >
              <p className="text-muted-foreground flex items-center gap-2 text-sm">
                <span className="relative flex size-2">
                  <span className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-60" />
                  <span className="bg-primary relative inline-flex size-2 rounded-full" />
                </span>
                {t("available")}
              </p>
              <LanguageToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
