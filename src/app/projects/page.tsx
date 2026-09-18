import type { Metadata } from "next";
import { ProjectGrid } from "@/components/ProjectGrid";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "Inventario de builds: productos, agentes AI, laborales sanitizados y hackathones.",
};

export default function ProjectsPage() {
  return (
    <section className="mission-board">
      <header className="mission-board__head">
        <p className="hud-label m-0">WORLD MAP · APPS</p>
        <h1 className="mission-board__title">Catalog</h1>
        <p className="mission-board__sub">
          Colección de builds desbloqueadas. Filtra por clase y abre cada card
          para lore, stack y demo.
        </p>
      </header>
      <ProjectGrid />
    </section>
  );
}
