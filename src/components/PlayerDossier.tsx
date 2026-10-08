"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import { AvatarPortrait } from "@/components/AvatarPortrait";
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
  const clearListRef = useRef<HTMLDivElement>(null);
  const userControlRef = useRef(false);
  const dirRef = useRef(1);

  const onLoreDone = useCallback(() => setLoreReady(true), []);

  const stopAutoScroll = useEffectEvent(() => {
    userControlRef.current = true;
  });

  useEffect(() => {
    if (act === "origin") setLoreReady(false);
  }, [act, t.originP1]);

  useEffect(() => {
    if (act !== "clears") return;

    const el = clearListRef.current;
    if (!el) return;

    userControlRef.current = false;
    dirRef.current = 1;
    el.scrollTop = 0;

    const halt = () => stopAutoScroll();
    el.addEventListener("wheel", halt, { passive: true });
    el.addEventListener("touchstart", halt, { passive: true });
    el.addEventListener("pointerdown", halt);

    let raf = 0;
    let last = performance.now();
    const speed = 22;
    let started = false;

    const tick = (now: number) => {
      if (userControlRef.current) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const max = el.scrollHeight - el.clientHeight;
      if (max > 4) {
        el.scrollTop += dirRef.current * speed * dt;
        if (el.scrollTop >= max - 0.5) dirRef.current = -1;
        if (el.scrollTop <= 0.5) dirRef.current = 1;
      }
      raf = requestAnimationFrame(tick);
    };

    const startId = window.setTimeout(() => {
      started = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }, 900);

    return () => {
      window.clearTimeout(startId);
      if (started) cancelAnimationFrame(raf);
      cancelAnimationFrame(raf);
      el.removeEventListener("wheel", halt);
      el.removeEventListener("touchstart", halt);
      el.removeEventListener("pointerdown", halt);
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
    </section>
  );
}
