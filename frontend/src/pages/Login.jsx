import React, { useState } from 'react';
import API, { setAuthToken } from '../api';
import { useNavigate } from 'react-router-dom';

// --- SVG Icons as React Components ---

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

const EyeIcon = ({ isVisible, ...props }) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="password-toggle-icon">
        {isVisible ? (
            <>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </>
        ) : (
            <>
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            </>
        )}
    </svg>
);


// --- Main Login Component ---

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        // Basic email validation regex
        if (!email) {
            newErrors.email = 'Email address is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (!password) {
            newErrors.password = 'Password is required.';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
        }

        setErrors(newErrors);
        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({}); // Clear previous errors

        try {
            const res = await API.post('/api/auth/login', { email, password });
            const token = res.data.token;

            if (token) {
                localStorage.setItem('tb_token', token);
                setAuthToken(token);
                navigate('/');
            } else {
                setErrors({ form: 'Login failed. Please check your credentials.' });
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Login failed. An unknown error occurred.';
            setErrors({ form: errorMsg });
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            {/* Left Branding Panel */}
            <div className="login-branding-panel">
                <div className="branding-content">
                    <h1 className="branding-title">Travel Buddy</h1>
                    <p className="branding-subtitle">Your adventure starts here. Login to plan your next trip.</p>
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="login-form-panel">
                <div className="form-wrapper">
                    <h2 className="form-title">Welcome Back!</h2>
                    <p className="form-subtitle">Please sign in to continue.</p>

                    <form onSubmit={handleLogin} noValidate>
                        {/* Email Input */}
                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-field-wrapper">
                                <MailIcon />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className={errors.email ? 'input-error' : ''}
                                />
                            </div>
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </div>

                        {/* Password Input */}
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-field-wrapper">
                                <LockIcon />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className={errors.password ? 'input-error' : ''}
                                />
                                <EyeIcon isVisible={showPassword} onClick={() => setShowPassword(!showPassword)} />
                            </div>
                            {errors.password && <p className="error-text">{errors.password}</p>}
                        </div>

                        <div className="form-options">
                            <a href="#" className="forgot-password-link">Forgot Password?</a>
                        </div>
                        
                        {errors.form && <p className="error-text form-error">{errors.form}</p>}

                        {/* Submit Button */}
                        <button type="submit" className="submit-button" disabled={isLoading}>
                            {isLoading ? <div className="spinner"></div> : 'Sign In'}
                        </button>

                        <div className="divider">
                            <span>OR</span>
                        </div>

                        {/* Social Logins */}
                        <button type="button" className="social-button google">
                           Continue with Google
                        </button>
                        <button type="button" className="social-button facebook">
                           Continue with Facebook
                        </button>

                         <p className="signup-link">
                            Don't have an account? <a href="#">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

