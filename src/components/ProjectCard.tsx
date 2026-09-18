import Link from "next/link";
import type { Project } from "@/content/projects";
import { categoryLabels } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-[var(--radius)] border border-[var(--line)] bg-[var(--bg-elevated)] p-6 shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span
          className="inline-flex rounded-full px-2.5 py-1 text-xs font-medium"
          style={{
            background: `${project.accent}22`,
            color: project.accent,
          }}
        >
          {categoryLabels[project.category]}
        </span>
        <span className="text-xs text-[var(--muted)]">{project.year}</span>
      </div>
      <h3 className="display text-2xl leading-tight transition-colors group-hover:text-[var(--accent)]">
        {project.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
        {project.tagline}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-[var(--line)] px-2 py-0.5 text-xs text-[var(--muted)]"
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}
