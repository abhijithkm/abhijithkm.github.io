import { lazy, Suspense, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import CommandPalette from "../components/search/CommandPalette";
import { PhoneStage, StageProvider } from "../components/stage";
import { usePageMeta } from "../hooks/usePageMeta";
import { personalDetails } from "../data/profile";
import { scrollToSectionWhenReady } from "../lib/sectionNav";

const About = lazy(() => import("../components/About"));
const Skills = lazy(() => import("../components/Skills"));
const Experience = lazy(() => import("../components/Experience"));
const AndroidApps = lazy(() => import("../components/AndroidApps"));
const HobbyApps = lazy(() => import("../components/HobbyApps"));
const Contact = lazy(() => import("../components/Contact"));

function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-surface-50/15 border-t-accent" />
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

  // Land on the section named in the URL: on a shared link, and on the back
  // button from an app page, where the entry we left carries the hash the
  // scroll-spy last wrote. Sections are lazy, so this waits for the target.
  useEffect(() => {
    // The browser's own restoration would fight the scroll below.
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";

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
      if ("scrollRestoration" in window.history) window.history.scrollRestoration = "auto";
    };
  }, []);

  return (
    <StageProvider>
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20">
        <main className="min-w-0">
          <Hero />
          <Suspense fallback={<SectionFallback />}>
            <About />
            <AndroidApps />
            <HobbyApps />
            <Skills />
            <Experience />
            <Contact />
          </Suspense>
        </main>
        <aside className="hidden lg:block" aria-label="App preview">
          <div className="sticky top-20 flex h-[calc(100vh-6rem)] items-center justify-center">
            <PhoneStage />
          </div>
        </aside>
      </div>
      <Footer />
      <div className="theme-night">
        <Suspense fallback={null}>
          <CommandPalette />
        </Suspense>
      </div>
    </StageProvider>
  );
}
