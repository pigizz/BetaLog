import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setBusy(true)
    setMessage('')

    const { error } =
      mode === 'login'
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password })

    if (error) setMessage(error.message)
    else if (mode === 'signup') setMessage('Check your email to confirm your account.')
    setBusy(false)
  }

  return (
    <div className="mx-auto mt-16 max-w-sm">
      <h1 className="mb-1 text-center text-3xl font-bold">
        Beta<span className="text-moss">Log</span>
      </h1>
      <p className="mb-8 text-center text-rock/70">Track your climbs. Find the beta.</p>

      <form onSubmit={handleSubmit} className="space-y-3 rounded-xl bg-white p-6 shadow-sm">
        <input
          type="email" required placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-rock/20 px-3 py-2"
        />
        <input
          type="password" required minLength={6} placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-rock/20 px-3 py-2"
        />
        <button
          disabled={busy}
          className="w-full rounded-md bg-moss py-2 font-medium text-white hover:bg-moss-dark disabled:opacity-50"
        >
          {mode === 'login' ? 'Log in' : 'Sign up'}
        </button>
        {message && <p className="text-sm text-rock/90">{message}</p>}
      </form>

      <p className="mt-4 text-center text-sm text-rock/70">
        {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
        <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="font-medium text-moss">
          {mode === 'login' ? 'Sign up' : 'Log in'}
        </button>
      </p>
    </div>
  )
}