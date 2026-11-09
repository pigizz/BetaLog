import { supabase } from './supabase'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Calls the Express API with the logged-in user's access token
async function request(path, options = {}) {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  })

  if (res.status === 204) return null
  const body = await res.json()
  if (!res.ok) throw new Error(body.errors?.join(', ') || body.error || 'Request failed')
  return body
}

export const api = {
  getSessions: () => request('/api/sessions'),
  createSession: (session) => request('/api/sessions', { method: 'POST', body: JSON.stringify(session) }),
  deleteSession: (id) => request(`/api/sessions/${id}`, { method: 'DELETE' }),
}