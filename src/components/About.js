import React from 'react';
import { personalDetails, skillGroups } from '../config/data';

function About() {
    return (
        <section id="about" className="section">
            <p className="eyebrow">About</p>
            <div className="about-grid">
                <div className="about-text">
                    {personalDetails.about.map(paragraph => (
                        <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                    ))}
                </div>
                <div className="skill-groups">
                    {skillGroups.map(group => (
                        <div key={group.name} className="skill-group">
                            <h3>{group.name}</h3>
                            <ul className="tag-list">
                                {group.items.map(item => (
                                    <li key={item} className="tag">{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default About;
