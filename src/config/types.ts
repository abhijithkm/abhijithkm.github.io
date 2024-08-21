export interface HeadingProps {
    title: string;
    subtitle: string;
}

export interface ProfileSectionProps {
    content?: string;
}

export interface SkillsProps {
    skills: string[];
}

export interface EducationProps {
    education: {
        institution: string;
        duration: string;
        degree: string;
    }[];
}

export interface ExperienceProps {
    experience: {
        company: string;
        role: string;
        duration: string;
        responsibilities: string[];
    }[];
}

export interface ProjectProps {
    project: {
        technology: string;
        title: string;
        duration: string;
        description: string;
    }[];
}

export interface ReferenceProps {
    references: {
        name: string;
        position: string;
        phone: string;
        email: string;
    }[];
}