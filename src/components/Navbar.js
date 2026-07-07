import React, { useState } from 'react';
import { personalDetails } from '../config/data';

function currentTheme() {
    const set = document.documentElement.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function Navbar() {
    const [theme, setTheme] = useState(() => currentTheme());

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
        setTheme(next);
    };

    return (
        <header className="site-nav">
            <nav aria-label="Main">
                <a className="brand" href="#top">Abhijith K M</a>
                <ul className="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#experience">Experience</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <div className="nav-actions">
                    <a className="btn btn-ghost btn-sm" href={personalDetails.resumeUrl} target="_blank" rel="noreferrer">Resume</a>
                    <button
                        type="button"
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                    >
                        {theme === 'dark' ? '☀' : '☾'}
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
