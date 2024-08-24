import { Box, useTheme } from '@mui/material';
import { skills } from '../config/data'; // Adjust the import path as needed
import GradientText from './GradientText';

const Skills: React.FC = () => {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, padding: '20px' }}>
            {skills.map(skill => (
                <Box
                    key={skill}
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        // height: 75,
                        color: '#e04e79',
                        boxShadow: theme.custom.boxShadow,
                        borderRadius: '5px',
                        textAlign: 'center',
                        padding: '10px 20px',
                        '&:hover': {
                            boxShadow: theme.custom.boxShadowHover,
                        },
                    }}
                >
                    <GradientText sx={{ fontSize: "18px" }}>{skill}</GradientText>
                </Box>
            ))}
        </Box>
    );
};

export default Skills;
