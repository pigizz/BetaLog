import { useState } from 'react'
import { getVideoUrl } from '../lib/storage'

export default function ClimbCard({ climb, onDelete }) {
  const [videoUrl, setVideoUrl] = useState(null)
  const [videoError, setVideoError] = useState('')
  const [loadingVideo, setLoadingVideo] = useState(false)

  async function toggleVideo() {
    if (videoUrl) return setVideoUrl(null)
    setLoadingVideo(true)
    setVideoError('')
    try {
      setVideoUrl(await getVideoUrl(climb.video_path))
    } catch (err) {
      setVideoError(`Couldn't load the video: ${err.message}`)
    }
    setLoadingVideo(false)
  }

  return (
    <li className="group border-b border-rock/15 py-5">
      <div className="grid grid-cols-[4.5rem_1fr] gap-5">
        <div
          className={`flex h-[4.5rem] flex-col items-center justify-center self-start rounded-xl ${
            climb.sent ? 'bg-tea text-moss-dark' : 'bg-lavender/25 text-rock'
          }`}
        >
          <span className="font-wide text-2xl leading-none">{climb.grade}</span>
          <span className="mt-1 text-xs font-semibold">{climb.sent ? 'Sent' : 'Project'}</span>
        </div>

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <p className="pt-1 text-sm">
              <span className="font-semibold">
                {climb.attempts === 1 ? (climb.sent ? 'Flashed' : '1 attempt') : `${climb.attempts} attempts`}
              </span>
              {climb.style && <span className="ml-2 rounded-full bg-rock/10 px-2.5 py-0.5 capitalize">{climb.style}</span>}
            </p>
            <button
              onClick={() => onDelete(climb.id)}
              className="rounded-md px-2 py-1 text-sm text-rock/50 transition-colors hover:bg-rust/10 hover:text-rust focus:text-rust sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
            >
              Delete
            </button>
          </div>

          {climb.notes && <p className="mt-2 max-w-prose leading-relaxed text-rock/90">{climb.notes}</p>}

          {climb.video_path && (
            <button
              onClick={toggleVideo}
              aria-expanded={!!videoUrl}
              className="mt-3 inline-flex items-center gap-2 rounded-lg border-2 border-moss/30 px-3 py-1.5 text-sm font-semibold text-moss hover:border-moss"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                {videoUrl ? <rect x="3" y="3" width="10" height="10" rx="1.5" fill="currentColor" /> : <path d="M4 2.5v11l9-5.5z" fill="currentColor" />}
              </svg>
              {loadingVideo ? 'Loadingâ€¦' : videoUrl ? 'Hide video' : 'Watch video'}
            </button>
          )}
          {videoError && <p className="mt-2 text-sm text-rust">{videoError}</p>}
        </div>
      </div>

      {videoUrl && (
        <video src={videoUrl} controls autoPlay playsInline className="mt-4 max-h-[480px] w-full rounded-xl bg-moss-dark" />
      )}
    </li>
  )
}