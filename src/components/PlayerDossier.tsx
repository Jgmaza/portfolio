"use client";

import Link from "next/link";
import { useState } from "react";
import { AvatarPortrait } from "@/components/AvatarPortrait";
import { useLocale } from "@/components/LocaleProvider";
import { playerSkills } from "@/content/player";

type Act = "origin" | "clears" | "trophies";

function shortPlayerName(fullName: string) {
  const parts = fullName.split(" ");
  return `${parts[0]} ${parts[2] ?? parts[1] ?? ""}`.trim().toUpperCase();
}

export function PlayerDossier() {
  const { t } = useLocale();
  const [act, setAct] = useState<Act>("origin");

  return (
    <section className="player-sheet">
      <div className="player-tablet">
        <header className="player-tablet__status">
          <span className="player-tablet__status-left">{t.dossierStatus}</span>
          <div className="player-tablet__identity">
            <span className="player-tablet__id-name">
              {shortPlayerName(t.name)}
            </span>
            <span className="player-tablet__id-sep" aria-hidden>
              ·
            </span>
            <span className="player-tablet__id-lvl">
              {t.avatar.level} · {t.avatar.clearance}
            </span>
            <span className="player-tablet__id-sep" aria-hidden>
              ·
            </span>
            <span className="player-tablet__id-class">{t.classTitle}</span>
            <span className="player-tablet__id-sep" aria-hidden>
              ·
            </span>
            <span className="player-tablet__id-agent">
              ID {t.avatar.agentId}
            </span>
          </div>
          <span className="player-tablet__status-right">{t.dossierOnline}</span>
        </header>

        <div className="player-tablet__screen">
          <aside className="player-sheet__fixed">
            <div className="player-sheet__avatar">
              <AvatarPortrait
                size="dossier"
                showMeta={false}
                spinning
                hideLevel
              />
            </div>

            <div className="player-sheet__skills">
              <p className="player-sheet__skills-title">{t.loadoutTitle}</p>
              {playerSkills.map((skill, i) => (
                <div
                  key={skill.label}
                  className="skill-bar"
                  style={{ ["--skill-i" as string]: i }}
                >
                  <div className="skill-bar__top">
                    <span className="skill-bar__label">{skill.label}</span>
                    <span
                      className={`skill-bar__tier skill-bar__tier--${skill.tier.toLowerCase()}`}
                    >
                      {skill.tier}
                    </span>
                  </div>
                  <div
                    className="skill-bar__track"
                    role="img"
                    aria-label={`${skill.label}: ${skill.ticks} of 5 · ${skill.tier}`}
                  >
                    {Array.from({ length: 5 }, (_, tick) => (
                      <span
                        key={tick}
                        className={
                          tick < skill.ticks
                            ? "skill-bar__tick skill-bar__tick--on"
                            : "skill-bar__tick"
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <nav className="player-sheet__tabs" aria-label="Dossier acts">
            {(["origin", "clears", "trophies"] as const).map((key) => (
              <button
                key={key}
                type="button"
                className={
                  act === key
                    ? "player-sheet__tab player-sheet__tab--on"
                    : "player-sheet__tab"
                }
                onClick={() => setAct(key)}
              >
                {t.acts[key]}
              </button>
            ))}
          </nav>

          <div key={act} className="player-sheet__panel">
            {act === "origin" ? (
              <div className="player-sheet__origin-copy">
                <p className="hud-label m-0">{t.actEyebrows.origin}</p>
                <p className="player-sheet__quote">&ldquo;{t.originQuote}&rdquo;</p>
                <p className="player-sheet__lore">{t.originP1}</p>
                <p className="player-sheet__lore player-sheet__lore--muted">
                  {t.originP2}
                </p>
                <p className="player-sheet__lore player-sheet__lore--muted">
                  {t.originP3}
                </p>

                <div className="player-sheet__meta-block">
                  <p className="hud-label m-0">{t.originInventoryLabel}</p>
                  <ul className="player-sheet__inventory">
                    {t.originInventory.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="player-profile__ctas">
                  <a href={t.ctas.cv.href} download className="btn-start">
                    {t.ctas.cv.label}
                  </a>
                  <a
                    href={t.ctas.github.href}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-source"
                  >
                    {t.ctas.github.label}
                  </a>
                </div>
                <button
                  type="button"
                  className="player-profile__more"
                  onClick={() => setAct("clears")}
                >
                  {t.originNext}
                </button>
              </div>
            ) : null}

            {act === "clears" ? (
              <div className="player-sheet__clears">
                <p className="hud-label m-0">{t.actEyebrows.clears}</p>
                <h2 className="player-sheet__heading">{t.clearsTitle}</h2>
                <p className="player-sheet__sub">{t.clearsIntro}</p>
                <div className="player-sheet__clear-list">
                  {t.clears.map((clear) => (
                    <article key={clear.title} className="clear-row">
                      <div className="clear-row__top">
                        <p
                          className="clear-row__hud"
                          style={{ color: clear.accent }}
                        >
                          {clear.hudLabel}
                        </p>
                        <span className="clear-row__badge">{clear.status}</span>
                      </div>
                      <h3 className="clear-row__quest">{clear.quest}</h3>
                      <p className="clear-row__loadout">
                        LOADOUT · {clear.loadout}
                      </p>
                    </article>
                  ))}
                </div>
                <button
                  type="button"
                  className="player-profile__more"
                  onClick={() => setAct("trophies")}
                >
                  {t.clearsNext}
                </button>
              </div>
            ) : null}

            {act === "trophies" ? (
              <div className="player-sheet__trophies">
                <p className="hud-label m-0">{t.actEyebrows.trophies}</p>
                <h2 className="player-sheet__heading">{t.trophiesTitle}</h2>
                <p className="player-sheet__sub">{t.trophiesIntro}</p>
                <div className="player-sheet__trophy-grid">
                  {t.trophies.map((trophy) => (
                    <article key={trophy.id} className="trophy-row">
                      <div className="trophy-row__mark">{trophy.mark}</div>
                      <div className="trophy-row__body">
                        <p className="trophy-row__cat">
                          {trophy.category} · {trophy.stat}
                        </p>
                        <h3 className="trophy-row__title">{trophy.title}</h3>
                        <p className="trophy-row__detail">{trophy.detail}</p>
                      </div>
                    </article>
                  ))}
                </div>
                <button
                  type="button"
                  className="player-profile__more"
                  onClick={() => setAct("origin")}
                >
                  {t.trophiesBack}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <Link href="/" className="player-sheet__home">
        ← HOME
      </Link>
    </section>
  );
}
