import Link from "next/link";
import { getFeaturedProjects, projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";

const kit = ["NEXT/REACT", "SUPABASE", "VERCEL", "AGENTS / IA"] as const;

function CornerBrackets() {
  return (
    <>
      <span className="pointer-events-none absolute left-3 top-3 h-0.5 w-4 bg-[var(--accent)]" />
      <span className="pointer-events-none absolute left-3 top-3 h-4 w-0.5 bg-[var(--accent)]" />
      <span className="pointer-events-none absolute right-3 top-3 h-0.5 w-4 bg-[var(--accent)]" />
      <span className="pointer-events-none absolute right-3 top-3 h-4 w-0.5 bg-[var(--accent)]" />
      <span className="pointer-events-none absolute bottom-3 left-3 h-0.5 w-4 bg-[var(--accent)]" />
      <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-0.5 bg-[var(--accent)]" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-0.5 w-4 bg-[var(--accent)]" />
      <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-0.5 bg-[var(--accent)]" />
    </>
  );
}

export default function HomePage() {
  const featured = getFeaturedProjects();
  const unlocked = projects.filter((p) => p.demoUrl || p.preview).length;
  const liveDemos = projects.filter((p) => p.demoUrl).length;
  const missions = featured.filter((p) => p.demoUrl).slice(0, 4);
  const boardMissions =
    missions.length >= 4
      ? missions
      : [...missions, ...featured.filter((p) => !missions.includes(p))].slice(
          0,
          4,
        );
  const sideQuests = projects.filter((p) => !p.featured).length;

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-0 h-72 w-[42rem] rounded-full bg-[rgba(94,200,255,0.14)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 top-10 h-80 w-80 rounded-full bg-[rgba(61,255,154,0.13)] blur-3xl"
        />

        <div className="container grid items-center gap-14 py-12 lg:min-h-[calc(100vh-4.25rem)] lg:grid-cols-[1.15fr_0.95fr] lg:gap-14 lg:py-14">
          <div className="max-w-[620px]">
            <p className="fade-up hud-label !tracking-[0.22em]">
              Player select · José Maza
            </p>
            <p className="fade-up-delay mt-3 font-[family-name:var(--font-display)] text-xs font-semibold tracking-[0.18em] text-[var(--accent)]">
              FULLSTACK / PRODUCT ENGINEER
            </p>

            <div className="fade-up-delay mt-4 flex items-center gap-2.5">
              <h1 className="display text-5xl leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[4.5rem]">
                Build Catalog
              </h1>
              <span
                aria-hidden
                className="mt-2 hidden h-8 w-1.5 shrink-0 animate-pulse rounded-sm bg-[var(--accent)] sm:block lg:mt-3 lg:h-10"
              />
            </div>

            <p className="fade-up-delay-2 mt-5 max-w-[520px] text-base leading-relaxed text-[var(--ink-soft)] sm:text-lg">
              Inventario de apps desbloqueadas: productos, agentes AI e
              integraciones. Cada card es una build desplegada.
            </p>
            <p className="fade-up-delay-2 mt-3 max-w-[500px] text-sm leading-relaxed text-[var(--muted)]">
              Cierro el ciclo — problema, UI, API, deploy — y dejo demos que se
              puedan tocar en una entrevista.
            </p>

            <div className="fade-up-delay-2 mt-6 flex flex-wrap gap-1.5">
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
                className="rounded-sm bg-[var(--accent)] px-5 py-2.5 font-[family-name:var(--font-display)] text-sm tracking-wide text-[var(--on-accent)] transition hover:brightness-110"
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

            <div className="fade-up-delay-2 mt-8 grid max-w-md grid-cols-3 gap-2.5">
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
                  <p className="hud-label !text-[0.58rem] !tracking-[0.18em]">
                    {stat.label}
                  </p>
                  <p
                    className={`display mt-1.5 text-[var(--accent)] ${
                      stat.label === "CLASS" ? "text-sm" : "text-xl"
                    }`}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[488px] lg:mx-0">
            <div className="relative overflow-hidden rounded-2xl border border-[var(--accent)]/25 bg-[var(--panel)] shadow-[var(--shadow)]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(61,255,154,0.12),transparent_42%),linear-gradient(160deg,#101a2c,#0b1220)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 44px, rgba(255,255,255,0.04) 45px)",
                }}
              />
              <CornerBrackets />

              <div className="relative z-10 flex flex-col gap-3 p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="hud-label">Mission board</span>
                  <span className="inline-flex items-center gap-1.5 rounded-sm border border-[var(--accent)]/35 bg-[var(--accent)]/10 px-2 py-0.5 font-[family-name:var(--font-display)] text-[10px] tracking-wider text-[var(--accent)]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
                    ONLINE
                  </span>
                </div>

                <div className="space-y-2.5">
                  {boardMissions.map((p, i) => (
                    <Link
                      key={p.slug}
                      href={`/projects/${p.slug}`}
                      className="flex items-center gap-3 rounded border border-[var(--line)] bg-[#070d18]/65 px-3 py-2.5 transition hover:border-[var(--accent)]/45 hover:bg-[#070d18]"
                    >
                      <span className="w-7 font-[family-name:var(--font-display)] text-sm font-bold tracking-wide text-[var(--hud)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="h-9 w-[3px] shrink-0 rounded-sm"
                        style={{ background: p.accent }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-[family-name:var(--font-display)] text-sm font-semibold">
                          {p.title}
                        </p>
                        <p className="truncate text-[11px] text-[var(--muted)]">
                          {p.tagline}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-sm border px-2 py-0.5 font-[family-name:var(--font-display)] text-[10px] tracking-wider ${
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

                <div className="mt-1 flex items-center justify-between pt-1">
                  <span className="font-[family-name:var(--font-display)] text-[10px] tracking-wider text-[var(--muted)]">
                    {String(boardMissions.filter((m) => m.demoUrl).length).padStart(2, "0")}{" "}
                    / {String(boardMissions.length).padStart(2, "0")} LIVE QUESTS
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
        </div>
      </section>

      <section className="container pb-20 pt-4">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="hud-label">Featured drops</p>
            <h2 className="display mt-2 text-3xl sm:text-4xl">
              Legendary builds
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden font-[family-name:var(--font-display)] text-sm font-bold tracking-[0.14em] text-[var(--hud)] sm:inline"
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
            className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-xl border border-[var(--hud)]/50 bg-[var(--bg-elevated)]/50 p-6 text-center transition hover:border-[var(--hud)] hover:bg-[var(--bg-elevated)]"
          >
            <p className="hud-label">Side quests</p>
            <h3 className="display text-2xl text-[var(--hud)]">
              FULL INVENTORY →
            </h3>
            <p className="max-w-xs text-sm leading-relaxed text-[var(--ink-soft)]">
              Rhythm, MediAgent, Hermes, MIOBOX y más builds rare/common.
            </p>
            <p className="mt-4 font-[family-name:var(--font-display)] text-xs tracking-wider text-[var(--muted)]">
              {String(sideQuests).padStart(2, "0")} LOCKED-IN
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
