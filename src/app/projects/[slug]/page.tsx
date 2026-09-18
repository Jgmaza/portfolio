import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoPreview } from "@/components/DemoPreview";
import {
  getProject,
  projects,
  categoryLabels,
} from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

const rarityLabel = {
  legendary: "LEGENDARY",
  rare: "RARE",
  common: "COMMON",
} as const;

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Build" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const rarity = project.rarity ?? "common";
  const isLive = Boolean(project.demoUrl);
  const categoryShort = categoryLabels[project.category]
    .split(" ")[0]
    .toUpperCase();

  return (
    <article className="quest-detail">
      <section className="quest-detail-hero">
        <div className="quest-detail__lore">
          <div className="quest-meta">
            <span
              className="quest-meta__chip quest-meta__chip--cat"
              style={{
                background: `${project.accent}22`,
                color:
                  project.accent.toLowerCase() === "#0d7377"
                    ? "#7fd3d6"
                    : project.accent,
              }}
            >
              {categoryShort}
            </span>
            <span className="quest-meta__year">{project.year}</span>
            <span
              className={`quest-meta__chip quest-meta__chip--badge quest-meta__chip--${rarity}`}
            >
              {rarityLabel[rarity]}
            </span>
            <span
              className={`quest-meta__chip quest-meta__chip--badge quest-meta__chip--${isLive ? "live" : "lore"}`}
            >
              {isLive ? "LIVE" : "LORE"}
            </span>
          </div>

          <p className="quest-detail__eyebrow">
            QUEST DETAIL · /PROJECTS/{project.slug.toUpperCase()}
          </p>

          <h1 className="quest-detail__title">{project.title}</h1>
          <p className="quest-detail__tagline">{project.tagline}</p>
          <p className="quest-detail__summary">{project.summary}</p>

          <div className="quest-detail__ctas">
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-start"
              >
                START
              </a>
            ) : project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-start"
              >
                SOURCE
              </a>
            ) : null}
            {project.repoUrl && project.demoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-source"
              >
                SOURCE
              </a>
            )}
          </div>

          <Link href="/projects" className="quest-detail__back">
            ← BACK TO CATALOG
          </Link>
        </div>

        <DemoPreview project={project} />
      </section>

      <section className="quest-detail-sheets">
        <div className="quest-detail__col">
          <div className="quest-panel">
            <h2 className="hud-label m-0">Quest</h2>
            <p className="quest-panel__body">{project.problem}</p>
          </div>

          <div className="quest-panel">
            <h2 className="hud-label m-0">Loadout decisions</h2>
            <ul className="quest-panel__list">
              {project.decisions.map((d) => (
                <li key={d}>• {d}</li>
              ))}
            </ul>
          </div>

          <div className="quest-panel">
            <h2 className="hud-label m-0">Clear</h2>
            <p className="quest-panel__body">{project.outcome}</p>
          </div>
        </div>

        <aside className="quest-detail__col">
          <div className="quest-panel">
            <h3 className="hud-label m-0">Role</h3>
            <p className="quest-panel__body">{project.role}</p>
          </div>

          <div className="quest-panel">
            <h3 className="hud-label m-0">Stack</h3>
            <div className="quest-panel__stack">
              {project.stack.map((tech) => (
                <span key={tech} className="card-chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.disclaimer && (
            <div
              className="quest-panel quest-panel--note"
              style={{
                background: `${project.accent}14`,
                borderColor: `${project.accent}55`,
              }}
            >
              <p
                className="quest-panel__note-label"
                style={{
                  color:
                    project.accent.toLowerCase() === "#0d7377"
                      ? "#7fd3d6"
                      : project.accent,
                }}
              >
                LORE NOTE
              </p>
              <p className="quest-panel__body">{project.disclaimer}</p>
            </div>
          )}
        </aside>
      </section>
    </article>
  );
}
