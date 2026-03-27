import { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Camera,
  Wrench,
  Route,
  Database,
  Timer,
  Braces,
  Grid3X3,
  BookOpen,
} from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { hobbyApps } from "../data/hobbyApps";
import { useScrollReveal } from "../hooks/useScrollReveal";
import type { LucideIcon } from "lucide-react";

const appIcons: Record<string, LucideIcon> = {
  Capture: Camera,
  "Dev Toolbox": Wrench,
  "Page Flow": Route,
  "Schema Visualizer": Database,
  Chrono: Timer,
  "JSON Generator": Braces,
  "Sudoku Studio": Grid3X3,
  "Read Rhythm": BookOpen,
};

const categoryStyles: Record<string, string> = {
  Utility: "border-blue-500/25 bg-blue-500/10 text-blue-400",
  "Developer Tools": "border-purple-500/25 bg-purple-500/10 text-purple-400",
  "Developer Tool": "border-purple-500/25 bg-purple-500/10 text-purple-400",
  Visualization: "border-cyan-500/25 bg-cyan-500/10 text-cyan-400",
  "Database Tool": "border-primary-500/25 bg-primary-500/10 text-primary-400",
  Game: "border-yellow-500/25 bg-yellow-500/10 text-yellow-400",
  Productivity: "border-emerald-500/25 bg-emerald-500/10 text-emerald-400",
};

function HobbyCard({ app, i }: { app: (typeof hobbyApps)[0]; i: number }) {
  const { ref, controls, initial } = useScrollReveal({ delay: 0.08 * i });
  const Icon = appIcons[app.name] ?? Wrench;
  const badgeClass =
    categoryStyles[app.category] ??
    "border-white/[0.08] bg-white/[0.04] text-surface-100/50";
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 0.08 * i },
        },
      }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="group overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-primary-500/20 hover:shadow-xl hover:shadow-primary-600/8"
    >
      {/* Image area */}
      <div className="relative aspect-video overflow-hidden rounded-t-xl">
        {/* Screenshot */}
        {!imgError && (
          <img
            src={app.image}
            alt={app.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`relative z-10 h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Fallback — always rendered behind, visible when image missing */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-600/6 to-accent-purple/6">
          <Icon
            size={36}
            className="text-white/[0.07] transition-all duration-500 group-hover:scale-110 group-hover:text-white/[0.12]"
          />
        </div>

        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-surface-950/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <span
          className={`inline-block rounded-full border px-3 py-1 text-[11px] font-medium ${badgeClass}`}
        >
          {app.category}
        </span>

        <h3 className="mt-3 text-base font-semibold text-white leading-snug">
          {app.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-surface-100/45">
          {app.description}
        </p>

        <div className="mt-4">
          <motion.a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group/btn relative inline-flex items-center gap-1.5 overflow-hidden rounded-lg bg-primary-600/15 border border-primary-500/20 px-4 py-2 text-xs font-medium text-primary-400 transition-all hover:bg-primary-600/25"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-purple opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
            <span className="relative flex items-center gap-1.5 transition-colors group-hover/btn:text-white">
              <ExternalLink size={14} /> Open App
            </span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default function HobbyApps() {
  return (
    <SectionWrapper
      id="hobby-apps"
      title="Hobby Apps"
      subtitle="Fun tools and experimental web applications I built"
    >
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {hobbyApps.map((app, i) => (
          <HobbyCard key={app.name} app={app} i={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
