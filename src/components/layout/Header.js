import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ theme, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`main-nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#home" className="nav-logo">
        Abhijith<span className="dot-marker"></span>KM
      </a>

      <div className="nav-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
        <div className="menu-bg"></div>
        <div className="menu-content">
          <div className="menu-items">
            <a href="#home" className="menu-link" data-text="Home">Home</a>
            <a href="#about" className="menu-link" data-text="About">About</a>
            <a href="#experience" className="menu-link" data-text="Experience">Experience</a>
            <a href="#projects" className="menu-link" data-text="Projects">Projects</a>
            <a href="#skills" className="menu-link" data-text="Skills">Skills</a>
            <a href="#contact" className="menu-link" data-text="Contact">Contact</a>
          </div>
          <div className="menu-footer">
            <div className="social-links">
              <a href="#" className="social-link"><i className="fab fa-github"></i></a>
              <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
            </div>
            <div className="menu-info">
              <p>meabhijithkm@gmail.com</p>
              <p>+91 9188418821</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dark/Light Mode Toggle */}
      <div className="mode-toggle" onClick={toggleTheme}>
        <div className="toggle-icon">
          <i className="fas fa-sun"></i>
          <i className="fas fa-moon"></i>
        </div>
      </div>
    </nav>
  );
};

export default Header;
