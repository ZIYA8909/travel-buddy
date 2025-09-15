const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

router.post('/register', [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const { name, email, password } = req.body;
        const [rows] = await pool.query('SELECT id FROM users WHERE email=?', [email]);
        if (rows.length) return res.status(400).json({ msg: 'Email already used' });
        const hash = await bcrypt.hash(password, 10);
        const [r] = await pool.query('INSERT INTO users (name,email,password_hash) VALUES (?,?,?)', [name, email, hash]);
        const token = jwt.sign({ id: r.insertId, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token });
    } catch (e) { res.status(500).json({ error: 'server error' }) }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const [rows] = await pool.query('SELECT * FROM users WHERE email=?', [email]);
        if (!rows.length) return res.status(400).json({ msg: 'Invalid credentials' });
        const user = rows[0];
        const ok = await bcrypt.compare(password, user.password_hash);
        if (!ok) return res.status(400).json({ msg: 'Invalid credentials' });
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (e) { res.status(500).json({ error: 'server error' }) }
});

module.exports = router;
