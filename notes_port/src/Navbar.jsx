import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ isAuthenticated, profilePicture }) {
    return (
        <nav className="nav">
            <a href="/" className="site-title">SomaSoma</a>
            <ul>
                <li><Link to="/">Home</Link></li>
                {isAuthenticated ? (
                    <>
                        <li><Link to="/notes">Notes</Link></li>
                        <li><Link to="/LandingPage">About</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                        <li><Link to="/NoteTakingTips">Tips</Link></li>
                        <li className="nav-profile-picture">

                            <Link to="/profile">
                                <img src={profilePicture} alt="Profile" />
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/LandingPage">About</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}
