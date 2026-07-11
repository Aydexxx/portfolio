"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ProjectVideo } from "@/components/projects/project-video";
import type { Project } from "@/lib/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * ProjectBlock — one "live channel". Compact (py-16 md:py-24), not
 * full-viewport, so the three projects sit close together with tight rhythm.
 *
 * Always visible: a giant ghosted index numeral behind the block, a mono
 * eyebrow (KANAL 0X · CANLI KANAL) with a pulsing ● CANLI dot + the real
 * domain, the project name in Fraunces + tagline, the video card, compact
 * FRONTEND/BACKEND chip rows, and a "Canlıya git →" CTA + "Daha fazlasını gör"
 * toggle. The toggle reveals NE YAPAR / NEREDE DURUYOR + the repo link in an
 * animated-height accordion.
 *
 * `side` alternates the video left/right for rhythm across the three blocks.
 */
export function ProjectBlock({
  project,
  side = "left",
  id,
}: {
  project: Project;
  side?: "left" | "right";
  id?: string;
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const videoRight = side === "right";
  const isLive = Boolean(project.liveUrl);
  const host = hostOf(project.liveUrl);

  return (
    <section
      id={id ?? project.slug}
      className="relative scroll-mt-16 py-16 md:py-24"
    >
      <div className="relative mx-auto w-full max-w-6xl px-6">
        {/* Giant ghosted index numeral — the signature, decorative */}
        <span
          aria-hidden="true"
          className={`ghost-numeral pointer-events-none absolute top-0 select-none ${
            videoRight ? "right-2 md:right-0" : "left-2 md:left-0"
          }`}
        >
          {project.index}
        </span>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: reduce ? 0.2 : 0.7, ease: EASE }}
          className="relative z-10"
        >
          {/* Eyebrow — channel + live + domain (live) or self-hosted (non-live) */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
            {isLive ? (
              <>
                <span>
                  Kanal {project.index} · Canlı Kanal
                </span>
                <span className="flex items-center gap-2 text-accent">
                  <span className="live-dot" aria-hidden="true" />
                  Canlı
                </span>
                <span className="hidden sm:inline text-muted/70">{host}</span>
              </>
            ) : (
              <span>
                Kanal {project.index} · Kendi Sunucusunda
              </span>
            )}
          </div>

          {/* Name + tagline */}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-tight text-foreground">
              {project.name}
            </h2>
            <p className="font-display text-lg italic text-muted sm:text-xl">
              {project.tagline}
            </p>
          </div>

          {/* Content: video + chips/controls */}
          <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Video column */}
            <div className={videoRight ? "lg:order-2 lg:col-span-7" : "lg:col-span-7"}>
              <ProjectVideo src={project.video} poster={project.poster} name={project.name} />
            </div>

            {/* Readout column */}
            <div className={videoRight ? "lg:order-1 lg:col-span-5" : "lg:col-span-5"}>
              <StackRow label="Frontend" items={project.frontend} />
              <StackRow label="Backend" items={project.backend} />

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                {isLive ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-10 items-center gap-2 rounded-lg bg-accent-solid px-4 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-solid-hover"
                  >
                    Canlıya git
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                  </a>
                ) : (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-10 items-center gap-2 rounded-lg bg-accent-solid px-4 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-solid-hover"
                  >
                    GitHub&apos;da incele
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setOpen((o) => !o)}
                  aria-expanded={open}
                  className="group inline-flex h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
                >
                  {open ? "Daha az göster" : "Daha fazlasını gör"}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-y-0.5">
                    {open ? "▴" : "▾"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Accordion — the deep dive */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-12">
                  <div className="md:col-span-6">
                    <p className="eyebrow">Ne yapar</p>
                    <p className="mt-3 text-base leading-7 text-foreground/90">
                      {project.whatItDoes}
                    </p>
                  </div>
                  <div className="md:col-span-6">
                    <p className="eyebrow">Nerede duruyor</p>
                    <p className="mt-3 text-base leading-7 text-muted">
                      {project.whereItSits}
                    </p>
                  </div>
                  <div className="md:col-span-12">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent"
                    >
                      Kaynak
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function StackRow({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="border-t border-border py-4 first:border-t-0 first:pt-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-5">
        <p className="eyebrow shrink-0 sm:w-20 sm:pt-1">{label}</p>
        <ul className="flex flex-wrap gap-2">
          {items.map((item) => (
            <li
              key={item}
              className="inline-flex items-center rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-[0.72rem] text-foreground/80"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Bare hostname for the HUD readout — leans into the genuinely-live domain. */
function hostOf(url: string | undefined): string {
  if (!url) return "";
  try {
    return new URL(url).host;
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}
