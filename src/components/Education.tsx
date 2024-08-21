import React from 'react';
import { EducationProps } from '../config/types';

const Education: React.FC<EducationProps> = ({ education }) => {
    return (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Education</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {education.map((entry, index) => (
                    <li key={index} style={{ marginBottom: '20px' }}>
                        <h3 style={{ margin: 0 }}>{entry.institution}</h3>
                        <p style={{ margin: '5px 0', fontStyle: 'italic' }}>{entry.duration}</p>
                        <p style={{ margin: 0 }}>{entry.degree}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Education;
