import React from 'react';
import './NoteTakingTips.css'; // Import CSS for styling

const NoteTakingTips = () => {
    return (
        <div className="note-taking">
            <h2>Note-Taking Tips</h2>
            <div className="tips-container">
                <div className="tip">
                    <h3>Use Bullet Points</h3>
                    <p>Bullet points help to organize information clearly and succinctly. Use them to break down complex ideas.</p>
                </div>
                <div className="tip">
                    <h3>Highlight Key Points</h3>
                    <p>Use colors or bold text to emphasize important information. This helps key points stand out for easy reference.</p>
                </div>
                <div className="tip">
                    <h3>Organize with Headers</h3>
                    <p>Use headers and subheaders to create a hierarchical structure in your notes. This improves readability and navigation.</p>
                </div>
                <div className="tip">
                    <h3>Summarize and Review</h3>
                    <p>Summarize your notes after each session and review them regularly. This reinforces learning and improves retention.</p>
                </div>
                <div className="tip">
                    <h3>Utilize Digital Tools</h3>
                    <p>Explore note-taking apps or tools that offer features like tagging, search, and syncing across devices for enhanced organization.</p>
                </div>
                <div className="tip">
                    <h3>Combine with Visuals</h3>
                    <p>Incorporate diagrams, charts, or mind maps alongside your notes to visualize relationships and concepts.</p>
                </div>
            </div>
        </div>
    );
};

export default NoteTakingTips;
