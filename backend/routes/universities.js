// routes/universities.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// get list of cities
router.get('/cities', async (req, res) => {
    const [rows] = await pool.query('SELECT id,name,state FROM cities ORDER BY name');
    res.json(rows);
});

// universities by city
router.get('/city/:cityId', async (req, res) => {
    const { cityId } = req.params;
    const [rows] = await pool.query('SELECT id,name,state,district,website FROM universities WHERE city_id=? ORDER BY name', [cityId]);
    res.json(rows);
});

// search universities by query
router.get('/search', async (req, res) => {
    const q = (req.query.q || '').trim();
    if (!q) return res.json([]);
    const like = `%${q}%`;
    const [rows] = await pool.query('SELECT id,name,state,website FROM universities WHERE name LIKE ? OR state LIKE ? LIMIT 200', [like, like]);
    res.json(rows);
});

// university detail (places & safety)
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const [unis] = await pool.query('SELECT * FROM universities WHERE id=?', [id]);
    if (!unis.length) return res.status(404).json({ error: 'not found' });
    const uni = unis[0];
    const [places] = await pool.query('SELECT * FROM places WHERE university_id=?', [id]);
    const [safety] = await pool.query('SELECT * FROM safety_contacts WHERE university_id=?', [id]);
    res.json({ university: uni, places, safety });
});

module.exports = router;
