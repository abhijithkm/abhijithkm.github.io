import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
    return (
        <footer className="bg-dark text-white">
            <p>© 2023 Your Name. All rights reserved.</p>
            <p>
                <a href="https://github.com/yourusername" className="text-white" style={{ marginRight: '10px' }}>
                    <GitHubIcon />
                </a>
                <a href="https://linkedin.com/in/yourusername" className="text-white">
                    <LinkedInIcon />
                </a>
            </p>
        </footer>
    );
}

export default Footer; 