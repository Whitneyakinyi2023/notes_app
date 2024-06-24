import React, { useState } from 'react';

function Signup({ onSignup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        // Mock signup logic (replace with your backend integration)
        const newUser = {
            email,
            password
        };
        console.log("Signed up:", newUser);
        // Simulate signup success
        onSignup();
    };

    return (
        <div className="Signup">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
