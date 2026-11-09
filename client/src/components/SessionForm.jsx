import { useState } from 'react'

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

  const input = 'w-full rounded-md border border-rock/20 px-3 py-2'

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold">Log a session</h2>

      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm">
          Date
          <input type="date" value={form.session_date} onChange={update('session_date')} className={input} />
        </label>
        <label className="text-sm">
          Duration (min)
          <input type="number" min="1" value={form.duration_min} onChange={update('duration_min')} className={input} />
        </label>
      </div>

      <label className="block text-sm">
        Gym
        <input required placeholder="e.g. Boulder Planet" value={form.gym} onChange={update('gym')} className={input} />
      </label>

      <label className="block text-sm">
        Energy level: <strong>{form.energy_level}/5</strong>
        <input type="range" min="1" max="5" value={form.energy_level} onChange={update('energy_level')} className="w-full accent-moss" />
      </label>

      <label className="block text-sm">
        Notes
        <textarea rows="2" placeholder="How did it go?" value={form.notes} onChange={update('notes')} className={input} />
      </label>

      {error && <p className="text-sm text-rust">{error}</p>}

      <button disabled={busy} className="w-full rounded-md bg-moss py-2 font-medium text-white hover:bg-moss-dark disabled:opacity-50">
        {busy ? 'Savingâ€¦' : 'Save session'}
      </button>
    </form>
  )
}