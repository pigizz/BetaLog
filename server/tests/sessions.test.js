const request = require('supertest');
const app = require('../src/app');
const { validateSession } = require('../src/routes/sessions');

describe('validateSession', () => {
  test('accepts a valid session', () => {
    expect(validateSession({ gym: 'Boulder Planet', duration_min: 90, energy_level: 4 })).toEqual([]);
  });

  test('requires a gym', () => {
    expect(validateSession({ gym: '  ' })).toContain('Gym is required');
  });

  test('rejects energy level outside 1-5', () => {
    expect(validateSession({ gym: 'X', energy_level: 7 })).toContain('Energy level must be 1-5');
  });
});

describe('API', () => {
  test('GET /api/health returns ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /api/sessions without a token returns 401', async () => {
    const res = await request(app).get('/api/sessions');
    expect(res.status).toBe(401);
  });
});