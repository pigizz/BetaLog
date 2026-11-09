import { supabase } from '../lib/supabase'

export default function Navbar({ email }) {
  return (
    <header className="bg-moss text-white">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold">
          Beta<span className="text-tea">Log</span>
        </h1>
        <div className="flex items-center gap-3 text-sm">
          <span className="hidden text-white/80 sm:inline">{email}</span>
          <button
            onClick={() => supabase.auth.signOut()}
            className="rounded-md border border-white/40 px-3 py-1 hover:bg-moss-dark"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  )
}