const express = require('express');
const cors = require('cors');
const sessionsRouter = require('./routes/sessions');
const climbsRouter = require('./routes/climbs');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/sessions', sessionsRouter);
app.use('/api/climbs', climbsRouter);

module.exports = app;