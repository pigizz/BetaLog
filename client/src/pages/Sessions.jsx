import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import SessionForm from '../components/SessionForm'

export default function Sessions() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSessions()
      .then(setSessions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleCreate(session) {
    const created = await api.createSession(session)
    setSessions((prev) => [created, ...prev])
  }

  async function handleDelete(id) {
    if (!confirm('Delete this session?')) return
    await api.deleteSession(id)
    setSessions((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-6">
      <SessionForm onSubmit={handleCreate} />

      <section>
        <h2 className="mb-3 text-lg font-semibold">Your sessions</h2>
        {loading && <p className="text-rock/70">Loadingâ€¦</p>}
        {error && <p className="text-rust">{error}</p>}
        {!loading && !error && sessions.length === 0 && (
          <p className="text-rock/70">No sessions yet. Log your first one above!</p>
        )}

        <ul className="space-y-3">
          {sessions.map((s) => (
            <li key={s.id} className="rounded-xl border-l-4 border-tea bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{s.gym}</p>
                  <p className="text-sm text-rock/70">
                    {new Date(s.session_date).toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' })}
                    {s.duration_min && ` Â· ${s.duration_min} min`}
                    {s.energy_level && ` Â· Energy ${s.energy_level}/5`}
                  </p>
                </div>
                <button onClick={() => handleDelete(s.id)} className="text-sm text-rock/50 hover:text-rust">
                  Delete
                </button>
              </div>
              {s.notes && <p className="mt-2 text-sm text-rock/90">{s.notes}</p>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}