import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

const projects = [
    { title: 'Project One', description: 'Description of project one.' },
    { title: 'Project Two', description: 'Description of project two.' },
    // Add more projects here
];

const Projects: React.FC = () => {
    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Projects
            </Typography>
            <Grid container spacing={2}>
                {projects.map(project => (
                    <Grid item xs={12} sm={6} md={4} key={project.title}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{project.title}</Typography>
                                <Typography variant="body2">{project.description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Projects;
