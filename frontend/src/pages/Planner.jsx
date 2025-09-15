import React, { useState } from 'react';
import API from '../api';

export default function Planner() {
    const [univ, setUniv] = useState('');
    const [type, setType] = useState('Friends');
    const [cost, setCost] = useState('Cheap');
    const [places, setPlaces] = useState([]);

    async function planTrip() {
        try {
            const res = await API.get(`/api/universities/search?q=${encodeURIComponent(univ)}`);
            if (!res.data.length) return alert('No university found');
            const university = res.data[0];
            // get details
            const det = await API.get(`/api/universities/${university.id}`);
            const options = (det.data.places || []).filter(p => p.avg_cost === cost);
            // simple selection
            setPlaces(options.slice(0, 5));
        } catch (e) { console.error(e); alert('Error'); }
    }

    return (
        <div>
            <h2>Planner</h2>
            <div>
                <input placeholder="University name" value={univ} onChange={e => setUniv(e.target.value)} />
                <select value={type} onChange={e => setType(e.target.value)}>
                    <option>Friends</option><option>Family</option><option>Weekday</option><option>Weekend</option><option>Surprise</option>
                </select>
                <select value={cost} onChange={e => setCost(e.target.value)}>
                    <option>Cheap</option><option>Moderate</option><option>Expensive</option>
                </select>
                <button onClick={planTrip}>Get Plan</button>
            </div>

            <h3>Suggested Places</h3>
            <ul>
                {places.map(p => <li key={p.id}>{p.name} — {p.category} — {p.avg_cost}</li>)}
            </ul>
        </div>
    );
}
