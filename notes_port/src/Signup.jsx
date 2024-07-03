import React, { useState } from 'react';
import "./Signup.css";
import { auth } from './firebase'; // Import auth from your firebase setup

const Signup = ({ onSignup }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = formData;
        if (!username || !email || !password) {
            setError("All fields are required.");
            return;
        }

        try {
            await auth.createUserWithEmailAndPassword(email, password);
            onSignup();
        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                setError("The email address is already in use by another account.");
            } else {
                setError(err.message);
            }
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
