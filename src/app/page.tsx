import Link from "next/link";
import { getFeaturedProjects, projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";

const kit = ["NEXT/REACT", "SUPABASE", "VERCEL", "AGENTS / IA"] as const;

export default function HomePage() {
  const featured = getFeaturedProjects();
  const unlocked = projects.filter((p) => p.demoUrl || p.preview).length;
  const liveDemos = projects.filter((p) => p.demoUrl).length;
  const missions = featured.slice(0, 4);
  const sideQuests = projects.filter((p) => !p.featured).length;

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[rgba(94,200,255,0.12)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-24 h-80 w-80 rounded-full bg-[rgba(61,255,154,0.1)] blur-3xl"
        />

        <div className="container grid min-h-[calc(100vh-4rem)] items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="fade-up hud-label">Player select · José Maza</p>
            <p className="fade-up-delay mt-3 font-[family-name:var(--font-display)] text-sm tracking-[0.14em] text-[var(--ink-soft)]">
              FULLSTACK / PRODUCT ENGINEER
            </p>
            <div className="fade-up-delay mt-4">
              <h1 className="display max-w-xl text-5xl leading-[1.05] sm:text-6xl lg:text-[4.4rem]">
                Build Catalog
              </h1>
              <div className="mt-3 h-1 w-28 rounded-sm bg-[linear-gradient(90deg,var(--accent),var(--hud))]" />
            </div>
            <p className="fade-up-delay-2 mt-5 max-w-lg text-lg leading-relaxed text-[var(--ink-soft)]">
              Inventario de apps desbloqueadas: productos, agentes AI e
              integraciones. Cada card es una build desplegada.
            </p>
            <p className="fade-up-delay-2 mt-3 max-w-lg text-base leading-relaxed text-[var(--muted)]">
              Cierro el ciclo — problema, UI, API, deploy — y dejo demos que se
              puedan tocar en una entrevista.
            </p>

            <div className="fade-up-delay-2 mt-6 flex flex-wrap gap-2">
              {kit.map((item) => (
                <span
                  key={item}
                  className="rounded-sm border border-[var(--line)] bg-[var(--bg-elevated)] px-2.5 py-1 font-[family-name:var(--font-display)] text-[10px] tracking-wider text-[var(--hud)]"
                >
                  {item}
                </span>
              ))}
            </div>

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
                { label: "UNLOCKED", value: String(unlocked).padStart(2, "0") },
                {
                  label: "LIVE DEMOS",
                  value: String(liveDemos).padStart(2, "0"),
                },
                { label: "CLASS", value: "FULLSTACK" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-sm border border-[var(--line)] bg-[var(--bg-elevated)] p-3"
                >
                  <p className="hud-label !text-[0.6rem]">{stat.label}</p>
                  <p
                    className={`display mt-1 text-[var(--accent)] ${
                      stat.label === "CLASS" ? "text-sm" : "text-lg"
                    }`}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden min-h-[420px] lg:block">
            <div className="absolute inset-0 rounded-[1rem] border border-[var(--line)] bg-[var(--panel)] shadow-[var(--shadow)]" />
            <div className="absolute inset-[1px] overflow-hidden rounded-[0.95rem] bg-[radial-gradient(circle_at_70%_20%,rgba(61,255,154,0.12),transparent_45%),linear-gradient(160deg,#101a2c,#0b1220)]">
              <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
                <span className="hud-label">Mission board</span>
                <span className="inline-flex items-center gap-1.5 rounded-sm border border-[var(--accent)]/30 px-2 py-0.5 font-[family-name:var(--font-display)] text-[10px] text-[var(--accent)]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
                  ONLINE
                </span>
              </div>

              <div className="absolute inset-x-6 top-20 space-y-3">
                {missions.map((p, i) => (
                  <Link
                    key={p.slug}
                    href={`/projects/${p.slug}`}
                    className="flex items-center gap-3 rounded-sm border border-[var(--line)] bg-black/25 px-3 py-2.5 transition hover:border-[var(--accent)]/50 hover:bg-black/40"
                    style={{ opacity: 1 - i * 0.06 }}
                  >
                    <span className="font-[family-name:var(--font-display)] text-xs text-[var(--muted)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="h-8 w-1 shrink-0 rounded-sm"
                      style={{ background: p.accent }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-[family-name:var(--font-display)] text-sm">
                        {p.title}
                      </p>
                      <p className="truncate text-xs text-[var(--muted)]">
                        {p.tagline}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-sm border px-2 py-0.5 font-[family-name:var(--font-display)] text-[10px] ${
                        p.demoUrl
                          ? "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]"
                          : "border-[var(--line)] text-[var(--muted)]"
                      }`}
                    >
                      {p.demoUrl ? "LIVE" : "LORE"}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="absolute inset-x-6 bottom-6 flex items-center justify-between">
                <span className="font-[family-name:var(--font-display)] text-[10px] tracking-wider text-[var(--muted)]">
                  {String(missions.length).padStart(2, "0")} /{" "}
                  {String(missions.length).padStart(2, "0")} LIVE QUESTS
                </span>
                <Link
                  href="/projects"
                  className="font-[family-name:var(--font-display)] text-[10px] tracking-wider text-[var(--hud)] hover:text-[var(--accent)]"
                >
                  TOUCH DEMOS →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="hud-label">Featured drops</p>
            <h2 className="display mt-2 text-3xl sm:text-4xl">
              Legendary builds
            </h2>
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
          <Link
            href="/projects"
            className="flex min-h-[280px] flex-col justify-between rounded-[var(--radius)] border border-dashed border-[var(--line)] bg-[var(--bg-elevated)]/50 p-6 transition hover:border-[var(--hud)] hover:bg-[var(--bg-elevated)]"
          >
            <div>
              <p className="hud-label">Side quests</p>
              <h3 className="display mt-3 text-2xl text-[var(--hud)]">
                FULL INVENTORY →
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                Rhythm, MediAgent, Hermes, MIOBOX y más builds rare/common.
              </p>
            </div>
            <p className="font-[family-name:var(--font-display)] text-xs tracking-wider text-[var(--muted)]">
              {String(sideQuests).padStart(2, "0")} LOCKED-IN
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
