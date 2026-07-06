"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { CropMarks } from "@/components/projects/crop-marks";
import { useLanguage } from "@/components/providers/language-provider";

const EASE = [0.16, 1, 0.3, 1] as const;

const QUICK_LINKS = ["Fluxion", "TaskFlow", "LaraJob"] as const;

/**
 * Hero — product-led title sequence (no personal bio; the products are the
 * headline). One orchestrated load: a mono "live now" eyebrow, the thesis
 * reveals word by word in the display serif, then the sub + CTA settle in.
 * Gated behind reduced motion, where everything simply appears.
 */
export function Hero() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  // Split on spaces so the thesis ripples in per word (works in both locales).
  const words = t("hero.thesis").split(" ");

  const container: Variants = {
    hidden: {},
    show: {
      transition: reduce ? {} : { staggerChildren: 0.06, delayChildren: 0.12 },
    },
  };

  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: "0.5em" },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.2 : 0.7, ease: EASE },
    },
  };

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] w-full items-center">
      <div className="relative mx-auto w-full max-w-6xl px-6 py-24">
        {/* Section registration marks — the signature device */}
        <CropMarks offset={-2} length={18} />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          {/* Mono eyebrow — the "on air" status, with a live dot */}
          <motion.p
            variants={item}
            className="eyebrow flex items-center gap-2.5 text-cobalt"
          >
            <span className="live-dot" aria-hidden="true" />
            {t("hero.eyebrow")}
          </motion.p>

          {/* The thesis — filmic display serif, revealed word by word */}
          <h1 className="mt-6 font-display text-[clamp(2.75rem,8vw,7rem)] font-normal leading-[1.0] tracking-[-0.01em] text-foreground">
            {words.map((word, i) => (
              <motion.span key={`${word}-${i}`} variants={item} className="inline-block">
                {word}
                {i < words.length - 1 ? " " : ""}
              </motion.span>
            ))}
          </h1>

          {/* One quiet line beneath */}
          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-base leading-7 text-muted sm:text-lg"
          >
            {t("hero.lead")}
          </motion.p>

          {/* CTA + product quick-links */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <a
              href="#work"
              className="group inline-flex h-11 items-center gap-2 rounded-lg bg-accent-solid px-5 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-solid-hover"
            >
              {t("hero.cta")}
              <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>

            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">
              {QUICK_LINKS.map((name) => (
                <li key={name}>
                  <a
                    href="#work"
                    className="transition-colors hover:text-cobalt"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
