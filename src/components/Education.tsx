import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { education } from "../data/profile";
import { useScrollReveal } from "../hooks/useScrollReveal";

function EduCard({ edu, i }: { edu: (typeof education)[0]; i: number }) {
  const { ref, controls, initial } = useScrollReveal({ delay: 0.12 * i });

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 0.12 * i },
        },
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/20 hover:bg-white/[0.05] hover:shadow-lg hover:shadow-primary-600/5"
    >
      <div className="flex items-start gap-5">
        <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-primary-500/15 bg-primary-500/8">
          <GraduationCap size={24} className="text-primary-400" />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="text-base font-semibold text-white leading-snug">{edu.name}</h3>
          <p className="text-sm font-medium text-primary-400">{edu.degree}</p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-surface-100/40">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={12} />
              {edu.startDate} — {edu.endDate}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={12} />
              {edu.location}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  return (
    <SectionWrapper id="education" title="Education" subtitle="Academic background">
      <div className="mx-auto grid max-w-3xl gap-6">
        {education.map((edu, i) => (
          <EduCard key={edu.name} edu={edu} i={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
