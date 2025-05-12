import React from 'react';
import './Experience.css';
import { experience } from '../../data';

const Experience = () => {
  return (
    <section id="experience" className="section experience-section">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title">Experience</h2>
          <div className="section-subtitle">My Professional Journey</div>
        </div>
        
        <div className="experience-timeline">
          {experience.map((job, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-content">
                <div className="timeline-header">
                  <div className="company-logo">
                    <img src={job.image} alt={job.name} />
                  </div>
                  <div className="company-info">
                    <h3 className="company-name">{job.name}</h3>
                    <div className="job-title">{job.position}</div>
                    <div className="job-duration">
                      {job.startDate} - {job.endDate}
                    </div>
                  </div>
                </div>
                <p className="job-description">{job.description}</p>
                <div className="tech-stack">
                  {job.techStack.map((tech, techIndex) => (
                    <span className="tech-tag" key={techIndex}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
