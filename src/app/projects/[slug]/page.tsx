import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProject,
  projects,
  categoryLabels,
} from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

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

  return (
    <article className="container py-14">
      <Link
        href="/projects"
        className="font-[family-name:var(--font-display)] text-xs tracking-wider text-[var(--muted)] hover:text-[var(--accent)]"
      >
        ← BACK TO CATALOG
      </Link>

      <header className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span
              className="rounded-sm px-2 py-0.5 font-[family-name:var(--font-display)] text-[10px] tracking-wider"
              style={{
                background: `${project.accent}22`,
                color: project.accent,
              }}
            >
              {categoryLabels[project.category].toUpperCase()}
            </span>
            <span className="font-[family-name:var(--font-display)] text-[10px] tracking-wider text-[var(--muted)]">
              {project.year} · {project.rarity?.toUpperCase()}
            </span>
          </div>
          <h1 className="display mt-4 text-4xl sm:text-5xl">{project.title}</h1>
          <p className="mt-4 text-xl text-[var(--ink-soft)]">{project.tagline}</p>
          <p className="mt-4 text-[var(--ink-soft)]">{project.summary}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm bg-[var(--accent)] px-5 py-2.5 font-[family-name:var(--font-display)] text-sm tracking-wide text-[#04110a] hover:brightness-110"
              >
                LAUNCH DEMO
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm border border-[var(--line)] bg-[var(--panel)] px-5 py-2.5 font-[family-name:var(--font-display)] text-sm tracking-wide hover:border-[var(--hud)]"
              >
                SOURCE
              </a>
            )}
          </div>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--panel)] shadow-[var(--shadow)]">
          {project.preview ? (
            <Image
              src={project.preview}
              alt={`Preview ${project.title}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs tracking-widest text-[var(--muted)]">
              NO PREVIEW
            </div>
          )}
        </div>
      </header>

      {project.disclaimer && (
        <p className="mt-8 max-w-3xl rounded-sm border border-[var(--line)] bg-[var(--bg-elevated)] p-4 text-sm text-[var(--muted)]">
          {project.disclaimer}
        </p>
      )}

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="display text-2xl">Quest</h2>
            <p className="mt-3 leading-relaxed text-[var(--ink-soft)]">
              {project.problem}
            </p>
          </div>
          <div>
            <h2 className="display text-2xl">Loadout decisions</h2>
            <ul className="mt-3 space-y-2 text-[var(--ink-soft)]">
              {project.decisions.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="display text-2xl">Clear</h2>
            <p className="mt-3 leading-relaxed text-[var(--ink-soft)]">
              {project.outcome}
            </p>
          </div>
        </section>

        <aside className="h-fit rounded-[var(--radius)] border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[var(--shadow)]">
          <h3 className="hud-label">Role</h3>
          <p className="mt-2 text-[var(--ink)]">{project.role}</p>
          <h3 className="hud-label mt-6">Stack</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-sm border border-[var(--line)] px-2 py-0.5 text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </article>
  );
}
