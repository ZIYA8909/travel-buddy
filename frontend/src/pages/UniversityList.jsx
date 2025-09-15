import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

export default function UniversityList() {
    const { cityId } = useParams();
    const [unis, setUnis] = useState([]);
    const navigate = useNavigate();
    useEffect(() => { if (cityId) API.get(`/api/universities/city/${cityId}`).then(r => setUnis(r.data)); }, [cityId]);
    return (
        <div>
            <h2>Universities</h2>
            <ul>
                {unis.map(u => (
                    <li key={u.id}>
                        <button onClick={() => navigate(`/university/${u.id}`)}>{u.name} — {u.state}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
