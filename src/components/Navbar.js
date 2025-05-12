import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('bg-dark', !darkMode);
        document.body.classList.toggle('text-white', !darkMode);
    };

    return (
        <nav className={`navbar navbar-expand-lg ${darkMode ? 'bg-dark' : 'bg-light'} text-white`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">My Portfolio</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/projects">Projects</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/resume">Resume</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
                        <li className="nav-item">
                            <button onClick={toggleDarkMode} className="btn btn-secondary ms-2">
                                {darkMode ? 'Light Mode' : 'Dark Mode'}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar; 