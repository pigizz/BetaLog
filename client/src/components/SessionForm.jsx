import { useState } from 'react'
import EnergyHolds from './EnergyHolds'

const today = () => new Date().toISOString().slice(0, 10)
const empty = { session_date: today(), gym: '', duration_min: '', energy_level: 3, notes: '' }

export default function SessionForm({ onSubmit }) {
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  async function handleSubmit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await onSubmit({
        ...form,
        duration_min: form.duration_min ? Number(form.duration_min) : null,
        energy_level: Number(form.energy_level),
      })
      setForm({ ...empty, session_date: today() })
    } catch (err) {
      setError(err.message)
    }
    setBusy(false)
  }

  const input =
    'mt-1.5 w-full rounded-lg border-2 border-rock/15 bg-white px-3 py-2.5 placeholder:text-rock/40 transition-colors focus:border-moss focus:outline-none'

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white/70 p-6 ring-1 ring-rock/10">
      <h2 className="font-wide text-2xl">Log a session</h2>

      <div className="mt-5 space-y-5">
        <label className="block text-sm font-semibold">
          Where did you climb?
          <input required placeholder="e.g. Boulder Planet" value={form.gym} onChange={update('gym')} className={input} />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm font-semibold">
            Date
            <input type="date" value={form.session_date} onChange={update('session_date')} className={input} />
          </label>
          <label className="text-sm font-semibold">
            Minutes
            <input type="number" min="1" placeholder="90" value={form.duration_min} onChange={update('duration_min')} className={input} />
          </label>
        </div>

        <EnergyHolds value={Number(form.energy_level)} onChange={(v) => setForm({ ...form, energy_level: v })} />

        <label className="block text-sm font-semibold">
          Notes
          <textarea rows="3" placeholder="What clicked? What didn't?" value={form.notes} onChange={update('notes')} className={input} />
        </label>

        {error && <p className="rounded-lg border-l-4 border-rust bg-white px-4 py-3 text-sm text-rust">{error}</p>}

        <button disabled={busy} className="w-full rounded-lg bg-moss py-3 font-semibold text-white transition-colors hover:bg-moss-dark disabled:opacity-50">
          {busy ? 'Savingâ€¦' : 'Save session'}
        </button>
      </div>
    </form>
  )
}