-- 002: Onboarding + Learning Content

-- ── Profile additions ────────────────────────────────────────────────────────
alter table public.profiles
  add column if not exists onboarded boolean default false,
  add column if not exists learning_goal text,
  add column if not exists level_initial text,
  add column if not exists prefers_solo boolean default true;

update public.profiles set onboarded = false where onboarded is null;

-- ── Grammar Lessons ──────────────────────────────────────────────────────────
create table if not exists public.grammar_lessons (
  id            uuid primary key default uuid_generate_v4(),
  slug          text unique not null,
  title         text not null,
  level         text not null,
  phase         int not null default 1,
  week          int not null default 1,
  explanation   text not null,
  examples      jsonb not null default '[]',
  exercises     jsonb not null default '[]',
  order_index   int not null default 0,
  created_at    timestamptz default now()
);

alter table public.grammar_lessons enable row level security;
drop policy if exists "Anyone read grammar lessons" on public.grammar_lessons;
create policy "Anyone read grammar lessons" on public.grammar_lessons for select using (true);

-- ── Reading Articles (extend existing table) ────────────────────────────────
alter table public.reading_articles
  add column if not exists slug text,
  add column if not exists level text default 'a2',
  add column if not exists questions jsonb default '[]',
  add column if not exists vocab_help jsonb default '[]',
  add column if not exists topic text,
  add column if not exists source_url text;

-- Add unique on slug (only if not already)
do $$ begin
  if not exists (
    select 1 from pg_constraint where conname = 'reading_articles_slug_key'
  ) then
    alter table public.reading_articles add constraint reading_articles_slug_key unique (slug);
  end if;
end $$;

alter table public.reading_articles enable row level security;
drop policy if exists "Anyone read articles" on public.reading_articles;
create policy "Anyone read articles" on public.reading_articles for select using (true);

-- ── Lesson Progress ──────────────────────────────────────────────────────────
create table if not exists public.lesson_progress (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  lesson_type   text not null,
  lesson_id     uuid not null,
  completed     boolean default false,
  score         int default 0,
  attempts      int default 0,
  completed_at  timestamptz,
  unique (user_id, lesson_type, lesson_id)
);

alter table public.lesson_progress enable row level security;
drop policy if exists "Users access own progress" on public.lesson_progress;
create policy "Users access own progress" on public.lesson_progress for all using (auth.uid() = user_id);

-- ── Seed Grammar ─────────────────────────────────────────────────────────────
insert into public.grammar_lessons (slug, title, level, phase, week, explanation, examples, exercises, order_index) values
  (
    'present-simple',
    'Present Simple Tense',
    'a2', 1, 1,
    E'Present Simple dipakai untuk fakta umum, kebiasaan, dan rutinitas.\n\n**Pola:**\n- Subject + Verb (base form)\n- He/She/It + Verb + s/es\n\n**Kata kunci:** every day, usually, often, always, never, sometimes',
    '[
      {"en": "I work in Jakarta.", "id": "Saya bekerja di Jakarta.", "highlight": "work"},
      {"en": "She studies English every night.", "id": "Dia belajar bahasa Inggris setiap malam.", "highlight": "studies"},
      {"en": "The sun rises in the east.", "id": "Matahari terbit di timur.", "highlight": "rises"},
      {"en": "They do not eat meat.", "id": "Mereka tidak makan daging.", "highlight": "do not eat"}
    ]'::jsonb,
    '[
      {"q": "She ___ coffee every morning.", "options": ["drink", "drinks", "drinking", "drank"], "answer": 1, "explain": "Subject she butuh kata kerja +s: drinks."},
      {"q": "We ___ to school by bus.", "options": ["goes", "going", "go", "went"], "answer": 2, "explain": "Subject we pakai base form: go."},
      {"q": "He ___ like vegetables.", "options": ["dont", "doesnt", "isnt", "not"], "answer": 1, "explain": "Subject he negatif pakai doesnt."}
    ]'::jsonb,
    1
  ),
  (
    'past-simple',
    'Past Simple Tense',
    'a2', 1, 2,
    E'Past Simple dipakai untuk kejadian yang sudah selesai di masa lalu.\n\n**Pola regular:** Verb + ed\n**Pola irregular:** harus dihafal (go→went, eat→ate, read→read)\n\n**Kata kunci:** yesterday, last week, ago, in 2020',
    '[
      {"en": "I worked late yesterday.", "id": "Saya bekerja sampai larut kemarin.", "highlight": "worked"},
      {"en": "She went to Bali last month.", "id": "Dia pergi ke Bali bulan lalu.", "highlight": "went"},
      {"en": "We read that book in 2023.", "id": "Kami membaca buku itu di 2023.", "highlight": "read"}
    ]'::jsonb,
    '[
      {"q": "Last week I ___ a great article.", "options": ["read", "readed", "reading", "reads"], "answer": 0, "explain": "Past of read tetap read (pronunciation berubah jadi /red/)."},
      {"q": "She ___ to Japan in 2022.", "options": ["go", "goes", "went", "gone"], "answer": 2, "explain": "Past of go = went."}
    ]'::jsonb,
    2
  ),
  (
    'present-continuous',
    'Present Continuous',
    'a2', 1, 3,
    E'Present Continuous dipakai untuk aksi yang sedang berlangsung sekarang.\n\n**Pola:** Subject + am/is/are + Verb-ing\n\n**Kata kunci:** now, right now, at the moment, today, this week',
    '[
      {"en": "I am studying English now.", "id": "Saya sedang belajar Inggris sekarang.", "highlight": "am studying"},
      {"en": "She is reading a book.", "id": "Dia sedang membaca buku.", "highlight": "is reading"}
    ]'::jsonb,
    '[
      {"q": "Look! The cat ___ on the table.", "options": ["sleep", "sleeps", "is sleeping", "slept"], "answer": 2, "explain": "Aksi sedang terjadi sekarang → is sleeping."},
      {"q": "We ___ a movie right now.", "options": ["watch", "watches", "watched", "are watching"], "answer": 3, "explain": "Plural subject + ing form: are watching."}
    ]'::jsonb,
    3
  )
on conflict (slug) do nothing;

-- ── Seed Reading ─────────────────────────────────────────────────────────────
insert into public.reading_articles (slug, title, content, level, word_count, questions, vocab_help, topic, phase, week) values
  (
    'remote-work-basics',
    'The Rise of Remote Work',
    E'More companies now let employees work from home. This change started slowly but became very common after 2020.\n\nStudies show that remote workers often feel more productive because they avoid long commutes. They save time and money, and they can focus better in a quiet home environment.\n\nHowever, remote work has challenges too. Some people miss the social side of an office. It is harder to separate work from personal life. Many workers report feeling lonely or working too many hours.\n\nCompanies are finding new ways to support remote teams. They use video calls, chat apps, and yearly meetups to keep teams connected.',
    'a2', 110,
    '[
      {"q": "Why do remote workers often feel more productive?", "options": ["They earn more money", "They avoid long commutes", "They work fewer hours", "They have no meetings"], "answer": 1, "explain": "Paragraph 2: they avoid long commutes."},
      {"q": "What is one challenge of remote work mentioned?", "options": ["Low salary", "Bad internet", "Feeling lonely", "Too many meetings"], "answer": 2, "explain": "Paragraph 3: feeling lonely or working too many hours."}
    ]'::jsonb,
    '[
      {"word": "commute", "def": "perjalanan ke kantor"},
      {"word": "productive", "def": "produktif"},
      {"word": "lonely", "def": "kesepian"}
    ]'::jsonb,
    'work', 1, 1
  ),
  (
    'morning-routine',
    'My Morning Routine',
    E'I wake up at 6 AM every day. The first thing I do is drink a glass of water. Then I do some light stretching for ten minutes.\n\nAfter exercise, I take a shower and prepare breakfast. I usually eat oatmeal with fruit and drink black coffee.\n\nBy 7:30 AM, I am ready to start work. I find that having a consistent morning routine helps me feel more focused and energetic throughout the day.',
    'a2', 80,
    '[
      {"q": "What does the writer drink first in the morning?", "options": ["Coffee", "Tea", "Water", "Juice"], "answer": 2, "explain": "First thing I do is drink a glass of water."},
      {"q": "How long does the stretching last?", "options": ["5 minutes", "10 minutes", "20 minutes", "1 hour"], "answer": 1, "explain": "Light stretching for ten minutes."}
    ]'::jsonb,
    '[
      {"word": "stretching", "def": "peregangan"},
      {"word": "consistent", "def": "konsisten"}
    ]'::jsonb,
    'lifestyle', 1, 1
  )
on conflict (slug) do nothing;
