import React from 'react';
import { SkillsProps } from '../config/types';

const Skills: React.FC<SkillsProps> = ({ skills }) => {


    return (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Skills</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {skills.map((skill, index) => (
                    <li key={index} style={{ marginBottom: '10px', fontSize: '18px' }}>
                        {skill}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Skills;
