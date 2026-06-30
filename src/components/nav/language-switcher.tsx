"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { LOCALES } from "@/lib/locale";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t("lang.toggle")}
      className="flex items-center rounded-lg border border-border p-0.5 text-xs font-medium"
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={`rounded-md px-2 py-1 uppercase tracking-wide transition-colors ${
              active
                ? "bg-surface-2 text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
