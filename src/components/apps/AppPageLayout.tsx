import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { personalDetails } from "../../data/profile";
import Footer from "../Footer";

/**
 * Shared shell for /apps pages: a light blurred header in the same look as
 * the home Navbar (no scroll-spy, which only works on the single-page home)
 * plus the global footer.
 *
 * `accent` re-tints the page in the documented app's own brand colour;
 * without it the page keeps the site's default accent.
 */
export default function AppPageLayout({
  children,
  accent,
}: {
  children: ReactNode;
  accent?: string;
}) {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={accent ? ({ "--accent": accent } as CSSProperties) : undefined}
    >
      <header className="sticky top-0 z-50 border-b border-surface-50/10 bg-surface-950/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <img
              src="/logo.png"
              alt={personalDetails.name}
              className="h-8 w-8 rounded-lg"
            />
            <span className="font-display text-lg font-extrabold tracking-tight text-surface-50">
              {personalDetails.name.split(" ")[0]}
              <span className="text-accent-ink">{personalDetails.logoSuffix}</span>
            </span>
          </Link>

          <nav className="flex items-center gap-3 sm:gap-5">
            <Link
              to="/"
              className="inline-flex items-center gap-1 whitespace-nowrap text-[13px] font-medium text-surface-100/70 transition-colors hover:text-surface-50 sm:text-sm"
            >
              <ArrowLeft size={14} aria-hidden="true" /> Portfolio
            </Link>
            <Link
              to="/apps"
              className="whitespace-nowrap text-[13px] font-medium text-surface-100/70 transition-colors hover:text-surface-50 sm:text-sm"
            >
              All Android apps
            </Link>
            <a
              href={personalDetails.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden whitespace-nowrap rounded-full border border-accent/50 px-4 py-1.5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent/10 sm:inline-block"
            >
              Resume
            </a>
          </nav>
        </div>
      </header>

      <main className="relative flex-1">{children}</main>
      <Footer />
    </div>
  );
}
