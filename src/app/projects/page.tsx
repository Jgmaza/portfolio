import type { Metadata } from "next";
import { ProjectGrid } from "@/components/ProjectGrid";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Catálogo de productos, agentes AI, demos laborales sanitizadas y hackathones.",
};

export default function ProjectsPage() {
  return (
    <section className="container py-16">
      <div className="mb-10 max-w-2xl">
        <h1 className="display text-4xl sm:text-5xl">Proyectos</h1>
        <p className="mt-4 text-lg text-[var(--ink-soft)]">
          Catálogo curado. Los laborales se muestran como demos sanitizadas o
          narrativas sin código de cliente.
        </p>
      </div>
      <ProjectGrid />
    </section>
  );
}
