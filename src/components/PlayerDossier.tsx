"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AvatarPortrait } from "@/components/AvatarPortrait";
import { SkillsExpandModal } from "@/components/SkillsExpandModal";
import { TypewriterLore } from "@/components/TypewriterLore";
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
  const [loreReady, setLoreReady] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const clearListRef = useRef<HTMLDivElement>(null);

  const onLoreDone = useCallback(() => setLoreReady(true), []);

  useEffect(() => {
    if (act === "origin") setLoreReady(false);
  }, [act, t.originP1]);

  useEffect(() => {
    if (act !== "clears") return;

    let cancelled = false;
    let dir = 1;
    let paused = false;
    let intervalId = 0;
    let startId = 0;
    let tries = 0;

    const el = () => clearListRef.current;

    const halt = () => {
      paused = true;
    };

    const step = () => {
      const list = el();
      if (cancelled || paused || !list) return;
      const max = list.scrollHeight - list.clientHeight;
      if (max <= 2) return;
      const next = list.scrollTop + dir * 1.2;
      if (next >= max) {
        list.scrollTop = max;
        dir = -1;
      } else if (next <= 0) {
        list.scrollTop = 0;
        dir = 1;
      } else {
        list.scrollTop = next;
      }
    };

    const bind = (list: HTMLDivElement) => {
      list.scrollTop = 0;
      list.addEventListener("wheel", halt, { passive: true });
      list.addEventListener("touchstart", halt, { passive: true });
    };

    const unbind = (list: HTMLDivElement | null) => {
      if (!list) return;
      list.removeEventListener("wheel", halt);
      list.removeEventListener("touchstart", halt);
    };

    const boot = () => {
      if (cancelled) return;
      const list = el();
      tries += 1;
      if (!list || list.scrollHeight - list.clientHeight <= 2) {
        if (tries < 120) startId = window.setTimeout(boot, 50);
        return;
      }
      bind(list);
      intervalId = window.setInterval(step, 32);
    };

    startId = window.setTimeout(boot, 200);

    return () => {
      cancelled = true;
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
      unbind(el());
    };
  }, [act, t.clears.length]);

  return (
    <section className="player-sheet">
      <div className="player-tablet">
        <header className="player-tablet__status">
          <span className="player-tablet__status-left">{t.dossierStatus}</span>
          <span className="player-tablet__status-right">{t.dossierOnline}</span>
          <div className="player-tablet__identity">
            <span className="player-tablet__id-name">
              {shortPlayerName(t.name)}
            </span>
            <span
              className="player-tablet__id-sep player-tablet__id-sep--name"
              aria-hidden
            >
              ·
            </span>
            <span className="player-tablet__id-lvl">
              {t.avatar.level} · {t.avatar.clearance}
            </span>
            <span
              className="player-tablet__id-sep player-tablet__id-sep--class"
              aria-hidden
            >
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
              <div className="player-sheet__skills-head">
                <p className="player-sheet__skills-title">{t.loadoutTitle}</p>
                <button
                  type="button"
                  className="skills-expand-btn"
                  onClick={() => setSkillsOpen(true)}
                >
                  {t.loadoutExpand}
                  <span aria-hidden>→</span>
                </button>
              </div>
              {playerSkills.slice(0, 4).map((skill, i) => (
                <div
                  key={skill.label}
                  className="skill-bar skill-bar--rail"
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
                <p className="cmd-lore__boot">
                  JM://ORIGINS &gt; boot_story.exe
                </p>
                <TypewriterLore
                  quote={t.originQuote}
                  paragraphs={[t.originP1, t.originP2, t.originP3]}
                  onDone={onLoreDone}
                />

                {loreReady ? (
                  <>
                    <div className="player-sheet__meta-block fade-up">
                      <p className="hud-label m-0">{t.originInventoryLabel}</p>
                      <ul className="player-sheet__inventory">
                        {t.originInventory.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="player-profile__ctas fade-up">
                      <a href={t.ctas.cv.href} download className="btn-start">
                        {t.ctas.cv.label}
                      </a>
                      <a
                        href={t.ctas.pro.href}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-source"
                      >
                        {t.ctas.pro.label}
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
                      className="player-profile__more fade-up"
                      onClick={() => setAct("clears")}
                    >
                      {t.originNext}
                    </button>
                  </>
                ) : null}
              </div>
            ) : null}

            {act === "clears" ? (
              <div className="player-sheet__clears">
                <p className="hud-label m-0">{t.actEyebrows.clears}</p>
                <h2 className="player-sheet__heading">{t.clearsTitle}</h2>
                <p className="player-sheet__sub">{t.clearsIntro}</p>
                <p className="player-sheet__clear-hint">
                  {String(t.clears.length).padStart(2, "0")} LOG ENTRIES · AUTO
                  SCROLL UNTIL INPUT
                </p>
                <div
                  ref={clearListRef}
                  className="player-sheet__clear-list"
                  tabIndex={0}
                  aria-label="Mission clears log"
                >
                  {t.clears.map((clear) => (
                    <article key={clear.title} className="clear-row">
                      <div className="clear-row__top">
                        <p
                          className="clear-row__hud"
                          style={{ color: clear.accent }}
                        >
                          {clear.hudLabel}
                        </p>
                        <span
                          className={
                            clear.status === "ONGOING"
                              ? "clear-row__badge clear-row__badge--ongoing"
                              : "clear-row__badge"
                          }
                        >
                          {clear.status}
                        </span>
                      </div>
                      <h3 className="clear-row__quest">{clear.quest}</h3>
                      <p className="clear-row__title">{clear.title}</p>
                      <p className="clear-row__copy">{clear.copy}</p>
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
                      <div
                        className="trophy-row__mark"
                        aria-label={trophy.mark}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={trophy.icon}
                          alt=""
                          className="trophy-row__icon"
                        />
                      </div>
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

      <SkillsExpandModal
        open={skillsOpen}
        onClose={() => setSkillsOpen(false)}
      />
    </section>
  );
}
