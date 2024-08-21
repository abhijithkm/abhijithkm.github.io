import React from 'react';
import { ProjectProps } from '../config/types';



const Projects: React.FC<ProjectProps> = ({ project }) => {
    return (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Projects Undertaken</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {project.map((project, index) => (
                    <li key={index} style={{ marginBottom: '20px' }}>
                        <h3 style={{ margin: 0 }}>{project.title}</h3>
                        <p style={{ margin: '5px 0', fontStyle: 'italic' }}>{project.duration}</p>
                        <p style={{ margin: '5px 0', fontWeight: 'bold' }}>{project.technology}</p>
                        <p>{project.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Projects;
