import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import clsx from "clsx";
import type { ReactNode } from "react";

interface Props {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, title, subtitle, children, className }: Props) {
  const { ref, controls, initial } = useScrollReveal();

  return (
    <section id={id} className={clsx("relative py-24 px-6 md:px-12 lg:px-24", className)}>
      <motion.div
        ref={ref}
        initial={initial}
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
        }}
        className="mx-auto max-w-6xl"
      >
        {title && (
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-gradient-to-r from-primary-400 to-accent-purple bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
            {subtitle && <p className="mt-3 text-surface-100/60 text-lg">{subtitle}</p>}
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-cyan" />
          </div>
        )}
        {children}
      </motion.div>
    </section>
  );
}
