import { motion } from "framer-motion";
import { ExternalLink, FolderOpen } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import SectionWrapper from "./SectionWrapper";
import { projects } from "../data/profile";
import { useScrollReveal } from "../hooks/useScrollReveal";

const techColors: Record<string, string> = {
  Laravel: "border-red-500/20 bg-red-500/8 text-red-400",
  MySQL: "border-blue-500/20 bg-blue-500/8 text-blue-400",
  ReactJS: "border-cyan-500/20 bg-cyan-500/8 text-cyan-400",
  JavaScript: "border-yellow-500/20 bg-yellow-500/8 text-yellow-400",
};

function ProjectCard({ project, i }: { project: (typeof projects)[0]; i: number }) {
  const { ref, controls, initial } = useScrollReveal({ delay: 0.15 * i });

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
          transition: { duration: 0.6, delay: 0.15 * i },
        },
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-primary-500/20 hover:shadow-xl hover:shadow-primary-600/8"
    >
      {/* Image area */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        {/* Fallback */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-600/8 to-accent-purple/8">
          <FolderOpen
            size={48}
            className="text-white/[0.06] transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/60 to-transparent" />
        {/* Hover glow */}
        <div className="absolute inset-0 bg-primary-500/0 transition-colors duration-300 group-hover:bg-primary-500/[0.03]" />
      </div>

      <div className="relative p-6">
        <h3 className="text-lg font-semibold text-white leading-snug">{project.name}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-surface-100/45">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
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

        <div className="mt-5 flex gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-surface-100/60 transition-all hover:bg-white/[0.08] hover:text-white"
          >
            <GithubIcon size={14} /> Code
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600/15 border border-primary-500/20 px-4 py-2 text-xs font-medium text-primary-400 transition-all hover:bg-primary-600/25"
          >
            <ExternalLink size={14} /> Live Demo
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <SectionWrapper id="projects" title="Projects" subtitle="Featured work I've built">
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} i={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
