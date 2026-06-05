import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ReadingClient } from './ReadingClient';

interface Article {
  id: string;
  slug: string;
  title: string;
  level: string;
  content: string;
  word_count: number;
  questions: { q: string; options: string[]; answer: number; explain: string }[];
  vocab_help: { word: string; def: string }[];
}

export default async function ReadingArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase
    .from('reading_articles')
    .select('id, slug, title, level, content, word_count, questions, vocab_help')
    .eq('slug', slug)
    .single();

  if (!article) notFound();

  return <ReadingClient article={article as Article} />;
}
