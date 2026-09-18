import Link from "next/link";
import { getFeaturedProjects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container grid min-h-[calc(100vh-4rem)] items-center gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="fade-up text-sm font-medium uppercase tracking-[0.22em] text-[var(--accent)]">
              José Maza
            </p>
            <h1 className="display fade-up-delay mt-4 max-w-xl text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
              Fullstack product engineer
            </h1>
            <p className="fade-up-delay-2 mt-6 max-w-lg text-lg leading-relaxed text-[var(--ink-soft)]">
              Diseño y construyo productos end-to-end: UIs claras, APIs sólidas
              y demos que puedes tocar — de agentes AI a integraciones
              operativas.
            </p>
            <div className="fade-up-delay-2 mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-[var(--bg)] transition hover:bg-[var(--accent)]"
              >
                Ver proyectos
              </Link>
              <a
                href="mailto:jgmaza.dev@gmail.com"
                className="rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] px-5 py-2.5 text-sm font-medium transition hover:border-[var(--accent)]"
              >
                Escribirme
              </a>
            </div>
          </div>

          <div className="drift relative hidden min-h-[340px] lg:block">
            <div className="absolute inset-6 rounded-[1.5rem] border border-[var(--line)] bg-[linear-gradient(145deg,#0d7377_0%,#14212b_55%,#e85d04_120%)] opacity-90 shadow-[var(--shadow)]" />
            <div className="absolute bottom-10 left-10 right-10 rounded-2xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-md">
              <p className="display text-2xl">Demos vivas + case studies</p>
              <p className="mt-2 text-sm text-white/80">
                Stakeholder Matrix · Mussistant · Splitia · VerificaCol ·
                BioAlert+
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="display text-3xl sm:text-4xl">Destacados</h2>
            <p className="mt-2 max-w-xl text-[var(--ink-soft)]">
              Piezas que mejor representan cómo trabajo: producto, AI y
              sanitización de trabajo laboral para mostrar en público.
            </p>
          </div>
          <Link
            href="/projects"
            className="hidden text-sm text-[var(--accent)] sm:inline"
          >
            Ver catálogo →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
