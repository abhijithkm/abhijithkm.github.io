import React from 'react';
import { personalDetails } from '../config/data';

function HeroSection() {
    return (
        <section id="top" className="hero">
            <p className="eyebrow">{personalDetails.role} · {personalDetails.location}</p>
            <h1>{personalDetails.name}</h1>
            <p className="hero-lede">{personalDetails.lede}</p>
            <div className="hero-actions">
                <a className="btn btn-solid" href={`mailto:${personalDetails.email}`}>Email me</a>
                <a className="btn btn-ghost" href={personalDetails.resumeUrl} target="_blank" rel="noreferrer">Download resume</a>
            </div>
            <p className="hero-stack">{personalDetails.stack.join(' · ')}</p>
        </section>
    );
}

export default HeroSection;
