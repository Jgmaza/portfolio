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

function categoryShort(project: Project) {
  return categoryLabels[project.category].split(" ")[0].toUpperCase();
}

/** Soft label color used on buildCard for teal accents (LABORAL → #7fd3d6). */
function categoryTint(accent: string) {
  if (accent.toLowerCase() === "#0d7377") return "#7fd3d6";
  return accent;
}

function StatusBadges({
  project,
  dense,
}: {
  project: Project;
  dense?: boolean;
}) {
  const rarity = project.rarity ?? "common";
  const isLive = Boolean(project.demoUrl);
  const color = rarityColor[rarity];

  return (
    <div className={dense ? "dense-card__badges" : "build-card__badges"}>
      <span
        className={`card-badge${dense ? " card-badge--dense" : ""}`}
        style={{
          borderColor: `${color}${dense ? "55" : "66"}`,
          color,
          background: `${color}18`,
        }}
      >
        {rarityLabel[rarity]}
      </span>
      <span
        className={`card-badge${dense ? " card-badge--dense" : ""}`}
        style={
          isLive
            ? {
                borderColor: "#3dff9a55",
                color: "var(--accent)",
                background: "#3dff9a14",
              }
            : {
                borderColor: "#6f819966",
                color: "var(--muted)",
                background: "#6f819918",
              }
        }
      >
        {isLive ? "LIVE" : "LORE"}
      </span>
    </div>
  );
}

export function CartridgePreview({
  project,
  dense = false,
  size = "card",
}: {
  project: Project;
  dense?: boolean;
  size?: "card" | "detail";
}) {
  const isDetail = size === "detail";

  if (isDetail) {
    return (
      <div className="quest-cartridge-preview">
        <div
          aria-hidden
          className="absolute left-[80px] top-[-40px] h-[220px] w-[320px] rounded-full opacity-70"
          style={{
            background: `radial-gradient(circle, ${project.accent}66 0%, transparent 70%)`,
          }}
        />
        <span
          aria-hidden
          className="absolute left-0 top-[calc(50%+8px)] z-10 h-14 w-3 -translate-y-1/2 rounded-r bg-[#0b1220]"
        />
        <span
          aria-hidden
          className="absolute right-0 top-[calc(50%+8px)] z-10 h-14 w-3 -translate-y-1/2 rounded-l bg-[#0b1220]"
        />
        <div className="absolute left-9 right-9 top-12 rounded-md border border-[#5ec8ff22] bg-[#101a2c] p-4">
          <div
            className="mb-2 h-2.5 w-[168px] rounded-sm opacity-85"
            style={{ background: project.accent }}
          />
          <div className="mb-3 h-[7px] w-[260px] max-w-full rounded-sm bg-[var(--hud)]/20" />
          <div className="grid grid-cols-3 gap-3">
            <div className="h-[72px] rounded bg-[var(--hud)]/10" />
            <div className="h-[72px] rounded bg-[var(--accent)]/10" />
            <div className="h-[72px] rounded bg-[var(--legendary)]/10" />
          </div>
        </div>
        <p className="absolute bottom-8 left-9 z-[5] font-display text-sm font-bold tracking-[0.16em] text-[var(--ink)]">
          {project.title.toUpperCase()}
        </p>
        <StatusBadges project={project} />
      </div>
    );
  }

  if (dense) {
    return (
      <div className="dense-card__preview">
        <div
          aria-hidden
          className="dense-card__glow"
          style={{
            background: `radial-gradient(circle, ${project.accent}55 0%, transparent 70%)`,
          }}
        />
        <StatusBadges project={project} dense />
        <p className="dense-card__label">{project.title.toUpperCase()}</p>
      </div>
    );
  }

  return (
    <div className="build-card__preview">
      <div
        aria-hidden
        className="build-card__glow"
        style={{
          background: `radial-gradient(circle, ${project.accent}66 0%, transparent 70%)`,
        }}
      />
      <span aria-hidden className="build-card__notch-l" />
      <span aria-hidden className="build-card__notch-r" />
      <div aria-hidden className="build-card__chrome" />
      <div
        aria-hidden
        className="build-card__fake-1"
        style={{ background: project.accent }}
      />
      <div aria-hidden className="build-card__fake-2" />
      <div aria-hidden className="build-card__fake-row">
        <div
          className="build-card__fake-tile"
          style={{ width: 86, background: "#5ec8ff14" }}
        />
        <div
          className="build-card__fake-tile"
          style={{ width: 86, background: "#3dff9a14" }}
        />
        <div
          className="build-card__fake-tile"
          style={{ width: 104, background: "#ffb02014" }}
        />
      </div>
      <p className="build-card__label">{project.title.toUpperCase()}</p>
      <StatusBadges project={project} />
    </div>
  );
}

export function ProjectCard({
  project,
  index = 0,
  dense = false,
}: {
  project: Project;
  index?: number;
  dense?: boolean;
}) {
  const stackLimit = dense ? 3 : 4;
  const cat = categoryShort(project);
  const tint = categoryTint(project.accent);

  if (dense) {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className="dense-card card-unlock"
        style={{ animationDelay: `${Math.min(index, 8) * 0.06}s` }}
      >
        <span
          aria-hidden
          className="dense-card__accent"
          style={{ background: project.accent }}
        />
        <CartridgePreview project={project} dense />
        <div className="dense-card__body">
          <p className="dense-card__cat" style={{ color: project.accent }}>
            {cat}
          </p>
          <h3 className="dense-card__title">{project.title}</h3>
          <p className="dense-card__tag">{project.tagline}</p>
          <div className="dense-card__chips">
            {project.stack.slice(0, stackLimit).map((tech) => (
              <span key={tech} className="card-chip">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="build-card card-unlock"
      style={{ animationDelay: `${Math.min(index, 8) * 0.06}s` }}
    >
      <span
        aria-hidden
        className="build-card__accent"
        style={{ background: project.accent }}
      />
      <CartridgePreview project={project} />
      <div className="build-card__body">
        <div className="build-card__meta">
          <span
            className="build-card__cat"
            style={{ background: `${project.accent}22`, color: tint }}
          >
            {cat}
          </span>
          <span className="build-card__year">{project.year}</span>
        </div>
        <h3 className="build-card__title">{project.title}</h3>
        <p className="build-card__tag">{project.tagline}</p>
        <div className="build-card__chips">
          {project.stack.slice(0, stackLimit).map((tech) => (
            <span key={tech} className="card-chip">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
