"use client";

import { FadeIn, Reveal, Stagger } from "@/components/motion/primitives";
import { CropMarks } from "@/components/projects/crop-marks";
import { ProjectVideo } from "@/components/projects/project-video";
import { useLanguage } from "@/components/providers/language-provider";
import type { Project } from "@/lib/projects";

/**
 * ProjectScene — the "live channel". A full-viewport scene where the project's
 * demo plays framed as a white card on gallery paper, wrapped in cobalt crop
 * marks, with a broadcast HUD (pulsing "● CANLI" + the real domain) and a
 * technical readout (stack lists + plain-language deep dive) that reveals on
 * scroll. `side` alternates the video left/right for rhythm across scenes.
 */
export function ProjectScene({
  project,
  side = "left",
  id,
}: {
  project: Project;
  side?: "left" | "right";
  id?: string;
}) {
  const { t } = useLanguage();
  const host = hostOf(project.liveUrl);
  const videoRight = side === "right";

  return (
    <section
      id={id ?? project.slug}
      className="relative flex min-h-screen scroll-mt-16 items-center py-24 sm:py-28"
    >
      <div className="relative mx-auto w-full max-w-6xl px-6">
        {/* Section registration marks */}
        <CropMarks offset={-2} length={18} />

        {/* ---- Scene title (lower-third) ---- */}
        <Reveal className="mb-10 sm:mb-14">
          <p className="eyebrow flex items-center gap-3">
            <span>
              {t("scene.label")} {project.index}
            </span>
            <span className="h-px w-8 bg-border-strong" aria-hidden="true" />
            <span>{t("scene.liveChannel")}</span>
          </p>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-none tracking-tight text-foreground">
              {project.name}
            </h2>
            <p className="font-display text-lg italic text-muted sm:text-xl">
              {project.tagline}
            </p>
          </div>
        </Reveal>

        {/* ---- Content: monitor + readout ---- */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-14">
          {/* Monitor column */}
          <Reveal
            y={28}
            className={`lg:col-span-7 ${videoRight ? "lg:order-2" : ""}`}
          >
            {/* Top HUD bar */}
            <div className="mb-3 flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              <span>
                {t("scene.channel")} {project.index} / {project.name}
              </span>
              <span className="flex items-center gap-2 text-cobalt">
                <span className="live-dot" aria-hidden="true" />
                {t("scene.live")}
              </span>
            </div>

            <ProjectVideo
              video={project.video}
              poster={project.poster}
              name={project.name}
              playLabel={`${t("scene.play")} · ${project.name}`}
            />

            {/* Bottom HUD bar — the real domain + primary CTA */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.72rem] tracking-[0.08em] text-muted transition-colors hover:text-cobalt"
              >
                {host}
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-10 items-center gap-2 rounded-lg bg-accent-solid px-4 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-solid-hover"
              >
                {t("scene.visitLive")}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </Reveal>

          {/* Readout column */}
          <Stagger
            inView
            className={`lg:col-span-5 ${videoRight ? "lg:order-1" : ""}`}
          >
            <ReadoutRow label="Frontend">
              <ChipList items={project.frontend} />
            </ReadoutRow>

            <ReadoutRow label="Backend">
              <ChipList items={project.backend} />
            </ReadoutRow>

            <FadeIn className="mt-8">
              <p className="eyebrow">{t("scene.whatItDoes")}</p>
              <p className="mt-3 text-sm leading-7 text-foreground/90 sm:text-base sm:leading-7">
                {project.whatItDoes}
              </p>
            </FadeIn>

            <FadeIn className="mt-6">
              <p className="eyebrow">{t("scene.whereItSits")}</p>
              <p className="mt-3 text-sm leading-7 text-muted sm:leading-7">
                {project.whereItSits}
              </p>
            </FadeIn>

            <FadeIn className="mt-7">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-cobalt"
              >
                {t("scene.viewSource")}
                <span aria-hidden="true">↗</span>
              </a>
            </FadeIn>
          </Stagger>
        </div>
      </div>
    </section>
  );
}

function ReadoutRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <FadeIn className="border-t border-border py-5 first:border-t-0 first:pt-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
        <p className="eyebrow shrink-0 sm:w-24 sm:pt-1.5">{label}</p>
        <div className="flex-1">{children}</div>
      </div>
    </FadeIn>
  );
}

function ChipList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="inline-flex items-center rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[0.72rem] text-foreground/80"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Bare hostname for the HUD readout — leans into the genuinely-live domain. */
function hostOf(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}
