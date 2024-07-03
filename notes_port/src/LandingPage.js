import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onLogin, onSignup }) => {
    return (
        <div className="landing-page">
            <header className="landing-header">
                <h1>SomaSoma &#128214;</h1>
                <p>Enhance your learning experience with integrated tools and seamless functionalities.</p>
                <div className="buttons">
                    <button onClick={onLogin}>Login</button>
                    <button onClick={onSignup}>Signup</button>
                </div>
                <button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                    Explore More
                </button>
            </header>
            <section className="about-section">
                <div className="project-details">
                    <h2>About the Project</h2>
                    <p className="project-description">"The 'SomaSoma' project aims to create a web application that enhances the study experience by integrating various tools into a single platform. It provides features such as Spotify integration for music, note-taking, PDF viewing, and YouTube integration."</p>
                </div>
                <div className="team-section">
                    <h2>Meet the Team</h2>
                    <div className="team-cards">
                        <div className="team-card">
                            <h3>Whitney Akinyi Ologi</h3>
                            <p>Project Manager, Front-end Developer, Back-end Developer, Full Stack Developer, UI/UX Designer.</p>
                            <p><strong>Role:</strong> Manages all aspects of the project, including development, design, and project timelines. Assumes the front-end role and collaborates on UI/UX design.</p>
                        </div>
                        <div className="team-card">
                            <h3>Christopher Kimemia Kahura</h3>
                            <p>Full Stack Developer, Back-end Developer, UI/UX Designer.</p>
                            <p><strong>Role:</strong> Assists in backend development and UI/UX design.</p>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="footer">
                <p>&copy; 2024 Portfolio Project for ALX Foundations. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
