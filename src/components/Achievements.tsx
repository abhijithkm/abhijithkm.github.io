import { motion } from "framer-motion";
import { Rocket, Cloud, Layers, Zap } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { achievements } from "../data/profile";
import { useScrollReveal } from "../hooks/useScrollReveal";

const iconMap: Record<string, typeof Rocket> = {
  rocket: Rocket,
  cloud: Cloud,
  layers: Layers,
  zap: Zap,
};

const gradients = [
  "from-primary-500/15 to-accent-cyan/10",
  "from-accent-purple/15 to-primary-500/10",
  "from-emerald-500/15 to-primary-500/10",
  "from-amber-500/15 to-primary-500/10",
];

function AchievementCard({
  achievement,
  i,
}: {
  achievement: (typeof achievements)[0];
  i: number;
}) {
  const { ref, controls, initial } = useScrollReveal({ delay: 0.1 * i });
  const Icon = iconMap[achievement.icon] ?? Zap;

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
          transition: { duration: 0.5, delay: 0.1 * i },
        },
      }}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/25 hover:bg-white/[0.05] hover:shadow-lg hover:shadow-primary-600/5"
    >
      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradients[i % gradients.length]}`}
      >
        <Icon
          size={22}
          className="text-primary-400 transition-colors group-hover:text-accent-cyan"
        />
      </div>
      <h3 className="text-base font-semibold text-white">{achievement.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-surface-100/45">
        {achievement.description}
      </p>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <SectionWrapper
      id="achievements"
      title="Featured Achievements"
      subtitle="Key highlights from my career"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a, i) => (
          <AchievementCard key={a.title} achievement={a} i={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
