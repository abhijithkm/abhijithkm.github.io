import React from 'react';
import './Skills.css';
import { skills } from '../../data';

const Skills = () => {
  return (
    <section id="skills" className="section skills-section">
      <div className="section-inner">
        <div className="section-header">
          <h2 className="section-title">My Skills</h2>
          <p className="section-subtitle">Technologies I work with</p>
        </div>

        <div className="skills-container">
          {skills.map((skill, index) => (
            <div className="skill-card" key={index}>
              <div className="skill-header">
                <h3 className="skill-name">{skill.name}</h3>
                <span className="skill-level">{skill.level}</span>
              </div>
              <div className="skill-bar">
                <div 
                  className="skill-progress" 
                  style={{ 
                    width: skill.level === "Expert" ? "90%" : 
                           skill.level === "Advanced" ? "75%" : 
                           skill.level === "Intermediate" ? "60%" : "40%" 
                  }}
                ></div>
              </div>
              <p className="skill-description">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
