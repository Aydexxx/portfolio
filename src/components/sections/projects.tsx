"use client";

import { FadeIn, Stagger } from "@/components/motion/primitives";
import { ProjectCard } from "@/components/projects/project-card";
import { useLanguage } from "@/components/providers/language-provider";
import { PROJECTS } from "@/lib/projects";

export function Projects() {
  const { t } = useLanguage();

  return (
    <section
      id="work"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 sm:py-32"
    >
      <Stagger inView>
        <FadeIn>
          <p className="eyebrow">{t("projects.eyebrow")}</p>
        </FadeIn>
        <FadeIn>
          <h2 className="mt-4 max-w-2xl font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
            {t("projects.title")}
          </h2>
        </FadeIn>

        {/* Single column on mobile; two columns on desktop, where the featured
            card spans the full width for extra weight. */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {PROJECTS.map((project) => (
            <FadeIn
              key={project.id}
              className={`h-full ${project.featured ? "lg:col-span-2" : ""}`}
            >
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </Stagger>
    </section>
  );
}
