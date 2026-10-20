"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef } from "react";
import { useLocale } from "@/components/LocaleProvider";
import type { Locale } from "@/content/player";
import {
  buildSkillExperience,
  formatEstimatedYears,
  type SkillExperience,
} from "@/lib/skillExperience";

type SkillsExpandModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SkillsExpandModal({ open, onClose }: SkillsExpandModalProps) {
  const { locale, t } = useLocale();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const skills = useMemo(() => buildSkillExperience(), []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="skills-modal" role="presentation">
      <button
        type="button"
        className="skills-modal__backdrop"
        aria-label={t.loadoutClose}
        onClick={onClose}
      />
      <div
        className="skills-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className="skills-modal__header">
          <div>
            <p className="skills-modal__eyebrow">{t.loadoutExpandEyebrow}</p>
            <h2 id={titleId} className="skills-modal__title">
              {t.loadoutExpandTitle}
            </h2>
            <p className="skills-modal__intro">{t.loadoutExpandIntro}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="skills-modal__close"
            onClick={onClose}
          >
            {t.loadoutClose}
          </button>
        </header>

        <div className="skills-modal__meta">
          <span>
            {skills.length} {t.loadoutCount}
          </span>
          <span>{t.loadoutEstimateNote}</span>
        </div>

        <ul className="skills-modal__list">
          {skills.map((skill, index) => (
            <SkillRow
              key={skill.label}
              skill={skill}
              index={index}
              locale={locale}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function SkillRow({
  skill,
  index,
  locale,
}: {
  skill: SkillExperience;
  index: number;
  locale: Locale;
}) {
  const { t } = useLocale();
  const delay = Math.min(index * 28, 420);

  return (
    <li className="skills-modal__row" style={{ animationDelay: `${delay}ms` }}>
      <div className="skills-modal__row-top">
        <div className="skills-modal__copy">
          <div className="skills-modal__label-row">
            <span className="skills-modal__label">{skill.label}</span>
            <span className="skills-modal__tier">{skill.tier}</span>
          </div>
          <p className="skills-modal__stats">
            <strong>{formatEstimatedYears(skill.estimatedYears, locale)}</strong>
            <span aria-hidden>·</span>
            <span>
              {skill.projectCount}{" "}
              {skill.projectCount === 1 ? t.loadoutProject : t.loadoutProjects}
            </span>
            {skill.repoCount > 0 ? (
              <>
                <span aria-hidden>·</span>
                <span>
                  {skill.repoCount}{" "}
                  {skill.repoCount === 1 ? t.loadoutRepo : t.loadoutRepos}
                </span>
              </>
            ) : null}
            {skill.yearSpan !== "—" ? (
              <>
                <span aria-hidden>·</span>
                <span>{skill.yearSpan}</span>
              </>
            ) : null}
          </p>
        </div>
        <div className="skills-modal__ticks" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={
                i < skill.ticks
                  ? "skills-modal__tick skills-modal__tick--on"
                  : "skills-modal__tick"
              }
            />
          ))}
        </div>
      </div>

      {skill.projects.length > 0 ? (
        <div className="skills-modal__chips">
          {skill.projects.slice(0, 5).map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="skills-modal__chip"
            >
              {p.title}
            </Link>
          ))}
          {skill.projects.length > 5 ? (
            <span className="skills-modal__chip skills-modal__chip--more">
              +{skill.projects.length - 5}
            </span>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}
