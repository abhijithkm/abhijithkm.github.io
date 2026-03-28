import { motion } from "framer-motion";
import { Building2, Calendar } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { experience } from "../data/profile";
import { useScrollReveal } from "../hooks/useScrollReveal";

const techColors: Record<string, string> = {
  React: "border-cyan-500/20 bg-cyan-500/8 text-cyan-400",
  ReactJS: "border-cyan-500/20 bg-cyan-500/8 text-cyan-400",
  JavaScript: "border-yellow-500/20 bg-yellow-500/8 text-yellow-400",
  "C#": "border-violet-500/20 bg-violet-500/8 text-violet-400",
  ".NET 8": "border-violet-500/20 bg-violet-500/8 text-violet-400",
  "SQL Server": "border-red-500/20 bg-red-500/8 text-red-400",
  Redis: "border-red-500/20 bg-red-500/8 text-red-400",
  AWS: "border-orange-500/20 bg-orange-500/8 text-orange-400",
  Docker: "border-blue-500/20 bg-blue-500/8 text-blue-400",
  PHP: "border-indigo-500/20 bg-indigo-500/8 text-indigo-400",
  MySQL: "border-blue-500/20 bg-blue-500/8 text-blue-400",
  Laravel: "border-red-500/20 bg-red-500/8 text-red-400",
  Codeigniter: "border-orange-500/20 bg-orange-500/8 text-orange-400",
};

function TimelineItem({ exp, i }: { exp: (typeof experience)[0]; i: number }) {
  const { ref, controls, initial } = useScrollReveal({ delay: 0.15 * i });

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: -24 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.6, delay: 0.15 * i, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }}
      className="relative flex gap-6"
    >
      {/* Timeline connector */}
      <div className="flex flex-col items-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary-500/20 bg-primary-500/8 shadow-lg shadow-primary-600/5"
        >
          <Building2 size={20} className="text-primary-400" />
          {exp.endDate === "Present" && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
            </span>
          )}
        </motion.div>
        {i < experience.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="w-px flex-1 origin-top bg-gradient-to-b from-primary-500/25 via-primary-500/10 to-transparent"
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
        className="group mb-14 flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/20 hover:bg-white/[0.05] hover:shadow-lg hover:shadow-primary-600/5"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-white">{exp.name}</h3>
            <p className="mt-1 text-sm font-medium text-primary-400">{exp.position}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-xs text-surface-100/45">
            <Calendar size={12} />
            {exp.startDate} — {exp.endDate}
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-surface-100/50">{exp.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {exp.techStack.map((tech) => (
            <span
              key={tech}
              className={`rounded-md border px-2.5 py-1 text-[11px] font-medium ${
                techColors[tech] ?? "border-white/[0.06] bg-white/[0.03] text-surface-100/50"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <SectionWrapper id="experience" title="Experience" subtitle="My professional journey">
      <div className="mx-auto max-w-2xl">
        {experience.map((exp, i) => (
          <TimelineItem key={exp.name} exp={exp} i={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
