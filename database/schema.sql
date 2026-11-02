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