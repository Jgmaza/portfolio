"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { projects } from "@/content/projects";

export function HomePortals() {
  const { t, openSettings } = useLocale();
  const liveCount = projects.filter((p) => p.demoUrl).length;
  const previews = projects.filter((p) => p.demoUrl).slice(0, 3);
  const { credential, agentId, clearance, status, level, initials } = t.avatar;

  return (
    <section className="home-portals">
      <div className="home-portals__intro">
        <p className="hud-label m-0">{t.homeEyebrow}</p>
        <h1 className="home-portals__name">{t.name}</h1>
        <p className="home-portals__line">{t.homeLine}</p>
      </div>

      <div className="home-portals__grid">
        <Link href={t.ctas.catalog.href} className="portal-card portal-card--catalog">
          <p className="hud-label m-0">{t.catalogPortal.label}</p>
          <h2 className="portal-card__title">{t.catalogPortal.title}</h2>
          <p className="portal-card__live">
            {String(liveCount).padStart(2, "0")} LIVE
          </p>
          <div className="portal-card__slots">
            {previews.map((p) => (
              <div key={p.slug} className="portal-mini">
                <span className="portal-mini__name">{p.title}</span>
                <span className="portal-mini__live">LIVE</span>
              </div>
            ))}
          </div>
          <p className="portal-card__hint">{t.catalogPortal.hint}</p>
          <span className="btn-start portal-card__cta">{t.catalogPortal.cta}</span>
        </Link>

        <Link href={t.ctas.player.href} className="portal-card portal-card--player">
          <p className="hud-label m-0">{t.playerPortal.label}</p>
          <h2 className="portal-card__title">{t.playerPortal.title}</h2>

          <div className="agent-cred" aria-hidden={false}>
            <div className="agent-cred__rail" aria-hidden />
            <p className="agent-cred__eyebrow">
              AGENT CREDENTIAL · {clearance}
            </p>
            <div className="agent-cred__body">
              <div className="agent-cred__photo-wrap">
                {credential ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={credential}
                    alt=""
                    className="agent-cred__photo"
                  />
                ) : (
                  <span className="agent-cred__fallback">{initials}</span>
                )}
                <span className="agent-cred__corner agent-cred__corner--tl" />
                <span className="agent-cred__corner agent-cred__corner--tr" />
                <span className="agent-cred__corner agent-cred__corner--bl" />
                <span className="agent-cred__corner agent-cred__corner--br" />
              </div>
              <div className="agent-cred__meta">
                <p className="agent-cred__name">{t.name}</p>
                <p className="agent-cred__class">{t.classTitle}</p>
                <dl className="agent-cred__fields">
                  <div>
                    <dt>ID</dt>
                    <dd>{agentId}</dd>
                  </div>
                  <div>
                    <dt>RANK</dt>
                    <dd>{level}</dd>
                  </div>
                  <div>
                    <dt>STATUS</dt>
                    <dd className="agent-cred__status">{status}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="agent-cred__barcode" aria-hidden>
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <p className="portal-card__hint">{t.playerPortal.hint}</p>
          <span className="btn-source portal-card__cta portal-card__cta--ghost">
            {t.playerPortal.cta}
          </span>
        </Link>
      </div>

      <button type="button" className="home-portals__sys" onClick={openSettings}>
        {t.sysHint}
      </button>
    </section>
  );
}
