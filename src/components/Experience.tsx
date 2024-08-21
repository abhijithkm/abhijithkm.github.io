import React from 'react';
import { ExperienceProps } from '../config/types';


const Experience: React.FC<ExperienceProps> = ({ experience }) => {
    return (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }} >
            <h2>Experience</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {experience.map((entry, index) => (
                    <li key={index} style={{ marginBottom: '20px' }}>
                        <h3 style={{ margin: 0 }}>{entry.company}</h3>
                        <p style={{ margin: '5px 0', fontStyle: 'italic' }}>{entry.duration}</p>
                        <p style={{ margin: '5px 0', fontWeight: 'bold' }}>{entry.role}</p>
                        <ul style={{ paddingLeft: '20px' }}>
                            {entry.responsibilities.map((responsibility, idx) => (
                                <li key={idx}>{responsibility}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Experience;
