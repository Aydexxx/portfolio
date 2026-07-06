import { Hero } from "@/components/sections/hero";
import { ProjectScene } from "@/components/projects/project-scene";
import { PROJECTS_BY_SLUG } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Scene 01 — the signature "live channel". The remaining two scenes and
          the "more work" strip follow once this pattern is approved. */}
      <ProjectScene project={PROJECTS_BY_SLUG.fluxion} side="left" id="work" />
    </>
  );
}
