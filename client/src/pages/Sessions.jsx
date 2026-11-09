import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import { summarise } from '../lib/climbing'
import SessionForm from '../components/SessionForm'
import EnergyHolds from '../components/EnergyHolds'

function formatDate(iso) {
  const d = new Date(`${iso}T00:00:00`)
  return {
    day: d.getDate(),
    month: d.toLocaleDateString('en-SG', { month: 'short' }),
    weekday: d.toLocaleDateString('en-SG', { weekday: 'long' }),
  }
}

export default function Sessions() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    api.getSessions()
      .then(setSessions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleCreate(session) {
    const created = await api.createSession(session)
    navigate(`/sessions/${created.id}`)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this session? This also deletes its climbs.')) return
    try {
      await api.deleteSession(id)
      setSessions((prev) => prev.filter((s) => s.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration_min || 0), 0)

  return (
    <div className="grid gap-10 lg:grid-cols-[360px_1fr] lg:items-start">
      <div className="lg:sticky lg:top-6">
        <SessionForm onSubmit={handleCreate} />
      </div>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-rock pb-3">
          <h2 className="font-wide text-3xl">Your logbook</h2>
          {sessions.length > 0 && (
            <p className="text-sm text-rock/70">
              {sessions.length} {sessions.length === 1 ? 'session' : 'sessions'}, {Math.round(totalMinutes / 60)} hours on the wall
            </p>
          )}
        </div>

        {loading && <p className="py-8 text-rock/70">Loading your sessionsâ€¦</p>}
        {error && (
          <p className="mt-4 rounded-lg border-l-4 border-rust bg-white px-4 py-3 text-sm text-rust">
            Couldn't load your sessions: {error}. Check the API server is running, then refresh.
          </p>
        )}

        {!loading && !error && sessions.length === 0 && (
          <div className="py-16 text-center">
            <p className="font-wide text-xl">Your logbook is empty</p>
            <p className="mx-auto mt-2 max-w-xs text-rock/70">Log your first session to start tracking your progress.</p>
          </div>
        )}

        <ol>
          {sessions.map((s) => {
            const { day, month, weekday } = formatDate(s.session_date)
            const { total, sent, hardest } = summarise(s.climbs)
            return (
              <li key={s.id} className="group grid grid-cols-[4.5rem_1fr] gap-5 border-b border-rock/15 py-5">
                <div className="flex h-[4.5rem] flex-col items-center justify-center self-start rounded-xl bg-moss-dark text-lichen">
                  <span className="font-wide text-3xl leading-none">{day}</span>
                  <span className="mt-1 text-xs font-medium text-tea">{month}</span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold">
                        <Link to={`/sessions/${s.id}`} className="decoration-tea decoration-2 underline-offset-4 hover:underline">
                          {s.gym}
                        </Link>
                      </h3>
                      <p className="text-sm text-rock/70">{weekday}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="rounded-md px-2 py-1 text-sm text-rock/50 transition-colors hover:bg-rust/10 hover:text-rust focus:text-rust sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                    {s.duration_min && (
                      <span className="rounded-full bg-tea px-3 py-0.5 font-semibold">{s.duration_min} min</span>
                    )}
                    {s.energy_level && <EnergyHolds value={s.energy_level} size="sm" />}
                    <Link to={`/sessions/${s.id}`} className="font-semibold text-moss hover:underline">
                      {total === 0 ? 'Add climbs' : `${sent} of ${total} sent${hardest ? `, hardest ${hardest}` : ''}`}
                    </Link>
                  </div>

                  {s.notes && <p className="mt-3 max-w-prose leading-relaxed text-rock/90">{s.notes}</p>}
                </div>
              </li>
            )
          })}
        </ol>
      </section>
    </div>
  )
}