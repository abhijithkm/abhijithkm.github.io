import React from 'react';
import { personalDetails } from '../config/data';
import Button from '@mui/material/Button';
import ContactMailIcon from '@mui/icons-material/ContactMail';

function HeroSection() {
    return (
        <section id="home" className="hero-section text-center shadow-lg">
            <h1 className="display-4 animate__animated animate__fadeIn">{personalDetails.name}</h1>
            <p className="lead animate__animated animate__fadeIn">{personalDetails.tagline}</p>
            <Button 
                variant="contained" 
                color="success" 
                startIcon={<ContactMailIcon />} 
                className="mt-3 animate__animated animate__fadeIn"
            >
                Contact Me
            </Button>
        </section>
    );
}

export default HeroSection; 