import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { categoryLabels } from "@/content/projects";

const rarityLabel = {
  legendary: "LEGENDARY",
  rare: "RARE",
  common: "COMMON",
} as const;

const rarityColor = {
  legendary: "#ffb020",
  rare: "#5ec8ff",
  common: "#6f8199",
} as const;

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const rarity = project.rarity ?? "common";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card-unlock group block overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--panel)] shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]"
      style={{ animationDelay: `${Math.min(index, 8) * 0.06}s` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--line)] bg-[#070d18]">
        {project.preview ? (
          <Image
            src={project.preview}
            alt={`Preview de ${project.title}`}
            fill
            className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(94,200,255,0.15),transparent_55%)]">
            <span className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] text-[var(--muted)]">
              NO PREVIEW · LORE ONLY
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(7,13,24,0.85)_100%)]" />
        <div className="absolute left-3 top-3 flex gap-2">
          <span
            className="rounded-sm border px-2 py-0.5 font-[family-name:var(--font-display)] text-[10px] tracking-wider"
            style={{
              borderColor: `${rarityColor[rarity]}66`,
              color: rarityColor[rarity],
              background: `${rarityColor[rarity]}18`,
            }}
          >
            {rarityLabel[rarity]}
          </span>
          {project.demoUrl && (
            <span className="rounded-sm border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-2 py-0.5 font-[family-name:var(--font-display)] text-[10px] tracking-wider text-[var(--accent)]">
              LIVE
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span
            className="inline-flex rounded-sm px-2 py-0.5 font-[family-name:var(--font-display)] text-[10px] tracking-wider"
            style={{
              background: `${project.accent}22`,
              color: project.accent,
            }}
          >
            {categoryLabels[project.category].toUpperCase()}
          </span>
          <span className="font-[family-name:var(--font-display)] text-[10px] tracking-wider text-[var(--muted)]">
            {project.year}
          </span>
        </div>
        <h3 className="display text-xl leading-tight transition-colors group-hover:text-[var(--accent)]">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
          {project.tagline}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-sm border border-[var(--line)] px-2 py-0.5 text-[11px] text-[var(--muted)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
