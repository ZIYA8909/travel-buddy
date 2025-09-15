// routes/feedback.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'no token' });
    try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); } catch (e) { return res.status(401).json({ msg: 'invalid' }) }
}

router.post('/', auth, async (req, res) => {
    try {
        const { trip_id, rating, comments } = req.body;
        const [result] = await pool.query('INSERT INTO feedback (user_id,trip_id,rating,comments) VALUES (?,?,?,?)', [req.user.id, trip_id, rating, comments]);
        res.json({ id: result.insertId });
    } catch (e) { console.error(e); res.status(500).json({ error: 'server error' }) }
});

module.exports = router;
