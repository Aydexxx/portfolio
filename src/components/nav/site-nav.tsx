"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage, type DictKey } from "@/components/providers/language-provider";
import { LanguageSwitcher } from "./language-switcher";

const LINKS: { href: string; key: DictKey }[] = [
  { href: "#work", key: "nav.work" },
  { href: "#about", key: "nav.about" },
  { href: "#contact", key: "nav.contact" },
];

export function SiteNav() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Subtle elevation once the page has scrolled past the fold edge.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + close on Escape while the mobile menu is open. Escape
  // also returns focus to the trigger button — otherwise it unmounts with
  // the menu and a keyboard user's focus silently drops to <body>.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Wordmark */}
        <a
          href="#top"
          className="group flex items-center gap-2 font-display text-lg font-semibold tracking-tight"
        >
          <span className="inline-block size-2 rounded-full bg-accent shadow-[0_0_12px_var(--glow)]" />
          <span>
            Bünyamin <span className="text-accent">Aydeniz</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              {t(link.key)}
            </a>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("nav.close") : t("nav.menu")}
            aria-expanded={open}
            className="grid size-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:text-foreground md:hidden"
          >
            <MenuGlyph open={open} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base text-foreground/90 transition-colors hover:bg-surface-2"
                >
                  {t(link.key)}
                </a>
              ))}
              <div className="mt-3 border-t border-border pt-4 sm:hidden">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <motion.line
        x1="3"
        x2="21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        animate={open ? { y1: 12, y2: 12, rotate: 45 } : { y1: 7, y2: 7, rotate: 0 }}
        style={{ originX: "12px", originY: "12px" }}
        transition={{ duration: 0.2 }}
      />
      <motion.line
        x1="3"
        x2="21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        animate={open ? { y1: 12, y2: 12, rotate: -45 } : { y1: 17, y2: 17, rotate: 0 }}
        style={{ originX: "12px", originY: "12px" }}
        transition={{ duration: 0.2 }}
      />
    </svg>
  );
}
