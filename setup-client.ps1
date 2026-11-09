# Creates/updates the BetaLog client files. Run from the BetaLog root folder.
$ErrorActionPreference = 'Stop'
$utf8 = New-Object System.Text.UTF8Encoding($false)
function Write-ProjectFile($path, $content) {
  $full = Join-Path (Get-Location) $path
  New-Item -ItemType Directory -Force -Path (Split-Path $full) | Out-Null
  [IO.File]::WriteAllText($full, $content, $utf8)
  Write-Host "Updated $path"
}

Write-ProjectFile 'client/package.json' @'
{
  "name": "betalog-client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.118.0",
    "react": "^19.3.1",
    "react-dom": "^19.3.1",
    "react-router-dom": "^7.18.5"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.1.2",
    "oxlint": "^1.89.0",
    "tailwindcss": "^4.3.3",
    "vite": "^8.3.5"
  }
}
'@

Write-ProjectFile 'client/.env.example' @'
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:3000
'@

Write-ProjectFile 'client/index.html' @'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&display=swap" rel="stylesheet" />
    <meta name="theme-color" content="#4E6E58" />
    <title>BetaLog</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
'@

Write-ProjectFile 'client/vite.config.js' @'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
'@

Write-ProjectFile 'client/public/favicon.svg' @'
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>
'@

Write-ProjectFile 'client/src/main.jsx' @'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
'@

Write-ProjectFile 'client/src/index.css' @'
@import "tailwindcss";

/* BetaLog palette */
@theme {
  --color-lichen: #EBEFE0;    /* page background */
  --color-rock: #544B3D;      /* text and headings */
  --color-moss: #4E6E58;      /* primary: buttons, brand */
  --color-moss-dark: #3F5A48; /* primary hover, deep panels */
  --color-tea: #C7D59F;       /* highlights, sent, energy holds */
  --color-lavender: #9993B2;  /* secondary accents, chart data */
  --color-rust: #B5543C;      /* errors, delete */

  --font-sans: "Archivo", ui-sans-serif, system-ui, sans-serif;
}

body {
  @apply bg-lichen text-rock antialiased;
}

/* Wide, heavy cut of Archivo for headings */
.font-wide {
  font-stretch: 125%;
  font-weight: 800;
  letter-spacing: -0.02em;
}

:focus-visible {
  outline: 3px solid var(--color-lavender);
  outline-offset: 2px;
}

/* The route line draws itself up the wall on load */
.route-draw {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: draw 1.8s cubic-bezier(.6, 0, .2, 1) .2s forwards;
}
.route-hold {
  opacity: 0;
  animation: pop .3s ease-out forwards;
}
@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes pop { to { opacity: 1; } }

@media (prefers-reduced-motion: reduce) {
  .route-draw { animation: none; stroke-dashoffset: 0; }
  .route-hold { animation: none; opacity: 1; }
}
'@

Write-ProjectFile 'client/src/App.jsx' @'
import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { supabase } from './lib/supabase'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Sessions from './pages/Sessions'

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

  if (loading) return <p className="p-6 text-rock/70">Loading…</p>

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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
'@

Write-ProjectFile 'client/src/lib/supabase.js' @'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)
'@

Write-ProjectFile 'client/src/lib/api.js' @'
import { supabase } from './supabase'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Calls the Express API with the logged-in user's access token
async function request(path, options = {}) {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  })

  if (res.status === 204) return null
  const body = await res.json()
  if (!res.ok) throw new Error(body.errors?.join(', ') || body.error || 'Request failed')
  return body
}

export const api = {
  getSessions: () => request('/api/sessions'),
  createSession: (session) => request('/api/sessions', { method: 'POST', body: JSON.stringify(session) }),
  deleteSession: (id) => request(`/api/sessions/${id}`, { method: 'DELETE' }),
}
'@

Write-ProjectFile 'client/src/components/EnergyHolds.jsx' @'
const labels = ['Wrecked', 'Tired', 'Okay', 'Good', 'Fired up']

// Energy level shown as five climbing holds. Interactive when onChange is passed.
export default function EnergyHolds({ value, onChange, size = 'md' }) {
  const dim = size === 'sm' ? 'h-3 w-3' : 'h-8 w-8'

  if (!onChange) {
    return (
      <span className="inline-flex items-center gap-1" title={`Energy: ${labels[value - 1]}`}>
        {labels.map((_, i) => (
          <span key={i} className={`${dim} rounded-full ${i < value ? 'bg-moss' : 'bg-rock/15'}`} />
        ))}
        <span className="sr-only">Energy {value} of 5</span>
      </span>
    )
  }

  return (
    <fieldset>
      <legend className="text-sm font-semibold">
        Energy: <span className="font-normal text-rock/70">{labels[value - 1]}</span>
      </legend>
      <div className="mt-2 flex gap-2" role="radiogroup">
        {labels.map((label, i) => {
          const level = i + 1
          const filled = level <= value
          return (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={level === value}
              aria-label={`${level} – ${label}`}
              onClick={() => onChange(level)}
              className={`${dim} rounded-[45%_55%_50%_50%/55%_45%_55%_45%] border-2 transition-transform active:scale-90 ${
                filled ? 'border-moss bg-tea' : 'border-rock/20 bg-white hover:border-moss/50'
              }`}
              style={{ transform: `rotate(${i * 37}deg)` }}
            />
          )
        })}
      </div>
    </fieldset>
  )
}
'@

Write-ProjectFile 'client/src/components/Navbar.jsx' @'
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
'@

Write-ProjectFile 'client/src/components/Route.jsx' @'
// A bouldering problem: holds connected by a line that draws upwards on load.
const holds = [
  [70, 380, 14], [140, 330, 10], [95, 260, 12], [175, 205, 9],
  [130, 140, 13], [205, 85, 10], [180, 30, 15],
]

export default function Route({ className = '' }) {
  const path = holds.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ')

  return (
    <svg viewBox="0 0 260 410" className={className} aria-hidden="true">
      <path
        d={path}
        pathLength="1"
        fill="none"
        stroke="var(--color-tea)"
        strokeWidth="2.5"
        strokeDasharray="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="route-draw"
      />
      {holds.map(([x, y, r], i) => (
        <g key={i} className="route-hold" style={{ animationDelay: `${0.25 + i * 0.25}s` }}>
          <circle cx={x} cy={y} r={r} fill="var(--color-tea)" />
          <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.28} fill="var(--color-moss-dark)" opacity="0.35" />
        </g>
      ))}
      {/* Top-out marker */}
      <path d="M160,8 h40" stroke="var(--color-lichen)" strokeWidth="2" strokeDasharray="4 4" />
    </svg>
  )
}
'@

Write-ProjectFile 'client/src/components/SessionForm.jsx' @'
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
          {busy ? 'Saving…' : 'Save session'}
        </button>
      </div>
    </form>
  )
}
'@

Write-ProjectFile 'client/src/components/Topo.jsx' @'
// Topographic contour lines, drawn procedurally so no image file is needed.
function contour(cx, cy, r, seed, points = 64) {
  let d = ''
  for (let i = 0; i <= points; i++) {
    const a = (i / points) * Math.PI * 2
    const wobble =
      1 +
      0.18 * Math.sin(3 * a + seed) +
      0.09 * Math.sin(5 * a - seed * 1.7) +
      0.05 * Math.cos(9 * a + seed * 0.6)
    const x = cx + Math.cos(a) * r * wobble * 1.25
    const y = cy + Math.sin(a) * r * wobble
    d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
  }
  return d + 'Z'
}

const peaks = [
  { cx: 120, cy: 160, rings: 9, step: 26, seed: 1.2 },
  { cx: 470, cy: 610, rings: 11, step: 30, seed: 3.4 },
]

export default function Topo({ className = '' }) {
  return (
    <svg
      viewBox="0 0 600 800"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        {peaks.flatMap((p) =>
          Array.from({ length: p.rings }, (_, i) => (
            <path
              key={`${p.seed}-${i}`}
              d={contour(p.cx, p.cy, 18 + i * p.step, p.seed + i * 0.35)}
              opacity={i % 4 === 0 ? 0.55 : 0.28}
            />
          )),
        )}
      </g>
    </svg>
  )
}
'@

Write-ProjectFile 'client/src/pages/Login.jsx' @'
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
              {busy ? 'One moment…' : isLogin ? 'Log in' : 'Create account'}
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
'@

Write-ProjectFile 'client/src/pages/Sessions.jsx' @'
import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import SessionForm from '../components/SessionForm'
import EnergyHolds from '../components/EnergyHolds'

function formatDate(iso) {
  const d = new Date(`${iso}T00:00:00`)
  return {
    day: d.getDate(),
    month: d.toLocaleDateString('en-SG', { month: 'short' }),
    weekday: d.toLocaleDateString('en-SG', { weekday: 'long' }),
  }
}

export default function Sessions() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSessions()
      .then(setSessions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleCreate(session) {
    const created = await api.createSession(session)
    setSessions((prev) => [created, ...prev])
  }

  async function handleDelete(id) {
    if (!confirm('Delete this session? This also deletes its climbs.')) return
    try {
      await api.deleteSession(id)
      setSessions((prev) => prev.filter((s) => s.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration_min || 0), 0)

  return (
    <div className="grid gap-10 lg:grid-cols-[360px_1fr] lg:items-start">
      <div className="lg:sticky lg:top-6">
        <SessionForm onSubmit={handleCreate} />
      </div>

      <section>
        <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-rock pb-3">
          <h2 className="font-wide text-3xl">Your logbook</h2>
          {sessions.length > 0 && (
            <p className="text-sm text-rock/70">
              {sessions.length} {sessions.length === 1 ? 'session' : 'sessions'}, {Math.round(totalMinutes / 60)} hours on the wall
            </p>
          )}
        </div>

        {loading && <p className="py-8 text-rock/70">Loading your sessions…</p>}
        {error && (
          <p className="mt-4 rounded-lg border-l-4 border-rust bg-white px-4 py-3 text-sm text-rust">
            Couldn't load your sessions: {error}. Check the API server is running, then refresh.
          </p>
        )}

        {!loading && !error && sessions.length === 0 && (
          <div className="py-16 text-center">
            <p className="font-wide text-xl">Your logbook is empty</p>
            <p className="mx-auto mt-2 max-w-xs text-rock/70">Log your first session to start tracking your progress.</p>
          </div>
        )}

        <ol>
          {sessions.map((s) => {
            const { day, month, weekday } = formatDate(s.session_date)
            return (
              <li key={s.id} className="group grid grid-cols-[4.5rem_1fr] gap-5 border-b border-rock/15 py-5">
                <div className="flex h-[4.5rem] flex-col items-center justify-center self-start rounded-xl bg-moss-dark text-lichen">
                  <span className="font-wide text-3xl leading-none">{day}</span>
                  <span className="mt-1 text-xs font-medium text-tea">{month}</span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold">{s.gym}</h3>
                      <p className="text-sm text-rock/70">{weekday}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="rounded-md px-2 py-1 text-sm text-rock/50 transition-colors hover:bg-rust/10 hover:text-rust focus:text-rust sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                    {s.duration_min && (
                      <span className="rounded-full bg-tea px-3 py-0.5 font-semibold">{s.duration_min} min</span>
                    )}
                    {s.energy_level && <EnergyHolds value={s.energy_level} size="sm" />}
                  </div>

                  {s.notes && <p className="mt-3 max-w-prose leading-relaxed text-rock/90">{s.notes}</p>}
                </div>
              </li>
            )
          })}
        </ol>
      </section>
    </div>
  )
}
'@

if (-not (Test-Path 'client/.env')) { Copy-Item 'client/.env.example' 'client/.env'; Write-Host 'Created client/.env (fill in your Supabase keys)' }
Write-Host 'Done.'
