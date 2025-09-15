import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function CitySelect() {
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();
    useEffect(() => { API.get('/api/universities/cities').then(r => setCities(r.data)).catch(() => setCities([])); }, []);
    return (
        <div>
            <h2>Select City</h2>
            <ul>
                {cities.map(c => (
                    <li key={c.id}>
                        <button onClick={() => navigate(`/city/${c.id}`)}>{c.name}, {c.state}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
