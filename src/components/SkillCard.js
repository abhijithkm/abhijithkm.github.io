import React from 'react';
import { skills } from '../config/data';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function SkillCard() {
    return (
        <section id="about" className="skill-section p-4 my-4">
            <h2 className="h2 text-center mb-4">Skills</h2>
            <div className="row">
                {skills.map(skill => (
                    <div key={skill.name} className="col-md-4 mb-3">
                        <Card variant="outlined" className="border-secondary animate__animated animate__fadeIn">
                            <CardContent>
                                <Typography variant="h5" component="div">{skill.name}</Typography>
                                <Typography variant="body2" color="text.secondary">{skill.level}</Typography>
                                <Typography variant="body2" color="text.secondary">{skill.description}</Typography>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default SkillCard; 