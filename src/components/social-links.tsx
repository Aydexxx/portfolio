"use client";

import { useLanguage, type DictKey } from "@/components/providers/language-provider";

type Social = {
  labelKey: DictKey;
  href: string;
  external: boolean;
  icon: React.FC;
};

const SOCIALS: Social[] = [
  {
    labelKey: "hero.social.github",
    href: "https://github.com/Aydexxx",
    external: true,
    icon: GitHubIcon,
  },
  {
    labelKey: "hero.social.linkedin",
    href: "https://www.linkedin.com/in/bünyamin-aydeniz-0a1182377",
    external: true,
    icon: LinkedInIcon,
  },
  {
    labelKey: "hero.social.email",
    href: "mailto:bunyaminaydeniz0@gmail.com",
    external: false,
    icon: MailIcon,
  },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  const { t } = useLanguage();

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {SOCIALS.map(({ labelKey, href, external, icon: Icon }) => (
        <li key={href}>
          <a
            href={href}
            aria-label={t(labelKey)}
            title={t(labelKey)}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="grid size-10 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-border-strong hover:text-foreground"
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7 0-.7 0-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 5 18.3 5.3 18.3 5.3c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.2.8 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
