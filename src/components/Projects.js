import React from 'react';
import { projects } from '../config/data';

function Projects() {
    return (
        <section id="projects" className="section">
            <p className="eyebrow">Projects</p>
            <h2>Software that institutions run on.</h2>
            <p className="section-note">Built for organisations and colleges — most run behind logins, so there are no public demos.</p>
            <div className="project-grid">
                {projects.map(project => (
                    <article key={project.name} className="project-card">
                        <p className="project-period">{project.period}</p>
                        <h3>{project.name}</h3>
                        <p className="project-client">{project.client}</p>
                        <p className="project-description">{project.description}</p>
                        <ul className="tag-list">
                            {project.techStack.map(tech => (
                                <li key={tech} className="tag">{tech}</li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Projects;
