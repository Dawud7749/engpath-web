'use server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function saveOnboardingStep(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const step = formData.get('step') as string;
  const next = formData.get('next') as string;

  const updates: Record<string, unknown> = {};

  if (step === 'welcome') {
    const name = (formData.get('display_name') as string)?.trim();
    if (name) updates.display_name = name;
  }
  if (step === 'level') {
    updates.level_initial = formData.get('level') as string;
    updates.current_level = (formData.get('level') as string).toUpperCase();
  }
  if (step === 'goal') {
    updates.learning_goal = formData.get('goal') as string;
  }
  if (step === 'focus') {
    updates.focus_skill = formData.get('focus') as string;
  }
  if (step === 'partner') {
    updates.prefers_solo = formData.get('mode') === 'solo';
    updates.onboarded = true;
  }

  await supabase.from('profiles').update(updates).eq('id', user.id);

  redirect(next);
}
