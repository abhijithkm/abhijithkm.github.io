import React from 'react';
import './About.css';
import { personalDetails } from '../../data';

const About = () => {
  return (
    <section id="about" className="section about-section">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <div className="section-subtitle">My Background</div>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <p className="about-description">{personalDetails.description}</p>
            
            <div className="about-details">
              <div className="detail-item">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{personalDetails.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{personalDetails.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{personalDetails.phone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{personalDetails.address}</span>
              </div>
            </div>
            
            <div className="about-cta">
              <a href="#contact" className="btn primary-btn">Contact Me</a>
              <a href="#" className="btn outline-btn">Download CV</a>
            </div>
          </div>
          
          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">3+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
