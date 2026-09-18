"use client";

import { useMemo, useState } from "react";
import {
  projects,
  type ProjectCategory,
} from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";

const filters: Array<{ id: "all" | ProjectCategory; label: string }> = [
  { id: "all", label: "ALL" },
  { id: "producto", label: "PRODUCTO" },
  { id: "ai-agents", label: "AI / AGENTS" },
  { id: "laboral", label: "LABORAL" },
  { id: "hackathon", label: "HACKATHON" },
];

export function ProjectGrid() {
  const [active, setActive] = useState<(typeof filters)[number]["id"]>("all");

  const filtered = useMemo(() => {
    if (active === "all") return projects;
    return projects.filter((p) => p.category === active);
  }, [active]);

  return (
    <div className="mission-board__grid-wrap">
      <div className="mission-board__toolbar">
        <div className="mission-board__filters">
          {filters.map((filter) => {
            const isActive = active === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActive(filter.id)}
                className={
                  isActive ? "filter-chip filter-chip--on" : "filter-chip"
                }
              >
                {filter.label}
              </button>
            );
          })}
        </div>
        <p className="mission-board__count">
          INVENTORY / {String(filtered.length).padStart(2, "0")} BUILDS
        </p>
      </div>

      <div className="mission-board__grid">
        {filtered.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            dense
          />
        ))}
        {active === "all" && (
          <div className="empty-slot">
            <p className="empty-slot__eyebrow">EMPTY SLOT</p>
            <h3 className="empty-slot__title">MORE UNLOCKS</h3>
            <p className="empty-slot__copy">
              El catálogo crece con cada deploy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
