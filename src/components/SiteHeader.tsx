import Link from "next/link";
import { projects } from "@/content/projects";

const links = [
  { href: "/projects", label: "Catalog" },
  { href: "/about", label: "Player" },
];

export function SiteHeader() {
  const unlocked = projects.filter((p) => p.demoUrl || p.preview).length;

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(11,18,32,0.9)] backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="display text-base tracking-[0.08em] text-[var(--accent)] sm:text-lg"
        >
          JM://BUILD_CATALOG
        </Link>

        <div className="hidden items-center gap-2.5 md:flex">
          <span className="hud-label !text-[0.65rem]">XP</span>
          <div className="h-2 w-[120px] overflow-hidden rounded-sm border border-[var(--line)] bg-black/40">
            <div
              className="pulse-bar h-full bg-[linear-gradient(90deg,var(--accent),var(--hud))]"
              style={{ width: `${Math.min(100, unlocked * 12)}%` }}
            />
          </div>
          <span className="font-[family-name:var(--font-display)] text-[11px] tracking-wide text-[var(--ink-soft)]">
            {String(unlocked).padStart(2, "0")} UNLOCKED
          </span>
        </div>

        <nav className="flex items-center gap-4 text-sm text-[var(--ink-soft)] sm:gap-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-display)] tracking-wide transition-colors hover:text-[var(--accent)]"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/Jgmaza"
            target="_blank"
            rel="noreferrer"
            className="rounded-sm border border-[var(--line)] bg-[var(--panel)] px-3 py-1.5 font-[family-name:var(--font-display)] text-xs tracking-wider text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            GITHUB
          </a>
        </nav>
      </div>
    </header>
  );
}
