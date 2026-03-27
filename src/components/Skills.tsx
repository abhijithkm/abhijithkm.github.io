import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import SectionWrapper from "./SectionWrapper";
import { skills, skillLevelPercent, skillIconColors } from "../data/profile";
import { useScrollReveal } from "../hooks/useScrollReveal";

const categories = ["All", "Frontend", "Backend", "Database"] as const;

const levelColor: Record<string, string> = {
  Expert: "from-emerald-400 to-emerald-500",
  Advanced: "from-primary-400 to-primary-500",
  Intermediate: "from-amber-400 to-amber-500",
};

const levelBadge: Record<string, string> = {
  Expert: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Advanced: "bg-primary-500/10 text-primary-400 border-primary-500/20",
  Intermediate: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

function SkillCard({ skill, i }: { skill: (typeof skills)[0]; i: number }) {
  const { ref, controls, initial } = useScrollReveal({ delay: 0.05 * i });
  const pct = skillLevelPercent[skill.level] ?? 50;
  const iconColor = skillIconColors[skill.icon] ?? "#818cf8";

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, delay: 0.05 * i },
        },
      }}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/25 hover:bg-white/[0.05] hover:shadow-lg hover:shadow-primary-600/5"
    >
      {/* Icon dot + name */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03]"
          style={{ boxShadow: `0 0 20px ${iconColor}15` }}
        >
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: iconColor, boxShadow: `0 0 8px ${iconColor}60` }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{skill.name}</h3>
        </div>
        <span
          className={clsx(
            "shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
            levelBadge[skill.level]
          )}
        >
          {skill.level}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-surface-100/45">{skill.description}</p>

      {/* Progress bar */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 + 0.05 * i, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={clsx("h-full rounded-full bg-gradient-to-r", levelColor[skill.level])}
          />
        </div>
        <span className="text-[11px] font-medium text-surface-100/30 tabular-nums">{pct}%</span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const filtered =
    active === "All" ? skills : skills.filter((s) => s.category === active);

  return (
    <SectionWrapper id="skills" title="Skills & Technologies" subtitle="Tools and technologies I work with">
      {/* Category tabs */}
      <div className="mb-12 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={clsx(
              "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
              active === cat ? "text-white" : "text-surface-100/40 hover:text-surface-100/70"
            )}
          >
            {active === cat && (
              <motion.span
                layoutId="skill-tab"
                className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.06]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} i={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}
