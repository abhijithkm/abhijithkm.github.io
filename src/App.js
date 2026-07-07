import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Footer from './components/Footer';

function App() {
    return (
        <>
            <Navbar />
            <main>
                <HeroSection />
                <About />
                <Experience />
                <Projects />
                <Education />
            </main>
            <Footer />
        </>
    );
}

export default App;
