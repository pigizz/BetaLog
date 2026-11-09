import { supabase } from './supabase'

const BUCKET = 'climb-videos'
export const MAX_VIDEO_MB = 50
export const MAX_VIDEO_SECONDS = 60

// Reads a video's length in the browser before uploading
function videoDuration(file) {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src)
      resolve(video.duration)
    }
    video.onerror = () => resolve(null)
    video.src = URL.createObjectURL(file)
  })
}

// Returns an error message, or null if the file can be uploaded
export async function checkVideo(file) {
  if (!file.type.startsWith('video/')) return 'Choose a video file (MP4, MOV or WebM).'
  if (file.size > MAX_VIDEO_MB * 1024 * 1024) return `Videos can be up to ${MAX_VIDEO_MB} MB. Trim the clip and try again.`
  const seconds = await videoDuration(file)
  if (seconds && seconds > MAX_VIDEO_SECONDS) return `Videos can be up to ${MAX_VIDEO_SECONDS} seconds. Trim the clip to just the attempt.`
  return null
}

// Uploads to <user_id>/<random>.<ext> and returns the storage path
export async function uploadClimbVideo(file) {
  const { data } = await supabase.auth.getUser()
  const ext = file.name.split('.').pop()?.toLowerCase() || 'mp4'
  const path = `${data.user.id}/${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type })
  if (error) throw new Error(`Video upload failed: ${error.message}`)
  return path
}

// Private videos are played through a link that expires after an hour
export async function getVideoUrl(path) {
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, 3600)
  if (error) throw new Error(error.message)
  return data.signedUrl
}