import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Command, ExternalLink } from "lucide-react";
import Fuse from "fuse.js";
import { useNavigate } from "react-router-dom";
import { navLinks, allSectionIds, skills, projects } from "../../data/profile";
import { hobbyApps } from "../../data/hobbyApps";
import { androidApps } from "../../data/androidApps";
import { scrollToSection } from "../../lib/sectionNav";

interface SearchItem {
  label: string;
  type: "section" | "skill" | "project" | "app";
  action: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const items = useMemo<SearchItem[]>(() => {
    const scrollTo = (id: string) => {
      setOpen(false);
      scrollToSection(id);
    };
    return [
      // Nav sections
      ...navLinks.map((l) => ({
        label: `Go to ${l.label}`,
        type: "section" as const,
        action: () => scrollTo(l.href.slice(1)),
      })),
      // Also allow jumping to sub-sections
      ...allSectionIds
        .filter((id) => !navLinks.some((l) => l.href.slice(1) === id))
        .map((id) => ({
          label: `Go to ${id.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}`,
          type: "section" as const,
          action: () => scrollTo(id),
        })),
      ...skills.map((s) => ({
        label: `Skill: ${s.name} (${s.level})`,
        type: "skill" as const,
        action: () => scrollTo("skills"),
      })),
      ...projects.map((p) => ({
        label: `Project: ${p.name}`,
        type: "project" as const,
        action: () => scrollTo("projects"),
      })),
      ...hobbyApps.map((a) => ({
        label: `Open ${a.name}`,
        type: "app" as const,
        action: () => {
          setOpen(false);
          window.open(a.url, "_blank", "noopener,noreferrer");
        },
      })),
      ...androidApps.map((a) => ({
        label: `Android App: ${a.name}`,
        type: "app" as const,
        action: () => {
          setOpen(false);
          navigate(`/apps/${a.slug}`);
        },
      })),
    ];
  }, [navigate]);

  const fuse = useMemo(
    () => new Fuse(items, { keys: ["label"], threshold: 0.4 }),
    [items]
  );

  const results = query
    ? fuse.search(query).map((r) => r.item)
    : items.slice(0, 8);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Arrow key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && results[selected]) {
      results[selected].action();
    }
  };

  const typeIcon = (type: string) => {
    if (type === "app") return <ExternalLink size={14} />;
    return <ArrowRight size={14} />;
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-surface-50/30 backdrop-blur-sm"
          />

          {/* Palette */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search the portfolio"
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[20%] z-[61] w-[90%] max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-surface-50/10 bg-surface-900/95 shadow-[0_24px_60px_-20px_rgba(15,27,45,0.35)] backdrop-blur-xl"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-surface-50/10 px-5 py-4">
              <Search size={18} className="text-surface-100/60" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search sections, skills, projects..."
                className="flex-1 bg-transparent text-sm text-surface-50 placeholder-surface-100/50 outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-surface-50/15 bg-surface-50/[0.04] px-2 py-0.5 font-mono text-[10px] text-surface-100/70">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto py-2">
              {results.length === 0 ? (
                <p className="px-5 py-6 text-center text-sm text-surface-100/70">
                  No results found
                </p>
              ) : (
                results.map((item, i) => (
                  <button
                    key={`${item.label}-${i}`}
                    onClick={item.action}
                    onMouseEnter={() => setSelected(i)}
                    className={`flex w-full items-center justify-between px-5 py-2.5 text-left text-sm transition-colors ${
                      i === selected
                        ? "bg-accent-soft text-surface-50"
                        : "text-surface-100/80 hover:bg-surface-50/[0.04]"
                    }`}
                  >
                    <span className="truncate">{item.label}</span>
                    <span className="label flex shrink-0 items-center gap-2 !text-[0.62rem] !text-surface-100/60">
                      {item.type}
                      {typeIcon(item.type)}
                    </span>
                  </button>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-between border-t border-surface-50/10 px-5 py-2.5 font-mono text-[11px] text-surface-100/60">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function CommandPaletteHint() {
  return (
    <button
      aria-label="Open search"
      onClick={() =>
        window.dispatchEvent(
          new KeyboardEvent("keydown", { key: "k", ctrlKey: true })
        )
      }
      className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-surface-50/15 bg-surface-50/[0.03] px-3 py-1.5 text-xs text-surface-100/70 transition-colors hover:border-surface-50/30 hover:text-surface-50"
    >
      <Command size={12} />
      <span>K</span>
    </button>
  );
}
