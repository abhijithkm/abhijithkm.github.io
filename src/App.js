import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SkillCard from './components/SkillCard';
import ProjectCard from './components/ProjectCard';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HeroSection />} />
                <Route path="/about" element={<SkillCard />} />
                <Route path="/projects" element={<ProjectCard />} />
                {/* Add more routes as needed */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
