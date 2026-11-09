import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  const isLogin = mode === 'login'

  async function handleSubmit(e) {
    e.preventDefault()
    setBusy(true)
    setMessage('')

    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })

    if (error) setMessage(error.message)
    else if (!isLogin) setMessage('Account created. Check your inbox to confirm your email, then log in.')
    setBusy(false)
  }

  const field =
    'mt-1.5 w-full rounded-lg border-2 border-rock/15 bg-white px-4 py-3 text-rock placeholder:text-rock/40 transition-colors focus:border-moss focus:outline-none'

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <main className="w-full max-w-sm">
        <img src="/logo.png" alt="BetaLog" className="mx-auto mb-10 h-auto w-60" />

        <div className="rounded-2xl bg-white/70 p-7 ring-1 ring-rock/10">
          <h1 className="font-wide text-3xl">{isLogin ? 'Welcome back' : 'Start your log'}</h1>
          <p className="mt-2 text-rock/70">
            {isLogin ? 'Log in to pick up where you left off.' : 'Create an account to track your climbing.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block text-sm font-semibold">
              Email
              <input
                type="email" required autoComplete="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" className={field}
              />
            </label>
            <label className="block text-sm font-semibold">
              Password
              <input
                type="password" required minLength={6}
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters" className={field}
              />
            </label>

            {message && (
              <p role="status" className="rounded-lg border-l-4 border-lavender bg-white px-4 py-3 text-sm">
                {message}
              </p>
            )}

            <button
              disabled={busy}
              className="w-full rounded-lg bg-moss py-3.5 font-semibold text-white transition-colors hover:bg-moss-dark disabled:opacity-50"
            >
              {busy ? 'One momentâ€¦' : isLogin ? 'Log in' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-sm text-rock/70">
            {isLogin ? 'New to BetaLog? ' : 'Already have an account? '}
            <button
              type="button"
              onClick={() => { setMode(isLogin ? 'signup' : 'login'); setMessage('') }}
              className="font-semibold text-moss underline decoration-tea decoration-2 underline-offset-4 hover:decoration-moss"
            >
              {isLogin ? 'Create an account' : 'Log in'}
            </button>
          </p>
        </div>
      </main>
    </div>
  )
}