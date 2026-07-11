"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * İletişim — minimal section, no "Hadi konuşalım" or any of that. Heading is
 * just "İletişim". One line, then three quiet rows: e-posta, GitHub, LinkedIn.
 *
 * Each row is a real link — mailto:, GitHub, and LinkedIn profile URLs. They
 * render as bordered rows on the elevated surface, not as accent-filled
 * buttons: this section is the close, not a sales pitch.
 */
const LINKS = [
  {
    href: "mailto:bunyaminaydeniz0@gmail.com",
    label: "E-posta",
    value: "bunyaminaydeniz0@gmail.com",
    external: false,
  },
  {
    href: "https://github.com/Aydexxx",
    label: "GitHub",
    value: "github.com/Aydexxx",
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/b%C3%BCnyamin-aydeniz-0a1182377/",
    label: "LinkedIn",
    value: "linkedin.com/in/bünyamin-aydeniz",
    external: true,
  },
] as const;

export function Contact() {
  const reduce = useReducedMotion();
  const EASE = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: reduce ? 0.2 : 0.6, ease: EASE }}
          className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16"
        >
          {/* Heading + one line */}
          <div className="flex flex-col gap-4 md:w-1/2">
            <p className="eyebrow">İletişim</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] tracking-tight text-foreground">
              İletişim
            </h2>
            <p className="max-w-md text-base leading-7 text-muted sm:text-lg">
              Birlikte çalışmak ya da bir soru için bana ulaşın.
            </p>
          </div>

          {/* Three quiet rows */}
          <ul className="flex w-full flex-col md:w-1/2">
            {LINKS.map((link, i) => (
              <li
                key={link.label}
                className={
                  i === 0
                    ? "border-y border-border"
                    : "border-b border-border"
                }
              >
                <ContactRow
                  href={link.href}
                  label={link.label}
                  value={link.value}
                  external={"external" in link ? link.external : false}
                  disabled={"disabled" in link ? Boolean(link.disabled) : false}
                />
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function ContactRow({
  href,
  label,
  value,
  external,
  disabled,
}: {
  href: string;
  label: string;
  value: string;
  external: boolean;
  disabled: boolean;
}) {
  const base =
    "group flex items-center justify-between gap-6 py-5 transition-colors";
  const enabledClasses = "hover:bg-surface-2";
  const disabledClasses = "cursor-not-allowed opacity-60";

  const content = (
    <>
      <span className="flex flex-col gap-1">
        <span className="eyebrow text-muted group-hover:text-accent">
          {label}
        </span>
        <span className="font-display text-lg text-foreground sm:text-xl">
          {value}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-accent"
      >
        {external ? "↗" : "→"}
      </span>
    </>
  );

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={`${base} ${disabledClasses} px-4 sm:px-6`}
      >
        {content}
      </span>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} ${enabledClasses} px-4 sm:px-6`}
    >
      {content}
    </a>
  );
}
