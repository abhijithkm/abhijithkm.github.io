import React from 'react';
import { experienceData } from '../config/data'; // Adjust the import path as needed
import TimelineComponent from './TimelineComponent';

const Experience: React.FC = () => {
    const experienceItems = experienceData.map(exp => ({
        date: exp.duration,
        title: `${exp.role} at ${exp.company}`,
        description: exp.responsibilities.join(', ')
    }));

    return <TimelineComponent items={experienceItems} title="Experience" />;
};

export default Experience;
