const express = require('express');
const requireAuth = require('../middleware/auth');
const { validateClimb, removeVideos } = require('./climbs');

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

// GET /api/sessions â€” list the user's sessions, newest first,
// with each session's climbs (grade and sent) for the logbook summary
router.get('/', async (req, res) => {
  const { data, error } = await req.db
    .from('sessions')
    .select('*, climbs(grade, sent)')
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

// GET /api/sessions/:id â€” one session
router.get('/:id', async (req, res) => {
  const { data, error } = await req.db
    .from('sessions')
    .select('*')
    .eq('id', req.params.id)
    .maybeSingle();

  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.status(404).json({ error: 'Session not found' });
  res.json(data);
});

// DELETE /api/sessions/:id â€” delete a session, its climbs and their videos
router.delete('/:id', async (req, res) => {
  const { data: climbs } = await req.db
    .from('climbs')
    .select('video_path')
    .eq('session_id', req.params.id);

  const { error } = await req.db.from('sessions').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });

  await removeVideos(req.db, (climbs || []).map((c) => c.video_path));
  res.status(204).end();
});

// GET /api/sessions/:id/climbs â€” climbs logged in a session, oldest first
router.get('/:id/climbs', async (req, res) => {
  const { data, error } = await req.db
    .from('climbs')
    .select('*')
    .eq('session_id', req.params.id)
    .order('created_at', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST /api/sessions/:id/climbs â€” log a climb in a session
router.post('/:id/climbs', async (req, res) => {
  const errors = validateClimb(req.body, req.user.id);
  if (errors.length) return res.status(400).json({ errors });

  const { grade, style, attempts, sent, notes, video_path } = req.body;

  const { data, error } = await req.db
    .from('climbs')
    .insert({
      session_id: req.params.id,
      user_id: req.user.id,
      grade,
      style: style || null,
      attempts: attempts ? Number(attempts) : 1,
      sent: Boolean(sent),
      notes: notes || null,
      video_path: video_path || null,
    })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

module.exports = router;
module.exports.validateSession = validateSession;