import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { LevelBadge, PhaseChip } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { CalIcon, TrophyIcon, ShieldCheckIcon, BellIcon, SettingsIcon, ChevRIcon, FireIcon, MicIcon, BookIcon, BoltIcon } from '@/components/ui/Icons';
import { PartnerInvite } from './PartnerInvite';
import { LogoutButton } from './LogoutButton';

const badges = [
  { icon: FireIcon,  label: '14 hari',   color: 'var(--coral)' },
  { icon: MicIcon,   label: 'Speaker',   color: 'var(--pink)' },
  { icon: BookIcon,  label: 'Reader B1', color: 'var(--sky)' },
  { icon: BoltIcon,  label: '2.5K XP',   color: 'var(--sunny)' },
];

const menu = [
  { icon: CalIcon,         label: 'Laporan Mingguan', detail: 'Minggu 3', color: 'var(--sky)',  href: '/weekly' },
  { icon: TrophyIcon,      label: 'Leaderboard',      detail: '5 domain', color: 'var(--sunny)', href: '/leaderboard' },
  { icon: ShieldCheckIcon, label: 'Streak Shield',    detail: '1 tersisa', color: 'var(--mint)',  href: null },
  { icon: BellIcon,        label: 'Reminder harian',  detail: '19:00',    color: 'var(--coral)', href: null },
];

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, current_phase, current_week, current_level, focus_skill, partner_id')
    .eq('id', user.id)
    .single();

  const displayName = profile?.display_name || user.email?.split('@')[0] || 'User';
  const initials    = displayName.charAt(0).toUpperCase();
  const level       = profile?.current_level || 'A2';
  const phase       = profile?.current_phase ?? 1;
  const week        = profile?.current_week ?? 1;
  const focus       = profile?.focus_skill ? profile.focus_skill.charAt(0).toUpperCase() + profile.focus_skill.slice(1) : null;

  let partnerData: { display_name: string | null; email: string | null } | null = null;
  if (profile?.partner_id) {
    const { data: p } = await supabase
      .from('profiles')
      .select('display_name, email')
      .eq('id', profile.partner_id)
      .single();
    partnerData = p;
  }

  return (
    <div style={{ background: 'var(--offwhite)', minHeight: '100%' }}>
      <div style={{ background: 'linear-gradient(165deg, var(--lpink) 0%, var(--pink-wash) 50%, var(--offwhite) 100%)', padding: '58px 18px 18px', borderRadius: '0 0 28px 28px', textAlign: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'linear-gradient(150deg, var(--pink), var(--pink-deep))', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, border: '3px solid #fff', boxShadow: '0 8px 22px rgba(245,168,200,0.55)' }}>
            {initials}
          </div>
          <div style={{ position: 'absolute', bottom: -2, right: -4, background: '#fff', borderRadius: 999, padding: 2, boxShadow: 'var(--sh-xs)' }}>
            <LevelBadge level={level} size="sm" />
          </div>
        </div>
        <div className="f-display" style={{ fontSize: 22, fontWeight: 700, marginTop: 10, color: 'var(--ink)' }}>{displayName}</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
          <PhaseChip phase={phase} week={week} />
          {focus && (
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 26, padding: '0 12px', borderRadius: 999, background: '#fff', fontSize: 12.5, fontWeight: 800, color: 'var(--muted)', boxShadow: 'var(--sh-xs)' }}>Fokus: {focus}</span>
          )}
        </div>
      </div>

      <div style={{ padding: '16px 18px 24px', maxWidth: 720, margin: '0 auto' }}>
        {/* Partner */}
        <PartnerInvite partner={partnerData} myEmail={user.email || ''} />

        {/* Badges */}
        <div style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '2px 2px 10px' }}>
            <h3 className="f-display" style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--ink)' }}>Badge</h3>
            <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--sky-ink)' }}>12 total</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
            {badges.map(({ icon: Icon, label, color }, bi) => (
              <div key={bi} style={{ background: '#fff', borderRadius: 'var(--r-md)', padding: '12px 4px', textAlign: 'center', boxShadow: 'var(--sh-xs)' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', margin: '0 auto', background: `linear-gradient(140deg, ${color}, color-mix(in srgb, ${color} 88%, #000))`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 10px ${color}` }}>
                  <Icon size={20} />
                </div>
                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--ink-2)', marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <Card pad={16} style={{ marginTop: 18 }}>
          {menu.map(({ icon: Icon, label, detail, color, href }, mi) => (
            <div key={mi}>
              {href ? (
                <Link href={href} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '13px 4px', textDecoration: 'none', borderBottom: mi < menu.length - 1 ? '1px solid rgba(26,43,60,0.06)' : 'none' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 'var(--r-sm)', background: `color-mix(in srgb, ${color} 18%, #fff)`, color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon size={19} /></div>
                  <span style={{ flex: 1, fontSize: 14.5, fontWeight: 700, color: 'var(--ink)' }}>{label}</span>
                  {detail && <span style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 700 }}>{detail}</span>}
                  <ChevRIcon size={17} style={{ color: 'var(--faint)' }} />
                </Link>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '13px 4px', borderBottom: mi < menu.length - 1 ? '1px solid rgba(26,43,60,0.06)' : 'none' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 'var(--r-sm)', background: `color-mix(in srgb, ${color} 18%, #fff)`, color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon size={19} /></div>
                  <span style={{ flex: 1, fontSize: 14.5, fontWeight: 700, color: 'var(--ink)' }}>{label}</span>
                  {detail && <span style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 700 }}>{detail}</span>}
                </div>
              )}
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '13px 4px' }}>
            <div style={{ width: 34, height: 34, borderRadius: 'var(--r-sm)', background: 'var(--offwhite)', color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><SettingsIcon size={19} /></div>
            <span style={{ flex: 1, fontSize: 14.5, fontWeight: 700, color: 'var(--ink)' }}>Pengaturan</span>
            <ChevRIcon size={17} style={{ color: 'var(--faint)' }} />
          </div>
        </Card>

        <LogoutButton />
      </div>
    </div>
  );
}
