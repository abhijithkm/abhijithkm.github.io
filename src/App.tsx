import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Achievements = lazy(() => import("./components/Achievements"));
const Projects = lazy(() => import("./components/Projects"));
const HobbyApps = lazy(() => import("./components/HobbyApps"));
const Education = lazy(() => import("./components/Education"));
const Contact = lazy(() => import("./components/Contact"));

function SectionFallback() {
  return (
    <div className="flex items-center justify-center py-32 text-surface-100/10">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-500/30 border-t-primary-500" />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Skills />
          <Experience />
          <Achievements />
          <Projects />
          <HobbyApps />
          <Education />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
