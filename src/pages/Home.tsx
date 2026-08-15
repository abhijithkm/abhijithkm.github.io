import { lazy, Suspense, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import CommandPalette from "../components/search/CommandPalette";
import { usePageMeta } from "../hooks/usePageMeta";
import { personalDetails } from "../data/profile";
import { scrollToSectionWhenReady } from "../lib/sectionNav";

const ImpactMetrics = lazy(() => import("../components/metrics/ImpactMetrics"));
const About = lazy(() => import("../components/About"));
const Skills = lazy(() => import("../components/Skills"));
const Experience = lazy(() => import("../components/Experience"));
const Achievements = lazy(() => import("../components/Achievements"));
const AndroidApps = lazy(() => import("../components/AndroidApps"));
const HobbyApps = lazy(() => import("../components/HobbyApps"));
const Education = lazy(() => import("../components/Education"));
const ResumeSummary = lazy(() => import("../components/ai/ResumeSummary"));
const Contact = lazy(() => import("../components/Contact"));
const AIChat = lazy(() => import("../components/ai/AIChat"));

function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-32 text-surface-100/10">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-500/30 border-t-primary-500" />
    </div>
  );
}

export default function Home() {
  usePageMeta({
    title: `${personalDetails.name} — ${personalDetails.tagline}`,
    description:
      "Full-Stack Software Engineer building enterprise React + .NET applications with AWS cloud infrastructure.",
    path: "/",
  });

  // Land on the section named in the URL — on a shared link, and on the
  // back button from an app page, where the entry we left carries the
  // hash the scroll-spy last wrote. Sections are lazy, so this waits for
  // the target to mount.
  useEffect(() => {
    // The browser's own restoration would fight the scroll below.
    if ("scrollRestoration" in window.history)
      window.history.scrollRestoration = "manual";

    let cancel: (() => void) | undefined;

    const jumpToHash = () => {
      cancel?.();
      const hash = window.location.hash;
      if (!hash || hash === "#") return;
      cancel = scrollToSectionWhenReady(hash);
    };

    jumpToHash();
    window.addEventListener("popstate", jumpToHash);
    return () => {
      cancel?.();
      window.removeEventListener("popstate", jumpToHash);
      if ("scrollRestoration" in window.history)
        window.history.scrollRestoration = "auto";
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="relative">
        {/* Gradient fade — dims background noise toward bottom */}
        <div
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(2,6,23,0) 0%, rgba(2,6,23,0.3) 40%, rgba(2,6,23,0.85) 100%)",
          }}
        />
        <div className="relative z-10">
          <Hero />
          <Suspense fallback={<SectionFallback />}>
            <ImpactMetrics />
            <About />
            <AndroidApps />
            <HobbyApps />
            <Skills />
            <Experience />
            <Achievements />
            <Education />
            <ResumeSummary />
            <Contact />
          </Suspense>
        </div>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <AIChat />
        <CommandPalette />
      </Suspense>
    </>
  );
}
