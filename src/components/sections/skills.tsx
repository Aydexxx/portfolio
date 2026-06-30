"use client";

import { FadeIn, Stagger } from "@/components/motion/primitives";
import { useLanguage, type DictKey } from "@/components/providers/language-provider";

type SkillGroup = {
  key: DictKey;
  items: string[];
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    key: "skills.categories.languages",
    items: ["TypeScript", "JavaScript", "PHP", "Python"],
  },
  {
    key: "skills.categories.frontend",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    key: "skills.categories.backend",
    items: ["Node.js", "Express", "Laravel", "FastAPI"],
  },
  {
    key: "skills.categories.database",
    items: ["PostgreSQL", "MySQL", "SQLite", "Prisma"],
  },
  {
    key: "skills.categories.realtime",
    items: ["Socket.IO", "RAG", "ChromaDB", "OpenAI", "Ollama"],
  },
  {
    key: "skills.categories.tools",
    items: ["Git", "GitHub", "Vitest", "PHPUnit"],
  },
];

export function Skills() {
  const { t } = useLanguage();

  return (
    <section
      id="skills"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 sm:py-32"
    >
      <Stagger inView>
        <FadeIn>
          <p className="eyebrow">{t("skills.eyebrow")}</p>
        </FadeIn>
        <FadeIn>
          <h2 className="mt-4 max-w-2xl font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
            {t("skills.title")}
          </h2>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group) => (
            <FadeIn key={group.key}>
              <p className="eyebrow">{t(group.key)}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <span className="inline-flex items-center rounded-lg border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </Stagger>
    </section>
  );
}
