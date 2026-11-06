import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import clsx from "clsx";
import type { ReactNode } from "react";

interface Props {
  id: string;
  /** Mono marker above the title, e.g. "Shipped" */
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, eyebrow, title, subtitle, children, className }: Props) {
  const { ref, controls, initial } = useScrollReveal();

  return (
    <section id={id} className={clsx("relative px-6 py-20 md:py-28", className)}>
      <motion.div
        ref={ref}
        initial={initial}
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
        }}
        className="mx-auto max-w-6xl"
      >
        {title && (
          <header className="mb-12 max-w-2xl">
            {eyebrow && <p className="label mb-3">{eyebrow}</p>}
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] text-surface-50 sm:text-5xl">
              {title}
            </h2>
            {subtitle && <p className="mt-4 text-lg leading-relaxed text-surface-100/65">{subtitle}</p>}
          </header>
        )}
        {children}
      </motion.div>
    </section>
  );
}
