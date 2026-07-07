"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * GitHubCard — the "saha dışı" card. Sits after the three project blocks and
 * points to everything else on GitHub (RAGBot, TalentBridge, …).
 *
 * Visual recipe:
 *   · --bg-2 elevated panel, --line border, soft shadow, generous padding
 *   · Inline octocat SVG in currentColor (~28px), placed beside the eyebrow
 *   · Mono eyebrow "SAHA DIŞI" · Fraunces heading · one descriptive line
 *   · Accent CTA → "GitHub'da daha fazlası" linking the profile
 *   · Gentle lift on hover; respects prefers-reduced-motion
 */
export function GitHubCard() {
  const reduce = useReducedMotion();
  const EASE = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.a
      href="https://github.com/Aydexxx"
      target="_blank"
      rel="noopener noreferrer"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: reduce ? 0.2 : 0.6, ease: EASE }}
      className="group relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-border bg-surface p-8 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[0_32px_80px_-32px_rgba(0,0,0,0.7)] sm:p-10 md:flex-row md:items-center md:justify-between md:gap-10"
    >
      {/* Left: octocat + content */}
      <div className="flex flex-1 items-start gap-5">
        <span
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-xl border border-border bg-bg text-foreground/90 transition-colors group-hover:text-accent"
        >
          <Octocat />
        </span>
        <div className="flex flex-col gap-2">
          <p className="eyebrow">Saha dışı</p>
          <h3 className="font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
            Diğer çalışmalar
          </h3>
          <p className="max-w-xl text-sm leading-6 text-muted sm:text-base">
            RAGBot (RAG belge soru-cevap), TalentBridge ve daha fazlası.
          </p>
        </div>
      </div>

      {/* Right: CTA */}
      <span className="inline-flex h-11 items-center gap-2 self-start rounded-lg bg-accent-solid px-5 text-sm font-medium text-accent-contrast transition-colors group-hover:bg-accent-solid-hover md:self-center">
        GitHub’da daha fazlası
        <span
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </span>
    </motion.a>
  );
}

/**
 * GitHub octocat (the "mark" silhouette) — inline SVG, currentColor so the
 * brand color follows the surrounding text. ~24px viewBox, rendered at 28px.
 */
function Octocat() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.63-2.8 5.65-5.48 5.95.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.3 0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}
