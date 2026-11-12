-- =============================================================================
-- DS Builder v2 — Supabase Database Schema & Row Level Security (RLS)
-- Run this script once in your Supabase Dashboard -> SQL Editor -> New query
-- =============================================================================

-- 1. Patient Discharge Summaries table (incomplete drafts & completed summaries)
create table if not exists public.discharge_summaries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  status text not null default 'incomplete' check (status in ('incomplete', 'completed')),
  patient_name text not null default '',
  ip_no text not null default '',
  doa text not null default '',
  dod text not null default '',
  unit text not null default '',
  diagnosis_preview text not null default '',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Per-user institution defaults & theme preferences table
create table if not exists public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade default auth.uid(),
  defaults jsonb not null default '{}'::jsonb,
  theme_color text not null default '#14425f',
  updated_at timestamptz not null default now()
);

-- 3. Performance indexes for dashboard queries
create index if not exists idx_discharge_summaries_user_updated
  on public.discharge_summaries (user_id, updated_at desc);

create index if not exists idx_discharge_summaries_user_status
  on public.discharge_summaries (user_id, status);

-- 4. Keep updated_at current automatically if omitted or unchanged
create or replace function public.ds_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  if new.updated_at is null then
    new.updated_at = now();
  elsif tg_op = 'UPDATE' and new.updated_at = old.updated_at then
    new.updated_at = now();
  end if;
  return new;
end;
$$;

drop trigger if exists trg_discharge_summaries_updated_at on public.discharge_summaries;
create trigger trg_discharge_summaries_updated_at
  before insert or update on public.discharge_summaries
  for each row execute function public.ds_touch_updated_at();

drop trigger if exists trg_user_settings_updated_at on public.user_settings;
create trigger trg_user_settings_updated_at
  before insert or update on public.user_settings
  for each row execute function public.ds_touch_updated_at();

-- 5. Enable Row Level Security (strictly isolates each doctor/user's records)
alter table public.discharge_summaries enable row level security;
alter table public.user_settings enable row level security;

-- Policies for public.discharge_summaries
drop policy if exists "Users can view own summaries" on public.discharge_summaries;
create policy "Users can view own summaries"
  on public.discharge_summaries for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own summaries" on public.discharge_summaries;
create policy "Users can insert own summaries"
  on public.discharge_summaries for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own summaries" on public.discharge_summaries;
create policy "Users can update own summaries"
  on public.discharge_summaries for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own summaries" on public.discharge_summaries;
create policy "Users can delete own summaries"
  on public.discharge_summaries for delete
  to authenticated
  using (auth.uid() = user_id);

-- Policies for public.user_settings
drop policy if exists "Users can view own settings" on public.user_settings;
create policy "Users can view own settings"
  on public.user_settings for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can upsert own settings" on public.user_settings;
create policy "Users can upsert own settings"
  on public.user_settings for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own settings" on public.user_settings;
create policy "Users can update own settings"
  on public.user_settings for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own settings" on public.user_settings;
create policy "Users can delete own settings"
  on public.user_settings for delete
  to authenticated
  using (auth.uid() = user_id);

