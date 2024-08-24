import { Box, Typography } from '@mui/material';
import { heroData } from '../config/data';
import GradientText from './GradientText';

const HeroContent: React.FC = () => {
    return (
        <Box
            sx={{
                padding: '50px 20px',
                color: 'white',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }
            }}
        >
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, flex: 1, zIndex: 1 }}>
                <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 'bold' }} gutterBottom>
                    <GradientText sx={{ fontSize: "5rem" }}>{heroData.title}</GradientText>
                </Typography>
                <Typography variant="h6" sx={{ fontSize: '1.5rem', fontWeight: 'lighter' }} gutterBottom>
                    {heroData.subtitle}
                </Typography>
            </Box>
            <Box sx={{ textAlign: 'right', maxWidth: '600px', flex: 1, p: 1, zIndex: 1 }}>
                <Typography variant="body1" sx={{ fontSize: '1.125rem' }}>
                    {heroData.description}
                </Typography>
            </Box>
        </Box>
    );
};

export default HeroContent;
