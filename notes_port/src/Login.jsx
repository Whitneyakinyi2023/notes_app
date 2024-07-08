import React, { useState } from 'react';
import './Login.css';
import { auth } from './firebase';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [error, setError] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        try {
            await auth.signInWithEmailAndPassword(email, password);
            onLogin();
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        }
    };

    const handleResetPassword = async () => {
        setError('');
        setResetSuccess(false);

        if (!resetEmail) {
            setError('Please enter your email.');
            return;
        }

        try {
            await auth.sendPasswordResetEmail(resetEmail);
            setResetSuccess(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const toggleResetPassword = () => {
        setShowResetPassword(!showResetPassword);
        setResetEmail('');
        setResetSuccess(false);
        setError('');
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo-container">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfxBZuYddfI0M9SBxZQpmgwoN4LVyN60t_hA&s" alt="Logo" className="logo" />
                    <h1 className="tagline">SomaSoma</h1>
                </div>
                {error && <div className="error-message">{error}</div>}
                {!showResetPassword ? (
                    <form onSubmit={handleLogin}>
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
                        <button type="button" className="forgot-password-button" onClick={toggleResetPassword}>
                            Forgot Password?
                        </button>
                    </form>
                ) : (
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
                        <button type="button" className="back-to-login-button" onClick={toggleResetPassword}>
                            Back to Login
                        </button>
                    </div>
                )}
            </div>
            <footer className="footer">
                Enhance your learning experience with integrated tools and seamless functionalities.
            </footer>
        </div>
    );
};

export default Login;
