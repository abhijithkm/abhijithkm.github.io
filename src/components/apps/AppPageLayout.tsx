import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { personalDetails } from "../../data/profile";
import { accentVars } from "../../data/androidApps";
import Footer from "../Footer";

/**
 * Shared shell for /apps pages — lightweight sticky header (no scroll-spy
 * navbar, which only works on the single-page home) + the global footer.
 *
 * `accent` re-tints the whole page in the documented app's own brand
 * colour; without it the page keeps the site's indigo.
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
      style={accentVars(accent) as CSSProperties}
    >
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-surface-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt={personalDetails.name}
              className="h-8 w-8 rounded-lg"
            />
            <span className="bg-gradient-to-r from-primary-400 to-accent-cyan bg-clip-text text-lg font-bold tracking-tight text-transparent">
              {personalDetails.name.split(" ")[0]}
              <span className="text-white/70">{personalDetails.logoSuffix}</span>
            </span>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3.5 py-1.5 text-[13px] font-medium text-surface-100/50 transition-colors hover:border-white/10 hover:text-white"
            >
              <ArrowLeft size={14} /> Portfolio
            </Link>
            <Link
              to="/apps"
              className="rounded-lg border border-primary-500/20 bg-primary-600/15 px-3.5 py-1.5 text-[13px] font-medium text-primary-400 transition-colors hover:bg-primary-600/25"
            >
              All Android Apps
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative flex-1">{children}</main>
      <Footer />
    </div>
  );
}
