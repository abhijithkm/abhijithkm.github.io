import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { navLinks, allSectionIds, sectionToNav, personalDetails } from "../data/profile";
import { androidApps } from "../data/androidApps";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { scrollToSection, syncHashToSection } from "../lib/sectionNav";
import { CommandPaletteHint } from "./search/CommandPalette";

const NAVBAR_HEIGHT = 72;

const visibleNavLinks = (
  androidApps.length ? navLinks : navLinks.filter((l) => l.href !== "#android-apps")
).filter((l) => l.href !== "#home");

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const rawActive = useScrollSpy(allSectionIds, {
    navbarOffset: NAVBAR_HEIGHT,
    defaultSection: "home",
  });
  const activeNav = sectionToNav[rawActive] ?? "home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the address bar on the section being read (replace, not push) so the
  // back button from an app page lands on the section you left from.
  useEffect(() => {
    syncHashToSection(rawActive);
  }, [rawActive]);

  const go = (href: string) => {
    setMobileOpen(false);
    scrollToSection(href);
  };

  return (
    <nav
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || mobileOpen
          ? "border-b border-white/[0.07] bg-surface-950/85 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            go("#home");
          }}
          className="flex items-center gap-2.5"
          aria-label={`${personalDetails.name} - back to top`}
        >
          <img src="/logo.png" alt="" className="h-8 w-8 rounded-lg" />
          <span className="font-display text-lg font-extrabold tracking-tight text-surface-50">
            {personalDetails.name.split(" ")[0]}
            <span className="text-primary-400">{personalDetails.logoSuffix}</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {visibleNavLinks.map((link) => {
            const active = activeNav === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.href);
                  }}
                  aria-current={active ? "true" : undefined}
                  className={clsx(
                    "relative py-1 text-sm font-medium transition-colors",
                    active ? "text-surface-50" : "text-surface-100/55 hover:text-surface-50"
                  )}
                >
                  {link.label}
                  <span
                    className={clsx(
                      "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-turmeric transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <CommandPaletteHint />
          <a
            href={personalDetails.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-primary-400/40 px-4 py-1.5 text-sm font-medium text-primary-300 transition-colors hover:bg-primary-400/10 sm:inline-block"
          >
            Resume
          </a>
          <button
            type="button"
            className="rounded-lg p-2 text-surface-100/70 md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <ul className="border-t border-white/[0.07] px-6 pb-5 pt-2 md:hidden">
          {[...visibleNavLinks, { label: "Resume", href: personalDetails.resumeUrl }].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith("#")) {
                    e.preventDefault();
                    go(link.href);
                  }
                }}
                className="block border-b border-white/[0.05] py-3.5 font-display text-xl font-bold text-surface-50"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
