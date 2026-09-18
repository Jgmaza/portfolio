import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "José Maza — fullstack product engineer. Productos, agentes AI e integraciones.",
};

export default function AboutPage() {
  return (
    <section className="container py-16">
      <div className="max-w-3xl">
        <h1 className="display text-4xl sm:text-5xl">About</h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--ink-soft)]">
          Soy <strong className="text-[var(--ink)]">José Maza</strong> (
          <a
            href="https://github.com/Jgmaza"
            className="text-[var(--accent)]"
            target="_blank"
            rel="noreferrer"
          >
            Jgmaza
          </a>
          ): fullstack / product engineer. Me interesa cerrar el ciclo —
          problema, UI, API, deploy — y dejar demos que se puedan tocar en una
          entrevista.
        </p>

        <h2 className="display mt-12 text-2xl">Cómo trabajo</h2>
        <ul className="mt-4 space-y-3 text-[var(--ink-soft)]">
          <li>
            Productos propios con Next/React, Supabase y deploys en Vercel.
          </li>
          <li>
            Agentes e IA aplicada (OCR, LLMs, voice) cuando el problema lo
            pide.
          </li>
          <li>
            Integraciones backend (Nest, FastAPI, SOAP/ERP) documentadas como
            case studies cuando el código es de cliente.
          </li>
        </ul>

        <h2 className="display mt-12 text-2xl">Experiencia laboral (narrativa)</h2>
        <div className="mt-4 space-y-4 text-[var(--ink-soft)]">
          <p>
            <strong className="text-[var(--ink)]">Sector público / energía</strong>{" "}
            — apps de gestión de stakeholders (matriz interés-poder),
            interoperabilidad y sistemas de información. En público solo demos
            sanitizadas o narrativa; nunca datos reales ni repos internos.
          </p>
          <p>
            <strong className="text-[var(--ink)]">Sofinsa / integraciones industriales</strong>{" "}
            — puente NestJS entre ERP y flujos de planta (MIOBOX). Sin código
            de cliente en el portfolio.
          </p>
          <p>
            <strong className="text-[var(--ink)]">Guarapo / Cata Tools</strong>{" "}
            — herramientas internas Next + Supabase. Solo mención de contexto.
          </p>
          <p>
            <strong className="text-[var(--ink)]">Freelance Hermes</strong> — UI
            operativa React desplegada en Vercel; detalles de negocio omitidos.
          </p>
        </div>

        <h2 className="display mt-12 text-2xl">Contacto</h2>
        <p className="mt-4 text-[var(--ink-soft)]">
          Para procesos de selección o feedback:{" "}
          <a
            href="https://github.com/Jgmaza"
            className="text-[var(--accent)]"
            target="_blank"
            rel="noreferrer"
          >
            github.com/Jgmaza
          </a>{" "}
          ·{" "}
          <Link href="/projects" className="text-[var(--accent)]">
            ver proyectos
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
