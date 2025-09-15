import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

export default function UniversityDetail() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    useEffect(() => { API.get(`/api/universities/${id}`).then(r => setData(r.data)).catch(() => setData(null)); }, [id]);
    if (!data) return <div>Loading...</div>;
    const { university, places, safety } = data;
    return (
        <div>
            <h2>{university.name}</h2>
            <p>{university.state} — {university.district}</p>

            <h3>Suggested places</h3>
            <ul>
                {places.map(p => <li key={p.id}>{p.name} — {p.category} — {p.avg_cost}</li>)}
            </ul>

            <h3>Safety Contacts</h3>
            <ul>
                {safety.map(s => <li key={s.id}>{s.name} — {s.phone}</li>)}
            </ul>
        </div>
    );
}
