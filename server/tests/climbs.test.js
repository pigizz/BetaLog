const request = require('supertest');
const app = require('../src/app');
const { validateClimb } = require('../src/routes/climbs');

const USER = '11111111-1111-1111-1111-111111111111';

describe('validateClimb', () => {
  test('accepts a valid climb', () => {
    expect(validateClimb({ grade: 'V4', style: 'overhang', attempts: 3, sent: true }, USER)).toEqual([]);
  });

  test('rejects an unknown grade', () => {
    expect(validateClimb({ grade: 'V20' }, USER)).toContain('Grade must be between V0 and V17');
  });

  test('rejects an unknown style', () => {
    expect(validateClimb({ grade: 'V2', style: 'chimney' }, USER)[0]).toMatch(/Style must be one of/);
  });

  test('rejects zero attempts', () => {
    expect(validateClimb({ grade: 'V2', attempts: 0 }, USER)).toContain('Attempts must be a whole number of at least 1');
  });

  test('accepts a video in the user\'s own folder', () => {
    expect(validateClimb({ grade: 'V2', video_path: `${USER}/clip.mp4` }, USER)).toEqual([]);
  });

  test('rejects a video in someone else\'s folder', () => {
    expect(validateClimb({ grade: 'V2', video_path: 'other-user/clip.mp4' }, USER)).toContain('Video must be uploaded to your own folder');
  });
});

describe('Climbs API auth', () => {
  test('GET /api/sessions/:id/climbs without a token returns 401', async () => {
    const res = await request(app).get('/api/sessions/abc/climbs');
    expect(res.status).toBe(401);
  });

  test('DELETE /api/climbs/:id without a token returns 401', async () => {
    const res = await request(app).delete('/api/climbs/abc');
    expect(res.status).toBe(401);
  });
});