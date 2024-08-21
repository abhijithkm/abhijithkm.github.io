// Heading.tsx

import React from 'react';
import { HeadingProps } from '../config/types';

const Heading: React.FC<HeadingProps> = ({ title, subtitle }) => {

    return (
        <div>
            <h1>
                {title}
            </h1>
            <h2>
                {subtitle}
            </h2>
        </div>
    );
};

export default Heading;
