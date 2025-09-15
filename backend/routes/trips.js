// routes/trips.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'no token' });
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (e) { return res.status(401).json({ msg: 'invalid token' }) }
}

// create trip
router.post('/', auth, async (req, res) => {
    try {
        const { university_id, trip_type, cost_pref, places, notes, is_day_trip } = req.body;
        const [result] = await pool.query('INSERT INTO trips (user_id,university_id,trip_type,cost_pref,places,notes,is_day_trip) VALUES (?,?,?,?,?,?,?)', [
            req.user.id, university_id, trip_type, cost_pref, JSON.stringify(places || []), notes || null, !!is_day_trip
        ]);
        res.json({ id: result.insertId });
    } catch (e) { console.error(e); res.status(500).json({ error: 'server error' }) }
});

// list user trips
router.get('/', auth, async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM trips WHERE user_id=? ORDER BY created_at DESC', [req.user.id]);
    res.json(rows);
});

// get trip detail
router.get('/:id', auth, async (req, res) => {
    const id = req.params.id;
    const [rows] = await pool.query('SELECT * FROM trips WHERE id=? AND user_id=?', [id, req.user.id]);
    if (!rows.length) return res.status(404).json({ msg: 'not found' });
    res.json(rows[0]);
});

module.exports = router;
