import React from 'react';
import { experience } from '../config/data';

function Experience() {
    return (
        <section id="experience" className="section">
            <p className="eyebrow">Experience</p>
            <h2>The climb: tradesman, instructor, engineer.</h2>
            <ol className="timeline">
                {experience.map(job => (
                    <li key={job.position + job.period} className="timeline-item">
                        <p className="timeline-period">{job.period}</p>
                        <div className="timeline-body">
                            <h3>{job.position}</h3>
                            <p className="timeline-company">{job.company}</p>
                            <ul className="timeline-points">
                                {job.points.map(point => (
                                    <li key={point.slice(0, 24)}>{point}</li>
                                ))}
                            </ul>
                            <ul className="tag-list">
                                {job.techStack.map(tech => (
                                    <li key={tech} className="tag">{tech}</li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}

export default Experience;
