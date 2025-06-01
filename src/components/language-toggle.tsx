"use client";

import * as React from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "motion/react";

const languageFlags: Record<string, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
};

const languageNames: Record<string, string> = {
  en: "English",
  es: "Español",
};

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="glass-morphism border-primary/20 hover:border-primary/40 elegant-shadow transition-all duration-300 hover:scale-105"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="flex h-[1.2rem] w-[1.2rem] items-center justify-center"
          >
            <span className="text-base">
              {languageFlags[locale] ?? <Globe className="h-4 w-4" />}
            </span>
          </motion.div>
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="glass-morphism elegant-shadow border-primary/20"
      >
        <DropdownMenuItem
          onClick={() => setLocale("en")}
          className="cursor-pointer"
        >
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ x: 2 }}
          >
            <span>{languageFlags.en}</span>
            <span>{t("language.english")}</span>
          </motion.div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLocale("es")}
          className="cursor-pointer"
        >
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ x: 2 }}
          >
            <span>{languageFlags.es}</span>
            <span>{t("language.spanish")}</span>
          </motion.div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
