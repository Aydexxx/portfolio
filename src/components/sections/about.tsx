"use client";

import { FadeIn, Stagger } from "@/components/motion/primitives";
import { useLanguage } from "@/components/providers/language-provider";

export function About() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 sm:py-32"
    >
      <Stagger
        inView
        className="grid grid-cols-1 gap-y-8 gap-x-12 md:grid-cols-12"
      >
        {/* Left rail — label + short title */}
        <div className="md:col-span-4">
          <FadeIn>
            <p className="eyebrow">{t("about.eyebrow")}</p>
          </FadeIn>
          <FadeIn>
            <h2 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
              {t("about.title")}
            </h2>
          </FadeIn>
        </div>

        {/* Body */}
        <div className="md:col-span-8 md:pt-1">
          <FadeIn>
            <p className="max-w-2xl text-lg leading-8 text-muted">
              {t("about.body")}
            </p>
          </FadeIn>
        </div>
      </Stagger>
    </section>
  );
}
