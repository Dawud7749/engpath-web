'use server';
import { createClient } from '@/lib/supabase/server';

export async function markBlockComplete(blockKey: string, score: number, xp: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'unauth' };

  await supabase.from('lesson_progress').upsert({
    user_id: user.id,
    lesson_type: 'session_block',
    lesson_id: blockKey,
    completed: true,
    score,
    completed_at: new Date().toISOString(),
  }, { onConflict: 'user_id,lesson_type,lesson_id' });

  const { data: profile } = await supabase
    .from('profiles')
    .select('total_xp, last_activity, streak_count')
    .eq('id', user.id)
    .single();

  const today = new Date().toISOString().split('T')[0];
  const lastActivity = profile?.last_activity;
  let newStreak = profile?.streak_count ?? 0;

  if (lastActivity !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    newStreak = lastActivity === yesterday ? newStreak + 1 : 1;
  }

  await supabase
    .from('profiles')
    .update({
      total_xp: (profile?.total_xp ?? 0) + xp,
      last_activity: today,
      streak_count: newStreak,
    })
    .eq('id', user.id);

  return { success: true };
}

export async function getTodayBlocksDone(): Promise<string[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const today = new Date().toISOString().split('T')[0];
  const { data } = await supabase
    .from('lesson_progress')
    .select('lesson_id, completed_at')
    .eq('user_id', user.id)
    .eq('lesson_type', 'session_block')
    .eq('completed', true)
    .gte('completed_at', `${today}T00:00:00Z`)
    .lt('completed_at', `${today}T23:59:59Z`);

  return data?.map(r => r.lesson_id) ?? [];
}
