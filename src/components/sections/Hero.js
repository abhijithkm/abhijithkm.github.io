import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="section hero-section">
      <div className="section-inner">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-name">
              <span className="glitch-effect" data-text="Abhijith KM">Abhijith KM</span>
            </h1>
            <div className="hero-title">
              <span className="title-line">Creative Developer</span>
              <div className="rotating-text">
                <span className="rotating-words">
                  <span>React Expert</span>
                  <span>UI/UX Enthusiast</span>
                  <span>Problem Solver</span>
                </span>
              </div>
            </div>
            <p className="hero-desc">I build innovative digital solutions with expertise in React, Laravel, and full-stack development. Passionate about crafting clean & user-friendly experiences.</p>
            <div className="hero-cta">
              <a href="#projects" className="btn primary-btn">View My Work</a>
              <a href="#contact" className="btn outline-btn">Contact Me</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="portrait-wrapper">
              <div className="portrait-mask">
                <img src="https://pixabay.com/get/g1fb17ce2abf8ed41d0d611704cb7c4c78204ea0cc4375fe7743e9f0474d54adca3968dc7e4a89fec73696acabf429b00ee59a15cf1ddbf1ec6899f512a89180b_1280.jpg" alt="Abhijith KM" />
              </div>
              <div className="portrait-outline"></div>
            </div>
            <div className="tech-badges">
              <div className="tech-badge"><span>React</span></div>
              <div className="tech-badge"><span>Laravel</span></div>
              <div className="tech-badge"><span>AWS</span></div>
              <div className="tech-badge"><span>PHP</span></div>
            </div>
          </div>
        </div>
        <a href="#about" className="scroll-indicator">
          <span>Scroll</span>
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
    </section>
  );
};

export default Hero;
