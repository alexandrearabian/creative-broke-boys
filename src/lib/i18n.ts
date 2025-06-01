// Simple internationalization system
export type Locale = "en" | "es";

export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "es"];

// Get browser language preference
export function getBrowserLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;

  const browserLang = navigator.language.toLowerCase();

  // Check if browser language starts with 'es' (for es, es-ES, es-MX, etc.)
  if (browserLang.startsWith("es")) {
    return "es";
  }

  return defaultLocale;
}

// Get stored locale from localStorage
export function getStoredLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;

  const stored = localStorage.getItem("locale") as Locale;
  return locales.includes(stored) ? stored : defaultLocale;
}

// Store locale in localStorage
export function setStoredLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("locale", locale);
}

// Get initial locale (stored > browser > default)
export function getInitialLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;

  const stored = getStoredLocale();
  if (stored !== defaultLocale) {
    return stored;
  }

  return getBrowserLocale();
}
