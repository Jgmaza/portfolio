"use client";

import type { Project } from "@/content/projects";

function demoHost(url?: string) {
  if (!url) return null;
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}

type DemoPreviewProps = {
  project: Project;
};

/** Vercel-style translucent screenshot frame with hover lift. */
export function DemoPreview({ project }: DemoPreviewProps) {
  const host = demoHost(project.demoUrl);
  const href = project.demoUrl ?? project.repoUrl;
  const hasShot = Boolean(project.preview);

  const frame = (
    <div
      className="demo-preview"
      style={
        {
          ["--demo-accent" as string]: project.accent,
        } as React.CSSProperties
      }
    >
      <div className="demo-preview__chrome" aria-hidden>
        <span className="demo-preview__dot demo-preview__dot--r" />
        <span className="demo-preview__dot demo-preview__dot--y" />
        <span className="demo-preview__dot demo-preview__dot--g" />
        <span className="demo-preview__url">
          {host ?? (project.repoUrl ? "github.com" : "lore.build")}
        </span>
      </div>

      <div className="demo-preview__viewport">
        {hasShot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.preview}
            alt=""
            className="demo-preview__shot"
          />
        ) : (
          <div className="demo-preview__fallback">
            <span className="demo-preview__fallback-title">
              {project.title}
            </span>
            <span className="demo-preview__fallback-hint">
              {project.demoUrl ? "LIVE DEMO" : "LORE ONLY"}
            </span>
          </div>
        )}
        <div className="demo-preview__veil" aria-hidden />
      </div>
    </div>
  );

  return (
    <div className="demo-preview-wrap">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="demo-preview-link"
          aria-label={
            project.demoUrl
              ? `Open demo for ${project.title}`
              : `Open source for ${project.title}`
          }
        >
          {frame}
        </a>
      ) : (
        frame
      )}
      <p className="demo-preview__caption">
        {host
          ? `DEMO · ${host}`
          : project.repoUrl
            ? "SOURCE · github"
            : "LORE · no public demo"}
      </p>
    </div>
  );
}
