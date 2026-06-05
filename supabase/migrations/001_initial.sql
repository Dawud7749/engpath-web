-- EngPath Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Users / Profiles ──────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  email           text unique not null,
  display_name    text not null default '',
  avatar_color    text not null default 'pink',
  current_phase   int  not null default 1,
  current_week    int  not null default 1,
  focus_skill     text default 'speaking',
  reminder_time   time default '19:00',
  partner_id      uuid references public.profiles(id),
  streak_count    int  not null default 0,
  last_activity   date,
  total_xp        int  not null default 0,
  duel_wins       int  not null default 0,
  active_vocab    int  not null default 0,
  current_level   text default 'B1',
  created_at      timestamptz default now()
);

alter table public.profiles enable row level security;
create policy "Users can view their own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can view partner profile"   on public.profiles for select using (auth.uid() = partner_id or id = (select partner_id from public.profiles where id = auth.uid()));
create policy "Users can update own profile"     on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile"     on public.profiles for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, split_part(new.email, '@', 1));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Invites ───────────────────────────────────────────────────────────────────
create table if not exists public.invites (
  id          uuid primary key default uuid_generate_v4(),
  inviter_id  uuid not null references public.profiles(id) on delete cascade,
  token       text unique not null default encode(gen_random_bytes(24), 'hex'),
  email       text,
  accepted_at timestamptz,
  expires_at  timestamptz default (now() + interval '7 days'),
  created_at  timestamptz default now()
);

alter table public.invites enable row level security;
create policy "Inviters can manage own invites" on public.invites for all using (auth.uid() = inviter_id);
create policy "Anyone can read invite by token" on public.invites for select using (true);

-- ── Sessions ──────────────────────────────────────────────────────────────────
create table if not exists public.sessions (
  id                 uuid primary key default uuid_generate_v4(),
  user_id            uuid not null references public.profiles(id) on delete cascade,
  session_date       date not null default current_date,
  phase              int  not null default 1,
  week               int  not null default 1,
  vocab_score        int  default 0,
  core_skill_type    text default 'reading',
  core_skill_score   int  default 0,
  grammar_score      int  default 0,
  duration_minutes   int  default 0,
  xp_earned          int  default 0,
  completed_at       timestamptz
);

alter table public.sessions enable row level security;
create policy "Users access own sessions" on public.sessions for all using (auth.uid() = user_id);
create policy "Partners can view sessions"  on public.sessions for select using (
  auth.uid() = (select partner_id from public.profiles where id = user_id)
);

-- ── Vocab Items ───────────────────────────────────────────────────────────────
create table if not exists public.vocab_items (
  id              uuid primary key default uuid_generate_v4(),
  word            text not null,
  definition      text not null,
  example_sentence text,
  pos             text,
  ipa             text,
  phase           int  default 1,
  week            int  default 1
);

create table if not exists public.user_vocab (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  vocab_id        uuid not null references public.vocab_items(id) on delete cascade,
  next_review_date date default current_date,
  review_count    int  default 0,
  mastered        boolean default false,
  unique (user_id, vocab_id)
);

alter table public.vocab_items enable row level security;
create policy "Anyone can read vocab items" on public.vocab_items for select using (true);

alter table public.user_vocab enable row level security;
create policy "Users access own vocab" on public.user_vocab for all using (auth.uid() = user_id);

-- ── Duels ─────────────────────────────────────────────────────────────────────
create table if not exists public.duels (
  id                      uuid primary key default uuid_generate_v4(),
  challenger_id           uuid not null references public.profiles(id),
  opponent_id             uuid not null references public.profiles(id),
  duel_type               text default 'vocab',
  question_set            jsonb default '[]',
  challenger_score        int  default 0,
  opponent_score          int  default 0,
  challenger_time_seconds int,
  opponent_time_seconds   int,
  winner_id               uuid references public.profiles(id),
  status                  text default 'pending',
  started_at              timestamptz,
  completed_at            timestamptz,
  created_at              timestamptz default now()
);

alter table public.duels enable row level security;
create policy "Participants access own duels" on public.duels for all using (
  auth.uid() = challenger_id or auth.uid() = opponent_id
);

-- ── Skill Scores ──────────────────────────────────────────────────────────────
create table if not exists public.skill_scores (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  recorded_at     date not null default current_date,
  speaking_score  int  default 0,
  reading_score   int  default 0,
  vocab_score     int  default 0,
  grammar_score   int  default 0,
  writing_score   int  default 0,
  listening_score int  default 0
);

alter table public.skill_scores enable row level security;
create policy "Users access own scores" on public.skill_scores for all using (auth.uid() = user_id);
create policy "Partners view scores"   on public.skill_scores for select using (
  auth.uid() = (select partner_id from public.profiles where id = user_id)
);

-- ── Seed: Sample Vocab (Fase 1 Minggu 1) ────────────────────────────────────
insert into public.vocab_items (word, definition, example_sentence, pos, ipa, phase, week) values
  ('commute',     'pergi-pulang kerja secara rutin',        'I commute to the office for an hour every day.',           'verb',      '/kəˈmjuːt/',         1, 1),
  ('reliable',    'dapat diandalkan; bisa dipercaya',       'She is the most reliable member of our team.',              'adjective', '/rɪˈlaɪəbl/',        1, 1),
  ('opportunity', 'kesempatan atau peluang',                'Studying abroad is a great opportunity to grow.',           'noun',      '/ˌɒpəˈtjuːnəti/',    1, 1),
  ('improve',     'meningkatkan; memperbaiki',              'I want to improve my speaking before the interview.',       'verb',      '/ɪmˈpruːv/',          1, 1),
  ('deadline',    'batas waktu penyelesaian',               'We finished the report before the deadline.',               'noun',      '/ˈdedlaɪn/',          1, 1),
  ('productive',  'produktif; menghasilkan banyak',        'Remote workers often feel more productive at home.',        'adjective', '/prəˈdʌktɪv/',        1, 1),
  ('commute',     'pergi-pulang kerja secara rutin',        'The long commute made him exhausted every evening.',       'noun',      '/kəˈmjuːt/',          1, 1),
  ('colleague',   'rekan kerja',                            'She discussed the project with her colleague.',             'noun',      '/ˈkɒliːɡ/',           1, 1),
  ('achievement', 'pencapaian; prestasi',                   'Getting promoted was her biggest achievement this year.',  'noun',      '/əˈtʃiːvmənt/',       1, 1),
  ('fluent',      'fasih; lancar berbicara',                'After two years, he became fluent in English.',            'adjective', '/ˈfluːənt/',           1, 1)
on conflict do nothing;
