import { useState } from 'react'
import { supabase } from '../lib/supabase'
import Topo from '../components/Topo'
import Route from '../components/Route'

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
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      {/* The wall */}
      <section className="relative overflow-hidden bg-moss-dark px-8 py-10 text-lichen sm:px-12 lg:py-14">
        <Topo className="absolute inset-0 h-full w-full text-tea" />
        <div className="relative flex h-full flex-col">
          <p className="font-wide text-2xl">BetaLog</p>

          <Route className="mx-auto my-8 hidden h-[44vh] max-h-[420px] lg:block" />

          <div className="mt-auto max-w-md pt-10 lg:pt-0">
            <h1 className="font-wide text-4xl leading-[1.05] sm:text-5xl">
              Every send starts with the beta.
            </h1>
            <p className="mt-4 max-w-sm text-lg leading-relaxed text-lichen/80">
              Log your sessions, watch your grades climb, and learn from every fall.
            </p>
          </div>
        </div>
      </section>

      {/* The form */}
      <section className="flex items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-sm">
          <h2 className="font-wide text-3xl">{isLogin ? 'Welcome back' : 'Start your log'}</h2>
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
      </section>
    </div>
  )
}