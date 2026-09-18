export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[var(--line)] py-10">
      <div className="container flex flex-col gap-3 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p className="font-[family-name:var(--font-display)] tracking-wide">
          © {new Date().getFullYear()} José Maza · Build Catalog v1
        </p>
        <a
          href="https://github.com/Jgmaza"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[var(--accent)]"
        >
          github.com/Jgmaza
        </a>
      </div>
    </footer>
  );
}
