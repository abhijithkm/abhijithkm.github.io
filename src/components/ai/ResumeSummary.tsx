import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const highlights = [
  "Frontend Engineer",
  "React + TypeScript Specialist",
  "Experience deploying applications to AWS",
  "Full-stack experience with Laravel & MySQL",
  "Built production apps used by real organizations",
];

export default function ResumeSummary() {
  const { ref, controls, initial } = useScrollReveal();

  return (
    <section className="relative px-6 py-16 md:px-12 lg:px-24">
      <motion.div
        ref={ref}
        initial={initial}
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
          },
        }}
        className="mx-auto max-w-2xl"
      >
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-sm text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/8 px-4 py-1.5 text-xs font-medium text-primary-400">
            <Sparkles size={14} />
            Quick Recruiter Summary
          </div>

          <h3 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-primary-400 to-accent-cyan bg-clip-text text-transparent">
              Abhijith K M
            </span>
          </h3>

          <ul className="mt-6 space-y-3">
            {highlights.map((h, i) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                className="flex items-center justify-center gap-2 text-sm text-surface-100/60"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary-400/60" />
                {h}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
