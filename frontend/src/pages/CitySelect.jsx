import React from 'react';
import { Link } from 'react-router-dom';

// --- SVG Icons for Features Section ---

const PlannerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        <path d="M9 14l2 2 4-4"></path>
    </svg>
);

const CompassIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
    </svg>
);

const BudgetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" x2="12" y1="1" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
);


// --- Main Home Component ---

export default function Home() {
    return (
        <div className="homepage">
            {/* 1. Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">Your Next Adventure Awaits</h1>
                    <p className="hero-subtitle">Intelligently plan trips with friends and family. Discover hidden gems near you.</p>
                    <Link to="/cities" className="hero-cta-button">Get Started</Link>
                </div>
            </section>

            {/* 2. Features Section */}
            <section className="features-section">
                <div className="features-container">
                    <div className="section-header">
                        <h2 className="section-title">Why Choose Travel Buddy?</h2>
                        <p className="section-subtitle">Everything you need for the perfect getaway, all in one place.</p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon"><PlannerIcon /></div>
                            <h3 className="feature-title">AI-Powered Planning</h3>
                            <p className="feature-description">
                                Our smart planner suggests the best spots based on your group type and budget.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon"><CompassIcon /></div>
                            <h3 className="feature-title">Discover New Cities</h3>
                            <p className="feature-description">
                                Explore universities and their surrounding attractions across the country.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon"><BudgetIcon /></div>
                            <h3 className="feature-title">Budget-Friendly Options</h3>
                            <p className="feature-description">
                                Easily filter places by cost, from cheap eats to exclusive experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Call to Action Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to Start Your Journey?</h2>
                    <p className="cta-subtitle">Create an account to save your plans and access all features.</p>
                    <Link to="/login" className="cta-button">Sign Up Now</Link>
                </div>
            </section>
        </div>
    );
}
