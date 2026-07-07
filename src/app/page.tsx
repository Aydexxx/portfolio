import { ProjectBlock } from "@/components/projects/project-block";
import { PROJECTS } from "@/lib/projects";

export default function Home() {
  return (
    <>
      {/* Slim mono line under the header — not a hero, just a cue. */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-8 md:pt-10">
        <p className="eyebrow text-muted">Canlı ürünler — üç proje</p>
      </div>

      {/* Gate point: build Fluxion end-to-end first, verify, then replicate. */}
      <ProjectBlock project={PROJECTS[0]} side="left" id="work" />
    </>
  );
}
