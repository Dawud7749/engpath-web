import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Card, SectionLabel } from '@/components/ui/Card';
import { LevelBadge } from '@/components/ui/Badge';
import { BookIcon, ChevRIcon, CheckCircleIcon } from '@/components/ui/Icons';

interface Article {
  id: string;
  slug: string;
  title: string;
  level: string;
  word_count: number;
  topic: string | null;
}

export default async function ReadingHubPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: articles } = await supabase
    .from('reading_articles')
    .select('id, slug, title, level, word_count, topic')
    .order('phase', { ascending: true })
    .order('week', { ascending: true });

  let completedIds = new Set<string>();
  if (user) {
    const { data: progress } = await supabase
      .from('lesson_progress')
      .select('lesson_id')
      .eq('user_id', user.id)
      .eq('lesson_type', 'reading')
      .eq('completed', true);
    completedIds = new Set((progress || []).map((p) => p.lesson_id));
  }

  return (
    <div style={{ background: 'var(--offwhite)', minHeight: '100%' }}>
      <div style={{ background: 'linear-gradient(165deg, var(--mint-soft), var(--offwhite))', padding: '58px 18px 16px', borderRadius: '0 0 28px 28px' }}>
        <Link href="/learn" style={{ fontSize: 13, fontWeight: 800, color: 'var(--muted)', textDecoration: 'none' }}>← Belajar</Link>
        <div className="f-display" style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink)', marginTop: 8 }}>Reading</div>
        <div style={{ fontSize: 13.5, color: 'var(--ink-2)', fontWeight: 700, marginTop: 2 }}>Baca artikel pendek, jawab pertanyaan</div>
      </div>

      <div style={{ padding: '16px 18px 24px' }}>
        <SectionLabel>Artikel tersedia</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {(articles as Article[] | null)?.map((article) => {
            const done = completedIds.has(article.id);
            return (
              <Link key={article.id} href={`/learn/reading/${article.slug}`} style={{ textDecoration: 'none' }}>
                <Card pad={14}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 'var(--r-sm)', background: done ? 'var(--green)' : 'linear-gradient(140deg, var(--mint), #3FB7A2)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: done ? 'var(--sh-green)' : '0 6px 14px var(--mint)', flexShrink: 0 }}>
                      {done ? <CheckCircleIcon size={24} /> : <BookIcon size={22} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="f-display" style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{article.title}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 700, marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <LevelBadge level={article.level.toUpperCase()} size="sm" />
                        <span>{article.word_count} kata</span>
                        {done && <span style={{ color: 'var(--green)', fontWeight: 800 }}>· ✓</span>}
                      </div>
                    </div>
                    <ChevRIcon size={18} style={{ color: 'var(--faint)' }} />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
