import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { GrammarLessonClient } from './GrammarLessonClient';

interface Lesson {
  id: string;
  slug: string;
  title: string;
  level: string;
  explanation: string;
  examples: { en: string; id: string; highlight?: string }[];
  exercises: { q: string; options: string[]; answer: number; explain: string }[];
}

export default async function GrammarLessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: lesson } = await supabase
    .from('grammar_lessons')
    .select('id, slug, title, level, explanation, examples, exercises')
    .eq('slug', slug)
    .single();

  if (!lesson) notFound();

  return <GrammarLessonClient lesson={lesson as Lesson} />;
}
