import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { supabase } from './lib/supabase'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Sessions from './pages/Sessions'
import SessionDetail from './pages/SessionDetail'

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => listener.subscription.unsubscribe()
  }, [])

  if (loading) return <p className="p-6 text-rock/70">Loadingâ€¦</p>

  // Pages shown to logged-in users get the navbar and a centred content area
  const withLayout = (page) => (
    <>
      <Navbar email={session.user.email} />
      <main className="mx-auto max-w-5xl px-5 py-10">{page}</main>
    </>
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={session ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={session ? withLayout(<Sessions />) : <Navigate to="/login" />} />
        <Route path="/sessions/:id" element={session ? withLayout(<SessionDetail />) : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}