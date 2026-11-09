const express = require('express');
const requireAuth = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

function validateSession(body) {
  const errors = [];
  if (!body.gym || !body.gym.trim()) errors.push('Gym is required');
  if (body.duration_min != null && !(Number(body.duration_min) > 0)) {
    errors.push('Duration must be a positive number');
  }
  if (body.energy_level != null) {
    const e = Number(body.energy_level);
    if (!Number.isInteger(e) || e < 1 || e > 5) errors.push('Energy level must be 1-5');
  }
  return errors;
}

// GET /api/sessions â€” list the user's sessions, newest first
router.get('/', async (req, res) => {
  const { data, error } = await req.db
    .from('sessions')
    .select('*')
    .order('session_date', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST /api/sessions â€” log a new session
router.post('/', async (req, res) => {
  const errors = validateSession(req.body);
  if (errors.length) return res.status(400).json({ errors });

  const { session_date, gym, duration_min, energy_level, notes } = req.body;

  const { data, error } = await req.db
    .from('sessions')
    .insert({
      user_id: req.user.id,
      session_date: session_date || undefined,
      gym: gym.trim(),
      duration_min: duration_min || null,
      energy_level: energy_level || null,
      notes: notes || null,
    })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// DELETE /api/sessions/:id â€” delete a session (and its climbs)
router.delete('/:id', async (req, res) => {
  const { error } = await req.db.from('sessions').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(204).end();
});

module.exports = router;
module.exports.validateSession = validateSession;