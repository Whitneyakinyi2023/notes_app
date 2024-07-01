import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
    const [username, setUsername] = useState('JohnDoe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [bio, setBio] = useState('This is a short bio');
    const [profilePicture, setProfilePicture] = useState('path/to/profile-picture.jpg');

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePicture(URL.createObjectURL(file));
        }
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
            <div className="account-settings">
                <h3>Account Settings</h3>
                <button>Change Password</button>
                <button>Notification Preferences</button>
                <button>Privacy Settings</button>
            </div>
            <div className="activity-overview">
                <h3>Recent Activity</h3>
                {/* Display recent activities here */}
            </div>
            <div className="preferences">
                <h3>Preferences</h3>
                {/* Theme and Language Settings */}
            </div>
            <button className="logout-button">Logout</button>
        </div>
    );
};

export default Profile;
