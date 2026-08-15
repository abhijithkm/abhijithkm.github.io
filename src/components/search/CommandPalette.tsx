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
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[20%] z-[61] w-[90%] max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-white/[0.08] bg-surface-950/95 backdrop-blur-xl shadow-2xl"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
              <Search size={18} className="text-surface-100/30" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search sections, skills, projects..."
                className="flex-1 bg-transparent text-sm text-white placeholder-surface-100/30 outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] text-surface-100/30">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto py-2">
              {results.length === 0 ? (
                <p className="px-5 py-6 text-center text-sm text-surface-100/30">
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
                        ? "bg-white/[0.05] text-white"
                        : "text-surface-100/50 hover:bg-white/[0.03]"
                    }`}
                  >
                    <span className="truncate">{item.label}</span>
                    <span className="shrink-0 text-surface-100/20">
                      {typeIcon(item.type)}
                    </span>
                  </button>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-2.5 text-[11px] text-surface-100/25">
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
      onClick={() =>
        window.dispatchEvent(
          new KeyboardEvent("keydown", { key: "k", ctrlKey: true })
        )
      }
      className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-xs text-surface-100/30 transition-colors hover:text-surface-100/50 hover:border-white/10"
    >
      <Command size={12} />
      <span>K</span>
    </button>
  );
}
