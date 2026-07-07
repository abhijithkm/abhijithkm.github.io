import React from 'react';
import { personalDetails } from '../config/data';

function Footer() {
    return (
        <footer id="contact" className="site-footer">
            <p className="eyebrow">Contact</p>
            <h2>Let's build something.</h2>
            <a className="footer-email" href={`mailto:${personalDetails.email}`}>{personalDetails.email}</a>
            <ul className="footer-links">
                <li><a href={personalDetails.github} target="_blank" rel="noreferrer">GitHub</a></li>
                <li><a href={`tel:${personalDetails.phone.replace(/\s/g, '')}`}>{personalDetails.phone}</a></li>
                <li><a href={personalDetails.resumeUrl} target="_blank" rel="noreferrer">Resume</a></li>
            </ul>
            <p className="footer-copyright">© {new Date().getFullYear()} {personalDetails.name}</p>
        </footer>
    );
}

export default Footer;
