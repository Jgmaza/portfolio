import type { Metadata } from "next";
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
  if (!project) return { title: "Proyecto" };
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
    <article className="container py-16">
      <Link
        href="/projects"
        className="text-sm text-[var(--muted)] hover:text-[var(--accent)]"
      >
        ← Proyectos
      </Link>

      <header className="mt-6 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span
            className="rounded-full px-2.5 py-1 font-medium"
            style={{
              background: `${project.accent}22`,
              color: project.accent,
            }}
          >
            {categoryLabels[project.category]}
          </span>
          <span className="text-[var(--muted)]">{project.year}</span>
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
              className="rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-[var(--bg)] hover:bg-[var(--accent)]"
            >
              Ver demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] px-5 py-2.5 text-sm font-medium hover:border-[var(--accent)]"
            >
              Repositorio
            </a>
          )}
        </div>
      </header>

      {project.disclaimer && (
        <p className="mt-8 max-w-3xl rounded-xl border border-[var(--line)] bg-[var(--bg-elevated)] p-4 text-sm text-[var(--muted)]">
          {project.disclaimer}
        </p>
      )}

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="display text-2xl">Problema</h2>
            <p className="mt-3 leading-relaxed text-[var(--ink-soft)]">
              {project.problem}
            </p>
          </div>
          <div>
            <h2 className="display text-2xl">Decisiones</h2>
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
            <h2 className="display text-2xl">Resultado</h2>
            <p className="mt-3 leading-relaxed text-[var(--ink-soft)]">
              {project.outcome}
            </p>
          </div>
        </section>

        <aside className="h-fit rounded-[var(--radius)] border border-[var(--line)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow)]">
          <h3 className="text-sm font-medium uppercase tracking-wider text-[var(--muted)]">
            Rol
          </h3>
          <p className="mt-2 text-[var(--ink)]">{project.role}</p>
          <h3 className="mt-6 text-sm font-medium uppercase tracking-wider text-[var(--muted)]">
            Stack
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-[var(--line)] px-2 py-0.5 text-xs"
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
