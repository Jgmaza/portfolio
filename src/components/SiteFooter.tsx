import Link from "next/link";
import { projects } from "@/content/projects";

export function SiteFooter() {
  const live = projects.filter((p) => p.demoUrl).length;

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__left">
          © {new Date().getFullYear()} José Maza · BUILD CATALOG ·{" "}
          {String(live).padStart(2, "0")} LIVE
        </p>
        <Link href="/projects" className="site-footer__right">
          OPEN CATALOG →
        </Link>
        <a
          href="https://github.com/Jgmaza"
          target="_blank"
          rel="noreferrer"
          className="site-footer__gh"
        >
          github.com/Jgmaza
        </a>
      </div>
    </footer>
  );
}
