import React, { useState } from 'react';
import './Login.css'; // Custom styles

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("All fields are required.");
            return;
        }

        // Simulate login
        const isLoginSuccessful = true; // Replace with actual authentication logic
        if (isLoginSuccessful) {
            onLogin();
        } else {
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo-container">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfxBZuYddfI0M9SBxZQpmgwoN4LVyN60t_hA&s" alt="Logo" className="logo" />
                    <h1 className="tagline">SomaSoma</h1>
                </div>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Login</button>
                </form>
            </div>
            <footer className="footer">
                Enhance your learning experience with integrated tools and seamless functionalities.
            </footer>
        </div>
    );
};

export default Login;
