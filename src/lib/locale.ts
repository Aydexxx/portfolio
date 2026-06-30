export type Locale = "tr" | "en";

export const LOCALES = ["tr", "en"] as const satisfies readonly Locale[];

export const DEFAULT_LOCALE: Locale = "tr";

export const LOCALE_COOKIE = "aydexx-locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "tr" || value === "en";
}
