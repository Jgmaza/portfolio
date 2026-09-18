"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { projects } from "@/content/projects";

export function HomePortals() {
  const { t, openSettings } = useLocale();
  const liveCount = projects.filter((p) => p.demoUrl).length;
  const previews = projects.filter((p) => p.demoUrl).slice(0, 3);

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
          <div className="portal-card__medallion-row">
            <div className="portal-medallion">
              <span>{t.avatar.initials}</span>
            </div>
            <div>
              <p className="portal-card__lvl">{t.avatar.level}</p>
              <p className="portal-card__class">{t.classTitle}</p>
              <p className="portal-card__acts">{t.playerPortal.acts}</p>
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
