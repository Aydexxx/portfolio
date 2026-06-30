"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import en from "@/messages/en.json";
import tr from "@/messages/tr.json";
import { LOCALE_COOKIE, type Locale } from "@/lib/locale";

type Messages = typeof en;

/** Union of every dot-path leaf key in the messages tree, e.g. "nav.work". */
type DotPath<T, Prefix extends string = ""> = T extends string
  ? Prefix
  : {
      [K in keyof T & string]: DotPath<
        T[K],
        Prefix extends "" ? K : `${Prefix}.${K}`
      >;
    }[keyof T & string];

export type DictKey = DotPath<Messages>;

const MESSAGES: Record<Locale, Messages> = { en, tr };

function resolve(messages: Messages, key: DictKey): string {
  return key
    .split(".")
    .reduce<unknown>(
      (node, part) => (node as Record<string, unknown>)[part],
      messages,
    ) as string;
}

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: DictKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  // Seeded from the cookie read on the server (see layout.tsx), so the first
  // client render always matches the server-rendered markup — no hydration
  // mismatch, no flash.
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    document.documentElement.lang = next;
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
  }, []);

  const t = useCallback(
    (key: DictKey) => resolve(MESSAGES[locale], key),
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
