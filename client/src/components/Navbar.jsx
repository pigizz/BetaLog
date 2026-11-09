import { supabase } from '../lib/supabase'
import Topo from './Topo'

export default function Navbar({ email }) {
  return (
    <header className="relative overflow-hidden bg-moss-dark text-lichen">
      <Topo className="absolute inset-0 h-full w-full text-tea opacity-60" />
      <div className="relative mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <p className="font-wide text-xl">BetaLog</p>
        <div className="flex items-center gap-4 text-sm">
          <span className="hidden text-lichen/75 sm:inline">{email}</span>
          <button
            onClick={() => supabase.auth.signOut()}
            className="rounded-lg border border-lichen/30 px-3 py-1.5 font-medium transition-colors hover:bg-lichen hover:text-moss-dark"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  )
}