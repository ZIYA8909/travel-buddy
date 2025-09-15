require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/universities', require('./routes/universities'));
app.use('/api/trips', require('./routes/trips'));
app.use('/api/feedback', require('./routes/feedback'));

app.get('/api/health', (req, res) => res.json({ ok: true, ts: Date.now() }));

app.listen(port, () => console.log(`✅ Backend running on port ${port}`));
