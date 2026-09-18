import type { Metadata } from "next";
import { ProjectGrid } from "@/components/ProjectGrid";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "Inventario de builds: productos, agentes AI, laborales sanitizados y hackathones.",
};

export default function ProjectsPage() {
  return (
    <section className="container py-14">
      <div className="mb-10 max-w-2xl">
        <p className="hud-label">World map · Apps</p>
        <h1 className="display mt-3 text-4xl sm:text-5xl">Catalog</h1>
        <p className="mt-4 text-lg text-[var(--ink-soft)]">
          Colección de builds desbloqueadas. Filtra por clase y abre cada card
          para lore, stack y demo.
        </p>
      </div>
      <ProjectGrid />
    </section>
  );
}
