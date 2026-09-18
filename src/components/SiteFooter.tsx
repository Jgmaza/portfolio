export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--line)] py-10">
      <div className="container flex flex-col gap-3 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} José Maza · Fullstack product engineer</p>
        <div className="flex gap-4">
          <a
            href="https://github.com/Jgmaza"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--accent)]"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
