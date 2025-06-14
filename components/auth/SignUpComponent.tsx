"use client";

import React, { useState } from 'react';

interface SignUpProps {
    onSignUp?: (email: string, password: string) => void;
}

const SignUpComponent: React.FC<SignUpProps> = ({ onSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (onSignUp) {
            onSignUp(email, password);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            <h2>Sign Up</h2>
            {error && <div className="error">{error}</div>}
            <div>
                <label htmlFor="signup-email">Email</label>
                <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                />
            </div>
            <div>
                <label htmlFor="signup-password">Password</label>
                <input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                />
            </div>
            <div>
                <label htmlFor="signup-confirm-password">Confirm Password</label>
                <input
                    id="signup-confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUpComponent;