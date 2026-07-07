"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * SiteNav — sticky, thin, dark. Brand wordmark `gitsite` (lowercase, with an
 * apricot dot mark), links `Projeler` (#work) and `İletişim` (#contact).
 * Turkish-only, no theme toggle, no language switch, no "Hakkımda".
 */
const LINKS = [
  { href: "#work", label: "Projeler" },
  { href: "#contact", label: "İletişim" },
];

export function SiteNav() {
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
        {/* Wordmark — gitsite */}
        <a
          href="#top"
          className="group flex items-center gap-2 font-mono text-base tracking-tight lowercase"
        >
          <span
            aria-hidden="true"
            className="inline-block size-2 rounded-full bg-accent shadow-[0_0_12px_var(--glow)]"
          />
          <span className="text-foreground">
            git<span className="text-accent">site</span>
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
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile trigger */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Kapat" : "Menü"}
          aria-expanded={open}
          className="grid size-9 place-items-center rounded-lg border border-border text-muted transition-colors hover:text-foreground md:hidden"
        >
          <MenuGlyph open={open} />
        </button>
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
                  {link.label}
                </a>
              ))}
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
