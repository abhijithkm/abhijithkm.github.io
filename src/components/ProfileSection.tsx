import React from 'react';
import { ProfileSectionProps } from '../config/types';

const ProfileSection: React.FC<ProfileSectionProps> = ({ content }) => {

    return (
        <section>
            {content}
        </section>
    );
};

export default ProfileSection;
