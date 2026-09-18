"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { projects } from "@/content/projects";

export function SiteHeader() {
  const pathname = usePathname();
  const { openSettings } = useLocale();
  const unlocked = projects.filter((p) => p.demoUrl || p.preview).length;
  const xpPct = Math.min(
    100,
    Math.round((unlocked / Math.max(projects.length, 1)) * 100),
  );

  const links = [
    { href: "/projects", label: "Catalog" },
    { href: "/player", label: "Player" },
  ];

  return (
    <div className="site-chrome-top sticky top-0 z-40">
      <div aria-hidden className="site-signal" />
      <header className="site-header">
        <div className="site-header__inner">
          <Link href="/" className="site-header__brand">
            JM://BUILD_CATALOG
          </Link>

          <div className="site-header__xp">
            <span className="site-header__xp-label">XP</span>
            <div className="site-header__xp-track">
              <div
                className="site-header__xp-fill pulse-bar"
                style={{ width: `${Math.max(12, xpPct)}%` }}
              />
            </div>
            <span className="site-header__xp-val">
              {String(unlocked).padStart(2, "0")} UNLOCKED
            </span>
          </div>

          <nav className="site-header__nav">
            {links.map((link) => {
              const active =
                link.href === "/player"
                  ? pathname === "/player" || pathname === "/about"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className={
                    active
                      ? "site-header__link site-header__link--on"
                      : "site-header__link"
                  }
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              type="button"
              className="site-header__sys"
              onClick={openSettings}
            >
              SYS
            </button>
            <a
              href="https://github.com/Jgmaza"
              target="_blank"
              rel="noreferrer"
              className="site-header__github"
            >
              GITHUB
            </a>
          </nav>
        </div>
      </header>
    </div>
  );
}
