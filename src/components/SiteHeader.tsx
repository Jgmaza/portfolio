import Link from "next/link";

const links = [
  { href: "/projects", label: "Proyectos" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(243,239,230,0.82)] backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="display text-xl tracking-tight">
          José Maza
        </Link>
        <nav className="flex items-center gap-6 text-sm text-[var(--ink-soft)]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[var(--accent)]"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:jgmaza.dev@gmail.com"
            className="rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] px-3 py-1.5 text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}
