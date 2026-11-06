import { motion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import clsx from "clsx";
import type { ReactNode } from "react";

interface Props {
  id: string;
  /** Mono marker above the title */
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

// Sections live inside the left column of the home page, so they carry
// vertical rhythm only: the page container owns width and side padding.
export default function SectionWrapper({ id, eyebrow, title, subtitle, children, className }: Props) {
  const { ref, controls, initial } = useScrollReveal();

  return (
    <section id={id} className={clsx("scroll-mt-16 py-16 md:py-24", className)}>
      <motion.div
        ref={ref}
        initial={initial}
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
        }}
      >
        {title && (
          <header className="mb-10 max-w-xl">
            {eyebrow && <p className="label mb-3">{eyebrow}</p>}
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] text-surface-50 sm:text-[2.75rem]">
              {title}
            </h2>
            {subtitle && <p className="mt-4 text-lg leading-relaxed text-surface-100/70">{subtitle}</p>}
          </header>
        )}
        {children}
      </motion.div>
    </section>
  );
}
