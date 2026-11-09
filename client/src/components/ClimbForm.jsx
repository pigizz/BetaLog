import { useRef, useState } from 'react'
import { GRADES, STYLES } from '../lib/climbing'
import { checkVideo, uploadClimbVideo, MAX_VIDEO_SECONDS } from '../lib/storage'

const empty = { grade: 'V3', style: '', attempts: 1, sent: true, notes: '' }

export default function ClimbForm({ onSubmit }) {
  const [form, setForm] = useState(empty)
  const [video, setVideo] = useState(null) // { file, preview }
  const [status, setStatus] = useState('') // '', 'uploading', 'saving'
  const [error, setError] = useState('')
  const fileInput = useRef(null)

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  async function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setError('')
    const problem = await checkVideo(file)
    if (problem) {
      setError(problem)
      e.target.value = ''
      return
    }
    if (video) URL.revokeObjectURL(video.preview)
    setVideo({ file, preview: URL.createObjectURL(file) })
  }

  function removeVideo() {
    if (video) URL.revokeObjectURL(video.preview)
    setVideo(null)
    if (fileInput.current) fileInput.current.value = ''
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      let video_path = null
      if (video) {
        setStatus('uploading')
        video_path = await uploadClimbVideo(video.file)
      }
      setStatus('saving')
      await onSubmit({ ...form, video_path })
      setForm((f) => ({ ...empty, grade: f.grade, style: f.style }))
      removeVideo()
    } catch (err) {
      setError(err.message)
    }
    setStatus('')
  }

  const chip = (active) =>
    `rounded-lg border-2 px-3 py-1.5 text-sm font-semibold transition-colors ${
      active ? 'border-moss bg-moss text-white' : 'border-rock/15 bg-white hover:border-moss/50'
    }`

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white/70 p-6 ring-1 ring-rock/10">
      <h2 className="font-wide text-2xl">Add a climb</h2>

      <div className="mt-5 space-y-5">
        <fieldset>
          <legend className="text-sm font-semibold">Grade</legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {GRADES.slice(0, 11).map((g) => (
              <button key={g} type="button" aria-pressed={form.grade === g} onClick={() => set('grade', g)} className={chip(form.grade === g)}>
                {g}
              </button>
            ))}
            <select
              aria-label="Harder grades"
              value={GRADES.indexOf(form.grade) > 10 ? form.grade : ''}
              onChange={(e) => e.target.value && set('grade', e.target.value)}
              className={`${chip(GRADES.indexOf(form.grade) > 10)} pr-2`}
            >
              <option value="">V11+</option>
              {GRADES.slice(11).map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold">Style <span className="font-normal text-rock/60">(optional)</span></legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {STYLES.map((s) => (
              <button
                key={s} type="button" aria-pressed={form.style === s}
                onClick={() => set('style', form.style === s ? '' : s)}
                className={`${chip(form.style === s)} capitalize`}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid grid-cols-2 gap-4">
          <fieldset>
            <legend className="text-sm font-semibold">Attempts</legend>
            <div className="mt-2 flex items-center rounded-lg border-2 border-rock/15 bg-white">
              <button type="button" aria-label="Fewer attempts" onClick={() => set('attempts', Math.max(1, form.attempts - 1))} className="px-3 py-2 text-lg font-bold text-moss">âˆ’</button>
              <span className="flex-1 text-center font-semibold" aria-live="polite">{form.attempts}</span>
              <button type="button" aria-label="More attempts" onClick={() => set('attempts', form.attempts + 1)} className="px-3 py-2 text-lg font-bold text-moss">+</button>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold">Result</legend>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              <button type="button" aria-pressed={form.sent} onClick={() => set('sent', true)} className={chip(form.sent)}>Sent</button>
              <button type="button" aria-pressed={!form.sent} onClick={() => set('sent', false)} className={chip(!form.sent)}>Project</button>
            </div>
          </fieldset>
        </div>

        <div>
          <p className="text-sm font-semibold">Video <span className="font-normal text-rock/60">(optional, up to {MAX_VIDEO_SECONDS}s)</span></p>
          {video ? (
            <div className="mt-2 overflow-hidden rounded-lg bg-moss-dark">
              <video src={video.preview} controls muted playsInline className="max-h-64 w-full" />
              <div className="flex items-center justify-between px-3 py-2 text-sm text-lichen">
                <span className="truncate">{video.file.name}</span>
                <button type="button" onClick={removeVideo} className="font-semibold text-tea hover:underline">Remove</button>
              </div>
            </div>
          ) : (
            <label className="mt-2 flex cursor-pointer flex-col items-center rounded-lg border-2 border-dashed border-rock/25 bg-white px-4 py-5 text-center transition-colors hover:border-moss focus-within:border-moss">
              <span className="font-semibold text-moss">Choose a video</span>
              <span className="mt-1 text-xs text-rock/60">Film from the side, with your whole body in frame</span>
              <input ref={fileInput} type="file" accept="video/mp4,video/quicktime,video/webm" onChange={handleFile} className="sr-only" />
            </label>
          )}
        </div>

        <label className="block text-sm font-semibold">
          Notes
          <textarea
            rows="2" placeholder="Where did you fall? What worked?"
            value={form.notes} onChange={(e) => set('notes', e.target.value)}
            className="mt-1.5 w-full rounded-lg border-2 border-rock/15 bg-white px-3 py-2.5 placeholder:text-rock/40 focus:border-moss focus:outline-none"
          />
        </label>

        {error && <p className="rounded-lg border-l-4 border-rust bg-white px-4 py-3 text-sm text-rust">{error}</p>}

        <button disabled={!!status} className="w-full rounded-lg bg-moss py-3 font-semibold text-white transition-colors hover:bg-moss-dark disabled:opacity-50">
          {status === 'uploading' ? 'Uploading videoâ€¦' : status === 'saving' ? 'Savingâ€¦' : `Add ${form.grade}`}
        </button>
      </div>
    </form>
  )
}