-- Adds climb video support without deleting existing data.
-- Run this once in the Supabase SQL Editor if you already ran schema.sql before.

alter table climbs add column if not exists video_path text;
-- Climb videos: private storage bucket, max 50 MB per file.
-- Files are stored as <user_id>/<file>, so users can only reach their own folder.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('climb-videos', 'climb-videos', false, 52428800,
        array['video/mp4', 'video/quicktime', 'video/webm'])
on conflict (id) do nothing;

drop policy if exists "Own climb videos: read"   on storage.objects;
drop policy if exists "Own climb videos: upload" on storage.objects;
drop policy if exists "Own climb videos: delete" on storage.objects;

create policy "Own climb videos: read" on storage.objects
  for select using (bucket_id = 'climb-videos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Own climb videos: upload" on storage.objects
  for insert with check (bucket_id = 'climb-videos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Own climb videos: delete" on storage.objects
  for delete using (bucket_id = 'climb-videos' and (storage.foldername(name))[1] = auth.uid()::text);