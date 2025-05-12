import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import Loader from './components/ui/Loader';
import './styles/global.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      const progress = (currentScroll / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app" data-theme={theme}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* Background Elements */}
          <div className="noise"></div>
          <div className="bg-elements">
            <div className="circle c1"></div>
            <div className="circle c2"></div>
            <div className="circle c3"></div>
            <div className="shape s1"></div>
            <div className="shape s2"></div>
          </div>

          {/* Progress Bar */}
          <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

          <Header theme={theme} toggleTheme={toggleTheme} />
          
          <main className="main-content">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </main>
          
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
