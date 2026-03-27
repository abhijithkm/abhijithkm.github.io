import { useInView } from "react-intersection-observer";
import { useAnimation, type Variant } from "framer-motion";
import { useEffect } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
}

const hidden: Variant = { opacity: 0, y: 40 };
const visible = (delay: number): Variant => ({
  opacity: 1,
  y: 0,
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
});

export function useScrollReveal({
  threshold = 0.15,
  triggerOnce = true,
  delay = 0,
}: UseScrollRevealOptions = {}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce });

  useEffect(() => {
    if (inView) controls.start(visible(delay));
  }, [controls, inView, delay]);

  return { ref, controls, variants: { hidden, visible: visible(delay) }, initial: "hidden" };
}
