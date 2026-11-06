import { lazy, Suspense, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import CommandPalette from "../components/search/CommandPalette";
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
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-500/30 border-t-primary-400" />
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
    <>
      <Navbar />
      <main>
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
      <Footer />
      <Suspense fallback={null}>
        <CommandPalette />
      </Suspense>
    </>
  );
}
