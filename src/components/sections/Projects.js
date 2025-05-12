import React, { useState } from 'react';
import './Projects.css';
import { projects } from '../../data';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  
  const handleProjectClick = (index) => {
    setActiveProject(activeProject === index ? null : index);
  };

  return (
    <section id="projects" className="section projects-section">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">Check out some of my recent work</p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              className={`project-card ${activeProject === index ? 'active' : ''}`}
              key={index}
              onClick={() => handleProjectClick(index)}
            >
              <div className="project-image">
                <img src={project.image} alt={project.name} />
                <div className="project-overlay">
                  <div className="project-tech">
                    {project.techStack.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      <i className="fab fa-github"></i> Code
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">
                      <i className="fas fa-external-link-alt"></i> Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
