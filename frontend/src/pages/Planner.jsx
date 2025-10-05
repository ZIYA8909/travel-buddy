import React, { useState } from 'react';
import API from '../api';

export default function Planner() {
    const [univ, setUniv] = useState('');
    const [type, setType] = useState('Friends');
    const [cost, setCost] = useState('Cheap');
    const [places, setPlaces] = useState([]);
    const [error, setError] = useState(''); // For displaying errors without alerts

    async function planTrip() {
        setError(''); // Clear previous errors
        setPlaces([]); // Clear previous results

        if (!univ.trim()) {
            setError('Please enter a university name.');
            return;
        }

        try {
            const res = await API.get(`/api/universities/search?q=${encodeURIComponent(univ)}`);
            if (!res.data.length) {
                setError('No university with that name was found. Please check the spelling and try again.');
                return;
            }

            const university = res.data[0];
            const det = await API.get(`/api/universities/${university.id}`);
            const options = (det.data.places || []).filter(p => p.avg_cost === cost);

            if (!options.length) {
                setError(`No '${cost}' places found for this university. Try a different cost option.`);
                return;
            }

            // Simple selection of up to 5 places
            setPlaces(options.slice(0, 5));
        } catch (e) {
            console.error(e);
            setError('An error occurred while fetching data. Please try again later.');
        }
    }

    return (
        <div className="planner-page">
            <div className="planner-card">
                <h2 className="card-title">Travel Buddy Planner</h2>
                <p className="card-subtitle">Find the perfect spots for your next adventure near your university.</p>

                <div className="form-inputs">
                    <input
                        className="univ-input"
                        placeholder="University name"
                        value={univ}
                        onChange={e => setUniv(e.target.value)}
                    />
                    <select value={type} onChange={e => setType(e.target.value)}>
                        <option>Friends</option>
                        <option>Family</option>
                        <option>Weekday</option>
                        <option>Weekend</option>
                        <option>Surprise</option>
                    </select>
                    <select value={cost} onChange={e => setCost(e.target.value)}>
                        <option>Cheap</option>
                        <option>Moderate</option>
                        <option>Expensive</option>
                    </select>
                    <button className="plan-button" onClick={planTrip}>Get Plan</button>
                </div>
                 {/* Display error message if it exists */}
                {error && <p className="error-message">{error}</p>}
            </div>

            {/* Only show the results container if there are places to display */}
            {places.length > 0 && (
                <div className="results-container">
                    <h3>Suggested Places</h3>
                    <div className="results-grid">
                        {places.map(p => (
                            <div key={p.id} className="place-card">
                                {/* This is a placeholder for an image. You could add real images here later. */}
                                <div className="place-card-image"></div>
                                <div className="place-card-info">
                                    <h4 className="place-name">{p.name}</h4>
                                    <p className="place-details">
                                        {p.category} &bull; <span className={`cost-${p.avg_cost.toLowerCase()}`}>{p.avg_cost}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
