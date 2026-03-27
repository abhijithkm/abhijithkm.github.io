import { useEffect, useRef, useState, useCallback } from "react";

interface UseScrollSpyOptions {
  /** Pixel offset for the fixed navbar (default 80) */
  navbarOffset?: number;
  /** IntersectionObserver threshold steps (default 0.1 increments) */
  thresholdSteps?: number;
  /** Default section when at the very top (default first id) */
  defaultSection?: string;
}

/**
 * Robust scroll-spy that tracks which section is currently "active".
 *
 * Strategy:
 * - Observes all sections with multiple threshold steps so callbacks fire
 *   frequently, even during fast scrolling.
 * - Keeps a map of every section's current intersectionRatio.
 * - On every callback batch, picks the section whose *top edge* is closest
 *   to (but not above) the navbar bottom. Falls back to the section with
 *   the highest intersection ratio.
 * - At the very top of the page (scrollY ≈ 0), forces the first section.
 */
export function useScrollSpy(
  sectionIds: string[],
  {
    navbarOffset = 80,
    thresholdSteps = 10,
    defaultSection,
  }: UseScrollSpyOptions = {}
) {
  const fallback = defaultSection ?? sectionIds[0] ?? "";
  const [active, setActive] = useState(fallback);

  // Store intersection ratios so we can compare across sections
  const ratioMap = useRef<Map<string, number>>(new Map());

  const computeActive = useCallback(() => {
    // If user is at the very top, always highlight the first section
    if (window.scrollY < 100) {
      setActive(fallback);
      return;
    }

    // Strategy: find the section whose top is closest to the navbar bottom
    // but still on-screen (top <= navbarOffset + small buffer)
    let bestId = "";
    let bestDistance = Infinity;

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;

      // Section must be at least partially visible below the navbar
      if (sectionBottom < navbarOffset || sectionTop > window.innerHeight) continue;

      // Distance from the navbar bottom to the section top
      // Negative means the section has scrolled past the navbar (we're inside it)
      const distance = sectionTop - navbarOffset;

      // Prefer sections whose top is at or just above the navbar line
      // (distance <= 0 means we've scrolled into it)
      if (distance <= 0) {
        // We're inside this section — pick the one we're deepest into
        // (most negative distance = most recently entered from top)
        if (Math.abs(distance) < Math.abs(bestDistance) || bestDistance > 0) {
          bestDistance = distance;
          bestId = id;
        }
        // Among sections we're "inside", pick the one with the largest
        // (most negative) distance — i.e. the one whose top is closest
        // to the navbar
        if (distance > bestDistance) {
          bestDistance = distance;
          bestId = id;
        }
      } else if (bestDistance > 0 && distance < bestDistance) {
        // Haven't found a section we're inside yet — pick closest upcoming
        bestDistance = distance;
        bestId = id;
      }
    }

    // Fallback: if nothing matched, use highest intersection ratio
    if (!bestId) {
      let maxRatio = 0;
      for (const id of sectionIds) {
        const ratio = ratioMap.current.get(id) ?? 0;
        if (ratio > maxRatio) {
          maxRatio = ratio;
          bestId = id;
        }
      }
    }

    if (bestId) setActive(bestId);
  }, [sectionIds, navbarOffset, fallback]);

  useEffect(() => {
    // Build threshold array: [0, 0.1, 0.2, ..., 1.0]
    const threshold = Array.from(
      { length: thresholdSteps + 1 },
      (_, i) => i / thresholdSteps
    );

    const observer = new IntersectionObserver(
      (entries) => {
        // Update ratio map
        for (const entry of entries) {
          ratioMap.current.set(entry.target.id, entry.intersectionRatio);
        }
        computeActive();
      },
      {
        // Shrink the top of the root by the navbar height so sections
        // "enter" only when they clear the navbar
        rootMargin: `-${navbarOffset}px 0px 0px 0px`,
        threshold,
      }
    );

    // Observe all sections
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    // Also recompute on scroll for fast-scroll resilience
    const onScroll = () => computeActive();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Initial computation
    computeActive();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sectionIds, navbarOffset, thresholdSteps, computeActive]);

  return active;
}
