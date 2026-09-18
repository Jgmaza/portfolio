import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Player",
  description:
    "José Maza — fullstack product engineer. Build catalog lore.",
};

export default function AboutPage() {
  return (
    <section className="container py-14">
      <div className="max-w-3xl">
        <p className="hud-label">Player profile</p>
        <h1 className="display mt-3 text-4xl sm:text-5xl">José Maza</h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--ink-soft)]">
          Fullstack / product engineer. Me interesa cerrar el ciclo — problema,
          UI, API, deploy — y dejar demos que se puedan tocar en una entrevista.
          Este sitio es un{" "}
          <strong className="text-[var(--accent)]">build catalog</strong>: cada
          card es una app desbloqueada.
        </p>

        <h2 className="display mt-12 text-2xl">Class kit</h2>
        <ul className="mt-4 space-y-3 text-[var(--ink-soft)]">
          <li>Productos propios con Next/React, Supabase y deploys en Vercel.</li>
          <li>Agentes e IA aplicada (OCR, LLMs, voice) cuando el problema lo pide.</li>
          <li>
            Integraciones backend (Nest, FastAPI, SOAP/ERP) documentadas como
            lore cuando el código es de cliente.
          </li>
        </ul>

        <h2 className="display mt-12 text-2xl">Side quests (laboral)</h2>
        <div className="mt-4 space-y-4 text-[var(--ink-soft)]">
          <p>
            <strong className="text-[var(--ink)]">Sector público / energía</strong>{" "}
            — stakeholders, interoperabilidad. En público solo demos sanitizadas.
          </p>
          <p>
            <strong className="text-[var(--ink)]">Sofinsa / MIOBOX</strong> — puente
            NestJS ERP↔planta. Sin código de cliente.
          </p>
          <p>
            <strong className="text-[var(--ink)]">Guarapo / Cata</strong> — tools
            internas Next + Supabase.
          </p>
          <p>
            <strong className="text-[var(--ink)]">Hermes</strong> — UI operativa
            freelance en Vercel.
          </p>
        </div>

        <h2 className="display mt-12 text-2xl">Contact</h2>
        <p className="mt-4 text-[var(--ink-soft)]">
          <a
            href="https://github.com/Jgmaza"
            className="text-[var(--accent)]"
            target="_blank"
            rel="noreferrer"
          >
            github.com/Jgmaza
          </a>{" "}
          ·{" "}
          <Link href="/projects" className="text-[var(--hud)]">
            open catalog
          </Link>
        </p>
      </div>
    </section>
  );
}
