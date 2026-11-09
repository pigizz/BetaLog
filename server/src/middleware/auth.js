const { supabaseForUser } = require('../config/supabase');

// Verifies the Supabase access token sent from the frontend
// and attaches the user and a user-scoped DB client to the request.
async function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Missing access token' });
  }

  const db = supabaseForUser(token);
  const { data, error } = await db.auth.getUser(token);

  if (error || !data?.user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  req.user = data.user;
  req.db = db;
  next();
}

module.exports = requireAuth;