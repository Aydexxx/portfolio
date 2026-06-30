"use client";

import { FadeIn, Stagger } from "@/components/motion/primitives";
import { SocialLinks } from "@/components/social-links";
import { useLanguage } from "@/components/providers/language-provider";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-6xl flex-col justify-center px-6 py-24">
      <Stagger className="max-w-4xl" delay={0.05} stagger={0.06}>
        {/* Headline — the thesis. Name carries the one accent moment. */}
        <FadeIn>
          <h1 className="font-display text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[1.02] tracking-tight text-foreground">
            {t("hero.greeting")}{" "}
            <span className="text-accent">Aydexx</span>
          </h1>
        </FadeIn>

        {/* Role, directly beneath the headline */}
        <FadeIn>
          <p className="mt-5 font-display text-xl font-medium text-muted sm:text-2xl">
            {t("hero.role")}
          </p>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn>
          <p className="mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            {t("hero.subtitle")}
          </p>
        </FadeIn>

        {/* CTAs */}
        <FadeIn>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="inline-flex h-11 items-center rounded-lg bg-accent-solid px-5 text-sm font-medium text-accent-contrast shadow-[0_0_30px_-6px_var(--glow)] transition-colors hover:bg-accent-solid-hover"
            >
              {t("hero.cta.projects")}
            </a>
            <a
              href="#contact"
              className="inline-flex h-11 items-center rounded-lg border border-border px-5 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
            >
              {t("hero.cta.contact")}
            </a>
          </div>
        </FadeIn>

        {/* Social links */}
        <FadeIn>
          <SocialLinks className="mt-10" />
        </FadeIn>
      </Stagger>
    </section>
  );
}
