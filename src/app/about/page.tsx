import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Player",
  description: "José Maza — fullstack product engineer. Build catalog lore.",
};

const sideQuests = [
  {
    title: "Sector público / energía",
    copy: "Stakeholders e interoperabilidad. En público, solo demos sanitizadas.",
    accent: "#0d7377",
  },
  {
    title: "Sofinsa / MIOBOX",
    copy: "Puente NestJS ERP ↔ planta. Sin código de cliente.",
    accent: "#264653",
  },
  {
    title: "Guarapo / Cata",
    copy: "Tools internas Next + Supabase.",
    accent: "#e85d04",
  },
  {
    title: "Hermes",
    copy: "UI operativa freelance en Vercel.",
    accent: "#457b9d",
  },
] as const;

export default function AboutPage() {
  return (
    <section className="container py-14">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="hud-label">Player profile</p>
          <h1 className="display mt-3 text-4xl sm:text-5xl">José Maza</h1>

          <div className="mt-8 flex gap-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[var(--shadow)]">
            <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-sm border border-[var(--line)] bg-[#070d18]">
              <span className="display text-2xl text-[var(--accent)]">JM</span>
              <span className="mt-1 font-[family-name:var(--font-display)] text-[10px] tracking-wider text-[var(--hud)]">
                LVL 30
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-[family-name:var(--font-display)] text-base tracking-wide">
                Fullstack / Product engineer
              </p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">
                github.com/Jgmaza · ~30 repos públicos
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["UI", "API", "DEPLOY"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-[var(--line)] bg-[var(--bg-elevated)] px-2 py-0.5 font-[family-name:var(--font-display)] text-[10px] tracking-wider text-[var(--hud)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6 text-lg leading-relaxed text-[var(--ink-soft)]">
            Cierro el ciclo — problema, UI, API, deploy — y dejo demos que se
            puedan tocar en una entrevista. Este sitio no es un CV: es un{" "}
            <strong className="text-[var(--accent)]">build catalog</strong>. Cada
            card es una app desbloqueada.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
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
              GITHUB.COM/JGMAZA
            </a>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow)]">
            <h2 className="hud-label">Class kit</h2>
            <ul className="mt-4 space-y-3 text-[var(--ink-soft)]">
              <li>
                Productos propios — Next/React, Supabase, deploys en Vercel.
              </li>
              <li>
                Agentes e IA aplicada — OCR, LLMs, voice cuando el problema lo
                pide.
              </li>
              <li>
                Integraciones backend — Nest, FastAPI, SOAP/ERP. Lore cuando el
                código es de cliente.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="hud-label">Side quests · laboral sanitizado</h2>
            <div className="mt-4 space-y-3">
              {sideQuests.map((quest) => (
                <div
                  key={quest.title}
                  className="flex gap-3 rounded-sm border border-[var(--line)] bg-[#070d18]/40 p-3"
                >
                  <span
                    className="w-1 shrink-0 rounded-sm"
                    style={{ background: quest.accent }}
                  />
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-sm">
                      {quest.title}
                    </p>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">
                      {quest.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
