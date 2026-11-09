const express = require('express');
const requireAuth = require('../middleware/auth');

const VIDEO_BUCKET = 'climb-videos';
const GRADES = Array.from({ length: 18 }, (_, i) => `V${i}`);
const STYLES = ['slab', 'overhang', 'vertical', 'crimp', 'dyno', 'roof'];

function validateClimb(body, userId) {
  const errors = [];
  if (!GRADES.includes(body.grade)) errors.push('Grade must be between V0 and V17');
  if (body.style && !STYLES.includes(body.style)) errors.push(`Style must be one of: ${STYLES.join(', ')}`);
  if (body.attempts != null) {
    const a = Number(body.attempts);
    if (!Number.isInteger(a) || a < 1) errors.push('Attempts must be a whole number of at least 1');
  }
  if (body.video_path && !String(body.video_path).startsWith(`${userId}/`)) {
    errors.push('Video must be uploaded to your own folder');
  }
  return errors;
}

// Deletes video files from storage, ignoring empty paths
async function removeVideos(db, paths) {
  const files = paths.filter(Boolean);
  if (files.length) await db.storage.from(VIDEO_BUCKET).remove(files);
}

const router = express.Router();
router.use(requireAuth);

// DELETE /api/climbs/:id â€” delete a climb and its video
router.delete('/:id', async (req, res) => {
  const { data: climb, error: findError } = await req.db
    .from('climbs')
    .select('video_path')
    .eq('id', req.params.id)
    .maybeSingle();

  if (findError) return res.status(500).json({ error: findError.message });
  if (!climb) return res.status(404).json({ error: 'Climb not found' });

  const { error } = await req.db.from('climbs').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });

  await removeVideos(req.db, [climb.video_path]);
  res.status(204).end();
});

module.exports = router;
module.exports.validateClimb = validateClimb;
module.exports.removeVideos = removeVideos;
module.exports.GRADES = GRADES;
module.exports.STYLES = STYLES;