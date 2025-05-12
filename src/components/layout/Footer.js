import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-logo">Abhijith KM</div>
        <div className="footer-tagline">Creative Developer & Problem Solver</div>
        <div className="footer-nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-social">
          <a href="#" className="social-link"><i className="fab fa-github"></i></a>
          <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
          <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
          <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
        </div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} Abhijith KM. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
