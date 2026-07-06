export type Locale = "tr" | "en";

export const LOCALES = ["tr", "en"] as const satisfies readonly Locale[];

// Turkish-first (Revision 1): the site ships in Turkish by default and the TR
// content is complete. The EN toggle stays available for chrome.
export const DEFAULT_LOCALE: Locale = "tr";

export const LOCALE_COOKIE = "aydexx-locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "tr" || value === "en";
}
