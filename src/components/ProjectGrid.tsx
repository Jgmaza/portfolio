"use client";

import { useMemo, useState } from "react";
import {
  projects,
  categoryLabels,
  type ProjectCategory,
} from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";

const filters: Array<"all" | ProjectCategory> = [
  "all",
  "producto",
  "ai-agents",
  "laboral",
  "hackathon",
];

export function ProjectGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>("all");

  const filtered = useMemo(() => {
    if (active === "all") return projects;
    return projects.filter((p) => p.category === active);
  }, [active]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <p className="hud-label">
          Inventory / {String(filtered.length).padStart(2, "0")} builds
        </p>
        <p className="max-w-md text-right text-xs text-[var(--muted)]">
          El catálogo crece con cada deploy. Las cards LIVE tienen preview real
          de la demo.
        </p>
      </div>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const label =
            filter === "all" ? "ALL" : categoryLabels[filter].toUpperCase();
          const isActive = active === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={`rounded-sm px-3 py-1.5 font-[family-name:var(--font-display)] text-xs tracking-wider transition ${
                isActive
                  ? "bg-[var(--accent)] text-[#04110a]"
                  : "border border-[var(--line)] bg-[var(--bg-elevated)] text-[var(--ink-soft)] hover:border-[var(--hud)] hover:text-[var(--hud)]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {filtered.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            dense
          />
        ))}
        {active === "all" && (
          <div className="flex min-h-[240px] flex-col items-start justify-between rounded-[var(--radius)] border border-dashed border-[var(--line)] bg-[var(--bg-elevated)]/40 p-5">
            <div>
              <p className="hud-label">Empty slot</p>
              <h3 className="display mt-3 text-xl text-[var(--hud)]">
                MORE UNLOCKS
              </h3>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">
                El catálogo crece con cada deploy.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
