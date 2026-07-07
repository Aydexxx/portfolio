/**
 * SiteFooter — the only place the person's name appears (attribution).
 * Left: `gitsite`. Right/under: © 2026 Bünyamin Aydeniz · built with… Minimal.
 */
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 sm:flex-row">
        <a
          href="#top"
          className="font-mono text-sm tracking-tight lowercase text-foreground"
        >
          git<span className="text-accent">site</span>
        </a>
        <p className="text-center font-mono text-xs text-muted sm:text-right">
          © 2026 Bünyamin Aydeniz · Next.js & Tailwind CSS ile geliştirildi.
        </p>
      </div>
    </footer>
  );
}
