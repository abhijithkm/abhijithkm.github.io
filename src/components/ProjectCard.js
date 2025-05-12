import React from 'react';
import { projects } from '../config/data';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function ProjectCard() {
    return (
        <section id="projects" className="project-section p-4 my-4">
            <h2 className="h2 text-center mb-4">Projects</h2>
            <div className="row">
                {projects.map(project => (
                    <div key={project.name} className="col-md-4 mb-3">
                        <Card variant="outlined" className="border-secondary animate__animated animate__fadeIn">
                            <CardContent>
                                <Typography variant="h5" component="div">{project.name}</Typography>
                                <Typography variant="body2" color="text.secondary">{project.description}</Typography>
                                <Button variant="contained" color="primary" href={project.link}>View Project</Button>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProjectCard; 