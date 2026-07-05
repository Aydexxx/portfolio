"use client";

import { SocialLinks } from "@/components/social-links";
import { useLanguage } from "@/components/providers/language-provider";

export function SiteFooter() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
          <p className="font-mono text-xs tracking-wide text-muted">
            © {year} Bünyamin Aydeniz
          </p>
          <p className="text-xs text-muted">{t("footer.stack")}</p>
        </div>
        <SocialLinks />
      </div>
    </footer>
  );
}
