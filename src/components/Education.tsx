import React from 'react';
import { educationData } from '../config/data'; // Adjust the import path as needed
import TimelineComponent from './TimelineComponent';

const Education: React.FC = () => {
    const educationItems = educationData.map(edu => ({
        date: edu.duration,
        title: edu.degree,
        description: edu.institution
    }));

    return <TimelineComponent items={educationItems} title="Education" />;
};

export default Education;
