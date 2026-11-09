-- BetaLog database schema
-- Run this in the Supabase SQL Editor of your "BetaLog" project.
-- WARNING: drops existing tables and ALL their data before recreating them.

drop table if exists climbs cascade;
drop table if exists sessions cascade;

create table sessions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  session_date date not null default current_date,
  gym          text not null,
  duration_min integer check (duration_min > 0),
  energy_level integer check (energy_level between 1 and 5),
  notes        text,
  created_at   timestamptz not null default now()
);

create table climbs (
  id         uuid primary key default gen_random_uuid(),
  session_id uuid not null references sessions(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  grade      text not null check (grade ~ '^V([0-9]|1[0-7])$'),
  style      text check (style in ('slab', 'overhang', 'vertical', 'crimp', 'dyno', 'roof')),
  attempts   integer not null default 1 check (attempts > 0),
  sent       boolean not null default false,
  notes      text,
  video_path text,
  created_at timestamptz not null default now()
);

create index idx_sessions_user_date on sessions (user_id, session_date desc);
create index idx_climbs_session on climbs (session_id);

-- Row Level Security: users can only see and edit their own data
alter table sessions enable row level security;
alter table climbs   enable row level security;

create policy "Own sessions" on sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Own climbs" on climbs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

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