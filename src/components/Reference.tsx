import React from 'react';
import { ReferenceProps } from '../config/types';

const References: React.FC<ReferenceProps> = ({ references }) => {
    return (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>References</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {references.map((ref, index) => (
                    <li key={index} style={{ marginBottom: '15px' }}>
                        <p><strong>{ref.position}</strong></p>
                        <p><strong>Name:</strong> {ref.name}</p>
                        {/* <p><strong>Phone:</strong> {ref.phone}</p> */}
                        <p><strong>Email:</strong> <a href={`mailto:${ref.email}`}>{ref.email}</a></p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default References;
