// src/LandingPage.js
import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <header className="landing-header">
                <h1>Welcome to SomaSoma</h1>
                <p>This is a brief introduction to the project and its features.</p>
                <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                    Explore More
                </button>
            </header>
            <section className="project-details">
                <h2>About the Project</h2>
                <p>Details about what this project does, the technologies used, and its purpose.</p>
            </section>
            <section className="footer">
                <p>&copy; 2024 Portfolio Project. All rights reserved.</p>
            </section>
        </div>
    );
};

export default LandingPage;
