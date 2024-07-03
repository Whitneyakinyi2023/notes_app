import React, { useState } from 'react';
import './Login.css'; // Custom styles
import { auth } from './firebase'; // Import auth from your firebase setup

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [resetEmail, setResetEmail] = useState("");
    const [resetSuccess, setResetSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("All fields are required.");
            return;
        }

        try {
            await auth.signInWithEmailAndPassword(email, password);
            onLogin();
        } catch (err) {
            setError("Invalid email or password.");
        }
    };

    const handleResetPassword = async () => {
        try {
            await auth.sendPasswordResetEmail(resetEmail);
            setResetSuccess(true);
            setError("");
        } catch (err) {
            setError(err.message);
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
                <div className="password-reset">
                    <input
                        type="email"
                        placeholder="Enter your email to reset password"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                    />
                    <button onClick={handleResetPassword} className="reset-button">Reset Password</button>
                    {resetSuccess && <p>Password reset email sent successfully. Check your inbox.</p>}
                </div>
            </div>
            <footer className="footer">
                Enhance your learning experience with integrated tools and seamless functionalities.
            </footer>
        </div>
    );
};

export default Login;
