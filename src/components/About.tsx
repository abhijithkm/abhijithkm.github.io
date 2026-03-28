import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Briefcase, Code2, FolderKanban } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { personalDetails, skills, projects } from "../data/profile";
import { useScrollReveal } from "../hooks/useScrollReveal";

const stats = [
  {
    icon: Briefcase,
    value: `${new Date().getFullYear() - personalDetails.careerStartYear}+`,
    label: "Years Experience",
    color: "from-primary-400 to-primary-600",
  },
  {
    icon: Code2,
    value: `${skills.length}+`,
    label: "Technologies",
    color: "from-accent-cyan to-primary-400",
  },
  {
    icon: FolderKanban,
    value: `${projects.length}+`,
    label: "Projects Built",
    color: "from-accent-purple to-primary-400",
  },
];

function StatCard({
  icon: Icon,
  value,
  label,
  color,
  i,
}: {
  icon: typeof Briefcase;
  value: string;
  label: string;
  color: string;
  i: number;
}) {
  const { ref, controls, initial } = useScrollReveal({ delay: 0.12 * i });
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, delay: 0.12 * i },
        },
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/25 hover:bg-white/[0.05]"
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} bg-opacity-10`}
        style={{ background: `linear-gradient(135deg, rgba(99,102,241,0.12), rgba(34,211,238,0.08))` }}
      >
        <Icon size={22} className="text-primary-400 transition-colors group-hover:text-accent-cyan" />
      </div>
      <span className="text-3xl font-bold text-white">{value}</span>
      <span className="text-sm text-surface-100/45">{label}</span>
    </motion.div>
  );
}

export default function About() {
  return (
    <SectionWrapper id="about" title="About Me" subtitle="Get to know me better">
      <div className="grid gap-14 lg:grid-cols-5">
        {/* Left — profile image */}
        <div className="flex items-start justify-center lg:col-span-2">
          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="relative"
          >
            <div className="relative h-72 w-72 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-primary-600/10">
              <img
                src="/profile.jpg"
                alt={personalDetails.name}
                loading="lazy"
                className="h-full w-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  target.parentElement!.classList.add(
                    "bg-gradient-to-br",
                    "from-primary-600/20",
                    "to-accent-purple/20"
                  );
                  const fallback = document.createElement("div");
                  fallback.className =
                    "flex h-full w-full items-center justify-center text-6xl font-bold text-white/20";
                  fallback.textContent = personalDetails.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("");
                  target.parentElement!.appendChild(fallback);
                }}
              />
            </div>
            {/* Glow */}
            <div className="absolute -inset-2 -z-10 rounded-2xl bg-gradient-to-br from-primary-500/15 to-accent-cyan/10 blur-2xl" />
            {/* Decorative border */}
            <div className="absolute -inset-px -z-5 rounded-2xl bg-gradient-to-br from-primary-500/20 via-transparent to-accent-cyan/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.div>
        </div>

        {/* Right — info */}
        <div className="lg:col-span-3 space-y-7">
          <h3 className="text-2xl font-bold text-white">
            {personalDetails.aboutTitle.includes("&") ? (
              <>
                {personalDetails.aboutTitle.split("&")[0]}&{" "}
                <span className="bg-gradient-to-r from-primary-400 to-accent-cyan bg-clip-text text-transparent">
                  {personalDetails.aboutTitle.split("&")[1]?.trim()}
                </span>
              </>
            ) : (
              personalDetails.aboutTitle
            )}
          </h3>

          <p className="text-base leading-[1.8] text-surface-100/60">
            {personalDetails.description}
          </p>

          <p className="text-base leading-[1.8] text-surface-100/45">
            {personalDetails.aboutExtended}
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-4">
            {[
              { icon: MapPin, text: personalDetails.address },
              { icon: Mail, text: personalDetails.email },
              { icon: Phone, text: personalDetails.phone },
            ].map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 text-sm text-surface-100/45 transition-colors hover:text-surface-100/70"
              >
                <Icon size={15} className="text-primary-400/70" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} i={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
