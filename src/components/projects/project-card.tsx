"use client";

import Image from "next/image";
import { useState } from "react";

import { useLanguage } from "@/components/providers/language-provider";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  // Until a real screenshot loads, we keep the gradient placeholder + name
  // overlay. If the file is missing the image simply errors and we stay on the
  // placeholder — nothing to clean up when swapping a real image in later.
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const featured = project.featured ?? false;
  const showImage = Boolean(project.hasImage) && !errored;

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition duration-300 hover:-translate-y-1.5 hover:border-border-strong hover:shadow-[0_18px_50px_-18px_var(--glow)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      {/* ---- Visual: real screenshot when present, gradient placeholder until then ---- */}
      <div
        className={`relative overflow-hidden ${
          featured
            ? "aspect-[16/10] lg:aspect-auto lg:min-h-[360px] lg:w-[56%]"
            : "aspect-[16/10]"
        }`}
      >
        {/* Gradient placeholder — always rendered, sits behind the screenshot. */}
        <div
          className="absolute inset-0 transition-transform duration-[600ms] ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          style={{ backgroundImage: project.gradient }}
          aria-hidden="true"
        />
        {/* Soft top-left light for depth on the placeholder. */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.22),transparent_58%)]"
          aria-hidden="true"
        />

        {showImage && (
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            fill
            sizes={
              featured
                ? "(max-width: 1024px) 100vw, 56vw"
                : "(max-width: 1024px) 100vw, 50vw"
            }
            className={`object-cover object-top transition-[opacity,transform] duration-[600ms] ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
          />
        )}

        {/* Project name overlay — shown over the placeholder while no real image. */}
        {!loaded && (
          <div className="absolute inset-0 flex items-end p-5 sm:p-6">
            <span className="font-display text-2xl font-semibold tracking-tight text-white [text-shadow:0_1px_18px_rgba(0,0,0,0.28)] sm:text-3xl">
              {project.name}
            </span>
          </div>
        )}

        {featured && (
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-black/35 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white backdrop-blur-sm">
            {t("projects.featured")}
          </span>
        )}
      </div>

      {/* ---- Content ---- */}
      <div className={`flex flex-1 flex-col p-6 ${featured ? "lg:p-8" : ""}`}>
        <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
          {project.name}
        </h3>
        <p className="mt-2.5 max-w-prose text-sm leading-6 text-muted sm:text-base sm:leading-7">
          {t(project.descriptionKey)}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech}>
              <span className="inline-flex items-center rounded-lg border border-border px-2.5 py-1 text-xs text-muted transition-colors group-hover:border-border-strong">
                {tech}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-accent-solid px-4 text-sm font-medium text-accent-contrast shadow-[0_0_24px_-8px_var(--glow)] transition-colors hover:bg-accent-solid-hover"
          >
            <GitHubGlyph />
            {t("projects.github")}
          </a>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
            >
              <ExternalGlyph />
              {t("projects.liveDemo")}
            </a>
          ) : (
            <span className="inline-flex h-10 items-center gap-2 rounded-lg border border-dashed border-border px-4 text-sm text-muted">
              <ClockGlyph />
              {t("projects.comingSoon")}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function GitHubGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7 0-.7 0-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 5 18.3 5.3 18.3 5.3c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function ExternalGlyph() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </svg>
  );
}

function ClockGlyph() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
