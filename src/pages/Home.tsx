import { Container, Grid } from '@mui/material';
import Education from '../components/Education';
import Experience from '../components/Experience';
import Heading from '../components/Heading';
import ProfileSection from '../components/ProfileSection';
import Projects from '../components/Projects';
import References from '../components/Reference';
import Skills from '../components/Skills';
import { educationData, experienceData, ProfileSectionData, projectsData, referencesList, skills } from '../config/data';

const Home = () => {
    return (
        <Container maxWidth="lg" sx={{ marginTop: 4 }}>
            <Grid container spacing={4} alignItems="flex-start">
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Heading title="A B H I J I T H K M" subtitle="W E B D E V E L O P E R" />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <ProfileSection content={ProfileSectionData} />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Experience experience={experienceData} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Skills skills={skills} />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <Education education={educationData} />
                </Grid>
                <Grid item xs={12}>
                    <Projects project={projectsData} />
                </Grid>
                <Grid item xs={12}>
                    <References references={referencesList} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
