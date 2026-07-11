import { ProjectBlock } from "@/components/projects/project-block";
import { GitHubCard } from "@/components/projects/github-card";
import { Contact } from "@/components/sections/contact";
import { PROJECTS } from "@/lib/projects";

// Compact, project-first page — no hero, no about. The first thing under the
// header is the slim mono cue, then the three live channels. Video side
// alternates (L/R/L) for visual rhythm. The GitHub "more" card and İletişim
// follow in that order; SiteFooter lives in the root layout.
export default function Home() {
  return (
    <>
      {/* Slim mono line under the header — a cue, not a hero. */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-8 md:pt-10">
        <p className="eyebrow text-muted">Canlı ürünler — üç proje</p>
      </div>

      {/* Three live channels. `id="work"` on the first block so the nav's
          "Projeler" link lands at the start of the project list. */}
      <ProjectBlock project={PROJECTS[0]} side="left" id="work" />
      <ProjectBlock project={PROJECTS[1]} side="right" />
      <ProjectBlock project={PROJECTS[2]} side="left" />
      <ProjectBlock project={PROJECTS[3]} side="right" />

      {/* GitHub "more" card — points to everything else. */}
      <div className="mx-auto w-full max-w-6xl px-6 pb-16 md:pb-24">
        <GitHubCard />
      </div>

      {/* İletişim — minimal, no "Hadi konuşalım". */}
      <Contact />
    </>
  );
}
