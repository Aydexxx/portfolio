import type { DictKey } from "@/components/providers/language-provider";

export type Project = {
  /** Stable id; also used as the i18n key segment under `projects.items.*`. */
  id: string;
  /** Brand name — not translated. */
  name: string;
  /** i18n key for the one-line description. */
  descriptionKey: DictKey;
  /** Each project's own stack, in display order. */
  stack: string[];
  /** Required link. */
  github: string;
  /**
   * Optional live URL. When present, a "Live Demo" button renders; otherwise a
   * subtle "coming soon" state is shown. Add the URL here to flip it on.
   */
  liveUrl?: string;
  /** Public path the screenshot will live at once it exists. */
  image: string;
  /**
   * Flip to `true` once the file at `image` actually exists in `public/`.
   * Stays `false` until then so the card never issues a request for a file
   * that isn't there yet — it just shows the gradient placeholder.
   */
  hasImage?: boolean;
  /** Featured projects get more visual weight (wider, horizontal layout). */
  featured?: boolean;
  /** On-brand placeholder gradient, shown until a real screenshot exists. */
  gradient: string;
};

// Fluxion leads — it's the flagship project, so it's featured first and
// rendered with extra weight in the grid.
export const PROJECTS: Project[] = [
  {
    id: "fluxion",
    name: "Fluxion",
    descriptionKey: "projects.items.fluxion.description",
    stack: [
      "Node.js",
      "TypeScript",
      "React",
      "React Flow",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Socket.IO",
      "Prisma",
      "Docker",
    ],
    github: "https://github.com/Aydexxx/fluxion",
    liveUrl: "https://web-production-2d7a3.up.railway.app",
    image: "/projects/fluxion.png",
    featured: true,
    gradient: "linear-gradient(135deg, #6ee7c8 0%, #2f7fd6 48%, #18244f 100%)",
  },
  {
    id: "taskflow",
    name: "TaskFlow",
    descriptionKey: "projects.items.taskflow.description",
    stack: ["React", "TypeScript", "Node.js", "Express", "Prisma", "Socket.IO"],
    github: "https://github.com/Aydexxx/taskflow",
    image: "/projects/taskflow.png",
    gradient: "linear-gradient(135deg, #8b89ff 0%, #5b59e0 42%, #211f52 100%)",
  },
  {
    id: "larajob",
    name: "LaraJob",
    descriptionKey: "projects.items.larajob.description",
    stack: ["Laravel", "PHP", "MySQL", "Blade", "Prism (AI)"],
    github: "https://github.com/Aydexxx/larajob",
    image: "/projects/larajob.png",
    gradient: "linear-gradient(135deg, #f08aa6 0%, #b1499b 48%, #36214f 100%)",
  },
  {
    id: "ragbot",
    name: "RAGBot",
    descriptionKey: "projects.items.ragbot.description",
    stack: ["Python", "FastAPI", "React", "TypeScript", "ChromaDB"],
    github: "https://github.com/Aydexxx/ragbot",
    image: "/projects/ragbot.png",
    gradient: "linear-gradient(135deg, #46c7c7 0%, #2f7fd6 50%, #182a52 100%)",
  },
];
