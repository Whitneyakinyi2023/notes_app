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

            {/* Key Features Section */}
            <section className="key-features">
                <h2>Key Features</h2>

                {/* Feature 1 */}
                <div className="Create">
                    <div className="create-image">
                        {/* Replace with actual image, screenshot, gif, or video */}
                        <img src="https://imgur.com/a/VzThZZE" alt="create" />
                    </div>
                    <div className="feature-details">
                        <h3>Creating notes</h3>
                        <p>Allows user to create notes</p>
                    </div>
                </div>

                {/* Feature 2 */}
                <div className="recent">
                    <div className="recent-image">
                        {/* Replace with actual image, screenshot, gif, or video */}
                        <img src="https://imgur.com/a/gClbjlC" alt="Feature 2" />
                    </div>
                    <div className="recent-details">
                        <h3>Recent notes</h3>
                        <p>Recent notes allows user to access recently created notes</p>
                    </div>
                </div>

                {/* Feature 3 */}
                <div className="Search">
                    <div className="search-image">
                        {/* Replace with actual image, screenshot, gif, or video */}
                        <img src="https://imgur.com/a/VqtH4yj" alt="Feature 3" />
                    </div>
                    <div className="feature-details">
                        <h3>Search</h3>
                        <p>Allows user to search for notes</p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section">
                <div className="project-details">
                    <h2>About the Project</h2>
                    <p className="project-description">
                        "Inspiration and Journey

                        SomaSoma wasn't born out of the blue. It stemmed from a fascination with the human brain's incredible ability to connect seemingly disparate ideas. I envisioned a tool that could harness this power, a platform that would bridge the gap between note-taking and mind mapping. The frustration with linear note-taking methods that often left my ideas isolated fueled my desire to create SomaSoma, a non-linear space for fostering creativity and sparking innovation.

                        Timeline and Milestones

                        Over a dedicated 4-week sprint, SomaSoma gradually blossomed from a concept into a functioning prototype. It served as a thrilling culmination of the skills I honed during the ALX Foundations program. The program equipped me with the fundamentals of web development, including building interactive interfaces and managing data structures. These skills became the building blocks for crafting SomaSoma's unique architecture.

                        A Portfolio Showcase for ALX Foundations

                        SomaSoma proudly stands as a testament to the transformative journey I embarked on through ALX Foundations. It embodies the practical application of the knowledge I gained, and it serves as a portfolio piece that showcases my abilities in front-end development, data visualization, and creative problem-solving."                    </p>
                </div>

                <div className="team-section">
                    <h2>Meet the Team</h2>
                    <div className="team-cards">
                        {/* Team Member 1 */}
                        <div className="team-card">
                            <h3>Whitney Akinyi Ologi</h3>
                            <p>Project Manager, Front-end Developer, Back-end Developer, Full Stack Developer, UI/UX Designer.</p>
                            <p><strong>Role:</strong> Manages all aspects of the project, including development, design, and project timelines. Assumes the front-end role and collaborates on UI/UX design.</p>
                            {/* Links */}
                            <div className="social-links">
                                <a href="https://www.linkedin.com/in/whitney-ologi-bb6408287/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                <a href="https://github.com/Whitneyakinyi2023" target="_blank" rel="noopener noreferrer">GitHub</a>
                                <a href="https://twitter.com/ologi_whitney" target="_blank" rel="noopener noreferrer">Twitter</a>
                            </div>
                        </div>

                        {/* Team Member 2 */}
                        <div className="team-card">
                            <h3>Christopher Kimemia Kahura</h3>
                            <p>Full Stack Developer, Back-end Developer, UI/UX Designer.</p>
                            <p><strong>Role:</strong> Assists in backend development and UI/UX design.</p>
                            {/* Links */}
                            <div className="social-links">
                                <a href="https://www.linkedin.com/christopher-kimemia-7a8685275" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                <a href="https://github.com/Kymemia" target="_blank" rel="noopener noreferrer">GitHub</a>
                                <a href="https://twitter.com/KymemiaC" target="_blank" rel="noopener noreferrer">Twitter</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 Portfolio Project for ALX Foundations. All rights reserved.</p>
                <a href="https://github.com/Whitneyakinyi2023/notes_app" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
            </footer>
        </div>
    );
};

export default LandingPage;
