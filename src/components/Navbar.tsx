import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Palette } from "lucide-react";
import clsx from "clsx";
import {
  navLinks,
  allSectionIds,
  sectionToNav,
  personalDetails,
} from "../data/profile";
import { androidApps } from "../data/androidApps";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { CommandPaletteHint } from "./search/CommandPalette";
import { useTheme, type ThemeName } from "../context/ThemeContext";

const NAVBAR_HEIGHT = 72;

const themeLabels: { name: ThemeName; label: string }[] = [
  { name: "dark", label: "Dark" },
  { name: "cyberpunk", label: "Cyber" },
  { name: "minimal", label: "Minimal" },
];

// Hide the Android Apps link until real (non-sample) apps exist
const visibleNavLinks = androidApps.length
  ? navLinks
  : navLinks.filter((l) => l.href !== "#android-apps");

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Track all sections, then map to the parent nav item
  const rawActive = useScrollSpy(allSectionIds, {
    navbarOffset: NAVBAR_HEIGHT,
    defaultSection: "home",
  });
  const activeNav = sectionToNav[rawActive] ?? "home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/10"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleClick("#home");
          }}
          className="flex items-center gap-2"
        >
          <img src="/logo.png" alt={personalDetails.name} className="h-8 w-8 rounded-lg" />
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-primary-400 to-accent-cyan bg-clip-text text-transparent">
            {personalDetails.name.split(" ")[0]}
            <span className="text-white/70">{personalDetails.logoSuffix}</span>
          </span>
        </a>

        {/* Desktop nav — centered */}
        <ul className="hidden md:flex items-center gap-0.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1">
          {visibleNavLinks.map((link) => {
            const id = link.href.slice(1);
            const isActive = activeNav === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.href);
                  }}
                  className={clsx(
                    "relative block rounded-lg px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200",
                    isActive ? "text-white" : "text-surface-100/50 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-white/10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <CommandPaletteHint />

          {/* Theme switcher */}
          <div className="relative">
            <button
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-surface-100/35 transition-colors hover:text-white hover:border-white/10"
              aria-label="Switch theme"
            >
              <Palette size={14} />
            </button>
            <AnimatePresence>
              {themeMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 top-full mt-2 overflow-hidden rounded-xl border border-white/[0.08] bg-surface-950/95 backdrop-blur-xl shadow-xl"
                >
                  {themeLabels.map((t) => (
                    <button
                      key={t.name}
                      onClick={() => {
                        setTheme(t.name);
                        setThemeMenuOpen(false);
                      }}
                      className={clsx(
                        "block w-full px-5 py-2.5 text-left text-xs font-medium transition-colors",
                        theme === t.name
                          ? "text-primary-400 bg-white/[0.04]"
                          : "text-surface-100/50 hover:text-white hover:bg-white/[0.03]"
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-surface-100/50 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-surface-950/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {visibleNavLinks.map((link) => {
                const id = link.href.slice(1);
                const isActive = activeNav === id;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(link.href);
                      }}
                      className={clsx(
                        "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "text-white bg-white/[0.06]"
                          : "text-surface-100/50 hover:text-white hover:bg-white/[0.03]"
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
