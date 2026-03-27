import { lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

const ImpactMetrics = lazy(() => import("./components/metrics/ImpactMetrics"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Achievements = lazy(() => import("./components/Achievements"));
const HobbyApps = lazy(() => import("./components/HobbyApps"));
const Education = lazy(() => import("./components/Education"));
const ResumeSummary = lazy(() => import("./components/ai/ResumeSummary"));
const Contact = lazy(() => import("./components/Contact"));
const AIChat = lazy(() => import("./components/ai/AIChat"));
import CommandPalette from "./components/search/CommandPalette";

function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-32 text-surface-100/10">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-500/30 border-t-primary-500" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}
