import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Avatar, ME } from '@/components/ui/Avatar';
import { PhaseChip, ShieldBadge } from '@/components/ui/Badge';
import { Card, SectionLabel } from '@/components/ui/Card';
import { VersusBar } from '@/components/ui/Bar';
import { BoltIcon, SwordsIcon, SparkleIcon, TargetIcon, BookIcon, PenIcon, BellIcon, CheckIcon, ChevRIcon, ArrowUpIcon, CrownIcon, FireIcon } from '@/components/ui/Icons';

const tasks = [
  { icon: <SparkleIcon size={20} />, title: 'Warm-up · Vocab', meta: '5 kata lama + 5 baru', done: false, color: 'var(--sky)', href: '/learn/vocab' },
  { icon: <BookIcon size={20} />, title: 'Core · Reading', meta: '1 teks B1 · 10 menit', done: false, active: true, color: 'var(--sky)', href: '/learn/session' },
  { icon: <PenIcon size={20} />, title: 'Grammar in Context', meta: 'Past tense · 8 soal', done: false, color: 'var(--mint)', href: '/learn/session' },
  { icon: <SwordsIcon size={20} />, title: 'Daily Duel', meta: 'Vocab challenge · 5 mnt', done: false, color: 'var(--pink)', href: '/duel' },
];

function StatCard({ icon, label, value, sub, color, deep, soft }: { icon: React.ReactNode; label: string; value: string; sub?: React.ReactNode; color: string; deep: string; soft: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 'var(--r-lg)', padding: 14, boxShadow: 'var(--sh-sm)', border: '1px solid rgba(26,43,60,0.04)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -14, right: -14, width: 56, height: 56, borderRadius: '50%', background: soft }} />
      <div style={{ width: 36, height: 36, borderRadius: 'var(--r-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(140deg, ${color}, ${deep})`, color: '#fff', position: 'relative', boxShadow: `0 5px 12px ${color}` }}>
        {icon}
      </div>
      <div className="f-display tabular" style={{ fontSize: 26, fontWeight: 700, marginTop: 10, lineHeight: 1, color: 'var(--ink)' }}>{value}</div>
      <div style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 600, marginTop: 3 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: deep, fontWeight: 700, marginTop: 4, display: 'flex', alignItems: 'center', gap: 3 }}>{sub}</div>}
    </div>
  );
}

function TaskRow({ icon, title, meta, done, active, color, href }: typeof tasks[0]) {
  return (
    <Link href={href} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', borderRadius: 'var(--r-md)', border: active ? `2px solid ${color}` : '2px solid transparent', background: active ? 'color-mix(in srgb, var(--sky-wash) 70%, #fff)' : done ? 'var(--green-soft)' : 'var(--offwhite)', textDecoration: 'none', transition: 'transform .12s' }}>
      <div style={{ width: 38, height: 38, borderRadius: 'var(--r-sm)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? 'var(--green)' : `color-mix(in srgb, ${color} 22%, #fff)`, color: done ? '#fff' : color }}>
        {done ? <CheckIcon size={20} /> : icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, color: done ? 'var(--green)' : 'var(--ink)' }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>{meta}</div>
      </div>
      {done
        ? <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--green)' }}>Selesai</span>
        : <ChevRIcon size={18} style={{ color: active ? color : 'var(--faint)' }} />}
    </Link>
  );
}

function PlayIcon({ size = 20, style }: { size?: number; style?: React.CSSProperties }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}><path d="M5 3l14 9-14 9V3z" /></svg>;
}

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

  // Partner profile
  let partnerData = null;
  if (hasPartner) {
    const { data: p } = await supabase
      .from('profiles')
      .select('display_name, total_xp')
      .eq('id', profile!.partner_id!)
      .single();
    partnerData = p;
  }

  const doneCount = tasks.filter(t => t.done).length;

  return (
    <div style={{ background: 'var(--offwhite)', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(165deg, var(--baby) 0%, var(--sky-wash) 55%, var(--offwhite) 100%)', padding: '58px 18px 16px', borderRadius: '0 0 28px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar {...ME} initials={initials} size={48} ring glow />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 700 }}>Halo,</div>
            <div className="f-display" style={{ fontSize: 21, fontWeight: 700, lineHeight: 1.05, color: 'var(--ink)' }}>{displayName}</div>
          </div>
          <PhaseChip phase={phase} week={week} />
          <div style={{ position: 'relative', width: 40, height: 40, borderRadius: '50%', background: '#fff', boxShadow: 'var(--sh-xs)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-2)' }}>
            <BellIcon size={20} />
          </div>
        </div>

        {/* Streak hero */}
        <div style={{ marginTop: 16, borderRadius: 'var(--r-xl)', padding: 16, position: 'relative', overflow: 'hidden', background: streak > 0 ? 'linear-gradient(125deg, var(--sunny), var(--coral) 88%)' : 'linear-gradient(125deg, var(--faint), var(--muted))', boxShadow: streak > 0 ? '0 14px 30px rgba(255,158,125,0.42)' : 'var(--sh-md)' }}>
          <div style={{ position: 'absolute', right: -10, top: -18, opacity: 0.25, color: '#fff' }}>
            <FireIcon size={120} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, color: '#fff' }}>
              <FireIcon size={42} style={{ animation: streak > 0 ? 'flame 1.3s ease-in-out infinite' : 'none', transformOrigin: 'bottom center' }} />
              <span className="f-display tabular" style={{ fontSize: 52, fontWeight: 700, lineHeight: 0.9 }}>{streak}</span>
            </div>
            <div style={{ color: '#fff' }}>
              <div className="f-display" style={{ fontSize: 18, fontWeight: 600, lineHeight: 1 }}>hari streak</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, opacity: 0.92, marginTop: 3 }}>
                {streak === 0 ? 'Mulai sesi pertamamu!' : hasPartner ? `Jaga terus bareng ${partnerData?.display_name || 'partner'}` : 'Undang partner untuk mulai'}
              </div>
            </div>
            {streak > 0 && (
              <div style={{ marginLeft: 'auto' }}>
                <ShieldBadge />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '4px 18px 24px' }}>
        {/* 4 stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11, marginTop: 14 }}>
          <StatCard icon={<BoltIcon size={20} />} label="Total XP" value={totalXp.toLocaleString('id-ID')} sub={totalXp > 0 ? <><ArrowUpIcon size={11} />terus tingkatkan</> : <>mulai sesi!</>} color="var(--sky)" deep="var(--sky-deep)" soft="var(--sky-wash)" />
          <StatCard icon={<SwordsIcon size={20} />} label="Duel menang" value={String(duelWins)} sub={duelWins > 0 ? <>terus tantang!</> : <>belum ada duel</>} color="var(--pink)" deep="var(--pink-deep)" soft="var(--pink-wash)" />
          <StatCard icon={<SparkleIcon size={20} />} label="Vocab aktif" value={String(activeVocab)} sub={activeVocab > 0 ? <><ArrowUpIcon size={11} />keep going</> : <>belajar kata baru</>} color="var(--mint)" deep="#3FB7A2" soft="var(--mint-soft)" />
          <StatCard icon={<TargetIcon size={20} />} label="Level skill" value={level} sub={<>fase {phase}</>} color="var(--sunny)" deep="#F2B43C" soft="var(--sunny-soft)" />
        </div>

        {/* Today's session */}
        <div style={{ marginTop: 20 }}>
          <SectionLabel action={<span style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--sky-ink)' }}>{doneCount}/4 selesai</span>}>Sesi hari ini</SectionLabel>
          <Card pad={12}>
            <div style={{ height: 6, borderRadius: 999, background: 'rgba(26,43,60,0.07)', overflow: 'hidden', marginBottom: 12 }}>
              <div style={{ width: `${(doneCount / 4) * 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--sky), var(--mint))', borderRadius: 999, transition: 'width .7s' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {tasks.map((t, i) => <TaskRow key={i} {...t} />)}
            </div>
          </Card>
          <div style={{ marginTop: 14 }}>
            <Link href="/learn/session" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, height: 56, borderRadius: 'var(--r-pill)', background: 'linear-gradient(135deg, var(--sky), var(--sky-deep))', color: '#fff', textDecoration: 'none', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, boxShadow: 'var(--sh-blue)' }}>
              <PlayIcon size={22} />Mulai Sesi Hari Ini
            </Link>
          </div>
        </div>

        {/* Head to head — only show if partner exists */}
        {hasPartner && partnerData && (
          <div style={{ marginTop: 20 }}>
            <SectionLabel>Head-to-head</SectionLabel>
            <Link href="/progress" style={{ textDecoration: 'none' }}>
              <Card pad={16}>
                <VersusBar a={totalXp} b={partnerData.total_xp || 0} nameA={displayName} nameB={partnerData.display_name || 'Partner'} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, fontSize: 12.5, fontWeight: 700, color: 'var(--sky-ink)' }}>
                  <CrownIcon size={15} style={{ color: 'var(--sunny)' }} />
                  {totalXp > (partnerData.total_xp || 0) ? 'Kamu unggul!' : totalXp === (partnerData.total_xp || 0) ? 'Imbang' : 'Kejar ketinggalan!'}
                </div>
              </Card>
            </Link>
          </div>
        )}

        {!hasPartner && (
          <div style={{ marginTop: 20 }}>
            <Card pad={16} style={{ textAlign: 'center', background: 'var(--pink-wash)', border: '1.5px solid var(--lpink)' }}>
              <div className="f-display" style={{ fontSize: 16, fontWeight: 600, color: 'var(--pink-ink)' }}>Belum punya partner</div>
              <div style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 600, marginTop: 4 }}>Undang teman untuk mulai kompetisi!</div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
