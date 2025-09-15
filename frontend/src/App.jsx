import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CitySelect from './pages/CitySelect';
import UniversityList from './pages/UniversityList';
import UniversityDetail from './pages/UniversityDetail';
import Login from './pages/Login';
import Planner from './pages/Planner';

export default function App() {
    return (
        <BrowserRouter>
            <div style={{ padding: 20 }}>
                <header style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/planner">Planner</Link>
                </header>
                <Routes>
                    <Route path="/" element={<CitySelect />} />
                    <Route path="/city/:cityId" element={<UniversityList />} />
                    <Route path="/university/:id" element={<UniversityDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/planner" element={<Planner />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
