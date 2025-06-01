"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { getInitialLocale, setStoredLocale } from "@/lib/i18n";

// Import translation files
import enMessages from "../../messages/en.json";
import esMessages from "../../messages/es.json";

type Messages = typeof enMessages;

const messages: Record<Locale, Messages> = {
  en: enMessages,
  es: esMessages,
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  messages: Messages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize locale on client side
  useEffect(() => {
    const initialLocale = getInitialLocale();
    setLocaleState(initialLocale);
    setIsInitialized(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setStoredLocale(newLocale);
  };

  // Simple translation function that safely navigates nested objects
  const t = (key: string): string => {
    const getValue = (
      obj: Record<string, unknown>,
      keyPath: string,
    ): string => {
      const keys = keyPath.split(".");
      let current = obj;

      for (const k of keys) {
        if (current && typeof current === "object" && k in current) {
          current = current[k] as Record<string, unknown>;
        } else {
          return keyPath; // Return original key if path not found
        }
      }

      return typeof current === "string" ? current : keyPath;
    };

    // Try current locale first
    const value = getValue(messages[locale] as Record<string, unknown>, key);

    // If not found and we're not already using English, try English fallback
    if (value === key && locale !== "en") {
      return getValue(messages.en as Record<string, unknown>, key);
    }

    return value;
  };

  const value = {
    locale,
    setLocale,
    t,
    messages: messages[locale],
  };

  // Don't render until initialized to prevent hydration issues
  if (!isInitialized) {
    return null;
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Convenience hook for just translations
export function useTranslations(namespace?: string) {
  const { t } = useLanguage();

  if (namespace) {
    return (key: string) => t(`${namespace}.${key}`);
  }

  return t;
}
