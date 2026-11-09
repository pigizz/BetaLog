import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Navbar({ email }) {
  return (
    <header className="border-b-4 border-moss bg-[#F6F7EB]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Link to="/" aria-label="BetaLog home">
          <img src="/logo.png" alt="BetaLog" className="h-11 w-auto sm:h-12" />
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <span className="hidden text-rock/70 sm:inline">{email}</span>
          <button
            onClick={() => supabase.auth.signOut()}
            className="rounded-lg border-2 border-rock/15 px-3 py-1.5 font-semibold transition-colors hover:border-moss hover:text-moss"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  )
}