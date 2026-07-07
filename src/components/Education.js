import React from 'react';
import { education } from '../config/data';

function Education() {
    return (
        <section id="education" className="section">
            <p className="eyebrow">Education</p>
            <div className="education-grid">
                {education.map(entry => (
                    <div key={entry.degree} className="education-card">
                        <p className="project-period">{entry.period}</p>
                        <h3>{entry.degree}</h3>
                        <p className="project-client">{entry.institution}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Education;
