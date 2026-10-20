"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { playerByLocale, type Locale } from "@/content/player";
import { isThemeId, type ThemeId } from "@/lib/themes";

const LOCALE_KEY = "bc-locale";
const THEME_KEY = "bc-theme";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  t: (typeof playerByLocale)["es"];
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function applyTheme(theme: ThemeId) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");
  const [theme, setThemeState] = useState<ThemeId>("arcade");
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    try {
      const storedLocale = window.localStorage.getItem(LOCALE_KEY);
      if (storedLocale === "es" || storedLocale === "en") {
        setLocaleState(storedLocale);
      }
      const storedTheme = window.localStorage.getItem(THEME_KEY);
      if (isThemeId(storedTheme)) {
        setThemeState(storedTheme);
        applyTheme(storedTheme);
      } else {
        applyTheme("arcade");
      }
    } catch {
      applyTheme("arcade");
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const setTheme = useCallback((next: ThemeId) => {
    setThemeState(next);
    applyTheme(next);
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      theme,
      setTheme,
      t: playerByLocale[locale],
      settingsOpen,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
    }),
    [locale, setLocale, theme, setTheme, settingsOpen],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
