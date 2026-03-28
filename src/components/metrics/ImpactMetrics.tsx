import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase, Code2, FolderKanban, Rocket } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { skills, projects, personalDetails } from "../../data/profile";
import { hobbyApps } from "../../data/hobbyApps";

const metrics = [
  {
    icon: Briefcase,
    value: new Date().getFullYear() - personalDetails.careerStartYear,
    suffix: "+",
    label: "Years Experience",
  },
  { icon: Code2, value: skills.length, suffix: "+", label: "Technologies" },
  {
    icon: FolderKanban,
    value: projects.length + hobbyApps.length,
    suffix: "+",
    label: "Projects Built",
  },
  { icon: Rocket, value: hobbyApps.length, suffix: "", label: "Apps Deployed" },
];

function AnimatedCounter({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function ImpactMetrics() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="relative px-6 pt-24 pb-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 * i }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/25 hover:bg-white/[0.05] hover:shadow-lg hover:shadow-primary-600/5"
          >
            <m.icon
              size={22}
              className="text-primary-400 transition-colors group-hover:text-accent-cyan"
            />
            <span className="text-3xl font-bold text-white tabular-nums">
              <AnimatedCounter
                target={m.value}
                suffix={m.suffix}
                inView={inView}
              />
            </span>
            <span className="text-xs text-surface-100/40 text-center">
              {m.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
