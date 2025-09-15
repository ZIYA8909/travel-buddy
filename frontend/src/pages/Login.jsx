import React, { useState } from 'react';
import API, { setAuthToken } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState(''); const [pw, setPw] = useState('');
    const navigate = useNavigate();

    async function login(e) {
        e.preventDefault();
        try {
            const res = await API.post('/api/auth/login', { email, password: pw });
            const token = res.data.token || res.data?.token;
            if (token) {
                localStorage.setItem('tb_token', token);
                setAuthToken(token);
                navigate('/');
            }
        } catch (err) { alert('Login failed'); console.error(err); }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={login}>
                <div><input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" /></div>
                <div><input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="password" /></div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
