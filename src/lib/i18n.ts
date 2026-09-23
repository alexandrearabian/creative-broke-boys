export type Locale = "en" | "es";

export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "es"];

const LOCALE_KEY = "locale";
const listeners = new Set<() => void>();

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "es";
}

export function getBrowserLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("es")) {
    return "es";
  }

  return defaultLocale;
}

export function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(LOCALE_KEY);
  return isLocale(stored) ? stored : null;
}

export function getClientLocale(): Locale {
  return getStoredLocale() ?? getBrowserLocale();
}

export function setStoredLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCALE_KEY, locale);
  listeners.forEach((listener) => listener());
}

export function subscribeLocale(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** @deprecated Prefer getClientLocale on the client */
export function getInitialLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  return getClientLocale();
}
