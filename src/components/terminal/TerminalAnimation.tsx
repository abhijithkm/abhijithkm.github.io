import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const lines = [
  { text: "npm run build", delay: 0 },
  { text: "✔ Compiling React App...", delay: 1200 },
  { text: "✔ Optimizing bundles...", delay: 2200 },
  { text: "✔ Deploying to Web", delay: 3200 },
  { text: "✔ Portfolio Live 🚀", delay: 4200 },
];

export default function TerminalAnimation() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers = lines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-black/30 shadow-lg backdrop-blur-sm max-h-40">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.05] px-3.5 py-2">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500/50" />
          <span className="h-2 w-2 rounded-full bg-yellow-500/50" />
          <span className="h-2 w-2 rounded-full bg-emerald-500/50" />
        </div>
        <span className="ml-1.5 text-[10px] text-surface-100/20 font-mono">terminal</span>
      </div>

      {/* Content */}
      <div className="px-3.5 py-3 font-mono text-[12px] leading-relaxed space-y-0.5">
        {lines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className={
              i === 0
                ? "text-surface-100/40"
                : line.text.startsWith("✔")
                  ? "text-emerald-400/70"
                  : "text-surface-100/30"
            }
          >
            {i === 0 && <span className="text-primary-400/70 mr-1.5">❯</span>}
            {line.text}
          </motion.div>
        ))}
        {visibleLines < lines.length && (
          <span className="inline-block h-3.5 w-1 animate-pulse bg-primary-400/40" />
        )}
      </div>
    </div>
  );
}
