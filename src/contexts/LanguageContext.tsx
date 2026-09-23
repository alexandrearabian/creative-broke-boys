"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Locale } from "@/lib/i18n";
import {
  defaultLocale,
  getClientLocale,
  setStoredLocale,
  subscribeLocale,
} from "@/lib/i18n";

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

function getValue(obj: Record<string, unknown>, keyPath: string): string {
  const keys = keyPath.split(".");
  let current: unknown = obj;

  for (const k of keys) {
    if (current && typeof current === "object" && k in current) {
      current = (current as Record<string, unknown>)[k];
    } else {
      return keyPath;
    }
  }

  return typeof current === "string" ? current : keyPath;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const locale = useSyncExternalStore(
    subscribeLocale,
    getClientLocale,
    () => defaultLocale,
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setStoredLocale(newLocale);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const value = getValue(messages[locale] as Record<string, unknown>, key);

      if (value === key && locale !== "en") {
        return getValue(messages.en as Record<string, unknown>, key);
      }

      return value;
    },
    [locale],
  );

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t,
        messages: messages[locale],
      }}
    >
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

export function useTranslations(namespace?: string) {
  const { t } = useLanguage();

  if (namespace) {
    return (key: string) => t(`${namespace}.${key}`);
  }

  return t;
}
