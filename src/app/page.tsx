import Link from "next/link";
import { getFeaturedProjects, projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const unlocked = projects.filter((p) => p.demoUrl || p.preview).length;

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container grid min-h-[calc(100vh-4rem)] items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="fade-up hud-label">Player select · José Maza</p>
            <h1 className="display fade-up-delay mt-4 max-w-xl text-5xl leading-[1.05] sm:text-6xl lg:text-[4.4rem]">
              Build Catalog
            </h1>
            <p className="fade-up-delay-2 mt-5 max-w-lg text-lg leading-relaxed text-[var(--ink-soft)]">
              Inventario de apps desbloqueadas: productos, agentes AI e
              integraciones. Cada card es una build desplegada — el catálogo
              crece con el tiempo.
            </p>
            <div className="fade-up-delay-2 mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="rounded-sm bg-[var(--accent)] px-5 py-2.5 font-[family-name:var(--font-display)] text-sm tracking-wide text-[#04110a] transition hover:brightness-110"
              >
                OPEN CATALOG
              </Link>
              <a
                href="https://github.com/Jgmaza"
                target="_blank"
                rel="noreferrer"
                className="rounded-sm border border-[var(--line)] bg-[var(--panel)] px-5 py-2.5 font-[family-name:var(--font-display)] text-sm tracking-wide transition hover:border-[var(--hud)] hover:text-[var(--hud)]"
              >
                SOURCE
              </a>
            </div>
            <div className="fade-up-delay-2 mt-8 grid max-w-md grid-cols-3 gap-3">
              {[
                { label: "UNLOCKED", value: String(unlocked) },
                { label: "LIVE DEMOS", value: String(projects.filter((p) => p.demoUrl).length) },
                { label: "CLASS", value: "FULLSTACK" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-sm border border-[var(--line)] bg-[var(--bg-elevated)] p-3"
                >
                  <p className="hud-label !text-[0.6rem]">{stat.label}</p>
                  <p className="display mt-1 text-lg text-[var(--accent)]">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden min-h-[380px] lg:block">
            <div className="absolute inset-0 rounded-[1rem] border border-[var(--line)] bg-[var(--panel)] shadow-[var(--shadow)]" />
            <div className="absolute inset-[1px] overflow-hidden rounded-[0.95rem] bg-[radial-gradient(circle_at_70%_20%,rgba(61,255,154,0.12),transparent_45%),linear-gradient(160deg,#101a2c,#0b1220)]">
              <div className="absolute left-6 top-6 right-6 flex items-center justify-between">
                <span className="hud-label">Mission board</span>
                <span className="rounded-sm border border-[var(--accent)]/30 px-2 py-0.5 font-[family-name:var(--font-display)] text-[10px] text-[var(--accent)]">
                  ONLINE
                </span>
              </div>
              <div className="absolute inset-x-6 top-20 space-y-3">
                {featured.slice(0, 4).map((p, i) => (
                  <div
                    key={p.slug}
                    className="flex items-center justify-between rounded-sm border border-[var(--line)] bg-black/25 px-3 py-2"
                    style={{ opacity: 1 - i * 0.08 }}
                  >
                    <div>
                      <p className="font-[family-name:var(--font-display)] text-sm">
                        {p.title}
                      </p>
                      <p className="text-xs text-[var(--muted)]">{p.tagline}</p>
                    </div>
                    <span className="font-[family-name:var(--font-display)] text-[10px] text-[var(--hud)]">
                      {p.demoUrl ? "LIVE" : "LORE"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="hud-label">Featured drops</p>
            <h2 className="display mt-2 text-3xl sm:text-4xl">Legendary builds</h2>
          </div>
          <Link
            href="/projects"
            className="hidden font-[family-name:var(--font-display)] text-sm tracking-wide text-[var(--hud)] sm:inline"
          >
            FULL INVENTORY →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}
