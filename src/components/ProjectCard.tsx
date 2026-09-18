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
  dense = false,
}: {
  project: Project;
  index?: number;
  dense?: boolean;
}) {
  const rarity = project.rarity ?? "common";
  const stackLimit = dense ? 3 : 4;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card-unlock group relative flex flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--panel)] shadow-[var(--shadow)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]"
      style={{ animationDelay: `${Math.min(index, 8) * 0.06}s` }}
    >
      <span
        aria-hidden
        className="block h-[3px] w-full"
        style={{ background: project.accent }}
      />

      <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--line)] bg-[#070d18]">
        {project.preview ? (
          <Image
            src={project.preview}
            alt={`Preview de ${project.title}`}
            fill
            className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(94,200,255,0.14),transparent_55%)]">
            <div className="mx-6 w-full max-w-[85%] rounded-md border border-[var(--line)] bg-[#101a2c] p-3 shadow-inner">
              <div
                className="mb-2 h-2 w-1/3 rounded-sm"
                style={{ background: project.accent }}
              />
              <div className="mb-3 h-1.5 w-2/3 rounded-sm bg-[var(--hud)]/20" />
              <div className="grid grid-cols-3 gap-2">
                <div className="h-10 rounded bg-[var(--hud)]/10" />
                <div className="h-10 rounded bg-[var(--accent)]/10" />
                <div className="h-10 rounded bg-[var(--legendary)]/10" />
              </div>
              <p className="mt-3 text-center font-[family-name:var(--font-display)] text-[10px] tracking-[0.16em] text-[var(--ink)]">
                {project.title.toUpperCase()}
              </p>
            </div>
          </div>
        )}

        {/* cartridge notches */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-1/2 z-10 h-12 w-2.5 -translate-y-1/2 rounded-r bg-[#0b1220]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 z-10 h-12 w-2.5 -translate-y-1/2 rounded-l bg-[#0b1220]"
        />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(7,13,24,0.88)_100%)]" />

        <div className="absolute left-3 top-3 z-10 flex gap-1.5">
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
          {project.demoUrl ? (
            <span className="rounded-sm border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-2 py-0.5 font-[family-name:var(--font-display)] text-[10px] tracking-wider text-[var(--accent)]">
              LIVE
            </span>
          ) : (
            <span className="rounded-sm border border-[var(--line)] bg-black/35 px-2 py-0.5 font-[family-name:var(--font-display)] text-[10px] tracking-wider text-[var(--muted)]">
              LORE
            </span>
          )}
        </div>
      </div>

      <div className={`flex flex-1 flex-col ${dense ? "gap-2 p-4" : "gap-2 p-[18px]"}`}>
        <div className="flex items-center justify-between gap-3">
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
        <h3
          className={`display leading-tight transition-colors group-hover:text-[var(--accent)] ${
            dense ? "text-lg" : "text-xl"
          }`}
        >
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
          {project.tagline}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.stack.slice(0, stackLimit).map((tech) => (
            <span
              key={tech}
              className="rounded-sm border border-[var(--line)] bg-[var(--bg-elevated)] px-2 py-0.5 text-[11px] text-[var(--muted)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
