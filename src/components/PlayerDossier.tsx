"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

type Act = "origin" | "clears" | "trophies";

export function PlayerDossier() {
  const { t } = useLocale();
  const [act, setAct] = useState<Act>("origin");
  const photo = t.avatar.photo;

  return (
    <section className="player-sheet">
      <nav className="player-sheet__pager" aria-label="Dossier acts">
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

      {act === "origin" ? (
        <div className="player-sheet__origin">
          <div className="player-sheet__portrait-col">
            <div className="player-sheet__portrait">
              {photo ? (
                <img src={photo} alt={t.name} className="player-sheet__photo" />
              ) : (
                <>
                  <span className="player-sheet__jm">{t.avatar.initials}</span>
                  <span className="player-sheet__pending">
                    {t.avatar.pendingLabel}
                  </span>
                </>
              )}
            </div>
            <p className="player-sheet__lvl">
              {t.avatar.level} · FULLSTACK
            </p>
          </div>

          <div className="player-sheet__origin-copy">
            <p className="hud-label m-0">{t.originEyebrow}</p>
            <h1 className="player-profile__name">{t.name}</h1>
            <p className="player-profile__class">{t.classTitle}</p>
            <p className="player-sheet__lore">{t.originP1}</p>
            <p className="player-sheet__lore player-sheet__lore--muted">
              {t.originP2}
            </p>
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
        </div>
      ) : null}

      {act === "clears" ? (
        <div className="player-sheet__clears">
          <p className="hud-label m-0">{t.clearsEyebrow}</p>
          <h2 className="player-sheet__heading">{t.clearsTitle}</h2>
          <div className="player-sheet__clear-grid">
            {t.clears.map((clear) => (
              <article key={clear.title} className="clear-card">
                <div className="clear-card__top">
                  <h3 className="clear-card__title">{clear.title}</h3>
                  <span
                    className="clear-card__badge"
                    style={{ background: clear.accent }}
                  >
                    {clear.status}
                  </span>
                </div>
                <p className="clear-card__copy">{clear.copy}</p>
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
          <p className="hud-label m-0">{t.trophiesEyebrow}</p>
          <h2 className="player-sheet__heading">{t.trophiesTitle}</h2>
          <p className="player-sheet__sub">{t.identityLine}</p>
          <div className="player-sheet__trophy-grid">
            {t.trophies.map((trophy) => (
              <article key={trophy.id} className="trophy-card">
                <div className="trophy-card__icon">{trophy.mark}</div>
                <h3 className="trophy-card__title">{trophy.title}</h3>
                <p className="trophy-card__stat">{trophy.stat}</p>
                <p className="trophy-card__detail">{trophy.detail}</p>
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

      <Link href="/" className="player-sheet__home">
        ← HOME
      </Link>
    </section>
  );
}
