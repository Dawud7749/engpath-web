import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getTodayBlocksDone } from '@/app/(app)/learn/session/actions';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, current_phase, current_week, streak_count, total_xp, duel_wins, active_vocab, current_level, partner_id')
    .eq('id', user.id)
    .single();

  const displayName = profile?.display_name || user.email?.split('@')[0] || 'User';
  const initials = displayName.charAt(0).toUpperCase();
  const phase = profile?.current_phase ?? 1;
  const week = profile?.current_week ?? 1;
  const streak = profile?.streak_count ?? 0;
  const totalXp = profile?.total_xp ?? 0;
  const duelWins = profile?.duel_wins ?? 0;
  const activeVocab = profile?.active_vocab ?? 0;
  const level = profile?.current_level || 'A2';
  const hasPartner = !!profile?.partner_id;

  let partnerData = null;
  if (hasPartner) {
    const { data: p } = await supabase
      .from('profiles')
      .select('display_name, total_xp')
      .eq('id', profile!.partner_id!)
      .single();
    partnerData = p;
  }

  const doneKeys = await getTodayBlocksDone();

  return (
    <DashboardClient
      displayName={displayName}
      initials={initials}
      phase={phase}
      week={week}
      streak={streak}
      totalXp={totalXp}
      duelWins={duelWins}
      activeVocab={activeVocab}
      level={level}
      hasPartner={hasPartner}
      partnerName={partnerData?.display_name ?? null}
      partnerXp={partnerData?.total_xp ?? 0}
      doneKeys={doneKeys}
    />
  );
}
