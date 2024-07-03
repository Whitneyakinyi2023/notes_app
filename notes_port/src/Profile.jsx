import React, { useState } from 'react';
import './Profile.css';

const Profile = ({ profilePicture, setProfilePicture }) => {
    const [username, setUsername] = useState('JohnDoe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [bio, setBio] = useState('This is a short bio');

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePicture(URL.createObjectURL(file));
        }
    };

    const handleSaveProfile = () => {
        // Implement logic to save the profile details
        alert('Profile saved successfully!');
    };

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <div className="profile-picture">
                <img src={profilePicture} alt="Profile" />
                <input type="file" onChange={handleProfilePictureChange} />
            </div>
            <div className="profile-info">
                <div className="profile-field">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="profile-field">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="profile-field">
                    <label>Bio:</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                </div>
            </div>
            <button className="save-button" onClick={handleSaveProfile}>Save</button>
            <div className="account-settings">
                <h3>Account Settings</h3>
                <button>Change Password</button>
                <button>Notification Preferences</button>
                <button>Privacy Settings</button>
            </div>
            <div className="activity-overview">
                <h3>Recent Activity</h3>
                <ul>
                    <li>Updated profile picture</li>
                    <li>Changed password</li>
                    <li>Joined a new group: React Developers</li>
                    <li>Posted a new note</li>
                </ul>
            </div>
            <div className="preferences">
                <h3>Preferences</h3>
                <div className="preferences-field">
                    <label>Theme:</label>
                    <select>
                        <option>Light</option>
                        <option>Dark</option>
                        <option>System Default</option>
                    </select>
                </div>
                <div className="preferences-field">
                    <label>Language:</label>
                    <select>
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                    </select>
                </div>
            </div>
            <button className="logout-button">Logout</button>
        </div>
    );
};

export default Profile;
