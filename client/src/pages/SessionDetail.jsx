import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { summarise } from '../lib/climbing'
import ClimbForm from '../components/ClimbForm'
import ClimbCard from '../components/ClimbCard'
import EnergyHolds from '../components/EnergyHolds'

export default function SessionDetail() {
  const { id } = useParams()
  const [session, setSession] = useState(null)
  const [climbs, setClimbs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([api.getSession(id), api.getClimbs(id)])
      .then(([s, c]) => {
        setSession(s)
        setClimbs(c)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  async function handleCreate(climb) {
    const created = await api.createClimb(id, climb)
    setClimbs((prev) => [...prev, created])
  }

  async function handleDelete(climbId) {
    if (!confirm('Delete this climb? Its video will be deleted too.')) return
    try {
      await api.deleteClimb(climbId)
      setClimbs((prev) => prev.filter((c) => c.id !== climbId))
    } catch (err) {
      setError(err.message)
    }
  }

  const back = (
    <Link to="/" className="text-sm font-semibold text-moss underline decoration-tea decoration-2 underline-offset-4 hover:decoration-moss">
      Back to logbook
    </Link>
  )

  if (loading) return <p className="text-rock/70">Loading sessionâ€¦</p>
  if (!session) {
    return (
      <div className="space-y-4">
        {back}
        <p className="rounded-lg border-l-4 border-rust bg-white px-4 py-3 text-sm text-rust">
          Couldn't open this session: {error || 'it may have been deleted'}.
        </p>
      </div>
    )
  }

  const { total, sent, hardest } = summarise(climbs)
  const date = new Date(`${session.session_date}T00:00:00`).toLocaleDateString('en-SG', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <div className="space-y-8">
      <div>
        {back}
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-b-2 border-rock pb-4">
          <div>
            <h1 className="font-wide text-3xl sm:text-4xl">{session.gym}</h1>
            <p className="mt-1 text-rock/70">{date}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            {session.duration_min && <span className="rounded-full bg-tea px-3 py-0.5 font-semibold">{session.duration_min} min</span>}
            {session.energy_level && <EnergyHolds value={session.energy_level} size="sm" />}
          </div>
        </div>
        {session.notes && <p className="mt-4 max-w-prose leading-relaxed text-rock/90">{session.notes}</p>}
      </div>

      <div className="grid gap-10 lg:grid-cols-[360px_1fr] lg:items-start">
        <div className="lg:sticky lg:top-6">
          <ClimbForm onSubmit={handleCreate} />
        </div>

        <section>
          <div className="flex flex-wrap items-end justify-between gap-2 border-b border-rock/30 pb-3">
            <h2 className="font-wide text-2xl">Climbs</h2>
            {total > 0 && (
              <p className="text-sm text-rock/70">
                {sent} of {total} sent{hardest && `, hardest ${hardest}`}
              </p>
            )}
          </div>

          {error && <p className="mt-4 rounded-lg border-l-4 border-rust bg-white px-4 py-3 text-sm text-rust">{error}</p>}

          {total === 0 ? (
            <div className="py-14 text-center">
              <p className="font-wide text-xl">No climbs logged yet</p>
              <p className="mx-auto mt-2 max-w-xs text-rock/70">Add each problem you tried, with a video if you filmed it.</p>
            </div>
          ) : (
            <ol>
              {climbs.map((c) => <ClimbCard key={c.id} climb={c} onDelete={handleDelete} />)}
            </ol>
          )}
        </section>
      </div>
    </div>
  )
}