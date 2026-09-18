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
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const label =
            filter === "all" ? "Todos" : categoryLabels[filter];
          const isActive = active === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={`rounded-full px-3.5 py-1.5 text-sm transition ${
                isActive
                  ? "bg-[var(--ink)] text-[var(--bg)]"
                  : "border border-[var(--line)] bg-[var(--bg-elevated)] text-[var(--ink-soft)] hover:border-[var(--accent)]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
